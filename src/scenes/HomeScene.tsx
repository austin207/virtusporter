import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneProps } from '@/components/ox/ScrollStory';
import {
  ReadySignal,
  SceneCanvas,
  clamp01,
  lerp,
  makeScanPointsMaterial,
  rng,
  smooth,
  useSceneColors,
  useSmoothedInputs,
  useWaypointCamera,
  type SceneColors,
  type Waypoint,
} from './common';

/*
 * Home: "LiDAR → robot assembles itself".
 * 7 chapters (hero, problem, mission, consult, align, build, deploy) map onto progress 0..1.
 *  - a scanner sweep reveals a point-cloud lab around the origin (hero → problem)
 *  - the robot's blueprint is visible from the start; parts gather around it (hero, problem)
 *  - the voxels assemble the quadruped bottom-up (mission → consult → align)
 *  - edges light up, joints glow (build)
 *  - red sensors power on, a pulse ring fires and it takes a step (deploy)
 */

const U = 0.16; // voxel size

type Part = 'body' | 'head' | 'eye' | 'leg' | 'lidar';
interface Voxel {
  x: number;
  y: number;
  z: number;
  part: Part;
  leg: number; // 0..3 for legs, -1 otherwise
}

function buildRobot(): { voxels: Voxel[]; hips: THREE.Vector3[] } {
  const v: Voxel[] = [];
  const seen = new Set<string>();
  const add = (x: number, y: number, z: number, part: Part, leg = -1) => {
    const k = `${x},${y},${z}`;
    if (seen.has(k)) return;
    seen.add(k);
    v.push({ x: x * U, y: y * U, z: z * U, part, leg });
  };
  const shell = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, part: Part) => {
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++)
        for (let z = z0; z <= z1; z++)
          if (x === x0 || x === x1 || y === y0 || y === y1 || z === z0 || z === z1) add(x, y, z, part);
  };
  // chassis: long and low, with a raised spine plate (Spot-like quadruped)
  shell(-9, 8, 9, 11, -3, 3, 'body');
  shell(-6, 5, 12, 12, -2, 2, 'body');
  // head / sensor block, slightly lower than the spine
  shell(9, 12, 9, 12, -2, 2, 'head');
  // visor + eyes (accent)
  for (let z = -2; z <= 2; z++) add(13, 11, z, 'eye');
  add(13, 10, -2, 'eye');
  add(13, 10, 2, 'eye');
  // lidar puck on the spine
  for (let a = 0; a < 14; a++) {
    const ang = (a / 14) * Math.PI * 2;
    add(Math.round(2 + Math.cos(ang) * 2), 13, Math.round(Math.sin(ang) * 2), 'lidar');
  }
  // legs: thin two-segment legs with a backward knee; hip at y=9
  const legPos: [number, number][] = [
    [6, -4],
    [6, 4],
    [-7, -4],
    [-7, 4],
  ];
  const hips: THREE.Vector3[] = [];
  legPos.forEach(([lx, lz], li) => {
    hips.push(new THREE.Vector3(lx * U, 9.5 * U, lz * U));
    for (let y = 8; y >= 5; y--) {
      const dx = Math.round((8 - y) * 0.6); // upper leg leans forward to the knee
      add(lx + dx, y, lz, 'leg', li);
      add(lx + dx + 1, y, lz, 'leg', li);
    }
    for (let y = 4; y >= 1; y--) {
      const dx = 2 - Math.round((4 - y) * 0.7); // lower leg leans back to the foot
      add(lx + dx, y, lz, 'leg', li);
      add(lx + dx + 1, y, lz, 'leg', li);
    }
    for (let x = lx - 1; x <= lx + 1; x++) add(x, 0, lz, 'leg', li); // foot pad
    add(lx + 3, 5, lz, 'eye', li); // knee joint light
  });
  return { voxels: v, hips };
}

function buildWorld(r: () => number) {
  const pos: number[] = [];
  const key: number[] = [];
  const rnd: number[] = [];
  const push = (x: number, y: number, z: number) => {
    pos.push(x, y, z);
    key.push(Math.hypot(x, z) + y * 0.15);
    rnd.push(r());
  };
  // floor: jittered grid out to radius 24
  const step = 0.27;
  for (let x = -24; x <= 24; x += step)
    for (let z = -24; z <= 24; z += step) {
      const d = Math.hypot(x, z);
      if (d > 24 || r() < 0.2) continue;
      push(x + (r() - 0.5) * 0.12, (r() - 0.5) * 0.02, z + (r() - 0.5) * 0.12);
    }
  // structures: racks, crates and a curved back wall, as sampled surfaces
  const box = (cx: number, cz: number, w: number, h: number, d: number, density: number) => {
    const n = Math.floor((w * h + d * h + w * d) * density);
    for (let i = 0; i < n; i++) {
      const f = Math.floor(r() * 5);
      let x = cx + (r() - 0.5) * w;
      let y = r() * h;
      let z = cz + (r() - 0.5) * d;
      if (f === 0) x = cx - w / 2;
      else if (f === 1) x = cx + w / 2;
      else if (f === 2) z = cz - d / 2;
      else if (f === 3) z = cz + d / 2;
      else y = h;
      push(x, y, z);
    }
  };
  // shelving rows
  for (let row = 0; row < 3; row++)
    for (let k = 0; k < 4; k++) box(-15 + k * 5.2, -11 - row * 3.4, 4.2, 2.8 + (k % 2) * 0.6, 1, 24);
  // crates
  const crates = [
    [9, 6, 1.4, 1, 1.4],
    [10.6, 6.2, 1, 0.8, 1],
    [-9, 7, 1.8, 1.2, 1.2],
    [-11, 4, 1.1, 0.9, 1.1],
    [13, -3, 2.2, 1.6, 1.6],
    [-14, -1, 1.6, 1.2, 2],
  ];
  crates.forEach(([x, z, w, h, d]) => box(x, z, w, h, d, 60));
  // curved back wall (hangar)
  for (let i = 0; i < 9000; i++) {
    const a = -Math.PI * 0.95 + r() * Math.PI * 0.9;
    const R = 21 + r() * 0.15;
    push(Math.cos(a) * R, r() * 7 * (0.6 + 0.4 * Math.sin(a * 3) ** 2), Math.sin(a) * R);
  }
  // a column of floating dust
  for (let i = 0; i < 500; i++) push((r() - 0.5) * 34, 0.5 + r() * 7, (r() - 0.5) * 34);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aKey', new THREE.Float32BufferAttribute(key, 1));
  g.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 1));
  return g;
}

/** Box material whose faces get glowing edges (Oxigen's lit wireframe on voxels). */
function makeVoxelMaterial(colors: SceneColors) {
  const mat = new THREE.MeshStandardMaterial({ color: colors.point, roughness: 0.55, metalness: 0.15 });
  const uniforms = { uEdge: { value: 0 }, uEdgeColor: { value: colors.point.clone().multiplyScalar(1.6) } };
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vUv2;').replace('#include <uv_vertex>', '#include <uv_vertex>\nvUv2 = uv;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vUv2; uniform float uEdge; uniform vec3 uEdgeColor;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float e = min(min(vUv2.x, 1.0 - vUv2.x), min(vUv2.y, 1.0 - vUv2.y));
        float edge = 1.0 - smoothstep(0.03, 0.09, e);
        totalEmissiveRadiance += uEdgeColor * edge * uEdge;`,
      );
  };
  return { mat, uniforms };
}

function World({ inputs, colors }: { inputs: ReturnType<typeof useSmoothedInputs>; colors: SceneColors }) {
  const geo = useMemo(() => buildWorld(rng(7)), []);
  const mat = useMemo(() => makeScanPointsMaterial(colors, 2.1), [colors]);
  const { gl } = useThree();
  useEffect(() => {
    mat.uniforms.uPix.value = gl.getPixelRatio();
    mat.uniforms.uFog.value = 0.04;
  }, [gl, mat]);
  useFrame(({ clock }) => {
    const p = inputs.current.p;
    const t = clock.elapsedTime;
    const auto = Math.min(9, 3 + t * 1.6); // the scan is already running on load
    mat.uniforms.uScan.value = Math.max(auto, lerp(3, 36, smooth(0.0, 0.3, p)));
    mat.uniforms.uTime.value = t;
    mat.uniforms.uDim.value = lerp(1, 0.55, smooth(0.4, 0.6, p)); // let the robot take focus later
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

function Robot({ inputs, colors }: { inputs: ReturnType<typeof useSmoothedInputs>; colors: SceneColors }) {
  const { voxels, hips } = useMemo(() => buildRobot(), []);
  const r = useMemo(() => rng(42), []);
  const scatter = useMemo(
    () =>
      voxels.map(() => {
        const a = r() * Math.PI * 2;
        const d = 1.8 + r() * 4.2;
        return new THREE.Vector3(Math.cos(a) * d, 0.4 + r() * 3.6, Math.sin(a) * d);
      }),
    [voxels, r],
  );
  const delays = useMemo(() => voxels.map((v) => clamp01(v.y / (17 * U)) * 0.6 + r() * 0.28), [voxels, r]);
  const spin = useMemo(() => voxels.map(() => new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize()), [voxels, r]);

  const bodyIdx = useMemo(() => voxels.map((v, i) => (v.part !== 'eye' && v.part !== 'lidar' ? i : -1)).filter((i) => i >= 0), [voxels]);
  const glowIdx = useMemo(() => voxels.map((v, i) => (v.part === 'eye' || v.part === 'lidar' ? i : -1)).filter((i) => i >= 0), [voxels]);

  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const ghostRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { mat: voxelMat, uniforms: voxelU } = useMemo(() => makeVoxelMaterial(colors), [colors]);
  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({ color: colors.glow.clone().multiplyScalar(0.25), toneMapped: false }), [colors]);
  const ghostGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(voxels.flatMap((v) => [v.x, v.y, v.z]), 3));
    return g;
  }, [voxels]);
  const ghostMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: colors.point.clone().multiplyScalar(1.25),
        size: 0.17,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [colors],
  );
  const ringMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: colors.glow, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
    [colors],
  );

  const m = useMemo(() => new THREE.Matrix4(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const s = useMemo(() => new THREE.Vector3(), []);
  const pTarget = useMemo(() => new THREE.Vector3(), []);
  const pNow = useMemo(() => new THREE.Vector3(), []);
  const axisZ = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const qLeg = useMemo(() => new THREE.Quaternion(), []);

  useFrame(({ clock }) => {
    const p = inputs.current.p;
    const t = clock.elapsedTime;
    const assemble = smooth(0.3, 0.62, p);
    const build = smooth(0.58, 0.78, p);
    const deploy = smooth(0.82, 0.96, p);
    const walk = smooth(0.88, 1.0, p);
    const appear = smooth(0.08, 0.22, p); // parts materialise around the blueprint early on

    voxelU.uEdge.value = lerp(0.35, 1.2, build) + deploy * 0.6;
    glowMat.color.copy(colors.glow).multiplyScalar(lerp(0.12, 2.6, deploy) * (0.85 + 0.15 * Math.sin(t * 6)));
    // the blueprint is there from the first frame, so the hero always shows the robot-to-be
    ghostMat.opacity = (0.6 + 0.4 * smooth(0.15, 0.35, p)) * (1 - smooth(0.5, 0.66, p)) * (0.85 + 0.15 * Math.sin(t * 2));

    if (groupRef.current) groupRef.current.position.x = walk * 1.1;

    const legAngle = (li: number) => (walk > 0 && walk < 1 ? Math.sin(walk * Math.PI * 4 + (li % 2 === 0 ? 0 : Math.PI) + (li > 1 ? Math.PI : 0)) * 0.42 * Math.sin(walk * Math.PI) : 0);

    const write = (mesh: THREE.InstancedMesh | null, idxs: number[]) => {
      if (!mesh) return;
      idxs.forEach((vi, k) => {
        const v = voxels[vi];
        const local = clamp01((assemble - delays[vi] * 0.7) / 0.32);
        const e = local * local * (3 - 2 * local);
        pTarget.set(v.x, v.y, v.z);
        if (v.leg >= 0) {
          const ang = legAngle(v.leg);
          if (ang) {
            qLeg.setFromAxisAngle(axisZ, ang);
            pTarget.sub(hips[v.leg]).applyQuaternion(qLeg).add(hips[v.leg]);
          }
        }
        const sc = scatter[vi];
        pNow.set(sc.x + Math.sin(t * 0.3 + vi) * 0.25, sc.y + Math.sin(t * 0.5 + vi * 1.7) * 0.2, sc.z + Math.cos(t * 0.3 + vi) * 0.25);
        pNow.lerp(pTarget, e);
        // floating voxels tumble, assembled ones snap square
        q.setFromAxisAngle(spin[vi], (1 - e) * (t * 0.6 + vi));
        const size = U * 0.9 * lerp(0.6, 1, e) * appear;
        s.set(size, size, size);
        m.compose(pNow, q, s);
        mesh.setMatrixAt(k, m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    };
    write(bodyRef.current, bodyIdx);
    write(glowRef.current, glowIdx);

    // deploy pulse ring
    if (ringRef.current) {
      const cyc = (t * 0.55) % 1;
      const on = deploy;
      ringRef.current.scale.setScalar(0.5 + cyc * 9);
      ringMat.opacity = on * (1 - cyc) * 0.55;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={bodyRef} args={[undefined, undefined, bodyIdx.length]} material={voxelMat} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <instancedMesh ref={glowRef} args={[undefined, undefined, glowIdx.length]} material={glowMat} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
      <points ref={ghostRef} geometry={ghostGeo} material={ghostMat} />
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} material={ringMat}>
        <ringGeometry args={[0.96, 1, 96]} />
      </mesh>
    </group>
  );
}

const WAYPOINTS: Waypoint[] = [
  { at: 0.0, pos: [8.5, 4.2, 10.5], look: [0, 1.1, 0] },
  { at: 0.16, pos: [3.5, 3.4, 11], look: [0, 1.2, 0] },
  { at: 0.31, pos: [-11, 5.2, 10], look: [0, 1.4, 0] },
  { at: 0.46, pos: [-6.5, 3.4, 7.5], look: [0, 1.6, 0] },
  { at: 0.62, pos: [1.5, 2.8, 8], look: [0, 1.6, 0] },
  { at: 0.8, pos: [7.5, 2.4, 6.8], look: [0.2, 1.4, 0] },
  { at: 1.0, pos: [8.2, 1.5, 5.4], look: [1.6, 1.3, 0] },
];

function Rig(props: SceneProps) {
  const inputs = useSmoothedInputs(props);
  const colors = useSceneColors();
  useWaypointCamera(WAYPOINTS, inputs, 0.45);
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    // keep the subject right of the bottom-left text column on wide screens
    cam.filmOffset = size.width / size.height > 1.15 ? -4.5 : 0;
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return (
    <>
      <hemisphereLight args={[colors.point, colors.bg, 0.55]} />
      <directionalLight position={[6, 10, 4]} intensity={1.6} />
      <directionalLight position={[-8, 4, -6]} intensity={0.5} color={colors.glow} />
      <World inputs={inputs} colors={colors} />
      <Robot inputs={inputs} colors={colors} />
      <ReadySignal onReady={props.onReady} />
    </>
  );
}

export default function HomeScene(props: SceneProps) {
  return (
    <SceneCanvas fogDensity={0.04} bloom={1.0}>
      <Rig {...props} />
    </SceneCanvas>
  );
}

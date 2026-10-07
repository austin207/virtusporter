import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneProps } from '@/components/ox/ScrollStory';
import { ReadySignal, SceneCanvas, lerp, makeScanPointsMaterial, rng, smooth, useSceneColors, useSmoothedInputs, type SceneColors } from './common';

/*
 * Services: a robot's-eye SLAM run. A small rover drives a planned (red) path through a warehouse;
 * the point-cloud map only exists where its LiDAR has already been, so the map literally builds
 * as you scroll through ROS / custom robotics / integration / AI.
 */

const RANGE = 6.5;

function buildPath() {
  const pts = [
    [-16, -12],
    [-16, -2],
    [-9, 3],
    [-2, 3],
    [2, -4],
    [9, -6],
    [15, -1],
    [14, 8],
    [5, 12],
    [-6, 11],
  ].map(([x, z]) => new THREE.Vector3(-x, 0.05, -z)); // mirrored so the run starts front-right of the headline
  return new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
}

function buildMap(path: THREE.CatmullRomCurve3, r: () => number) {
  const pos: number[] = [];
  const rand: number[] = [];
  const add = (x: number, y: number, z: number) => {
    pos.push(x, y, z);
    rand.push(r());
  };
  // floor
  for (let x = -22; x <= 22; x += 0.34)
    for (let z = -18; z <= 18; z += 0.34) if (r() > 0.25) add(x + (r() - 0.5) * 0.15, 0, z + (r() - 0.5) * 0.15);
  // rack rows (two faces + uprights); avoid the path corridor by design of the path
  const rack = (x0: number, x1: number, z: number, h: number) => {
    const n = Math.floor((x1 - x0) * h * 30);
    for (let i = 0; i < n; i++) {
      const x = x0 + r() * (x1 - x0);
      const y = r() * h;
      const face = r() < 0.5 ? -0.5 : 0.5;
      // shelves: concentrate points on shelf levels
      const yy = r() < 0.55 ? Math.round(y / (h / 4)) * (h / 4) : y;
      add(x, yy, z + face);
    }
    for (let x = x0; x <= x1; x += 2.2) for (let y = 0; y < h; y += 0.12) add(x, y, z + (r() - 0.5));
  };
  rack(-12, 10, -9, 3.2);
  rack(-12, 10, 7, 3.2);
  rack(-7, -1.8, 0, 2.6); // middle row has an aisle gap the route passes through
  rack(1.8, 6, 0, 2.6);
  rack(8, 11, 0, 2.6);
  // perimeter walls
  for (let i = 0; i < 9000; i++) {
    const side = Math.floor(r() * 4);
    const t = r();
    const y = r() * 6;
    if (side === 0) add(-22 + t * 44, y, -18);
    else if (side === 1) add(-22 + t * 44, y, 18);
    else if (side === 2) add(-22, y, -18 + t * 36);
    else add(22, y, -18 + t * 36);
  }
  // crates & a docked robot
  for (let i = 0; i < 2500; i++) add(17 + r() * 3, r() * 1.4, -14 + r() * 4);
  for (let i = 0; i < 1500; i++) add(-20 + r() * 2.5, r() * 1.8, 10 + r() * 5);

  // reveal key = earliest normalised path time when the rover was within RANGE of the point
  const N = 360;
  const samples = Array.from({ length: N + 1 }, (_, i) => path.getPointAt(i / N));
  const key = new Float32Array(pos.length / 3);
  for (let k = 0; k < key.length; k++) {
    const x = pos[k * 3];
    const z = pos[k * 3 + 2];
    let found = 2;
    for (let i = 0; i <= N; i++) {
      const s = samples[i];
      const dx = s.x - x;
      const dz = s.z - z;
      if (dx * dx + dz * dz < RANGE * RANGE) {
        found = i / N;
        break;
      }
    }
    key[k] = found * 10; // scale so uFront (in key units) gives a nice glow band
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aKey', new THREE.BufferAttribute(key, 1));
  g.setAttribute('aRand', new THREE.Float32BufferAttribute(rand, 1));
  return g;
}

function Rover({ colors }: { colors: SceneColors }) {
  const voxels = useMemo(() => {
    const v: [number, number, number][] = [];
    for (let x = -3; x <= 3; x++) for (let z = -2; z <= 2; z++) for (let y = 1; y <= 2; y++) v.push([x, y, z]);
    for (const x of [-3, 3]) for (const z of [-3, 3]) v.push([x, 0, z]);
    for (let y = 3; y <= 4; y++) v.push([1, y, 0]);
    return v;
  }, []);
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const m = new THREE.Matrix4();
    voxels.forEach(([x, y, z], i) => {
      m.makeTranslation(x * 0.13, y * 0.13, z * 0.13);
      m.scale(new THREE.Vector3(0.12, 0.12, 0.12));
      ref.current?.setMatrixAt(i, m);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, [voxels]);
  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, voxels.length]}>
        <boxGeometry />
        <meshStandardMaterial color={colors.point} emissive={colors.point} emissiveIntensity={0.35} />
      </instancedMesh>
      <mesh position={[0.13, 0.66, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 20]} />
        <meshBasicMaterial color={colors.glow.clone().multiplyScalar(2.2)} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig(props: SceneProps) {
  const inputs = useSmoothedInputs(props);
  const colors = useSceneColors();
  const path = useMemo(() => buildPath(), []);
  const geo = useMemo(() => buildMap(path, rng(11)), [path]);
  const mat = useMemo(() => makeScanPointsMaterial(colors, 1.9), [colors]);
  const { gl, camera, size } = useThree();

  const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(path.getSpacedPoints(600)), [path]);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: colors.glow.clone().multiplyScalar(1.8), toneMapped: false, transparent: true, opacity: 0.95 }), [colors]);
  const planMat = useMemo(() => new THREE.LineDashedMaterial({ color: colors.wire, dashSize: 0.25, gapSize: 0.25, transparent: true, opacity: 0.45 }), [colors]);
  const planLine = useMemo(() => {
    const l = new THREE.Line(lineGeo.clone(), planMat);
    l.computeLineDistances();
    return l;
  }, [lineGeo, planMat]);
  const doneLine = useMemo(() => new THREE.Line(lineGeo, lineMat), [lineGeo, lineMat]);

  const rover = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.Mesh>(null);
  const sweepMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: colors.glow, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
    [colors],
  );
  const look = useRef(new THREE.Vector3());
  const camPos = useRef(new THREE.Vector3());

  useEffect(() => {
    mat.uniforms.uPix.value = gl.getPixelRatio();
    mat.uniforms.uFog.value = 0.028;
    mat.uniforms.uFront.value = 0.09;
    mat.uniforms.uGhost.value = 0.42; // unexplored map shows as a faint ghost
  }, [gl, mat]);
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.filmOffset = size.width / size.height > 1.15 ? -4 : 0;
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useFrame(({ clock }) => {
    const p = inputs.current.p;
    const t = clock.elapsedTime;
    const u = Math.max(Math.min(0.16, 0.06 + t * 0.02), lerp(0.06, 0.995, smooth(0.02, 0.96, p)));
    mat.uniforms.uScan.value = u * 10 + 0.05;
    mat.uniforms.uTime.value = t;
    doneLine.geometry.setDrawRange(0, Math.floor(u * 601));

    const here = path.getPointAt(u);
    const tan = path.getTangentAt(Math.min(0.999, u + 0.001));
    if (rover.current) {
      rover.current.position.copy(here);
      rover.current.rotation.y = Math.atan2(-tan.z, tan.x);
    }
    if (sweep.current) {
      sweep.current.position.set(here.x, 0.06, here.z);
      sweep.current.rotation.z = -t * 2.4;
    }

    // camera: overview map → chase cam → pull back to the finished map
    const chase = smooth(0.12, 0.3, p) * (1 - smooth(0.82, 1, p));
    const back = tan.clone().multiplyScalar(-1);
    const chasePos = here.clone().add(back.multiplyScalar(6.5)).add(new THREE.Vector3(0, 3.4, 0)).add(new THREE.Vector3(-tan.z, 0, tan.x).multiplyScalar(2.5));
    const overview = new THREE.Vector3(2, 14, 27);
    camPos.current.copy(overview).lerp(chasePos, chase);
    camPos.current.x += inputs.current.x * 0.6;
    camera.position.lerp(camPos.current, 0.12);
    const lookTarget = new THREE.Vector3(lerp(5, here.x, chase), 0.6, lerp(3, here.z, chase)).add(tan.clone().multiplyScalar(3 * chase));
    look.current.lerp(lookTarget, 0.12);
    camera.lookAt(look.current);
  });

  return (
    <>
      <hemisphereLight args={[colors.point, colors.bg, 0.8]} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <points geometry={geo} material={mat} frustumCulled={false} />
      <primitive object={planLine} />
      <primitive object={doneLine} />
      <group ref={rover}>
        <Rover colors={colors} />
      </group>
      <mesh ref={sweep} rotation={[-Math.PI / 2, 0, 0]} material={sweepMat}>
        <circleGeometry args={[RANGE * 0.75, 48, 0, Math.PI / 4]} />
      </mesh>
      <ReadySignal onReady={props.onReady} />
    </>
  );
}

export default function ServiceScene(props: SceneProps) {
  return (
    <SceneCanvas fogDensity={0.028} bloom={0.85} camera={{ fov: 40, position: [2, 14, 27] }}>
      <Rig {...props} />
    </SceneCanvas>
  );
}

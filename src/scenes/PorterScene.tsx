import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneProps } from '@/components/ox/ScrollStory';
import { ReadySignal, SceneCanvas, lerp, makeScanPointsMaterial, rng, smooth, useSceneColors, useSmoothedInputs, type SceneColors } from './common';

/*
 * Product: an exploded-view engineering schematic of the Porter, drawn as hairline wireframe.
 * Chapters: hero (assembled, turning) → chassis → navigation (sensor column) → lift → display.
 * Each chapter separates the parts and lights the relevant one in the accent colour.
 * Proportions follow /Porter.jpg: glass cabinet on a black chassis, white column with a tablet,
 * scissor lift with two shelves inside, clear roof lid.
 */

type PartId = 'chassis' | 'sensor' | 'lift' | 'display' | 'shell';

interface PartDef {
  id: PartId;
  explode: [number, number, number];
  build: () => THREE.BufferGeometry[]; // geometries already positioned in model space
}

const W = 1.0; // width (x)
const D = 0.78; // depth (z)
const H = 1.62; // overall height

function box(w: number, h: number, d: number, x: number, y: number, z: number) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(x, y, z);
  return g;
}
function cyl(r: number, h: number, x: number, y: number, z: number, axis: 'x' | 'y' | 'z' = 'y', seg = 18) {
  const g = new THREE.CylinderGeometry(r, r, h, seg);
  if (axis === 'x') g.rotateZ(Math.PI / 2);
  if (axis === 'z') g.rotateX(Math.PI / 2);
  g.translate(x, y, z);
  return g;
}

const PARTS: PartDef[] = [
  {
    id: 'chassis',
    explode: [0, -0.55, 0],
    build: () => [
      box(W + 0.06, 0.2, D + 0.06, 0, 0.14, 0),
      box(W - 0.1, 0.05, D - 0.1, 0, 0.27, 0),
      ...[
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
      ].map(([sx, sz]) => cyl(0.055, 0.05, sx * (W / 2 - 0.1), 0.055, sz * (D / 2 - 0.02), 'z')),
      // battery block + motor controllers inside the chassis
      box(0.42, 0.1, 0.32, -0.12, 0.13, 0),
      box(0.16, 0.08, 0.16, 0.3, 0.12, 0.12),
    ],
  },
  {
    id: 'sensor',
    explode: [-0.55, 0.05, 0.55],
    build: () => [
      // white column, front-left
      box(0.26, 1.02, 0.2, -W / 2 + 0.17, 0.82, D / 2 - 0.08),
      // camera eye on the column
      cyl(0.03, 0.02, -W / 2 + 0.17, 1.0, D / 2 + 0.03, 'z', 14),
      // lidar puck at the front of the chassis
      cyl(0.07, 0.06, 0, 0.3, D / 2 - 0.02, 'y', 22),
      // front light strips
      box(0.12, 0.015, 0.01, -0.22, 0.12, D / 2 + 0.035),
      box(0.12, 0.015, 0.01, 0.12, 0.12, D / 2 + 0.035),
    ],
  },
  {
    id: 'lift',
    explode: [0.75, 0.15, 0],
    build: () => {
      const g: THREE.BufferGeometry[] = [];
      // two shelves
      g.push(box(0.6, 0.02, 0.6, 0.12, 0.98, 0));
      g.push(box(0.6, 0.02, 0.6, 0.12, 0.62, 0));
      // scissor arms (X shapes) on both sides
      for (const z of [-0.25, 0.25]) {
        for (const s of [-1, 1]) {
          const arm = new THREE.BoxGeometry(0.02, 0.62, 0.02);
          arm.rotateZ(s * 0.62);
          arm.translate(0.12, 0.6, z);
          g.push(arm);
        }
      }
      // lift platform + luggage
      g.push(box(0.58, 0.03, 0.58, 0.12, 0.32, 0));
      g.push(box(0.42, 0.26, 0.24, 0.12, 1.12, 0));
      g.push(box(0.36, 0.22, 0.22, 0.12, 0.76, -0.04));
      return g;
    },
  },
  {
    id: 'display',
    explode: [-0.8, 0.32, 0.75],
    build: () => {
      const t = box(0.32, 0.22, 0.03, 0, 0, 0);
      t.rotateX(-0.35);
      t.translate(-W / 2 + 0.17, 1.42, D / 2 - 0.02);
      const neck = box(0.08, 0.12, 0.08, -W / 2 + 0.17, 1.33, D / 2 - 0.08);
      return [t, neck];
    },
  },
  {
    id: 'shell',
    explode: [0, 0.38, -0.2],
    build: () => [
      // glass cabinet frame
      box(W, H - 0.32, D, 0, 0.3 + (H - 0.32) / 2, 0),
      // door frames
      box(0.012, H - 0.36, 0.012, 0.18, 0.3 + (H - 0.36) / 2, D / 2),
      box(0.012, H - 0.36, 0.012, W / 2 - 0.12, 0.3 + (H - 0.36) / 2, D / 2),
      // roof lid
      box(W - 0.12, 0.08, D - 0.12, 0, H + 0.04, 0),
    ],
  },
];

const CHAPTER_PART: (PartId | null)[] = [null, 'chassis', 'sensor', 'lift', 'display'];

function useParts(colors: SceneColors) {
  return useMemo(
    () =>
      PARTS.map((def) => {
        const group = new THREE.Group();
        const mat = new THREE.LineBasicMaterial({ color: colors.point.clone(), transparent: true, opacity: 1, toneMapped: false });
        def.build().forEach((g) => {
          const edges = new THREE.EdgesGeometry(g, 25);
          group.add(new THREE.LineSegments(edges, mat));
          g.dispose();
        });
        // faint fill so overlapping parts read as volumes
        return { def, group, mat };
      }),
    [colors],
  );
}

function Floor({ colors }: { colors: SceneColors }) {
  const geo = useMemo(() => {
    const r = rng(5);
    const pos: number[] = [];
    const key: number[] = [];
    const rnd: number[] = [];
    for (let x = -7; x <= 7; x += 0.16)
      for (let z = -7; z <= 7; z += 0.16) {
        const d = Math.hypot(x, z);
        if (d > 7 || r() < 0.15) continue;
        pos.push(x, 0, z);
        key.push(d);
        rnd.push(r());
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('aKey', new THREE.Float32BufferAttribute(key, 1));
    g.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 1));
    return g;
  }, []);
  const mat = useMemo(() => makeScanPointsMaterial(colors, 1.1), [colors]);
  const { gl } = useThree();
  useEffect(() => {
    mat.uniforms.uPix.value = gl.getPixelRatio();
    mat.uniforms.uFog.value = 0.11;
    mat.uniforms.uFront.value = 0.35;
  }, [gl, mat]);
  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uScan.value = (clock.elapsedTime * 1.6) % 9; // a quiet scan pulse under the robot
    mat.uniforms.uGhost.value = 0.35;
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

function Rig(props: SceneProps) {
  const inputs = useSmoothedInputs(props);
  const colors = useSceneColors();
  const parts = useParts(colors);
  const model = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const dim = useMemo(() => colors.wire.clone().multiplyScalar(0.55), [colors]);
  const hi = useMemo(() => colors.glow.clone().multiplyScalar(2.4), [colors]);
  const base = useMemo(() => colors.point.clone().multiplyScalar(1.1), [colors]);
  const tmp = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.filmOffset = size.width / size.height > 1.15 ? -5.5 : 0;
    cam.updateProjectionMatrix();
  }, [camera, size]);

  useFrame(({ clock }) => {
    const p = inputs.current.p;
    const t = clock.elapsedTime;
    const n = CHAPTER_PART.length;
    const explode = smooth(0.1, 0.24, p) * (1 - smooth(0.92, 1, p) * 0.4);
    const chapterF = p * n;

    parts.forEach(({ def, group, mat }) => {
      group.position.set(def.explode[0] * explode, def.explode[1] * explode, def.explode[2] * explode);
      // highlight weight for this part = closeness to the chapter that features it
      const ci = CHAPTER_PART.indexOf(def.id);
      const w = ci < 0 ? 0 : Math.max(0, 1 - Math.abs(chapterF - (ci + 0.5)) * 1.4);
      const anyFocus = chapterF > 0.9 ? 1 : 0;
      tmp.copy(base).lerp(dim, anyFocus * (1 - w) * 0.75).lerp(hi, w);
      mat.color.copy(tmp);
      if (def.id === 'lift') group.position.y += Math.sin(t * 1.2) * 0.04 * w; // the lift breathes when featured
    });

    if (model.current) {
      model.current.rotation.y = -0.65 + t * 0.12 * (1 - explode * 0.7) + p * 1.1 + inputs.current.x * 0.15;
    }
    const dist = lerp(4.4, 6.0, explode);
    camera.position.set(Math.sin(0.35) * dist, lerp(1.6, 2.0, explode) - inputs.current.y * 0.15, Math.cos(0.35) * dist);
    camera.lookAt(0, lerp(0.8, 0.95, explode), 0);
  });

  return (
    <>
      <group ref={model}>
        {parts.map(({ def, group }) => (
          <primitive key={def.id} object={group} />
        ))}
      </group>
      <Floor colors={colors} />
      <ReadySignal onReady={props.onReady} />
    </>
  );
}

export default function PorterScene(props: SceneProps) {
  return (
    <SceneCanvas fogDensity={0.05} bloom={0.75} camera={{ fov: 34, position: [1.6, 1.6, 4.2] }}>
      <Rig {...props} />
    </SceneCanvas>
  );
}

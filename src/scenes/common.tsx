import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PostFX } from './post';
import * as THREE from 'three';
import type { SceneProps } from '@/components/ox/ScrollStory';
import { cssVar } from '@/hooks/useOx';

export interface SceneColors {
  bg: THREE.Color;
  fog: THREE.Color;
  point: THREE.Color;
  glow: THREE.Color;
  wire: THREE.Color;
}

/** Palette for WebGL, read from the same CSS variables as the rest of the site. */
export function useSceneColors(): SceneColors {
  return useMemo(
    () => ({
      bg: new THREE.Color(cssVar('--scene-bg', '#0d0e10')),
      fog: new THREE.Color(cssVar('--scene-fog', '#15171a')),
      point: new THREE.Color(cssVar('--scene-point', '#d9dcde')),
      glow: new THREE.Color(cssVar('--scene-glow', '#ea384c')),
      wire: new THREE.Color(cssVar('--scene-wire', '#8a9096')),
    }),
    [],
  );
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Smoothed scroll progress + pointer, updated once per frame. */
export function useSmoothedInputs({ progress, pointer }: Pick<SceneProps, 'progress' | 'pointer'>) {
  const s = useRef({ p: progress.current, x: 0, y: 0 });
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.0015, Math.min(dt, 0.05)); // frame-rate independent damping
    s.current.p += (progress.current - s.current.p) * k;
    s.current.x += (pointer.current.x - s.current.x) * k * 0.6;
    s.current.y += (pointer.current.y - s.current.y) * k * 0.6;
  });
  return s;
}

/** Camera that blends between waypoints by progress. */
export interface Waypoint {
  at: number; // progress 0..1
  pos: [number, number, number];
  look: [number, number, number];
}

export function useWaypointCamera(waypoints: Waypoint[], inputs: ReturnType<typeof useSmoothedInputs>, parallax = 0.35) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3());
  const tmpA = useRef(new THREE.Vector3());
  const tmpB = useRef(new THREE.Vector3());
  useFrame(() => {
    const p = inputs.current.p;
    let i = 0;
    while (i < waypoints.length - 2 && p > waypoints[i + 1].at) i++;
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const t = smooth(a.at, b.at, p);
    tmpA.current.set(...a.pos).lerp(tmpB.current.set(...b.pos), t);
    camera.position.copy(tmpA.current);
    camera.position.x += inputs.current.x * parallax;
    camera.position.y += -inputs.current.y * parallax * 0.5;
    look.current.set(...a.look).lerp(tmpB.current.set(...b.look), t);
    camera.lookAt(look.current);
  });
}

/** Calls onReady after the first frames have actually rendered (so the poster cross-fade is clean). */
export function ReadySignal({ onReady }: { onReady?: () => void }) {
  const frames = useRef(0);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    frames.current++;
    if (frames.current > 3) {
      done.current = true;
      onReady?.();
    }
  });
  return null;
}

/**
 * Shared canvas: transparent-free dark background, exponential fog, bloom + vignette + a whisper
 * of grain (Oxigen's filmic grade). Rendering pauses when the canvas is off-screen.
 */
export function SceneCanvas({ children, fogDensity = 0.035, bloom = 0.9, camera }: { children: ReactNode; fogDensity?: number; bloom?: number; camera?: { fov?: number; position?: [number, number, number] } }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const colors = useSceneColors();
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false }}
        camera={{ fov: camera?.fov ?? 38, near: 0.1, far: 200, position: camera?.position ?? [0, 6, 18] }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(colors.bg, 1);
          gl.toneMapping = THREE.NeutralToneMapping;
          gl.toneMappingExposure = 1.1;
          scene.fog = new THREE.FogExp2(colors.fog.getHex(), fogDensity);
        }}
      >
        {children}
        <PostFX bloom={bloom} />
      </Canvas>
    </div>
  );
}

/** Seeded RNG so scenes are identical across loads (and match their posters). */
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Additive round-point material with a scan-reveal front: points appear as uScan passes them. */
export function makeScanPointsMaterial(colors: SceneColors, size = 2.2) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
        uScan: { value: 0 },
        uFront: { value: 1.2 },
        uSize: { value: size },
        uTime: { value: 0 },
        uDim: { value: 1 },
        uPoint: { value: colors.point },
        uGlow: { value: colors.glow },
        uPix: { value: 1 },
        uFog: { value: 0.035 },
        uGhost: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute float aKey;   // reveal key (distance / time) compared with uScan
      attribute float aRand;
      uniform float uScan; uniform float uFront; uniform float uSize; uniform float uTime; uniform float uPix; uniform float uGhost;
      varying float vA; varying float vEdge; varying float vDepth;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float d = uScan - aKey;
        vA = max(smoothstep(0.0, 0.25, d), uGhost);
        vEdge = 1.0 - smoothstep(0.0, uFront, abs(d));
        float tw = 0.75 + 0.25 * sin(uTime * 2.0 + aRand * 40.0);
        gl_PointSize = min(uSize * uPix * (1.0 + vEdge * 1.8) * tw * (42.0 / -mvPosition.z), 5.5 * uPix);
        gl_Position = projectionMatrix * mvPosition;
        vDepth = -mvPosition.z;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uPoint; uniform vec3 uGlow; uniform float uDim; uniform float uFog;
      varying float vA; varying float vEdge; varying float vDepth;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        vec3 col = mix(uPoint * 0.55 * uDim, uGlow * 1.6, vEdge * 0.85);
        float a = max(vA * 0.8, vEdge);
        float fogF = exp(-uFog * uFog * vDepth * vDepth); // additive points fade to black, not to fog colour
        gl_FragColor = vec4(col * a * fogF, a * fogF);
      }
    `,
  });
}

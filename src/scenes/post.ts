import { createElement as h } from 'react';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

// Built with createElement in a .ts file on purpose: the dev-only lovable-tagger plugin adds
// data-lov-* props to JSX in .tsx files, which react-three-fiber tries to apply as nested
// properties on postprocessing effects (crash: "Cannot read properties of undefined (reading 'lov')").
export function PostFX({ bloom }: { bloom: number }) {
  return h(EffectComposer, {
    multisampling: 0,
    children: [
      h(Bloom, { key: 'bloom', intensity: bloom, luminanceThreshold: 0.62, luminanceSmoothing: 0.2, mipmapBlur: true, radius: 0.72 }),
      h(Noise, { key: 'noise', opacity: 0.035, premultiply: true }),
      h(Vignette, { key: 'vignette', offset: 0.28, darkness: 0.72 }),
    ],
  });
}

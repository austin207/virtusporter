// Responsive 3:4 WebP portraits generated from the original founder photos (public/team/*).
// The large variant keeps the source resolution, so its true width varies per photo.
const LARGE_WIDTH: Record<string, number> = { austin: 600, azeem: 800, allen: 523, alwin: 800, danush: 450 };

const keyOf = (image: string) => image.replace(/^\//, '').replace(/\.\w+$/, '').toLowerCase();

/** srcSet/sizes props for a founder photo; falls back to the original file for unknown images. */
export function portrait(image: string, sizes: string) {
  const k = keyOf(image);
  const large = LARGE_WIDTH[k];
  if (!large) return { src: image };
  return {
    src: `/team/${k}-400.webp`,
    srcSet: `/team/${k}-400.webp 400w, /team/${k}-800.webp ${large}w`,
    sizes,
  };
}

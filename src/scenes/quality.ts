/** Render quality, set by SceneGate before a scene mounts. Lives outside common.tsx so the
 * gate can set it without pulling three.js into the main bundle. lite = integrated graphics. */
export const sceneQuality: { lite: boolean } = { lite: false };

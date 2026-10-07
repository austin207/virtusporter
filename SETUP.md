<!-- gen-project-docs:start -->
# SETUP - restoring this project

Generated 2026-07-29 by `gen-project-docs.ps1` during a disk cleanup. Everything below is read from this project's own manifest files.

## What was removed

These directories held build output only. **No source file was touched.**

| Directory | Size at deletion |
|---|---|
| `node_modules` | 0.35 GB |
| **Total** | **0.35 GB** |

## Restore

```powershell
cd "C:\Users\austi\OneDrive\Desktop\career\Ventures\VirtusCo\Website\virtusporter"
npm ci
```

Lockfile present (`package-lock.json`; bun.lockb removed 2026-10-07), so this reproduces the **exact** dependency versions that were installed.

## Commands (from `package.json` scripts)

| Script | Runs |
|---|---|
| `npm run dev` | `vite` |
| `npm run build` | `vite build` |
| `npm run build:dev` | `vite build --mode development` |
| `npm run lint` | `eslint .` |
| `npm run preview` | `vite preview` |

## Verify

Run `npm run build` - it should complete without errors.


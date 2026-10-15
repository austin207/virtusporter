"""Render the scroll-story 3D scenes into image sequences for phones and PCs without a usable GPU.

Usage: start the dev server (npm run dev, port 8080), then
    python scripts/capture-frames.py [home service product] [--variant d|m] [--encode-only]

1. Renders lossless PNG masters into .cache/frames-master/<scene>/<variant>/NNN.png (gitignored).
2. Encodes them to AVIF in public/frames/<scene>/<variant>/NNN.avif.
--encode-only skips step 1 (re-encode at a new quality without re-rendering).
FRAME_COUNT must match src/components/ox/ScrollFrames.tsx.
Requires Playwright and Pillow >= 11.2 (AVIF), and Chrome with a hardware GPU.
"""
import io, os, sys, time, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image

BASE = 'http://localhost:8080'
COUNT = int(os.environ.get('FRAMES', 120))
PAGES = {'home': '/', 'service': '/service', 'product': '/product'}
VARIANTS = {  # name: (viewport w, h, device scale, AVIF quality) -> output px = viewport * scale
    'd': (1600, 1000, 1.6, 60),  # 2560 x 1600 (2.5K)
    'm': (360, 720, 3, 56),  # 1080 x 2160 (phone native)
}
ROOT = pathlib.Path(__file__).resolve().parent.parent
MASTER = ROOT / '.cache' / 'frames-master'
OUT = ROOT / 'public' / 'frames'
HIDE = """
header, footer, nav, button, .story-ch, section > .relative.z-10,
section .pointer-events-none[aria-hidden], section .sticky > [aria-hidden], [data-sonner-toaster] { visibility: hidden !important; }
"""

argv = sys.argv[1:]
encode_only = '--encode-only' in argv
argv = [a for a in argv if a != '--encode-only']
variants = list(VARIANTS)
if '--variant' in argv:
    i = argv.index('--variant')
    variants = [argv[i + 1]]
    del argv[i:i + 2]
scenes = argv or list(PAGES)


def render():
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome', headless=True, args=['--enable-gpu', '--ignore-gpu-blocklist'])
        for v in variants:
            w, h, dpr, _ = VARIANTS[v]
            ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=dpr)
            ctx.add_init_script("window.__sceneCapture = { progress: 0 }; try { sessionStorage.setItem('vc-seen', '1') } catch (e) {}")
            for scene in scenes:
                pg = ctx.new_page()
                pg.goto(BASE + PAGES[scene], wait_until='networkidle')
                pg.add_style_tag(content=HIDE)
                # bring the story's pinned stage to the top of the viewport
                pg.evaluate("""() => { const c = document.querySelector('canvas'); const s = c.closest('section');
                    window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY + 2); }""")
                pg.wait_for_selector('canvas')
                time.sleep(3)
                out = MASTER / scene / v
                out.mkdir(parents=True, exist_ok=True)
                for i in range(COUNT):
                    pg.evaluate(f'window.__sceneCapture.progress = {i / (COUNT - 1)}')
                    time.sleep(0.6 if i else 2)  # scenes damp toward the target progress
                    (out / f'{i:03d}.png').write_bytes(pg.screenshot(clip={'x': 0, 'y': 0, 'width': w, 'height': h}))
                print(f'rendered {scene}/{v}', flush=True)
                pg.close()
            ctx.close()
        b.close()


def encode():
    for v in variants:
        q = VARIANTS[v][3]
        for scene in scenes:
            src = MASTER / scene / v
            out = OUT / scene / v
            out.mkdir(parents=True, exist_ok=True)
            for old in out.glob('*'):
                old.unlink()
            total = 0
            for i in range(COUNT):
                f = out / f'{i:03d}.avif'
                Image.open(src / f'{i:03d}.png').convert('RGB').save(f, 'AVIF', quality=q, speed=4)
                total += f.stat().st_size
            print(f'encoded {scene}/{v}: {COUNT} frames, {total / 1024 / 1024:.1f} MB', flush=True)


if not encode_only:
    render()
encode()

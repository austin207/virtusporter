"""Render the scroll-story 3D scenes into image sequences for GPU-less devices and phones.

Usage: start the dev server (npm run dev, port 8080), then
    python scripts/capture-frames.py [home service product] [--variant d|m]
Writes public/frames/<scene>/<variant>/NN.webp (FRAME_COUNT in src/components/ox/ScrollFrames.tsx).
Requires Playwright (pip install playwright pillow) and Chrome with a hardware GPU.
"""
import io, sys, time, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image

BASE = 'http://localhost:8080'
COUNT = int(__import__("os").environ.get("FRAMES", 40))
PAGES = {'home': '/', 'service': '/service', 'product': '/product'}
VARIANTS = {  # name: (viewport w, h, device scale, webp quality)
    'd': (1200, 750, 1, 60),
    'm': (360, 720, 1.5, 62),
}
OUT = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'frames'
HIDE = """
header, footer, nav, button, .story-ch, section > .relative.z-10,
section .pointer-events-none[aria-hidden], section .sticky > [aria-hidden], [data-sonner-toaster] { visibility: hidden !important; }
"""

argv = sys.argv[1:]
variants = list(VARIANTS)
if '--variant' in argv:
    i = argv.index('--variant')
    variants = [argv[i + 1]]
    del argv[i:i + 2]
scenes = argv or list(PAGES)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True, args=['--enable-gpu', '--ignore-gpu-blocklist'])
    for v in variants:
        w, h, dpr, q = VARIANTS[v]
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
            out = OUT / scene / v
            out.mkdir(parents=True, exist_ok=True)
            total = 0
            for i in range(COUNT):
                pg.evaluate(f'window.__sceneCapture.progress = {i / (COUNT - 1)}')
                time.sleep(1.1 if i else 2)  # scenes damp toward the target progress
                png = pg.screenshot(clip={'x': 0, 'y': 0, 'width': w, 'height': h})
                f = out / f'{i:02d}.webp'
                Image.open(io.BytesIO(png)).convert('RGB').save(f, 'WEBP', quality=q, method=6)
                total += f.stat().st_size
            print(f'{scene}/{v}: {COUNT} frames, {total / 1024:.0f} KB')
            pg.close()
        ctx.close()
    b.close()

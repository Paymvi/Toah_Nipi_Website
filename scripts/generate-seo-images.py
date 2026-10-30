"""Generate the SEO and performance image variants used by the site.

Run from the repository root:  python scripts/generate-seo-images.py
Requires Python 3 with Pillow (and fontTools + brotli for the WOFF2 font).
The outputs are committed, so this only needs to run again when a source
image changes or a new preview image is added below.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

# Link-preview images (Open Graph / Twitter), 1200x630 unless the source is
# narrower, in which case the crop keeps the source width (no upscaling).
# focus_y: 0 = keep the top of the photo, 0.5 = centre, 1 = keep the bottom.
SOCIAL_IMAGES = [
    ("camp-background-2.jpg", "social/default.jpg", 0.55),
    ("optimized/Bethel.webp", "social/lodging.jpg", 0.5),
    ("optimized/FamilyCamp-New/Carina_Outside.webp", "social/events.jpg", 0.3),
    ("optimized/Gallery/May-2024-Canoe.webp", "social/gallery.jpg", 0.5),
    ("Blog/Carina_apples.jpg", "social/story-apple-cider-2026.jpg", 0.45),
    ("Blog/Zoey+Raph.png", "social/story-family-camp-2026.jpg", 0.4),
    ("Blog/Ichthus_Trail_Update.png", "social/story-whats-new-around-camp.jpg", 0.45),
]

# Phone-sized hero backgrounds: a square, horizontally centred crop at full
# height. Phone heroes are taller than they are wide, so `background-size:
# cover` scales by height and shows exactly the same part of the photo.
HERO_IMAGES = [
    "camp-background-2.webp",
    "Stairs-Sunset.webp",
    "Dandy-Sunset.webp",
    "Lake-Fall.webp",
    "Winter-Orange.webp",
    "Dothan-Porch.webp",
]

# Oversized images shown much smaller than their pixel size.
RESIZED_IMAGES = [
    # (source, output, max width, format, quality)
    ("toah-nipi-logo-2.png", "optimized/toah-nipi-logo-2.webp", 680, "WEBP", 90),
    ("optimized/Toah-Nipi-Map.webp", "optimized/Toah-Nipi-Map-1000.webp", 1000, "WEBP", 78),
    ("optimized/SnowBridge.webp", "optimized/SnowBridge-1600.webp", 1600, "WEBP", 68),
]


def crop_to_ratio(image, ratio, focus_y):
    width, height = image.size

    if width / height > ratio:
        new_width = round(height * ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))

    new_height = round(width / ratio)
    top = round((height - new_height) * focus_y)
    return image.crop((0, top, width, top + new_height))


def make_social(source, output, focus_y):
    image = Image.open(PUBLIC / source).convert("RGB")
    image = crop_to_ratio(image, 1200 / 630, focus_y)

    if image.width > 1200:
        image = image.resize((1200, 630), Image.LANCZOS)

    target = PUBLIC / output
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "JPEG", quality=80, optimize=True, progressive=True)
    return image.size


def make_mobile_hero(name):
    image = Image.open(PUBLIC / "optimized" / name).convert("RGB")
    image = crop_to_ratio(image, 1, 0.5)

    if image.width > 1200:
        image = image.resize((1200, 1200), Image.LANCZOS)

    target = PUBLIC / "optimized" / "mobile" / name
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "WEBP", quality=70, method=6)
    return image.size


def make_resized(source, output, max_width, fmt, quality):
    image = Image.open(PUBLIC / source)

    if fmt != "WEBP" or image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGBA" if "A" in image.mode else "RGB")

    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.LANCZOS)

    target = PUBLIC / output
    image.save(target, fmt, quality=quality, method=6)
    return image.size


def make_icons():
    logo = Image.open(PUBLIC / "optimized" / "Secondary-Logo-3-256.png").convert("RGBA")
    logo.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # iOS shows transparent icon areas as black, so use a white tile.
    tile = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
    inner = logo.resize((152, 152), Image.LANCZOS)
    tile.alpha_composite(inner, (14, 14))
    tile.convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)


def make_woff2():
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        print("skip font: fontTools not installed")
        return

    font = TTFont(PUBLIC / "fonts" / "CooperLtBT-Regular.ttf")
    font.flavor = "woff2"
    font.save(PUBLIC / "fonts" / "CooperLtBT-Regular.woff2")


if __name__ == "__main__":
    for source, output, focus_y in SOCIAL_IMAGES:
        print("social", output, make_social(source, output, focus_y))

    for name in HERO_IMAGES:
        print("hero", name, make_mobile_hero(name))

    for args in RESIZED_IMAGES:
        print("resized", args[1], make_resized(*args))

    make_icons()
    print("icons favicon.ico apple-touch-icon.png")

    make_woff2()
    print("font CooperLtBT-Regular.woff2")

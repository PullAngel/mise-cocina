from pathlib import Path
from PIL import Image, ImageDraw

destination = Path("public/icons")
destination.mkdir(parents=True, exist_ok=True)

for size, name in (
    (192, "icon-192.png"),
    (512, "icon-512.png"),
    (512, "icon-maskable-512.png"),
):
    image = Image.new("RGB", (size, size), "#151715")
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=size // 5, fill="#151715")
    draw.polygon(
        [
            (size * 0.52, size * 0.14),
            (size * 0.35, size * 0.47),
            (size * 0.43, size * 0.78),
            (size * 0.61, size * 0.86),
            (size * 0.72, size * 0.65),
            (size * 0.65, size * 0.41),
        ],
        fill="#ff6534",
    )
    image.save(destination / name)

android_res = Path("android/app/src/main/res")
densities = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
for density, size in densities.items():
    folder = android_res / f"mipmap-{density}"
    folder.mkdir(parents=True, exist_ok=True)
    base = Image.new("RGBA", (size, size), "#151715")
    base_draw = ImageDraw.Draw(base)
    base_draw.polygon(
        [(size * .52, size * .14), (size * .35, size * .47), (size * .43, size * .78),
         (size * .61, size * .86), (size * .72, size * .65), (size * .65, size * .41)],
        fill="#ff6534",
    )
    base.save(folder / "ic_launcher.png")

    rounded = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    rounded_draw = ImageDraw.Draw(rounded)
    rounded_draw.ellipse((0, 0, size - 1, size - 1), fill="#151715")
    rounded_draw.polygon(
        [(size * .52, size * .14), (size * .35, size * .47), (size * .43, size * .78),
         (size * .61, size * .86), (size * .72, size * .65), (size * .65, size * .41)],
        fill="#ff6534",
    )
    rounded.save(folder / "ic_launcher_round.png")

    foreground = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    foreground_draw = ImageDraw.Draw(foreground)
    foreground_draw.polygon(
        [(size * .52, size * .12), (size * .31, size * .46), (size * .40, size * .81),
         (size * .61, size * .90), (size * .77, size * .66), (size * .67, size * .37)],
        fill="#ff6534",
    )
    foreground.save(folder / "ic_launcher_foreground.png")

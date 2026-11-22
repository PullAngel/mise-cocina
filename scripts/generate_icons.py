"""Genera todos los iconos de Mise desde una sola forma.

Uso: python scripts/generate_icons.py   (requiere Pillow)

La marca es una tabla de picar irregular de bordes afilados: cinco vértices.
Cambiar MARK aquí cambia el logo en la web, la PWA, el icono de Android (normal,
redondo, adaptativo y monocromo), la notificación y el splash. El header de la
app usa el mismo polígono en CSS (`.brand i`, clip-path); el script imprime los
porcentajes al terminar para actualizarlo si se cambia MARK.

Los iconos con forma propia (web, PWA "any", Android normal y redondo) llevan un
borde oscuro del mismo estilo que los botones de la app. Los adaptativos,
maskable y apple-touch no: el sistema les aplica su propia máscara.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
CREAM = "#f7edcf"   # fondo de las recetas (--pulp-ivory)
NAVY = "#17242a"    # --pulp-navy, variante oscura
INK = "#111719"     # --pulp-shadow, borde de los botones
EMBER = "#ff6534"

# Vértices en una caja de 76.9 x 144. Arriba, derecha, abajo, abajo-izquierda,
# izquierda. El lado derecho (arriba -> derecha) está 5° más vertical que el
# lado izquierdo (izquierda -> abajo-izquierda).
MARK = [(61, 0), (76.9, 100), (56, 144), (16, 128), (0, 64)]
MARK_W, MARK_H = 76.9, 144

BORDER = 5 / 96     # grosor del borde respecto al lado del icono
SUPERSAMPLE = 8


def place(size, frac):
    """Vértices de la marca centrados en un lienzo cuadrado; alto = frac * size."""
    scale = size * frac / MARK_H
    ox = (size - MARK_W * scale) / 2
    oy = (size - MARK_H * scale) / 2
    return [(ox + x * scale, oy + y * scale) for x, y in MARK]


def fmt(points, digits=2):
    return " ".join(f"{x:.{digits}f},{y:.{digits}f}" for x, y in points)


def render(width, height, frac, shape, border=False, background=CREAM, mark_color=EMBER):
    """PNG con la marca centrada; alto de la marca = frac * lado corto.

    shape: square | rounded | circle | none.
    """
    big_w, big_h = width * SUPERSAMPLE, height * SUPERSAMPLE
    short = min(big_w, big_h)
    image = Image.new("RGBA", (big_w, big_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    stroke = round(short * BORDER) if border else 0
    radius = short // 4

    def shape_box(inset, fill, r):
        box = (inset, inset, big_w - 1 - inset, big_h - 1 - inset)
        if shape == "rounded":
            draw.rounded_rectangle(box, radius=max(0, r), fill=fill)
        elif shape == "circle":
            draw.ellipse(box, fill=fill)
        elif shape == "square":
            draw.rectangle(box, fill=fill)

    if stroke:
        shape_box(0, INK, radius)
        shape_box(stroke, background, radius - stroke)
    else:
        shape_box(0, background, radius)
    scale = short * frac / MARK_H
    ox = (big_w - MARK_W * scale) / 2
    oy = (big_h - MARK_H * scale) / 2
    draw.polygon([(ox + x * scale, oy + y * scale) for x, y in MARK], fill=mark_color)
    return image.resize((width, height), Image.LANCZOS)


def save(image, path, flatten=False, base_color=CREAM):
    path.parent.mkdir(parents=True, exist_ok=True)
    if flatten:
        base = Image.new("RGB", image.size, base_color)
        base.paste(image, mask=image.split()[3])
        image = base
    image.save(path)


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def logo_svg(background=CREAM, border=True):
    points = fmt(place(96, 0.72))
    if border:
        inset = 96 * BORDER / 2
        rect = (f'  <rect x="{inset:.2f}" y="{inset:.2f}" width="{96 - 2 * inset:.2f}" height="{96 - 2 * inset:.2f}" '
                f'rx="{24 - inset:.2f}" fill="{background}" stroke="{INK}" stroke-width="{96 * BORDER:.2f}"/>\n')
    else:
        rect = f'  <rect width="96" height="96" rx="24" fill="{background}"/>\n'
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-labelledby="title desc">\n'
        '  <title id="title">Mise Cocina</title>\n'
        '  <desc id="desc">Una tabla de picar irregular naranja, de bordes afilados.</desc>\n'
        f"{rect}"
        f'  <polygon points="{points}" fill="{EMBER}"/>\n'
        "</svg>\n"
    )


def mark_svg():
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {MARK_W:g} {MARK_H}" role="img" aria-labelledby="title">\n'
        '  <title id="title">Mise Cocina</title>\n'
        f'  <polygon points="{fmt(MARK, 1)}" fill="{EMBER}"/>\n'
        "</svg>\n"
    )


def vector_xml(size_dp, frac, color):
    pts = place(size_dp, frac)
    path = "M" + " L".join(f"{x:.2f},{y:.2f}" for x, y in pts) + " Z"
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<vector xmlns:android="http://schemas.android.com/apk/res/android"\n'
        f'    android:width="{size_dp}dp"\n'
        f'    android:height="{size_dp}dp"\n'
        f'    android:viewportWidth="{size_dp}"\n'
        f'    android:viewportHeight="{size_dp}">\n'
        "    <path\n"
        f'        android:fillColor="{color}"\n'
        f'        android:pathData="{path}" />\n'
        "</vector>\n"
    )


def main():
    # Vectores y fuentes de marca.
    write(ROOT / "website/assets/logo.svg", logo_svg())
    write(ROOT / "public/favicon.svg", logo_svg())
    write(ROOT / "design/brand/mise-mark.svg", mark_svg())
    write(ROOT / "design/brand/mise-icon.svg", logo_svg())
    write(ROOT / "design/brand/mise-icon-oscuro.svg", logo_svg(NAVY, border=False))

    # PWA: "any" con borde, maskable y apple-touch a sangre.
    icons = ROOT / "public/icons"
    save(render(192, 192, 0.72, "rounded", border=True), icons / "icon-192.png")
    save(render(512, 512, 0.72, "rounded", border=True), icons / "icon-512.png")
    save(render(512, 512, 0.70, "square"), icons / "icon-maskable-512.png", flatten=True)
    save(render(180, 180, 0.70, "square"), icons / "apple-touch-icon.png", flatten=True)

    # Android.
    res = ROOT / "android/app/src/main/res"
    legacy = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
    for density, size in legacy.items():
        folder = res / f"mipmap-{density}"
        save(render(size, size, 0.72, "rounded", border=True), folder / "ic_launcher.png")
        save(render(size, size, 0.66, "circle", border=True), folder / "ic_launcher_round.png")
        adaptive = round(size * 108 / 48)
        save(render(adaptive, adaptive, 0.62, "none"), folder / "ic_launcher_foreground.png")

    write(res / "values/ic_launcher_background.xml",
          '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
          f'    <color name="ic_launcher_background">{CREAM}</color>\n</resources>\n')
    write(res / "drawable/ic_stat_mise.xml", vector_xml(24, 0.86, "#FFFFFFFF"))
    write(res / "drawable/ic_launcher_monochrome.xml", vector_xml(108, 0.62, "#FFFFFFFF"))
    adaptive_xml = (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
        '    <background android:drawable="@color/ic_launcher_background"/>\n'
        '    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n'
        '    <monochrome android:drawable="@drawable/ic_launcher_monochrome"/>\n'
        "</adaptive-icon>\n"
    )
    write(res / "mipmap-anydpi-v26/ic_launcher.xml", adaptive_xml)
    write(res / "mipmap-anydpi-v26/ic_launcher_round.xml", adaptive_xml)

    # Splash: se conserva el tamaño de cada archivo existente.
    for splash in sorted(res.glob("drawable*/splash.png")):
        width, height = Image.open(splash).size
        save(render(width, height, 0.22, "square"), splash, flatten=True)

    # Porcentajes para el clip-path del header (.brand i).
    pct = ", ".join(f"{x / MARK_W * 100:.2f}% {y / MARK_H * 100:.2f}%" for x, y in MARK)
    print(f"clip-path: polygon({pct});  aspecto {MARK_W / MARK_H:.4f}")


if __name__ == "__main__":
    main()

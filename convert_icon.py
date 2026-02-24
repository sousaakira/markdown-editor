#!/usr/bin/env python3
"""Converte icon.svg para PNG em múltiplos tamanhos (Linux .deb precisa disso)."""
import subprocess
from pathlib import Path

base_dir = Path(__file__).parent
icon_svg = base_dir / 'assets' / 'icons' / 'icon.svg'
assets_icons = base_dir / 'assets' / 'icons'
build_icons = base_dir / 'build' / 'icons'

SIZES = [16, 32, 48, 64, 128, 256, 512]

assets_icons.mkdir(parents=True, exist_ok=True)
build_icons.mkdir(parents=True, exist_ok=True)

if not icon_svg.exists():
    print(f"❌ SVG não encontrado: {icon_svg}")
    exit(1)

try:
    # 512x512 para assets (app runtime) e build
    for out_dir, name in [(assets_icons, 'icon.png'), (build_icons, '512x512.png')]:
        subprocess.run([
            'convert', '-background', 'none', str(icon_svg),
            '-gravity', 'center', '-extent', '512x512',
            str(out_dir / name)
        ], check=True, capture_output=True)

    # Múltiplos tamanhos para Linux .deb (evita ícone 0x0 quebrado)
    for size in SIZES:
        if size == 512:
            continue
        subprocess.run([
            'convert', '-background', 'none', str(icon_svg),
            '-gravity', 'center', '-extent', f'{size}x{size}',
            str(build_icons / f'{size}x{size}.png')
        ], check=True, capture_output=True)

    print(f"✅ Ícones: {assets_icons / 'icon.png'} + build/icons/ (16..512)")
except subprocess.CalledProcessError as e:
    print(f"❌ Erro: {e.stderr.decode()}")
    exit(1)

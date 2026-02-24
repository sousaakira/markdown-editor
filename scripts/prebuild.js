#!/usr/bin/env node
/** Prebuild: gera ícones se build/icons não existir. Cross-platform. */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const iconsDir = path.join(__dirname, '..', 'build', 'icons')
const iconsExist = fs.existsSync(path.join(iconsDir, '512x512.png'))

if (iconsExist) {
  process.exit(0)
}

try {
  execSync('python3 convert_icon.py', { stdio: 'ignore', cwd: path.join(__dirname, '..') })
} catch {
  /* ícones já commitados; falha silenciosa no CI sem ImageMagick */
}

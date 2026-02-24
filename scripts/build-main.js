#!/usr/bin/env node
/** Build main: copia src/main para dist. Cross-platform. */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const src = path.join(root, 'src', 'main')
const dest = path.join(root, 'dist', 'main')

fs.mkdirSync(path.join(root, 'dist'), { recursive: true })
fs.cpSync(src, dest, { recursive: true })

// scripts/bundle-offline.js
import { cpSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'

const ROOT    = resolve(import.meta.dirname, '..')
const DIST    = resolve(ROOT, 'dist')
const OUT_DIR = resolve(ROOT, 'dist-offline', 'Courts-of-Prythian')
const ZIP     = resolve(ROOT, 'Courts-of-Prythian-Gift.zip')

// Clean and copy dist → dist-offline/Courts-of-Prythian/
rmSync(resolve(ROOT, 'dist-offline'), { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })
cpSync(DIST, OUT_DIR, { recursive: true })

// Create an opener redirect file at the root of the zip
writeFileSync(
  resolve(ROOT, 'dist-offline', 'Open Your Gift.html'),
  `<!doctype html><meta http-equiv="refresh" content="0;url=Courts-of-Prythian/index.html">`
)

// Zip the dist-offline folder
execSync(`cd "${ROOT}/dist-offline" && zip -r "${ZIP}" .`, { stdio: 'inherit' })

console.log(`\n✦ Gift bundle ready: Courts-of-Prythian-Gift.zip\n`)

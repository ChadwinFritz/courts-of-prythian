// scripts/bundle-offline.js
import { cpSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { execSync } from 'child_process'
import { resolve } from 'path'

const ROOT          = resolve(import.meta.dirname, '..')
const OFFLINE_BUILD = resolve(ROOT, 'dist-offline-build')
const OUT_DIR       = resolve(ROOT, 'dist-offline', 'Courts-of-Prythian')
const ZIP           = resolve(ROOT, 'Courts-of-Prythian-Gift.zip')

// Step 1: Build with relative paths for offline use
console.log('\n✦ Building offline bundle with relative asset paths…\n')
execSync(`VITE_OFFLINE=1 npx vite build --outDir dist-offline-build`, { stdio: 'inherit', cwd: ROOT })

// Step 2: Clean output dir and copy offline build into zip structure
rmSync(resolve(ROOT, 'dist-offline'), { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })
cpSync(OFFLINE_BUILD, OUT_DIR, { recursive: true })

// Create an opener redirect file at the root of the zip
writeFileSync(
  resolve(ROOT, 'dist-offline', 'Open Your Gift.html'),
  `<!doctype html><meta http-equiv="refresh" content="0;url=Courts-of-Prythian/index.html">`
)

// Step 3: Zip the dist-offline folder
execSync(`cd "${ROOT}/dist-offline" && zip -r "${ZIP}" .`, { stdio: 'inherit' })

// Step 4: Clean up the temporary offline build directory
rmSync(OFFLINE_BUILD, { recursive: true, force: true })

console.log(`\n✦ Gift bundle ready: Courts-of-Prythian-Gift.zip\n`)

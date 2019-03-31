import fs from 'fs'
import path from 'path'
import terser from 'terser'
import pako from 'pako'
import fileSize from 'filesize'
import parseModules from './parseModules'

const START_TOKEN = '<!-- START GENERATED FROM FILES -->'
const END_TOKEN = '<!-- END GENERATED FROM FILES -->'

// Parse the module documentations
let modules = parseModules().sort((a, b) => a.name.localeCompare(b.name))

// Generate the minified size of each module
modules = modules.map((module) => {
  const moduleBuildPath = path.join(__dirname, `../build/${module.name}.js`)
  const moduleContent = fs.readFileSync(moduleBuildPath, 'utf-8')
  const moduleContentMin = terser.minify(moduleContent).code || ''
  const moduleContentMinZip = pako.deflate(moduleContentMin)

  const moduleMinSize = fileSize(moduleContentMin.length)
  const moduleMinZipSize = fileSize(moduleContentMinZip.length)

  // Insert the subtext
  const subText = [
    `[Source](./src/${module.name}/index.ts)`,
    `Minify: ${moduleMinSize}`,
    `Minify & GZIP: ${moduleMinZipSize}`
  ]

  module.docs += `\n<sup>${subText.join(' • ')}<sup>\n`
  return module
})

// Replace the documentation for the individual modules in the readme
let README = fs.readFileSync('./README.md', 'utf-8')
README = README.replace(
  new RegExp(`${START_TOKEN}.*${END_TOKEN}`, 's'),
  [START_TOKEN, modules.map((x) => x.docs).join('\n'), END_TOKEN].join('\n')
)

fs.writeFileSync('./README.md', README, 'utf-8')

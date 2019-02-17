import fs from 'fs'
import parseModules from './parseModules'

const START_TOKEN = '<!-- START GENERATED FROM FILES -->'
const END_TOKEN = '<!-- END GENERATED FROM FILES -->'

// Parse the module documentations
const modules = parseModules().sort((a, b) => a.name.localeCompare(b.name))

// Replace the documentation for the individual modules in the readme
let README = fs.readFileSync('./README.md', 'utf-8')
README = README.replace(
  new RegExp(`${START_TOKEN}.*${END_TOKEN}`, 's'),
  [START_TOKEN, modules.map((x) => x.docs).join('\n'), END_TOKEN].join('\n')
)

fs.writeFileSync('./README.md', README, 'utf-8')

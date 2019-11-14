const { sh: _sh, cli } = require('tasksfile')
const glob = require('glob')

function log(string) {
  process.stdout.write(`\x1b[34m=> ${string}\x1b[0m\n`)
}

function sh(command, options = {}) {
  return _sh(command, { nopipe: true, ...options })
}

function build() {
  log('Cleaning up previous build')
  sh('rm -rf build/')
  sh('mkdir build/')

  log('Compiling TypeScript')
  sh('tsc')

  log('Copying JavaScript and definition file output')
  const folders = glob
    .sync(`src/*/`)
    .map((file) => file.replace(/^src\/(.*)\/$/, '$1'))
  log(`  ${folders.length} folders found`)

  sh(`cp src/index.js build/index.js`)
  sh(`cp src/index.d.ts build/index.d.ts`)
  for (const folder of folders) {
    sh(`cp src/${folder}/index.js build/${folder}.js`)
    sh(`cp src/${folder}/index.d.ts build/${folder}.d.ts`)
  }

  log('Removing temporary build artifacts')
  sh(`rm -f src/*.js`)
  sh(`rm -f src/*.d.ts`)
  sh(`rm -f src/*/*.js`)
  sh(`rm -f src/*/*.d.ts`)
  sh(`rm -f src/*.spec.js`)
  sh(`rm -f src/*.spec.d.ts`)

  log('Copying meta files')
  sh(`cp package.json build/package.json`)
  sh(`cp README.md build/README.md`)
}

cli({
  build
})

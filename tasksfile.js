const { sh, cli } = require('tasksfile')
const glob = require('glob')
const path = require('path')
const fs = require('fs')

function log(string) {
  process.stdout.write(`\x1b[34m=> ${string}\x1b[0m\n`)
}

function build() {
  log('Cleaning up previous build')
  sh('rm -rf tscBuild/')
  sh('rm -rf build/')
  sh('mkdir build/')
  sh('mkdir build/es6/')
  sh('rm -f tmp.js')

  log('Compiling TypeScript to CommonJS')
  sh('tsc')
  copyTypescriptOutputToBuild('build')

  log('Compiling TypeScript to ES6')
  sh('tsc -m es6')
  copyTypescriptOutputToBuild('build/es6')

  {
    log('Post-processing CommonJS export statements')
    const files = glob.sync(`build/*.js`)
    files.map((file) => {
      const fileName = path.basename(file, path.extname(file))
      if (fileName === 'index') return

      let content = fs.readFileSync(file, 'utf-8')
      content = content.replace(
        `exports.${fileName} = ${fileName};`,
        `${fileName}.${fileName} = ${fileName};`
      )
      content = content.replace(
        `exports.default = ${fileName};`,
        `${fileName}.default = ${fileName};`
      )
      content += `module.exports = ${fileName};\n`

      fs.writeFileSync(file, content, 'utf-8')
    })
  }

  {
    log('Post-processing ES6 export statements')
    // We are disallowing a full import of index because that creates bundles
    // that are not tree shakable.
    let content = fs.readFileSync(`build/es6/index.js`, 'utf-8')
    content = content.replace(/export default .*;\n/s, '')
    fs.writeFileSync(`build/es6/index.js`, content, 'utf-8')
  }

  {
    log('Post-processing TypeScript export statements')
    // We are disallowing a full import of index because that creates bundles
    // that are not tree shakable.
    const files = ['build/index.d.ts', 'build/es6/index.d.ts']
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf-8')
      content = content.replace(/declare const _default.*;\n/s, '')
      fs.writeFileSync(file, content, 'utf-8')
    }
  }

  log('Removing temporary build folder')
  sh('rm -rf tscBuild/')

  log('Copying meta files')
  sh(`cp package.json build/package.json`)
  sh(`cp README.md build/README.md`)

  log('Build finished, running post build tests')
  postBuildTest()
}

function copyTypescriptOutputToBuild(target) {
  log('Copying JavaScript and definition file output')
  const folders = glob
    .sync(`tscBuild/*/`)
    .map((file) => file.replace(/^tscBuild\/(.*)\/$/, '$1'))
  log(`  ${folders.length} folders found`)

  sh(`cp tscBuild/index.js ${target}/index.js`)
  sh(`cp tscBuild/index.d.ts ${target}/index.d.ts`)
  for (const folder of folders) {
    sh(`cp tscBuild/${folder}/index.js ${target}/${folder}.js`)
    sh(`cp tscBuild/${folder}/index.d.ts ${target}/${folder}.d.ts`)
  }
}

function postBuildTest() {
  log('Running tests for CommonJS imports')
  const testCommonJs = (name) => {
    const output = sh(`node post-build-tests/commonjs/${name}.js`)
    if (output.includes('FAIL')) process.exit(1)
  }
  testCommonJs('full')
  testCommonJs('full-named')
  testCommonJs('partial')
  testCommonJs('partial-named')

  log('Running tests for ES6 imports')
  const testEs6 = (name) => {
    const output = sh(
      `rollup post-build-tests/es6/${name}.js --format cjs --file tmp.js; node tmp.js`
    )
    sh('rm -f tmp.js')
    if (output.includes('FAIL')) process.exit(1)
  }
  testEs6('full-named')
  testEs6('full-wildcard')
  testEs6('partial')
  testEs6('partial-named')

  log('Running tests for TypeScript imports')
  const testTypeScript = (name) => {
    const output = sh(`ts-node post-build-tests/typescript/${name}.ts`)
    if (output.includes('FAIL')) process.exit(1)
  }
  testTypeScript('full-named')
  testTypeScript('full-wildcard')
  testTypeScript('partial')
  testTypeScript('partial-named')
}

cli({
  build,
  postBuildTest
})

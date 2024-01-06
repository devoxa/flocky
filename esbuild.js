const { build } = require('esbuild')
const fastGlob = require('fast-glob')

// Output the commonjs file
build({
  entryPoints: ['./src/index.ts'],
  outfile: 'dist/index.js',
  format: 'cjs',
  bundle: true,
  sourcemap: true,
  target: 'node20.9',
}).catch(() => process.exit(1))

// Output the es modules files
build({
  entryPoints: fastGlob.sync('./src/**/*.ts'),
  outdir: 'dist/esm',
  format: 'esm',
  sourcemap: true,
  target: 'chrome90',
}).catch(() => process.exit(1))

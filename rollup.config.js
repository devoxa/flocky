import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
      // Do not concatenate modules together so bundlers consuming the library
      // can consistently drop entire modules ("tree-shaking") if they are unused.
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
}

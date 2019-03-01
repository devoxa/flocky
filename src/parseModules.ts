import fs from 'fs'
import path from 'path'
import glob from 'glob'

const EXAMPLE_REGEX = /```js\n(.*?)\n```/s

interface ModuleFile {
  path: string
  name: string
  docs: string
  examples: Array<Example>
}

interface Example {
  code: string
  expected: any
}

export = function parseModules(): Array<ModuleFile> {
  return getModulePaths()
    .map(parseModule)
    .filter((x): x is ModuleFile => Boolean(x))
}

function getModulePaths() {
  return glob
    .sync(path.join(__dirname, '../src/*/*.ts'))
    .filter((file) => !file.endsWith('.spec.ts'))
}

function parseModule(path: string): ModuleFile | false {
  const name = parseModuleName(path)
  const docs = parseModuleDocs(path)
  const examples = parseExamples(path, docs)

  return { path, name, docs, examples }
}

function parseModuleName(path: string): string {
  return path.replace(/^.*\/(.*)\/index\.ts$/, '$1')
}

function parseModuleDocs(path: string): string {
  const fileContent = fs.readFileSync(path, 'utf-8')

  // istanbul ignore next
  if (!fileContent.includes('/**')) {
    console.log(`[FAIL] The module at path '${path}' has no JSDoc`)
    return process.exit(1)
  }

  return fileContent
    .split('\n')
    .filter((line) => line.startsWith(' *'))
    .map((line) => line.replace(/^ \*[ \/]?/, ''))
    .join('\n')
}

function parseExamples(path: string, docs: string): Array<Example> {
  let exampleMatch = docs.match(EXAMPLE_REGEX)

  // istanbul ignore next
  if (!exampleMatch) {
    console.log(`[FAIL] The module at path '${path}' has no examples`)
    return process.exit(1)
  }

  return exampleMatch[1].split('\n\n').map(parseExample)
}

function parseExample(example: string): Example {
  // Get the code (the parts without "// -> " at the start)
  const code = example
    .split('\n')
    .filter((x) => !x.startsWith('// -> '))
    .map((x) => x.replace('async ', ''))
    .join('\n')

  // Get the expected output (the parts with "// -> " at the start)
  const expected = example
    .split('\n')
    .filter((x) => x.startsWith('// -> '))
    .map((x) => x.replace('// -> ', ''))
    .join('\n')

  return {
    code,
    expected: expected === 'undefined' ? undefined : JSON.parse(expected)
  }
}

import fs from 'fs'
import glob from 'glob'
import path from 'path'

const EXAMPLE_REGEX = /```js\n(.*?)\n```/s

interface ModuleFile {
  filePath: string
  name: string
  docs: string
  examples: Array<Example>
}

interface Example {
  code: string
  expected: any
}

export function parseModules(): Array<ModuleFile> {
  return getModulePaths()
    .map(parseModule)
    .filter((x): x is ModuleFile => Boolean(x))
}

function getModulePaths() {
  return glob.sync(path.join(__dirname, '../src/*/index.ts'))
}

function parseModule(filePath: string): ModuleFile | false {
  const name = parseModuleName(filePath)
  const docs = parseModuleDocs(filePath, name)
  const examples = parseExamples(filePath, docs)

  return { filePath, name, docs, examples }
}

function parseModuleName(filePath: string): string {
  return filePath.replace(/^.*\/(.*)\/index\.ts$/, '$1')
}

function parseModuleDocs(filePath: string, name: string): string {
  let fileContent = fs.readFileSync(filePath, 'utf-8')

  // istanbul ignore next
  if (!fileContent.includes('/**')) {
    console.log(`[FAIL] The module at path '${filePath}' has no JSDoc`)
    return process.exit(1)
  }

  // Parse the initial comment as the documentation
  return fileContent
    .split('\n')
    .filter((line) => line.startsWith(' *'))
    .map((line) => line.replace(/^ \*[ \/]?/, ''))
    .join('\n')
}

function parseExamples(filePath: string, docs: string): Array<Example> {
  let exampleMatch = docs.match(EXAMPLE_REGEX)

  // istanbul ignore next
  if (!exampleMatch) {
    console.log(`[FAIL] The module at path '${filePath}' has no examples`)
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
    expected: expected === 'undefined' ? undefined : eval(`(${expected})`)
  }
}

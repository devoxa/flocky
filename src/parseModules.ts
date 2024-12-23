import glob from 'fast-glob'
import fs from 'fs'
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
  expected: unknown
}

export function parseModules(): Array<ModuleFile> {
  return getModulePaths()
    .map(parseModule)
    .filter((x): x is ModuleFile => Boolean(x))
}

function getModulePaths(): Array<string> {
  const paths = glob.sync(path.join(__dirname, '../src/*/*.ts'))
  return paths.filter((path) => path.match(/src\/(.*?)\/\1.ts/))
}

function parseModule(filePath: string): ModuleFile | false {
  const name = parseModuleName(filePath)
  const docs = parseModuleDocs(filePath)
  const examples = parseModuleExamples(filePath, docs)

  return { filePath, name, docs, examples }
}

function parseModuleName(filePath: string): string {
  return filePath.replace(/^.*\/src\/(.*?)\/\1.ts$/, '$1')
}

function parseModuleDocs(filePath: string): string {
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  if (!fileContent.includes('/**')) {
    throw new Error(`The module at path '${filePath}' has no JSDoc`)
  }

  // Parse the initial JSDoc comment as the documentation
  return fileContent
    .split('\n')
    .filter((line) => line.startsWith(' *'))
    .map((line) => line.replace(/^ \*[ /]?/, ''))
    .join('\n')
}

function parseModuleExamples(filePath: string, docs: string): Array<Example> {
  const exampleMatch = docs.match(EXAMPLE_REGEX)

  if (!exampleMatch) {
    throw new Error(`The module at path '${filePath}' has no examples`)
  }

  return exampleMatch[1].split('\n\n').map(parseModuleExample)
}

function parseModuleExample(example: string): Example {
  // Get the code (the parts without "// -> " at the start)
  const code = example
    .split('\n')
    .filter((x) => !x.startsWith('// -> '))
    .map((x) => x.replace('await ', ''))
    .join('\n')

  // Get the expected output (the parts with "// -> " at the start)
  const expected = example
    .split('\n')
    .filter((x) => x.startsWith('// -> '))
    .map((x) => x.replace('// -> ', ''))
    .join('\n')

  return {
    code,
    expected: expected === '' || expected === 'undefined' ? undefined : eval(`(${expected})`),
  }
}

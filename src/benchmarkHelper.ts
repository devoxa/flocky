import { Event, Suite } from 'benchmark'
import fs from 'fs'
import path from 'path'
import { max } from './max/max'
import { unique } from './unique/unique'

interface BenchmarkSample {
  library: string
  input: string
  func: () => void
}

interface BenchmarkResult {
  library: string
  input: string
  opsPerSec: number
}

export class Benchmark {
  private readonly name: string
  private suite: Suite
  private results: Array<BenchmarkResult>

  constructor(name: string) {
    this.name = name
    this.suite = new Suite()
    this.results = []
  }

  add(options: BenchmarkSample) {
    this.suite.add(options.library + ' | ' + options.input, options.func)
  }

  run() {
    this.suite.on('cycle', (event: Event) => this.addResult(event))
    this.suite.on('complete', () => this.writeResults())
    this.suite.run({ async: true })
  }

  // Parse the string output of BenchmarkJS because that seems easier than trying
  // to understand their API and doing all the calculations ourselves...
  addResult(event: Event) {
    const eventString = String(event.target)

    const [name, runtimeInfo] = eventString.split(' x ')
    const [library, input] = name.split(' | ')

    let [opsPerSec] = runtimeInfo.split(' ops/sec')
    opsPerSec = opsPerSec.replace(/,/g, '')

    this.results.push({
      library,
      input,
      opsPerSec: parseInt(opsPerSec, 10),
    })
  }

  writeResults(): void {
    // TODO: Add system information at the bottom

    const content = [
      `### Benchmark for \`${this.name}\``,
      '',
      `[Source for this benchmark](./${this.name}.benchmark.ts)`,
      '',
      this.generateResultTable(),
      '',
      [
        '<sup>',
        'Generated at ' + new Date().toISOString().replace(/T.*$/, ''),
        ' with Node.JS ' + process.version,
        '</sup>',
      ].join(''),
    ].join('\n')

    fs.writeFileSync(path.join(__dirname, `./${this.name}/BENCHMARK.md`), content, 'utf-8')
  }

  generateResultTable(): string {
    const table: Array<string> = []
    const inputs = unique(this.results.map((x) => x.input))
    const libraries = unique(this.results.map((x) => x.library))

    // Generate the header (libraries from left to right)
    table.push(`|     | ${libraries.join(' | ')} |`)
    table.push(`| --- | ${libraries.map(() => '---').join(' | ')} |`)

    // Generate the table content (inputs from top to bottom)
    inputs.forEach((input) => {
      const inputResults = this.results.filter((x) => x.input === input)
      const bestResult = max(inputResults.map((x) => x.opsPerSec))

      const formattedInputResults = inputResults.map((result) => {
        const percent = (result.opsPerSec / bestResult) * 100
        const formattedOps = result.opsPerSec.toLocaleString()

        return result.opsPerSec === bestResult
          ? `**${formattedOps} ops/sec (100.00%)**`
          : `${formattedOps} ops/sec (${percent.toFixed(2)}%)`
      })

      table.push(`| ${input} | ${formattedInputResults.join(' | ')} |`)
    })

    return table.join('\n')
  }
}

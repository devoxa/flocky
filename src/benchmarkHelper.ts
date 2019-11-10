import { Event, Suite } from 'benchmark'
import fs from 'fs'
import path from 'path'
import { max } from './max'
import { unique } from './unique'

interface BenchmarkSample {
  library: string
  input: string
  func: () => any
}

interface BenchmarkResult {
  library: string
  input: string
  opsPerSec: number
}

class Benchmark {
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
      opsPerSec: parseInt(opsPerSec, 10)
    })
  }

  writeResults(): void {
    // TODO: Add system information at the bottom

    const content = [
      `### Benchmark for \`${this.name}\``,
      '',
      `[Source for this benchmark](./benchmark.ts)`,
      '',
      this.generateResultTable(),
      '',
      `<sup>Generated at ${new Date().toISOString()}</sup>`
    ].join('\n')

    fs.writeFileSync(
      path.join(__dirname, `./${this.name}/BENCHMARK.md`),
      content,
      'utf-8'
    )
  }

  generateResultTable(): string {
    let table: string[] = []

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
        const formattedOps = result.opsPerSec.toLocaleString()
        return result.opsPerSec === bestResult
          ? `**${formattedOps} ops/sec**`
          : `${formattedOps} ops/sec`
      })

      table.push(`| ${input} | ${formattedInputResults.join(' | ')} |`)
    })

    return table.join('\n')
  }
}

export = Benchmark

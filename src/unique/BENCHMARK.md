### Benchmark for `unique`

[Source for this benchmark](./unique.benchmark.ts)

|             | es6 filter               | lodash                   | flocky                        |
| ----------- | ------------------------ | ------------------------ | ----------------------------- |
| large array | 40 ops/sec (2.76%)       | 1,313 ops/sec (90.49%)   | **1,451 ops/sec (100.00%)**   |
| small array | 205,293 ops/sec (85.34%) | 187,378 ops/sec (77.89%) | **240,559 ops/sec (100.00%)** |

<sup>Generated at 2024-07-20 with Node.JS v20.9.0</sup>

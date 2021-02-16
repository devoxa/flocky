### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|     | lodash | fast-memoize | flocky |
| --- | --- | --- | --- |
| monadic | 61,151,253 ops/sec (39.98%) | **152,969,042 ops/sec (100.00%)** | 147,656,235 ops/sec (96.53%) |
| variadic | **2,136,261 ops/sec (100.00%)** | 1,003,326 ops/sec (46.97%) | 1,933,882 ops/sec (90.53%) |

<sup>Generated at 2021-02-17 with Node.JS v14.4.0</sup>
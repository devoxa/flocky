### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|     | lodash | fast-memoize | flocky |
| --- | --- | --- | --- |
| monadic | 61,210,646 ops/sec (39.33%) | 155,273,165 ops/sec (99.77%) | **155,627,475 ops/sec (100.00%)** |
| variadic | **2,143,821 ops/sec (100.00%)** | 1,032,374 ops/sec (48.16%) | 1,532,225 ops/sec (71.47%) |

<sup>Generated at 2021-02-16 with Node.JS v14.4.0</sup>
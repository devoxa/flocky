### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|     | lodash | fast-memoize | flocky |
| --- | --- | --- | --- |
| monadic | 61,367,923 ops/sec (39.58%) | **155,033,513 ops/sec (100.00%)** | 151,963,600 ops/sec (98.02%) |
| variadic | **2,189,660 ops/sec (100.00%)** | 1,051,687 ops/sec (48.03%) | 1,546,026 ops/sec (70.61%) |

<sup>Generated at 2021-02-16 with Node.JS v14.4.0</sup>
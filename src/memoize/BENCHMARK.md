### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|     | lodash | fast-memoize | flocky |
| --- | --- | --- | --- |
| monadic (primitive) | 71,921,257 ops/sec (35.27%) | **203,888,960 ops/sec (100.00%)** | 202,353,951 ops/sec (99.25%) |
| monadic (serialized) | **18,070,480 ops/sec (100.00%)** | 2,329,703 ops/sec (12.89%) | 7,307,388 ops/sec (40.44%) |
| variadic | 2,859,756 ops/sec (72.73%) | 1,392,601 ops/sec (35.42%) | **3,931,747 ops/sec (100.00%)** |

<sup>Generated at 2021-07-05 with Node.JS v16.4.1</sup>
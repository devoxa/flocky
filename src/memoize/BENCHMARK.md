### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|                      | lodash                      | fast-memoize                 | flocky                            |
| -------------------- | --------------------------- | ---------------------------- | --------------------------------- |
| monadic (primitive)  | 70,899,764 ops/sec (34.95%) | 201,953,383 ops/sec (99.54%) | **202,886,184 ops/sec (100.00%)** |
| monadic (serialized) | 2,826,332 ops/sec (37.76%)  | 2,272,833 ops/sec (30.36%)   | **7,485,491 ops/sec (100.00%)**   |
| variadic             | 2,893,648 ops/sec (71.46%)  | 1,414,302 ops/sec (34.93%)   | **4,049,054 ops/sec (100.00%)**   |

<sup>Generated at 2021-07-05 with Node.JS v16.4.1</sup>

### Benchmark for `memoize`

[Source for this benchmark](./memoize.benchmark.ts)

|                      | lodash                      | fast-memoize                      | flocky                          |
| -------------------- | --------------------------- | --------------------------------- | ------------------------------- |
| monadic (primitive)  | 85,503,748 ops/sec (41.94%) | **203,874,391 ops/sec (100.00%)** | 198,755,703 ops/sec (97.49%)    |
| monadic (serialized) | 3,292,794 ops/sec (44.06%)  | 2,607,224 ops/sec (34.89%)        | **7,473,005 ops/sec (100.00%)** |
| variadic             | 3,222,679 ops/sec (79.33%)  | 1,620,215 ops/sec (39.88%)        | **4,062,624 ops/sec (100.00%)** |

<sup>Generated at 2024-07-20 with Node.JS v20.9.0</sup>

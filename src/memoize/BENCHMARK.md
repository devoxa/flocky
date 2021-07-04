### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|          | lodash                          | fast-memoize                      | flocky                       |
| -------- | ------------------------------- | --------------------------------- | ---------------------------- |
| monadic  | 61,516,142 ops/sec (40.39%)     | **152,318,396 ops/sec (100.00%)** | 150,923,324 ops/sec (99.08%) |
| variadic | **2,121,499 ops/sec (100.00%)** | 1,020,555 ops/sec (48.11%)        | 1,948,001 ops/sec (91.82%)   |

<sup>Generated at 2021-02-17 with Node.JS v14.4.0</sup>

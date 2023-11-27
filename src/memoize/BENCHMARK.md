### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|                      | lodash                      | fast-memoize                      | flocky                          |
| -------------------- | --------------------------- | --------------------------------- | ------------------------------- |
| monadic (primitive)  | 70,207,892 ops/sec (34.59%) | **202,998,947 ops/sec (100.00%)** | 199,242,881 ops/sec (98.15%)    |
| monadic (serialized) | 2,884,723 ops/sec (40.50%)  | 2,409,543 ops/sec (33.83%)        | **7,122,748 ops/sec (100.00%)** |
| variadic             | 2,864,947 ops/sec (76.45%)  | 1,486,428 ops/sec (39.67%)        | **3,747,245 ops/sec (100.00%)** |

<sup>Generated at 2023-11-27 with Node.JS v18.18.2</sup>

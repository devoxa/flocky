### Benchmark for `memoize`

[Source for this benchmark](./benchmark.ts)

|     | lodash | fast-memoize | flocky |
| --- | --- | --- | --- |
| monadic (primitive) | 71,940,355 ops/sec (35.64%) | **201,862,366 ops/sec (100.00%)** | 200,792,844 ops/sec (99.47%) |
| monadic (serialized) | **18,149,027 ops/sec (100.00%)** | 2,312,233 ops/sec (12.74%) | 7,376,168 ops/sec (40.64%) |
| variadic | 2,843,657 ops/sec (69.34%) | 1,410,937 ops/sec (34.41%) | **4,100,909 ops/sec (100.00%)** |

<sup>Generated at 2021-07-05 with Node.JS v16.4.1</sup>
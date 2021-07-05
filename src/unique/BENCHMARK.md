### Benchmark for `unique`

[Source for this benchmark](./benchmark.ts)

|     | es6 filter | lodash | flocky |
| --- | --- | --- | --- |
| large array | 40 ops/sec (2.72%) | 1,329 ops/sec (90.29%) | **1,472 ops/sec (100.00%)** |
| small array | **231,940 ops/sec (100.00%)** | 165,351 ops/sec (71.29%) | 231,841 ops/sec (99.96%) |

<sup>Generated at 2021-07-05 with Node.JS v16.4.1</sup>
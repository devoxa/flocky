### Benchmark for `unique`

[Source for this benchmark](./benchmark.ts)

|     | es6 filter | lodash | flocky |
| --- | --- | --- | --- |
| large array | 32 ops/sec (3.15%) | 825 ops/sec (81.28%) | **1,015 ops/sec (100.00%)** |
| small array | 155,905 ops/sec (96.98%) | 137,664 ops/sec (85.64%) | **160,755 ops/sec (100.00%)** |

<sup>Generated at 2020-06-27 with Node.JS v14.4.0</sup>
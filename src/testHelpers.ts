const RANDOM_OUTPUT = [
  0.7341312319841373,
  0.5153569814278522,
  0.6039244693324568,
  0.8485123814547479,
  0.5305323323446391,
  0.9936904462715297,
  0.152741118641178,
  0.6284452050928289,
  0.1333952722446896,
  0.19323989178442735
]

let randomIndex = 0
let globalMathRandom = Math.random

export const mathRandom = {
  setup: () => {
    randomIndex = 0
    globalMathRandom = Math.random
    Math.random = () => RANDOM_OUTPUT[randomIndex++]
  },
  reset: () => {
    Math.random = globalMathRandom
  }
}

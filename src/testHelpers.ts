const RANDOM_OUTPUT = [
  0.7341312319841373, 0.5153569814278522, 0.6039244693324568, 0.8485123814547479,
  0.5305323323446391, 0.9936904462715297, 0.152741118641178, 0.6284452050928289, 0.1333952722446896,
  0.19323989178442735, 0.6210946032149509, 0.715356956262492, 0.1601444486850756,
  0.2826657106671773, 0.3360975043209571, 0.7686446730864509, 0.2482518764495567,
  0.39590294569110873, 0.8810226597671855, 0.8645898520605233, 0.08819117131655063,
  0.9746880765364763, 0.8191862710617215, 0.6093775445189631, 0.5680783823402815,
  0.4094440218703661, 0.03730391719730841, 0.17578915337316725, 0.8865419358339801,
  0.2227008300658413,
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
  },
}

let globalDateNow = Date.now

export const dateNow = {
  setup: () => {
    globalDateNow = Date.now
    Date.now = () => 1551647486832
  },
  reset: () => {
    Date.now = globalDateNow
  },
}

export function expectApproximateDuration(start: Date, end: Date, duration: number) {
  const BUFFER = 10

  expect(end.getTime() - start.getTime()).toBeGreaterThan(duration - BUFFER)
  expect(end.getTime() - start.getTime()).toBeLessThan(duration + BUFFER)
}

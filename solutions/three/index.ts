import { URL } from "url";

import { IO } from "../utils/io";

export function three(): void {
  console.log("\nDAY 3: https://adventofcode.com/2021/day/3\n");

  const filepath = new URL("./input.txt", import.meta.url);

  const readings = IO.parse<number[]>(filepath, toNumberArr);

  // PART 1
  const binGamma = readings.reduce(countBitsByPosition).map(mapMostCommonVal).join("").toString();

  const gamma = getGamma(binGamma);
  const epsilon = getEpsilon(gamma, binGamma.length);

  const answerOne = gamma * epsilon;

  console.log(`Part 1 answer is ${answerOne}\n`);

  // PART 2
  const ogRating = getOxygenGeneratorRating(readings);
  const co2sRating = getCO2ScrubberRating(readings);

  const answerTwo = ogRating * co2sRating;

  console.log(`Part 2 answer is ${answerTwo}\n`);

  // UTILS
  function mapMostCommonVal(val: number): number {
    return val > readings.length / 2 ? 1 : 0;
  }

  function toNumberArr(arr: string[]) {
    return arr.map((x) =>
      x
        .split("")
        .filter((y) => y.length > 0)
        .map((y) => parseInt(y, 10))
    );
  }

  function countBitsByPosition(prev: number[], curr: number[]): number[] {
    return curr.map((val, idx) => val + prev[idx]);
  }

  function getGamma(val: string) {
    return parseInt(val, 2);
  }

  function getEpsilon(val: number, binLength: number) {
    return ~val & (Math.pow(2, binLength) - 1);
  }

  function sumAtIndex(idx: number) {
    return function (prev: number[], curr: number[]): number[] {
      const result = curr.map((val) => val + prev[idx]);
      return result;
    };
  }

  function getLeastCommon(onesCount: number, arrLength: number) {
    const zerosCount = arrLength - onesCount;
    if (zerosCount > onesCount) {
      return 1;
    } else if (zerosCount < onesCount) {
      return 0;
    }
    return 0;
  }

  function getMostCommon(onesCount: number, arrLength: number) {
    const zerosCount = arrLength - onesCount;
    if (zerosCount < onesCount) {
      return 1;
    } else if (zerosCount > onesCount) {
      return 0;
    }
    return 1;
  }

  function diagnosticFilter(arr: number[][], getFilterValue: Function) {
    let result = arr;
    let idx = 0;

    while (result.length > 1) {
      const total = <number>result.reduce(sumAtIndex(idx))[idx];
      const filterVal = getFilterValue(total, result.length);
      result = result.filter((x) => x[idx] == filterVal);
      idx++;
    }

    return parseInt(result[0].join(""), 2);
  }

  function getOxygenGeneratorRating(arr: number[][]) {
    return diagnosticFilter(arr, getMostCommon);
  }

  function getCO2ScrubberRating(arr: number[][]) {
    return diagnosticFilter(arr, getLeastCommon);
  }
}

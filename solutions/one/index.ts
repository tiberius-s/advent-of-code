import { readFileSync } from "fs";
import { URL } from "url";

type SlidingWindow = [number, number, number];

export function one() {
  console.log("\nDAY 1: https://adventofcode.com/2021/day/1");
  const filepath = new URL("./input.txt", import.meta.url).pathname;
  const measurements: number[] = readFileSync(filepath, { encoding: "utf-8" })
    .split("\n")
    .map((row) => parseInt(row, 10));

  // PART 1
  const increasedCount: number = getIncreasedCount(measurements);
  console.log("\nPART 1: How many measurements are larger than the previous?");
  console.log(`Depth measurement increased ${increasedCount} times!`);

  // PART 2
  const slidingWindowMeasurements = toSlidingWindows(measurements).map((sw) => sum(sw));
  const swIncreasedCount = getIncreasedCount(slidingWindowMeasurements);
  console.log("\nPART 2: Given the sums of sliding windows, how many sums are larger than the previous sum?");
  console.log(`Depth measurement increased ${swIncreasedCount} times!`);
}

// UTILS
function toSlidingWindows(arr: number[]): Array<SlidingWindow> {
  const slidingWindows: Array<SlidingWindow> = [];

  for (const [idx, measure] of arr.entries()) {
    if (!arr[idx + 2]) break;
    slidingWindows.push([measure, arr[idx + 1], arr[idx + 2]]);
  }

  return slidingWindows;
}

function sum(arr: number[]): number {
  return arr.reduce((prev, curr) => prev + curr);
}

function getIncreasedCount(arr: number[]): number {
  return arr.filter((curr, idx, arr) => curr > arr[idx - 1]).length;
}

/**
 * Yes, I know you can write the second as a one liner, but look how hideous it would look
 *
 * const hardToReadSolutionNeverDoThisOMG = measurements
 *   .slice(0, -1)
 *   .map((_m, i) => measurements.slice(i, i + 3).reduce((prev, curr) => prev + curr))
 *   .filter((curr, idx, arr) => curr > arr[idx - 1]).length;
 */

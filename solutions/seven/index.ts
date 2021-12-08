import { URL } from "url";
import { IO } from "../utils/io";

export function seven(): void {
  console.log("\nDAY 7: https://adventofcode.com/2021/day/7");

  const fileUrl = new URL("./input.txt", import.meta.url);

  const input = IO.parse<number>(fileUrl, toSortedNumberArr);

  const tally = Array(Math.max(...input) + 1).fill(0);
  input.forEach((val) => tally[val]++);

  // PART 1
  const assumedFuelCost = getFuelConsumptionByPosition(tally, humanEngineeringFormula);
  const answerOne = Math.min(...assumedFuelCost);
  console.log(`\nAnswer 1: ${answerOne}`);

  // PART 2
  const crabEngineeringVerifiedFuelCost = getFuelConsumptionByPosition(tally, crabEngineeringFormula);
  const answerTwo = Math.min(...crabEngineeringVerifiedFuelCost);
  console.log(`\nAnswer 2: ${answerTwo}`);
}

// UTILS
function toSortedNumberArr(arr: string[]) {
  return <number[]>arr
    .map((y) =>
      y
        .split(",")
        .map((z) => parseInt(z))
        .sort((x, y) => {
          // sort asc
          if (x > y) {
            return 1;
          }
          if (x < y) {
            return -1;
          }
          return 0;
        })
    )
    .shift();
}

function getFuelConsumptionByPosition(
  tally: number[],
  fuelConsumptionFormula: (x: number, y: number, z: number) => number
): number[] {
  let fuelCostByPosition: number[] = [];
  for (let pos = 0; pos < tally.length; pos++) {
    let fuelCost: number[] = [];
    for (const [crabPos, crabCount] of tally.entries()) {
      if (crabCount) {
        fuelCost.push(fuelConsumptionFormula(pos, crabPos, crabCount));
      }
    }
    fuelCostByPosition.push(fuelCost.reduce((x, y) => x + y));
  }
  return fuelCostByPosition;
}

function humanEngineeringFormula(position: number, crabPosition: number, crabCount: number): number {
  return Math.abs((crabPosition - position) * crabCount);
}

function crabEngineeringFormula(position: number, crabPosition: number, crabCount: number): number {
  const distance = Math.abs(crabPosition - position);

  const fuelConsumption = [...Array(distance + 1).keys()].reduce((x, y) => x + y);
  return fuelConsumption * crabCount;
}

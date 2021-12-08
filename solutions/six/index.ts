import { URL } from "url";
import { IO } from "../utils/io";

export function six(): void {
  console.log("\nDAY 6: https://adventofcode.com/2021/day/6");

  const fileUrl = new URL("./input.txt", import.meta.url);

  const input = IO.parse<string>(fileUrl, (x) => x.map((y) => y.split(","))[0]);

  // PART 1
  const fishCollection = input.map((f) => parseInt(f));
  for (let i = 0; i < 80; i++) {
    fishCollection.forEach((fish, idx, arr) => {
      fish--;
      arr[idx] = fish;
      if (fish === -1) {
        arr[idx] = 6;
        arr.push(8);
      }
    });
  }
  console.log(`\nAnswer 1: ${fishCollection.length}`);

  // PART 2
  const biggerFishCollection = input.map((f) => parseInt(f));
  const fishGroupedByDay: number[] = Array(9).fill(0);

  biggerFishCollection.forEach((fish) => fishGroupedByDay[fish]++);
  let babyFish = 0;
  for (let day = 0; day < 256; day++) {
    fishGroupedByDay[7] += fishGroupedByDay[0];
    babyFish = <number>fishGroupedByDay.shift();
    fishGroupedByDay.push(babyFish);
  }

  const answerTwo = fishGroupedByDay.reduce((x, y) => x + y);

  console.log(`\nAnswer 2: ${answerTwo}`);
}

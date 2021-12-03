import { readFileSync } from "fs";
import { URL } from "url";

enum Direction {
  FORWARD = "forward",
  DOWN = "down",
  UP = "up",
}

type Movement = [Direction, number];

export function two(): void {
  console.log("\nDAY 2: https://adventofcode.com/2021/day/2\n");

  const filepath = new URL("./input.txt", import.meta.url).pathname;
  const movements: Movement[] = readFileSync(filepath, { encoding: "utf-8" })
    .split(/\n/)
    .map((m) => m.split(/\s/))
    .map((x) => [<Direction>x[0], parseInt(x[1])]);

  // PART 1
  const firstVoyage = { distance: 0, depth: 0 };

  movements.forEach((movement) => {
    const [dir, val] = movement;
    switch (dir) {
      case Direction.FORWARD:
        firstVoyage.distance += val;
        break;
      case Direction.UP:
        firstVoyage.depth -= val;
        break;
      case Direction.DOWN:
        firstVoyage.depth += val;
    }
  });

  const answerOne = firstVoyage.depth * firstVoyage.distance;

  console.log(`Part 1 answer is ${answerOne}\n`);

  // PART 2
  const secondVoyage = { distance: 0, depth: 0, aim: 0 };

  movements.forEach((movement) => {
    const [dir, val] = movement;
    switch (dir) {
      case Direction.FORWARD:
        secondVoyage.distance += val;
        secondVoyage.depth += val * secondVoyage.aim;
        break;
      case Direction.UP:
        secondVoyage.aim -= val;
        break;
      case Direction.DOWN:
        secondVoyage.aim += val;
    }
  });

  const answerTwo = secondVoyage.depth * secondVoyage.distance;

  console.log(`Part 2 answer is ${answerTwo}`);
}

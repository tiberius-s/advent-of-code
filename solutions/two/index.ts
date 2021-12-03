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
    switch (movement[0]) {
      case Direction.FORWARD:
        firstVoyage.distance = firstVoyage.distance + movement[1];
        break;
      case Direction.UP:
        firstVoyage.depth = firstVoyage.depth - movement[1];
        break;
      case Direction.DOWN:
        firstVoyage.depth = firstVoyage.depth + movement[1];
    }
  });

  const answerOne = firstVoyage.depth * firstVoyage.distance;

  console.log(`Part 1 answer is ${answerOne}\n`);

  // PART 2
  const secondVoyage = { distance: 0, depth: 0, aim: 0 };

  movements.forEach((movement) => {
    switch (movement[0]) {
      case Direction.FORWARD:
        secondVoyage.distance = secondVoyage.distance + movement[1];
        secondVoyage.depth = secondVoyage.depth + movement[1] * secondVoyage.aim;
        break;
      case Direction.UP:
        secondVoyage.aim = secondVoyage.aim - movement[1];
        break;
      case Direction.DOWN:
        secondVoyage.aim = secondVoyage.aim + movement[1];
    }
  });

  const answerTwo = secondVoyage.depth * secondVoyage.distance;

  console.log(`Part 2 answer is ${answerTwo}`);
}

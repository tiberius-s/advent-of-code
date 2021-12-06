import { URL } from "url";
import { IO } from "../utils/io";

type Coordinates = [x: number, y: number];
type Line = [source: Coordinates, destination: Coordinates];

export function five(): void {
  console.log("\nDAY 5: https://adventofcode.com/2021/day/5\n");

  const fileUrl = new URL("./test.txt", import.meta.url);

  const input = IO.parse<Line>(fileUrl, toLineArr);

  // PART 1
  const inputNoDiag = filterOutDiagonals(input);
  let diagramOne = createDiagram(input.length);

  for (const line of inputNoDiag) {
    diagramOne = drawLine(line, diagramOne);
  }

  printDiagram(diagramOne);
}

// UTILS
function toLineArr(input: string[]): Line[] {
  return input.map(
    (l) => <Line>l.split("->").map(
        (pair) => <Coordinates>pair
            .trim()
            .split(",")
            .map((v) => parseInt(v, 10))
      )
  );
}

function createDiagram(size: number): number[][] {
  return Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));
}

function printDiagram(diagram: number[][]): void {
  const rows = diagram.map((line) => line.map((v: number): string => (v === 0 ? "." : v.toString())).join(""));
  rows.forEach((r) => console.log(r));
}

function filterOutDiagonals(arr: Line[]): Line[] {
  return arr.filter((line) => line[0][0] == line[1][0] || line[0][1] == line[1][1]);
}

function drawLine(line: Line, diagram: number[][]): number[][] {
  const [source, destination] = line;
  diagram[source[0]][source[1]] += 1;
  diagram[destination[0]][destination[1]] += 1;
  return diagram;
}

five()
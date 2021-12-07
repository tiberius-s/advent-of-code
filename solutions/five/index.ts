import { URL } from "url";
import { IO } from "../utils/io";

type Point = { x: number; y: number };
type Line = [source: Point, destination: Point];

export function five(): void {
  console.log("\nDAY 5: https://adventofcode.com/2021/day/5");

  const fileUrl = new URL("./input.txt", import.meta.url);

  const input = IO.parse<Line>(fileUrl, toLineArr);

  // PART 1
  const inputNoDiag = filterOutDiagonals(input);
  let diagramOne = createDiagram(1000);

  for (const line of inputNoDiag) {
    diagramOne = drawLine(line, diagramOne);
  }
  const answerOne = computeAnswer(diagramOne);
  console.log(`\nAnswer 1: ${answerOne}`);

  // PART 2
  let diagramTwo = createDiagram(1000);

  for (const line of input) {
    diagramTwo = drawLine(line, diagramTwo);
  }

  const answerTwo = computeAnswer(diagramTwo);
  console.log(`\nAnswer 2: ${answerTwo}`);
}

// UTILS
function toLineArr(input: string[]): Line[] {
  return input.map(
    (l) => <Line>l
        .split("->")
        .map((pair) => pair.trim().split(","))
        .map((v) => ({ x: parseInt(v[0]), y: parseInt(v[1]) }))
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
  return arr.filter((line) => line[0].x == line[1].x || line[0].y == line[1].y);
}

function drawLine(line: Line, diagram: number[][]): number[][] {
  const [source, destination] = line;
  const [diffX, diffY] = [Math.abs(source.x - destination.x), Math.abs(source.y - destination.y)];
  const xInc = destination.x > source.x ? 1 : -1;
  const yInc = destination.y > source.y ? 1 : -1;
  const destPoint = { x: destination.x, y: destination.y };
  markPoint(destPoint, diagram);

  // draw diagonal
  if (Math.abs(diffX) && Math.abs(diffY)) {
    let { x: currX, y: currY } = source;
    while (currX !== destination.x || currY !== destination.y) {
      const point = { x: currX, y: currY };
      markPoint(point, diagram);
      currX += xInc;
      currY += yInc;
    }

    return diagram;
  }

  // draw horizontal
  if (Math.abs(diffX)) {
    let { x: currX, y: currY } = source;
    while (currX !== destination.x) {
      const point = { x: currX, y: currY };
      markPoint(point, diagram);
      currX += xInc;
    }
    return diagram;
  }

  // draw vertical
  if (Math.abs(diffY)) {
    let { x: currX, y: currY } = source;
    while (currY !== destination.y) {
      const point = { x: currX, y: currY };
      markPoint(point, diagram);
      currY += yInc;
    }
    return diagram;
  }
  return diagram;
}

function markPoint(point: Point, diagram: number[][]): number[][] {
  diagram[point.y][point.x]++;
  return diagram;
}

function computeAnswer(diagram: number[][]): number {
  return diagram.map((line) => line.filter((x) => x > 1).length).reduce((x, y) => x + y);
}

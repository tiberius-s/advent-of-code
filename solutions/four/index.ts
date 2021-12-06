import { URL } from "url";
import { IO } from "../utils/io";

type BingoRow = [number, number, number, number, number];
type BingoCard = [BingoRow, BingoRow, BingoRow, BingoRow, BingoRow];

export function four(): void {
  console.log("\nDAY 4: https://adventofcode.com/2021/day/4");

  const filepath = new URL("./input.txt", import.meta.url);

  const input = IO.parseInput(filepath);

  const calledNumbers = input.splice(0, 1).map((x) => x.split(",").map((y) => parseInt(y, 10)))[0];

  let cards = createBingoCards(input);

  // PART 1
  for (const num of calledNumbers) {
    cards = markNumber(num, cards);
    const bingoIdx = cards.map((c) => checkForBingo(c)).indexOf(true);
    if (bingoIdx > -1) {
      const answer = computeAnswer(cards[bingoIdx], num);
      console.log(`\nAnswer 1: ${answer}`);
      break;
    }
  }

  // PART 2
  let counter = 0;
  const winningCardIndicesMap = new Map<number, number>();
  for (const num of calledNumbers) {
    cards = markNumber(num, cards);

    const bingoChecks = cards.map((c, i) => checkForBingoWithSkips(c, i, winningCardIndicesMap));
    bingoChecks.forEach((state, idx) => {
      if (state && !winningCardIndicesMap.has(idx)) {
        winningCardIndicesMap.set(idx, counter);
        counter++;
      }
    });

    if (winningCardIndicesMap.size == cards.length) {
      const lastCardIdx = <number>[...winningCardIndicesMap.keys()].pop();
      const answer = computeAnswer(cards[lastCardIdx], num);
      console.log(`\nAnswer 2: ${answer}`);
      break;
    }
  }
}

// UTILS
function computeAnswer(card: BingoCard, num: number): number {
  const sumOfUnmarked = card
    .map((r) => r.filter((y) => y > -1))
    .filter((r) => r.length > 0)
    .map((r) => r.reduce((x, y) => x + y))
    .reduce((x, y) => x + y);
  return sumOfUnmarked * num;
}

function createBingoCards(input: string[]): BingoCard[] {
  const cards: BingoCard[] = Array();
  let card = [];
  for (const [idx, val] of input.entries()) {
    if (idx % 6 == 0) {
      if (card.length) {
        cards.push(<BingoCard>card);
      }
      card = [];
    } else {
      const row = parseRow(val);
      card.push(<BingoRow>row);
    }
  }
  cards.push(<BingoCard>card);
  return cards.filter((c) => c.length > 0);
}

function parseRow(input: string): BingoRow {
  const result = <BingoRow>input
    .split(" ")
    .filter((x) => x)
    .map((x) => parseInt(x, 10));
  return result;
}

function markNumber(calledNumber: number, cards: BingoCard[]): BingoCard[] {
  for (let [outerIdx, card] of cards.entries()) {
    for (let [innerIdx, row] of card.entries()) {
      row = <BingoRow>row.map((i) => {
        if (i === calledNumber) {
          i = -1;
        }
        return i;
      });
      cards[outerIdx][innerIdx] = row;
    }
  }
  return cards;
}

function checkForBingoWithSkips(card: BingoCard, cardIndex?: number, winningCards?: Map<number, number>) {
  if (winningCards && cardIndex) {
    return winningCards.has(cardIndex) ? true : checkForBingo(card);
  }
  return checkForBingo(card);
}

function checkForBingo(card: BingoCard): boolean {
  // check horizontal
  if (hasBingo(card)) {
    return true;
  }
  // check vertical
  const transposedCard = <BingoCard>card[0].map((_, i) => card.map((r) => r[i]));
  if (hasBingo(transposedCard)) {
    return true;
  }
  return false;
}

function hasBingo(card: BingoCard): boolean {
  return card.map((row) => row.every((x) => x == -1)).includes(true);
}

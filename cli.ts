#!/usr/bin/env node --loader ts-node/esm --experimental-specifier-resolution=node

import { Command } from "commander";

import solutions from "./solutions";

const program = new Command();

program.command("day <day>").action((day: string) => {
  const key = day.toLowerCase().trim();

  try {
    const solution = solutions[key];
    return solution();
  } catch (error) {
    console.log("kebab case numbers only, pls");
    console.log("Ex: one, two, eleven, twenty-one");
  }
});

program.exitOverride();

try {
  await program.parseAsync(process.argv);
} catch (err) {
  // handle the exit your way
  console.error(`ERR: ${err}`);
  process.exit(1);
}

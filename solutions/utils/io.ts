import { readFileSync } from "fs";
import { URL } from "url";

export class IO {
  public static parseInput(url: URL): string[] {
    return readFileSync(url.pathname, { encoding: "utf-8" })
      .split(/\n/)
      .map((line) => line.trim());
  }

  public static parse<T>(url: URL, transformFunc: (arr: string[]) => T[]): T[] {
    const input = this.parseInput(url);
    return transformFunc(input);
  }
}

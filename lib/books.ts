import fs from "fs";
import path from "path";

const cache: Record<string, any> = {};

export function loadBook(book: string) {
  if (!cache[book]) {
    const filePath = path.join(process.cwd(), "data", `${book.toLowerCase()}.json`);
    cache[book] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  return cache[book];
}

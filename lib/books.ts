import fs from "fs";
import path from "path";

const cache: Record<string, any> = {};

export function loadBook(book: string) {
  const key = book.toLowerCase();

  if (cache[key]) return cache[key];

  const filePath = path.join(process.cwd(), "data", "bible", `${book}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Book not found: ${book}`);
  }

  const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
  cache[key] = content;
  return content;
}

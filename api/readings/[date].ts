import { loadBook } from "../../lib/books";
import fs from "fs";
import path from "path";

const calendar = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/calendar.json"), "utf8")
);

export default function handler(req, res) {
  const { date } = req.query as { date: string };

  const dayEntries = calendar[date];
  if (!dayEntries) {
    return res.status(404).json({ error: "No readings found" });
  }

  const readings = dayEntries.map((r: any) => {
    const book = loadBook(r.book);

    // Each book JSON from the repo is structured:
    // bookText["chapter"] -> object of verseNumber: text
    const chapterData = book[r.chapter];
    const verseTexts = (r.verses ?? []).map((v: string) => chapterData[v] || "");

    return {
      type: r.type,
      citation: `${r.book} ${r.chapter}:${r.verses.join(",")}`,
      text: verseTexts.join(" ")
    };
  });

  res.status(200).json({
    date,
    readings
  });
}

import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const genesis = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/genesis.json"), "utf8")
);

const calendar = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data/calendar.json"), "utf8")
);

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { date } = req.query as { date: string };

  const dayReadings = calendar[date];
  if (!dayReadings) {
    return res.status(404).json({ error: "No readings for this date" });
  }

  const readings = dayReadings.map((r: any) => ({
    type: r.type,
    citation: `Genesis ${r.chapter}:${r.verses.join(",")}`,
    text: r.verses.map((v: string) => genesis[r.chapter][v]).join(" ")
  }));

  res.status(200).json({
    date,
    readings
  });
}

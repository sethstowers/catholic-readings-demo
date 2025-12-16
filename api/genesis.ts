import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const filePath = path.join(process.cwd(), "data", "genesis.json");
const genesis = JSON.parse(fs.readFileSync(filePath, "utf8"));

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { chapter = "1", verse = "1" } = req.query as { chapter?: string; verse?: string };
  const text = genesis[chapter]?.[verse] ?? null;

  res.status(200).json({
    citation: `Genesis ${chapter}:${verse}`,
    text
  });
}

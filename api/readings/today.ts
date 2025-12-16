import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const genesisPath = path.join(process.cwd(), "data", "genesis.json");
const genesis = JSON.parse(fs.readFileSync(genesisPath, "utf8"));

export default function handler(req: VercelRequest, res: VercelResponse) {
  const reading = {
    citation: "Genesis 1:1–2",
    text: [
      genesis["1"]["1"],
      genesis["1"]["2"]
    ].join(" ")
  };

  res.status(200).json({
    date: new Date().toISOString().slice(0, 10),
    readings: [reading]
  });
}

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    citation: "Genesis 1:1",
    text: "In the beginning God created heaven, and earth."
  });
}

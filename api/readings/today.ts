import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handlerByDate from "./[date]";

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const date = getTodayISO();

  // Reuse the existing date handler
  return handlerByDate(
    { ...req, query: { ...req.query, date } } as VercelRequest,
    res
  );
}


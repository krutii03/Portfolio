import fs from "fs";
import path from "path";
import type { SiteData } from "@/types/content";

export function getSiteData(): SiteData {
  const file = path.join(process.cwd(), "content", "site", "data.json");
  try {
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as SiteData;
  } catch {
    return {} as SiteData;
  }
}

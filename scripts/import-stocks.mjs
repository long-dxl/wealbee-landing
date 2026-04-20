/**
 * Import stocks from CSV into Supabase.
 * Run: node scripts/import-stocks.mjs
 *
 * Prerequisite: run scripts/create-stocks-table.sql in Supabase SQL Editor first.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://fkwsvyzguehtsjpwmttb.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd3N2eXpndWVodHNqcHdtdHRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQyNzM1NiwiZXhwIjoyMDkxMDAzMzU2fQ.dd2jG1FUDGlLwUhIdgEOnkK2HPnfkTTdnfYcNcwWTOo";

const CSV_PATH = path.resolve(
  __dirname,
  "../../Thong_tin_doanh_nghiep_merged_final.csv"
);


// Proper CSV parser that handles quoted fields with commas inside.
function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  const rows = [];
  for (const line of lines) {
    const fields = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    rows.push(fields);
  }
  return rows;
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const content = fs.readFileSync(CSV_PATH, "utf-8");
  const rows = parseCSV(content);

  // Skip header row
  const dataRows = rows.slice(1);

  const stocks = dataRows
    .filter((r) => r.length >= 5 && r[1])
    .map((r) => ({
      symbol: r[1].trim().toUpperCase(),
      name: r[2].trim(),
      exchange: r[4].trim(),
    }));

  console.log(`Parsed ${stocks.length} stocks. Importing...`);

  // Batch upsert in chunks of 200
  const BATCH = 200;
  let inserted = 0;
  for (let i = 0; i < stocks.length; i += BATCH) {
    const batch = stocks.slice(i, i + BATCH);
    const { error } = await supabase
      .from("stocks")
      .upsert(batch, { onConflict: "symbol" });
    if (error) {
      console.error(`Batch ${i / BATCH + 1} failed:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`  ${inserted}/${stocks.length} done`);
  }

  console.log(`✓ Import complete — ${stocks.length} stocks upserted.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

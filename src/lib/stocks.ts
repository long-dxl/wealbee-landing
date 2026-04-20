import { supabase } from "./supabase";

export interface Stock {
  symbol: string;
  name: string;
  exchange: string;
}

let cache: Stock[] | null = null;

export async function getAllStocks(): Promise<Stock[]> {
  if (cache) return cache;
  const PAGE = 1000;
  const [r1, r2] = await Promise.all([
    supabase.from("stocks").select("symbol,name,exchange").order("symbol").range(0, PAGE - 1),
    supabase.from("stocks").select("symbol,name,exchange").order("symbol").range(PAGE, PAGE * 2 - 1),
  ]);
  if (r1.error && r2.error) return [];
  cache = [...(r1.data ?? []), ...(r2.data ?? [])] as Stock[];
  return cache;
}

export function searchStocks(query: string, stocks: Stock[]): Stock[] {
  if (!query) return [];
  const q = query.toUpperCase();
  const bySymbol = stocks.filter((s) => s.symbol.startsWith(q));
  if (bySymbol.length >= 8) return bySymbol.slice(0, 8);
  const byName = stocks.filter(
    (s) => !s.symbol.startsWith(q) && s.name.toUpperCase().includes(q)
  );
  return [...bySymbol, ...byName].slice(0, 8);
}

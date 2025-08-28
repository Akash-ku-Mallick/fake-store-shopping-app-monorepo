import { useEffect, useState } from "react";

type RatesResponse = {
  result: "success" | "error";
  rates: Record<string, number>;
  time_next_update_unix: number;
};

const STORAGE_KEY = "exchangeRatesCache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

function getCachedRates(): RatesResponse | null {
  const cache = localStorage.getItem(STORAGE_KEY);
  if (!cache) return null;

  try {
    const parsed = JSON.parse(cache) as { data: RatesResponse; timestamp: number };
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    }
    return null; // cache expired
  } catch {
    return null;
  }
}

async function fetchRates(): Promise<RatesResponse | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    if (data.result === "success") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
      return data;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch exchange rates", err);
    return null;
  }
}

export function useCurrencyConverter(targetCurrency: string = "INR") {
  const [rates, setRates] = useState<RatesResponse | null>(getCachedRates());
  const [loading, setLoading] = useState(!rates);

  useEffect(() => {
    if (!rates) {
      fetchRates().then((data) => {
        if (data) setRates(data);
        setLoading(false);
      });
    }
  }, []);

  function convert(amountUSD: number): { symbol: string; amount: string } {
    if (!rates) return { symbol: "$", amount: amountUSD.toFixed(2) };

    const rate = rates.rates[targetCurrency];
    if (!rate) return { symbol: "$", amount: amountUSD.toFixed(2) };

    const formatter = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: targetCurrency,
    });

    return {
      symbol: formatter.formatToParts(0).find((p) => p.type === "currency")?.value || "",
      amount: formatter.format(amountUSD * rate),
    };
  }

  return { convert, loading };
}

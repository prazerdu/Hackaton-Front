import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.UPSTASH_REDIS_URL!, {
  password: process.env.UPSTASH_REDIS_TOKEN!,
  tls: { rejectUnauthorized: false },
});

async function handleClick(cardId: string) {
  try {
    const res = await fetch(`/api/cards/${cardId}`, { method: "POST" });
    if (!res.ok) throw new Error("Falha na requisição");

    const data = await res.json();
    console.log(`Card ${data.id} clicado ${data.count} vezes`);
  } catch (err) {
    console.error(err);
  }
}

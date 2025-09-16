import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.UPSTASH_REDIS_URL!);

// POST /api/cards/[id]
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id;
    if (!cardId) return NextResponse.json({ error: "Card ID missing" }, { status: 400 });

    const key = `card:${cardId}:clicks`;
    const count = await redis.incr(key);

    return NextResponse.json({ id: cardId, count });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Redis error" }, { status: 500 });
  }
}

// GET /api/cards/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id;
    if (!cardId) return NextResponse.json({ error: "Card ID missing" }, { status: 400 });

    const key = `card:${cardId}:clicks`;
    const count = await redis.get(key);

    return NextResponse.json({ id: cardId, count: count ? Number(count) : 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Redis error" }, { status: 500 });
  }
}

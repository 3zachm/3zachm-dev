import { NextRequest, NextResponse } from 'next/server';
import { stringify } from 'querystring';
import { json } from 'stream/consumers';
import { createRedisInstance } from '@/lib/redis';

export async function GET( req: NextRequest ) {
  // cache the result in redis
  const redis = createRedisInstance();
  if (!redis) return new Response ('Internal Server Error', { status: 500 });

  let result = parseInt(await redis.get('ERMCOUNT') ?? '0');
  if (!result) {
    const queryURL = new URL(process.env.QUICKWIT_INDEX_URL + '/search');
    queryURL.searchParams.append('query', `message:erm`);

    const quickwitQuery = await fetch(queryURL.toString(), { cache: 'no-cache' })
      .then((res) => res.json())
      .catch((err) => { return { error: err } }
    );

    if (quickwitQuery.error || quickwitQuery.num_hits === 0) {
      return NextResponse.json({ error: quickwitQuery.error }, { status: 500 });
    }

    result = parseInt(quickwitQuery.num_hits ?? '0');
    await redis.set('ERMCOUNT', result, 'EX', 5);
  }

  return NextResponse.json({ count: result });
}

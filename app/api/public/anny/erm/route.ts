import { NextRequest, NextResponse } from 'next/server';

export async function GET( req: NextRequest ) {
  const queryURL = new URL(process.env.QUICKWIT_INDEX_URL + '/search');
  queryURL.searchParams.append('query', `message:erm`);

  const result = await fetch(queryURL.toString(), { next: { revalidate: parseInt(process.env.ERM_CACHE_TIME ?? '10')  } })
    .then((res) => res.json())
    .catch((err) => { return { error: err } });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ count: result.num_hits, time: result.elapsed_time_micros });
}
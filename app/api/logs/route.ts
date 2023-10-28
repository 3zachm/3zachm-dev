import { getUserByName } from '@/lib/twitch/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { createRedisInstance } from '@/lib/redis';

export async function GET( req: NextRequest ) {
  const token = await getToken({ req, secret: process.env.SECRET });
  // require mod role
  if (!token || !token.isMod) return new Response ('Unauthorized', { status: 403 });

  // error if redis is not connected
  const redis = createRedisInstance();
  if (!redis) return new Response ('Internal Server Error', { status: 500 });

  const limit = parseInt(process.env.LOGS_PER_PAGE ?? '1000');
  // get params
  const page = parseInt(req.nextUrl.searchParams.get('p') ?? '1');
  const offset = (page - 1) * limit;
  let username = req.nextUrl.searchParams.get('u');
  const search = req.nextUrl.searchParams.get('q');
  const startDate = req.nextUrl.searchParams.get('sd');
  const endDate = req.nextUrl.searchParams.get('ed');

  let userID;

  if (username) {
    const DOMPurify = require('isomorphic-dompurify');
    // check redis cache
    let redisUser = await redis.get(`TWITCH.USER_${DOMPurify.sanitize(username)}`).then((res) => JSON.parse(res as string));
    if (redisUser?.error || redisUser?.data.length === 0) {
      // indicates no user match
      return NextResponse.json({ data: [], pagination: { page, limit, total: 0 } });
    }
    if (redisUser) {
      userID = parseInt(redisUser.data[0].id);
    } else {
      // try finding the username in the database
      const userQueryURL = new URL(process.env.QUICKWIT_INDEX_URL + '/search');
      userQueryURL.searchParams.append('query', `user_name:${DOMPurify.sanitize(username)}`);
      userQueryURL.searchParams.append('max_hits', '1');
      userQueryURL.searchParams.append('sort_by_field', '-timestamp');

      const userQuery = await fetch(userQueryURL.toString());
      const userQueryRes = await userQuery.json();

      if (userQueryRes.num_hits > 0) {
        userID = userQueryRes.hits[0].user_id;
      } else {
        // get twitch ID from username
        let usernameRes = await getUserByName(redis, username)
        if (usernameRes.data.length === 0) {
          // indicates no user match
          return NextResponse.json({ data: [], pagination: { page, limit, total: 0 } });
        }
        userID = usernameRes.data[0].id;
      }
    }
  }

  const queryURL = new URL(process.env.QUICKWIT_INDEX_URL + '/search');
  let queryParts = [];

  if (username) queryParts.push(`user_id:${userID}`);
  if (search) queryParts.push(`message:${search}`);

  let queryString = queryParts.join(' '); // Join the query parts with a space

  queryURL.searchParams.append('query', queryString !== '' ? queryString : '*');

  // timestamps need conversion to unix
  if (startDate) queryURL.searchParams.append('start_timestamp', `${new Date(startDate).getTime()}`);
  if (endDate) queryURL.searchParams.append('end_timestamp', `${new Date(endDate).getTime()}`);
  queryURL.searchParams.append('max_hits', limit.toString());
  queryURL.searchParams.append('start_offset', offset.toString());
  queryURL.searchParams.append('sort_by_field', '-timestamp');

  const result = await fetch(queryURL.toString()).then((res) => res.json()).catch((err) => { console.error(err); return { error: err } });

  return NextResponse.json({ data: result.hits, pagination: { page, limit, total: result.num_hits }, time: result.elapsed_time_micros });
}
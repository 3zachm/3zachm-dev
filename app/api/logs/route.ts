import { getUserByName } from '@/lib/twitch/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { createRedisInstance } from '@/lib/redis';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma/db';

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
    // check if username is already in redis to avoid db query
    let redisUser = await redis.get(`TWITCH.USER_${DOMPurify.sanitize(username)}`).then((res) => JSON.parse(res as string));
    if (redisUser?.error) {
      // indicates no user match
      return NextResponse.json({ data: [], pagination: { page, limit, total: 0 } });
    }
    if (redisUser) {
      userID = parseInt(redisUser.data[0].id);
    }
    else {
      // try finding the username in the database
      let tempUser = await prisma.logs.findFirst({
        where: {
          user: username
        }
      });
      if (tempUser) {
        userID = tempUser.id;
        // cache the username to redis
        redis.set(`TWITCH.USER_${username}`, JSON.stringify({ data: [{ id: userID }] }), 'EX', 600);
      }
      else {
        // get twitch ID from username
        let usernameRes = await getUserByName(redis, username)
        if (usernameRes.data.status == 200) {
          userID = parseInt(usernameRes.data[0].id);
        } else {
          return NextResponse.json({ data: [], pagination: { page, limit, total: 0 } });
        }
      }
    }
  }

  const query: Prisma.logsFindManyArgs = {
    orderBy: {
      time: 'desc'
    },
    where: {
      id: userID ?? undefined,
      message: {
        contains: search ?? undefined
      },
      time: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined
      }
    },
    skip: offset,
    take: limit
  };

  const logRes = await prisma.$transaction([
    prisma.logs.findMany(query),
    prisma.logs.count({ where: query.where })
  ]);

  return NextResponse.json({ data: logRes[0], pagination: { page, limit, total: logRes[1] } });
}
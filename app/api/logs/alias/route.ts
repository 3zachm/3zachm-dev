import { getUserByName, getUserByID } from '@/lib/twitch/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { createRedisInstance } from '@/lib/redis';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma/db';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  // require mod role
  if (!token || !token.isMod) return new Response('Unauthorized', { status: 403 });

  // error if redis is not connected
  const redis = createRedisInstance();
  if (!redis) return new Response('Internal Server Error', { status: 500 });

  let username = req.nextUrl.searchParams.get('u');

  if (!username) return new Response('No user specified', { status: 400 });

  // cached result from previous call
  const redisCache = await redis.get(`ALIAS_${username}`).then((res) => JSON.parse(res as string));
  if (redisCache) {
    return NextResponse.json(redisCache);
  }

  let userID = 0;
  let currentName;


  const DOMPurify = require('isomorphic-dompurify');
  // check if username is already in redis to avoid db query
  let redisUser = await redis.get(`TWITCH.USER_${DOMPurify.sanitize(username)}`).then((res) => JSON.parse(res as string));
  if (redisUser?.error) {
    // indicates no user match
    return new Response('No user found', { status: 404 });
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
      userID = tempUser.id as number;
      // cache the username to redis
      redis.set(`TWITCH.USER_${username}`, JSON.stringify({ data: [{ id: userID }] }), 'EX', 600);
    }
    else {
      // get twitch ID from username
      let usernameRes = await getUserByName(redis, username);
      if (usernameRes.data.status == 200) {
        userID = parseInt(usernameRes.data[0].id);
        currentName = usernameRes.data[0].display_name;
      } else {
        return new Response('No user found', { status: 404 });
      }
    }
  }

  if (userID == 0) return new Response('No user found', { status: 404 });

  // get all names for the user ID
  let names = await prisma.logs.findMany({
    where: {
      id: userID
    },
    distinct: ['user'],
    select: {
      user: true
    }
  });

  const nameList = names.map((name) => name.user);
  let avatarURL;

  // get current name if not already found
  if (!currentName) {
    const currentNameRes = await getUserByID(redis, userID.toString());
    if (currentNameRes.data.status != 400) {
      currentName = currentNameRes.data[0].display_name;
      avatarURL = currentNameRes.data[0].profile_image_url;
    } else {
      currentName = 'Unknown (not found)';
    }
  }

  // cache the result
  redis.set(`ALIAS_${username}`, JSON.stringify({ previous: nameList, current: currentName, avatar: avatarURL }), 'EX', 600);

  return NextResponse.json({ previous: nameList, current: currentName, avatar: avatarURL });
}
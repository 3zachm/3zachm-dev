import TwitchEmote from '@/interface/twitch/TwitchEmote';
import Image from '@/interface/seventv/Image';
import { createRedisInstance } from '@/lib/redis';
import { getChannelEmotes, getGlobalEmotes } from '@/lib/twitch/api';
import { getChannelEmotes as get7TVChannelEmotes, getGlobalEmotes as get7TVGlobalEmotes } from '@/lib/seventv/api';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import SevenTVEmote from '@/interface/seventv/SevenTVEmote';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  // require mod role
  if (!token || !token.isMod) return new Response('Unauthorized', { status: 403 });

  // error if redis is not connected
  const redis = createRedisInstance();
  if (!redis) return new Response('Internal Server Error', { status: 500 });

  const channel = req.nextUrl.searchParams.get('c');
  const sevenChannel = req.nextUrl.searchParams.get('s') as string;
  const giveMinimal = req.nextUrl.searchParams.get('m') === '1';
  const ttvChannelData = channel ? await getChannelEmotes(redis, channel) : null;
  const ttvGlobalData = await getGlobalEmotes(redis);
  const sevenGlobalData = await get7TVGlobalEmotes(redis);
  const sevenChannelData = channel ? await get7TVChannelEmotes(redis, sevenChannel) : null;
  const sevenChannelEmoteData: SevenTVEmote[] = sevenChannelData?.user.emote_sets[0].emotes ?? [];
  const sevenGlobalEmoteData: SevenTVEmote[] = sevenGlobalData.namedEmoteSet.emotes ?? [];

  const mapEmoteData = (emote: TwitchEmote) => ({
    id: emote.id,
    name: emote.name,
    images: {
      url_1x: emote.images.url_1x,
      url_2x: emote.images.url_2x,
      url_4x: emote.images.url_4x,
    },
  });

  const map7TVEmoteToTwitchEmote = (emote: SevenTVEmote) => {
    const getEmoteUrl = (size: string) => {
      const avifFile = emote.data.host.files.find((f: Image) => f.name === `${size}.avif`);
      const webpFile = emote.data.host.files.find((f: Image) => f.name === `${size}.webp`);
      return avifFile?.name ?? webpFile?.name ?? false;
    };

    return {
      id: emote.id,
      name: emote.name,
      images: {
        url_1x: 'https:' + emote.data.host.url + '/' + getEmoteUrl('1x'),
        url_2x: 'https:' + emote.data.host.url + '/' + getEmoteUrl('2x'),
        url_4x: 'https:' + emote.data.host.url + '/' + getEmoteUrl('4x'),
      },
    };
  };

  if (giveMinimal) {
    const minimalChannelData = ttvChannelData?.data.map(mapEmoteData);
    const minimalGlobalData = ttvGlobalData?.data.map(mapEmoteData);
    const minimal7TVChannelData = sevenChannelEmoteData.map(map7TVEmoteToTwitchEmote);
    const minimal7TVGlobalData = sevenGlobalEmoteData.map(map7TVEmoteToTwitchEmote);

    const mergedData = [...minimalChannelData, ...minimalGlobalData, ...minimal7TVChannelData, ...minimal7TVGlobalData];

    return NextResponse.json({ data: mergedData });
  }

  return NextResponse.json({
    twitch: {
      channel: ttvChannelData,
      global: ttvGlobalData
    },
    seventv: {
      channel: sevenChannelData,
      global: sevenGlobalData
    }
  });
}
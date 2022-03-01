import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import { getVideos } from '../../../misc/TwitchAPI';

type Data = {
    [key: string]: any;
}

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const token = await getToken({ req, secret })
    if (!token || !token.isMod) {
        res.status(401).json({ error: "You are not authorized to view this page." });
        return
    }
    if (!req.query.c) {
        res.status(400).json({ error: "No user specified." });
        return
    }

    const data = await getVideos(req.query.c as string);

    res.status(200).json({ data });
}
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import { getUserByName } from '../../../misc/TwitchAPI';

type Data = {
    [key: string]: any;
}

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const token = await getToken({ req, secret })
    if (!token || !token.isMod) {
        res.status(401).json({ error: "You are not authorized to view this page." })
        return
    }

    const data = await getUserByName(req.query.u as string)


    res.status(200).json({ data })
}
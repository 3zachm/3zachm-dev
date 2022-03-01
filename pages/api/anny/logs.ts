import { prisma } from "../../../prisma/db";
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import { getUserByName } from "../../../misc/TwitchAPI";

type Data = {
    [key: string]: any;
    pagination?: any;
}

const secret = process.env.NEXTAUTH_SECRET
const itemCount = (process.env.LOGS_PER_PAGE) ? parseInt(process.env.LOGS_PER_PAGE) : 1000

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const token = await getToken({ req, secret })
    if (!token || !token.isMod) {
        res.status(401).json({ error: "You are not authorized to view this page." })
        return
    }
    const page = req.query.p ? parseInt(req.query.p as string) : 1;
    let username = req.query.u ? req.query.u as string : undefined;
    const search = req.query.q ? req.query.q as string : undefined;
    const startDate = req.query.sd ?  new Date(req.query.sd as string) as Date : new Date(0) as Date;
    const endDate = req.query.ed ?  new Date(req.query.ed as string) as Date : new Date() as Date;

    let userResponse
    if (username) {
        userResponse = await getUserByName(username);
    }

    let userID: number | undefined;
    // no user specified
    if (!username) {
        userID = undefined;
    }
    // find twitch user id
    else if (userResponse[0] && userResponse[0].id) {
        userID = parseInt(userResponse[0].id);
        username = undefined;
    }
    // find user id by old username
    else {
        let tempuser = await prisma.logs.findFirst({
            where: {
                user: username
            }
        })
        if (tempuser && tempuser.id) {
            userID = tempuser.id
            username = undefined;
        }
        else {
            userID = undefined;
        }
    }

    const offset = (page - 1) * itemCount;
    const logs = await prisma.logs.findMany({
        orderBy: {
            time: "desc"
        },
        where: {
            id: userID,
            user: username,
            message: {
                contains: search
            },
            time: {
                gte: startDate,
                lte: endDate
            }
        },
        skip: offset,
        take: itemCount,
    });

    const pagination = {
        count: itemCount, page: page
    }
    res.status(200).json({ data: logs, pagination: pagination })
}
import { prisma } from "../../../prisma/db";
import { logs } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type Data = {
    [key: string]: any;
    pagination?: any;
}

const secret = process.env.SECRET
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
    const username = req.query.u ? req.query.u as string : undefined;
    const search = req.query.q ? req.query.q as string : undefined;
    const startDate = req.query.sd ?  new Date(req.query.sd) as Date : new Date(0) as Date;
    const endDate = req.query.ed ?  new Date(req.query.ed) as Date : new Date() as Date;
    console.log(`${page} ${username} ${search} ${startDate} ${endDate}`)

    const offset = (page - 1) * itemCount;
    const logs = await prisma.logs.findMany({
        orderBy: {
            time: "desc"
        },
        where: {
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
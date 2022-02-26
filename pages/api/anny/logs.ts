import { prisma } from "../../../prisma/db";
import { logs } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type Data = {
    [key: string]: any;
}

const secret = process.env.SECRET

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const token = await getToken({ req, secret })
    if (!token || !token.isMod) {
        res.status(401).json({ error: "You are not authorized to view this page." })
        return
    }
    const itemCount = 1000;
    const page = req.query.p ? parseInt(req.query.p as string) : 1;
    const offset = (page - 1) * itemCount;
    const logs = await prisma.logs.findMany({
        orderBy: {
            time: "desc"
        },
        skip: offset,
        take: itemCount,
    });
    res.status(200).send(logs);
}
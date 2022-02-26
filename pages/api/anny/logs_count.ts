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
    const count = await prisma.logs.aggregate({
        _count: true,
    })
    res.status(200).send(count);
}
import { prisma } from "../../../prisma/db";
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    count: number,
    yep: number|null,
    cock: number|null,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const userCount = await prisma.users.count();
    const yepCount = await prisma.users.aggregate({
        _sum: {
            yep: true,
        }
    });
    const cockCount = await prisma.users.aggregate({
        _sum: {
            cock: true,
        }
    });
    res.status(200).json({ count: userCount, yep: yepCount._sum.yep, cock: cockCount._sum.cock });
}

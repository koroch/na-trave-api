import { PrismaClient } from '@prisma/client'
import { addDays, formatISO } from 'date-fns'

const prisma = new PrismaClient()

export const list = async (cxt) => {

    const currentDate = cxt.request.query.gameTime;

    const where = currentDate ? {
        gameTime: {
            gte: currentDate,
            lt: formatISO(addDays(new Date(currentDate), 1))
        }
    } : {}

    try {
        const games = await prisma.game.findMany({
            where
        })
        cxt.body = games
        cxt.status = 200
    } catch (error) {
        console.log(error)
        cxt.body = error
        cxt.status = 500
    }
} 
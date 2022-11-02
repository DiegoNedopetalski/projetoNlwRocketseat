import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'testee',
            email: "test@prisma.iooo",
            avatarUrl: 'https://github.com/diego3g.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Test Pool',
            code: 'BA0021',
            ownerId: user.id,
            
            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.038A',
            firstTeamCountryCode: 'US',
            secondTeamCountryCode: 'AR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.038B',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 5,
                    secondTeamPoints: 3,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}
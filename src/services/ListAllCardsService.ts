import prismaClient from "../prisma";

class ListAllCardsService {
    async execute() {

        const cards = await prismaClient.card.findMany({
            include: {
                zerofees: true,
                rewards: true,
                mileages: true,
                lounges: true
            },
            orderBy: {
                issuer: 'desc',
            }
        });

        return cards;
    }
}

export { ListAllCardsService }
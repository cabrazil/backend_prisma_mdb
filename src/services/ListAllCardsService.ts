import prismaClient from "../prisma";

class ListAllCardsService {
    async execute() {

        const cards = await prismaClient.card.findMany({
            include: {
                zerofees: true,
                rewards: true
            },
        });

        return cards;
    }
}

export { ListAllCardsService }
import prismaClient from "../prisma";

class ListAllCardsService {
    async execute() {

        const cards = await prismaClient.card.findMany({
            include: {
                zerofees: true,
                cashbacks: true,
                rewards: true,
                mileages: true,
                lounges: true,
                exclusives: true,
                brand: true,
                issuer: true,
            },
            orderBy: {
                issuer_name: 'desc',
            }
        });

        return cards;
    }
}

export { ListAllCardsService }
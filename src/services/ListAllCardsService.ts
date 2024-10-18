import prismaClient from "../prisma";

class ListAllCardsService {
    async execute() {

        const minicards = await prismaClient.minicard.findMany({
            include: {
                zero_fees: true,
            },
        });

        return minicards;
    }
}

export { ListAllCardsService }
import prismaClient from "../prisma";

class ListAllCashbacksService {
  async execute() {

    const cashbacks = await prismaClient.card.findMany({
      include: {
        cashbacks: true
      }
    });

    return cashbacks;
  }
}

export { ListAllCashbacksService }
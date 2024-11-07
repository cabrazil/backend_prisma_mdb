import prismaClient from "../prisma";

class ListAllRewardsService {
  async execute() {

    const rewards = await prismaClient.card.findMany({
      include: {
        rewards: true
      }
    });

    return rewards;
  }
}

export { ListAllRewardsService }
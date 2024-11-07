import prismaClient from "../prisma";

class ListAllMileagesService {
  async execute() {

    const mileages = await prismaClient.card.findMany({
      include: {
        mileages: true
      }
    });

    return mileages;
  }
}

export { ListAllMileagesService }
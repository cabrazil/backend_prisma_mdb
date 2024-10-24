import prismaClient from "../prisma";

class ListAllZerofeesService {
  async execute() {

    const zerofees = await prismaClient.card.findMany({
      include: {
        zerofees: true
      }
    });

    return zerofees;
  }
}

export { ListAllZerofeesService }
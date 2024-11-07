import prismaClient from "../prisma";

class ListAllLoungesService {
  async execute() {

    const lounges = await prismaClient.card.findMany({
      include: {
        lounges: true
      }
    });

    return lounges;
  }
}

export { ListAllLoungesService }
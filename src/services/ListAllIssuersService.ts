import prismaClient from "../prisma";

class ListAllIssuersService {
  async execute() {

    const issuers = await prismaClient.issuer.findMany({

      orderBy: {
        issuer_name: 'asc',
      }
    })

    return issuers;
  }
}

export { ListAllIssuersService }
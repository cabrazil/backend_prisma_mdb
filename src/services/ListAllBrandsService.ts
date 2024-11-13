import prismaClient from "../prisma";

class ListAllBrandsService {
    async execute() {

        const brands = await prismaClient.brand.findMany({
            include: {
                cards: true
            }
        })

        return brands;
    }
}

export { ListAllBrandsService }
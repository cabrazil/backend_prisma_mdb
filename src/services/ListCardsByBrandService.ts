import prismaClient from "../prisma";

interface ListCardsByBrandProps {
    brand: string;
}


class ListCardsByBrandService {
    async execute({ brand }: ListCardsByBrandProps) {

        if (!brand) {
            throw new Error("Solicitação inválida.")
        }

        const cardsBrand = await prismaClient.card.findMany({
            where: {
                card_brand: brand
            }
        })

        if (!cardsBrand) {
            throw new Error("Bandeira inexistente!")

        }

        return cardsBrand;
    }
}

export { ListCardsByBrandService }
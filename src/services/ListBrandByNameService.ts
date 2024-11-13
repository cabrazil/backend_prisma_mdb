import prismaClient from "../prisma";

interface ListBrandByNameProps {
    brand: string;
    variant: string;
}

class ListBrandByNameService {
    async execute({ brand, variant }: ListBrandByNameProps) {

        if (!brand) {
            throw new Error("Solicitação inválida.")
        }

        const findBrand = await prismaClient.brand.findFirst({
            where: {
                AND: [
                    { brand_name: brand },
                    { variant_name: variant }
                ]
            }

        })

        if (!findBrand) {
            throw new Error("Bandeira do cartão não existe!")
        }

        return findBrand;
    }
}

export { ListBrandByNameService }
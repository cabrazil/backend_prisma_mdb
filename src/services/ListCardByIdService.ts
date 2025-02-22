import prismaClient from "../prisma";

interface ListCardByIdProps {
  id: string;
}

class ListCardByIdService {
  async execute({ id }: ListCardByIdProps) {

    if (!id) {
      throw new Error("Solicitação inválida.")
    }

    const cardId = await prismaClient.card.findFirst({
      include: {
        zerofees: true,
        cashbacks: true,
        rewards: true,
        mileages: true,
        lounges: true,
        exclusives: true,
        brand: true,
        issuer: true,
      },
      where: {
        AND: [
          { id: id },
        ]
      }
    })

    if (!cardId) {
      throw new Error("Cartão de Crédito inexistente!")

    }

    return cardId;
  }
}

export { ListCardByIdService }
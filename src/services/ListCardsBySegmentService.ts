import prismaClient from "../prisma";

interface ListCardsBySegmentProps {
  segment: "ENTRADA" | "ALTARENDA" | "INTERMEDIARIO";
  issuer: string;
}

class ListCardsBySegmentService {
  async execute({ segment, issuer }: ListCardsBySegmentProps) {

    if (!segment) {
      throw new Error("Solicitação inválida.")
    }

    const cardsSegment = await prismaClient.card.findMany({
      include: {
        zerofees: true,
        cashbacks: true,
        rewards: true,
        mileages: true,
        lounges: true,
        exclusives: true,
        requirements: true,
        brand: true,
        issuer: true,
      },
      where: {
        AND: [
          { segment: segment },
          { issuer_name: issuer }
        ]
      }
    })

    if (!cardsSegment) {
      throw new Error("Segmento inexistente!")

    }

    return cardsSegment;
  }
}

export { ListCardsBySegmentService }
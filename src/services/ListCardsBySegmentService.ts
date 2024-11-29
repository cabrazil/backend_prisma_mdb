import prismaClient from "../prisma";

interface ListCardsBySegmentProps {
  segment: "ENTRADA" | "ALTARENDA" | "INTERMEDIARIO"
}

class ListCardsBySegmentService {
  async execute({ segment }: ListCardsBySegmentProps) {

    if (!segment) {
      throw new Error("Solicitação inválida.")
    }

    const cardsSegment = await prismaClient.card.findMany({
      where: {
        segment: segment
      }
    })

    if (!cardsSegment) {
      throw new Error("Segmento inexistente!")

    }

    return cardsSegment;
  }
}

export { ListCardsBySegmentService }
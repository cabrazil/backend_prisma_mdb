import prismaClient from "../prisma";

interface ListCardsByExpenseProps {
  expense: number;
  issuer: string;
}

class ListCardsByExpenseService {
  async execute({ expense, issuer }: ListCardsByExpenseProps) {

    if (!expense) {
      throw new Error("Solicitação inválida.")
    }

    const expenseNumber = Number(expense);
    if (isNaN(expenseNumber)) {
      throw new Error("O parâmetro 'expense' deve ser um número válido.");
    }

    const cardsExpense = await prismaClient.card.findMany({
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
          { expense_code: expenseNumber },
          { issuer_name: issuer }
        ]
      }
    })

    if (!cardsExpense) {
      throw new Error("Expense code inexistente!")

    }

    return cardsExpense;
  }
}

export { ListCardsByExpenseService }
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCardsByExpenseService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListCardsByExpenseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ expense, issuer }) {
            if (!expense) {
                throw new Error("Solicitação inválida.");
            }
            const expenseNumber = Number(expense);
            if (isNaN(expenseNumber)) {
                throw new Error("O parâmetro 'expense' deve ser um número válido.");
            }
            const cardsExpense = yield prisma_1.default.card.findMany({
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
                        { expense_code: expenseNumber },
                        { issuer_name: issuer }
                    ]
                }
            });
            if (!cardsExpense) {
                throw new Error("Expense code inexistente!");
            }
            return cardsExpense;
        });
    }
}
exports.ListCardsByExpenseService = ListCardsByExpenseService;

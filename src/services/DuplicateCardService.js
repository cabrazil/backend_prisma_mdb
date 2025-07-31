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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateCard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const duplicateCard = (cardId, newBrandId, newIssuerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the existing card
        console.log(`🔍 Fetching card with ID: ${cardId}`);
        const existingCard = yield prisma.card.findUnique({
            where: { id: cardId },
        });
        if (!existingCard) {
            console.error("❌ Card not found");
            throw new Error("Card not found");
        }
        console.log("✅ Existing card found:", existingCard);
        // Remove `id` and `created_at` to allow Prisma to generate new values
        const { id, brandId, issuerId } = existingCard, newCardData = __rest(existingCard, ["id", "brandId", "issuerId"]);
        // Create the new duplicated card
        const newCard = yield prisma.card.create({
            data: Object.assign(Object.assign({}, newCardData), { brandId: newBrandId || brandId, issuerId: newIssuerId || issuerId }),
        });
        console.log("✅ New card created:", newCard);
        return newCard;
    }
    catch (error) {
        console.error("Error duplicating card:", error);
        throw error;
    }
});
exports.duplicateCard = duplicateCard;

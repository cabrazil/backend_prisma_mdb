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
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateCardHandler = void 0;
const DuplicateCardService_1 = require("../services/DuplicateCardService");
const duplicateCardHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Received request to duplicate card:", request.params.cardId, "with brandId:", request.body.brandId);
        const { cardId } = request.params;
        const { brandId, issuerId } = request.body; // Optional new brandId and IssuerId
        const newCard = yield (0, DuplicateCardService_1.duplicateCard)(cardId, brandId, issuerId);
        reply.send(newCard);
    }
    catch (error) {
        console.error("🔥 Fastify caught error:", error);
        reply.status(500).send({ error: "Failed to duplicate card" });
    }
});
exports.duplicateCardHandler = duplicateCardHandler;

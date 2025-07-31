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
exports.duplicateExclusiveHandler = void 0;
const DuplicateExclusiveService_1 = require("../services/DuplicateExclusiveService");
const duplicateExclusiveHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Received request to duplicate exclusive:", request.params.exclusiveId, "with cardId:", request.body.cardId);
        const { exclusiveId } = request.params;
        const { cardId } = request.body; // Optional new brandId and IssuerId
        const newexclusive = yield (0, DuplicateExclusiveService_1.duplicateExclusiveService)(exclusiveId, cardId);
        reply.send(newexclusive);
    }
    catch (error) {
        console.error("🔥 Fastify caught error:", error);
        reply.status(500).send({ error: "Failed to duplicate exclusive" });
    }
});
exports.duplicateExclusiveHandler = duplicateExclusiveHandler;

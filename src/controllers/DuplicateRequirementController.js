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
exports.duplicateRequirementHandler = void 0;
const DuplicateRequirementService_1 = require("../services/DuplicateRequirementService");
const duplicateRequirementHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Received request to duplicate requirement:", request.params.requirementId, "with cardId:", request.body.cardId);
        const { requirementId } = request.params;
        const { cardId } = request.body; // Optional new brandId and IssuerId
        const newrequirement = yield (0, DuplicateRequirementService_1.duplicateRequirementService)(requirementId, cardId);
        reply.send(newrequirement);
    }
    catch (error) {
        console.error("🔥 Fastify caught error:", error);
        reply.status(500).send({ error: "Failed to duplicate requirement" });
    }
});
exports.duplicateRequirementHandler = duplicateRequirementHandler;

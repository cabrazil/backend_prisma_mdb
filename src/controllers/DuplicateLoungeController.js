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
exports.duplicateLoungeHandler = void 0;
const DuplicateLoungeService_1 = require("../services/DuplicateLoungeService");
const duplicateLoungeHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Received request to duplicate lounge:", request.params.loungeId, "with cardId:", request.body.cardId);
        const { loungeId } = request.params;
        const { cardId } = request.body; // Optional new brandId and IssuerId
        const newlounge = yield (0, DuplicateLoungeService_1.duplicateLoungeService)(loungeId, cardId);
        reply.send(newlounge);
    }
    catch (error) {
        console.error("🔥 Fastify caught error:", error);
        reply.status(500).send({ error: "Failed to duplicate lounge" });
    }
});
exports.duplicateLoungeHandler = duplicateLoungeHandler;

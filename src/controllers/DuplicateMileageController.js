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
exports.duplicateMileageHandler = void 0;
const DuplicateMileageService_1 = require("../services/DuplicateMileageService");
const duplicateMileageHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔄 Received request to duplicate mileage:", request.params.mileageId, "with cardId:", request.body.cardId);
        const { mileageId } = request.params;
        const { cardId } = request.body; // Optional new brandId and IssuerId
        const newmileage = yield (0, DuplicateMileageService_1.duplicateMileageService)(mileageId, cardId);
        reply.send(newmileage);
    }
    catch (error) {
        console.error("🔥 Fastify caught error:", error);
        reply.status(500).send({ error: "Failed to duplicate mileage" });
    }
});
exports.duplicateMileageHandler = duplicateMileageHandler;

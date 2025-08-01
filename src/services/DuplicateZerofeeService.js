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
exports.duplicateZerofeeService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const duplicateZerofeeService = (zerofeeId, newCardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the existing zerofee
        console.log(`🔍 Fetching zerofee with ID: ${zerofeeId}`);
        const existingzerofee = yield prisma.zeroFee.findUnique({
            where: { id: zerofeeId },
        });
        if (!existingzerofee) {
            console.error("❌ zerofee not found");
            throw new Error("zerofee not found");
        }
        console.log("✅ Existing zerofee found:", existingzerofee);
        // Remove `id` and `created_at` to allow Prisma to generate new values
        const { id } = existingzerofee, newzerofeeData = __rest(existingzerofee, ["id"]);
        // Create the new duplicated zerofee
        const newzerofee = yield prisma.zeroFee.create({
            data: Object.assign(Object.assign({}, newzerofeeData), { CardId: newCardId }),
        });
        console.log("✅ New zerofee created:", newzerofee);
        return newzerofee;
    }
    catch (error) {
        console.error("Error duplicating zerofee:", error);
        throw error;
    }
});
exports.duplicateZerofeeService = duplicateZerofeeService;

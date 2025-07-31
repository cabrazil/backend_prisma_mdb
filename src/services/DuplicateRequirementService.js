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
exports.duplicateRequirementService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const duplicateRequirementService = (requirementId, newCardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the existing requirement
        console.log(`🔍 Fetching requirement with ID: ${requirementId}`);
        const existingrequirement = yield prisma.requirement.findUnique({
            where: { id: requirementId },
        });
        if (!existingrequirement) {
            console.error("❌ requirement not found");
            throw new Error("requirement not found");
        }
        console.log("✅ Existing requirement found:", existingrequirement);
        // Remove `id` and `created_at` to allow Prisma to generate new values
        const { id } = existingrequirement, newrequirementData = __rest(existingrequirement, ["id"]);
        // Create the new duplicated requirement
        const newrequirement = yield prisma.requirement.create({
            data: Object.assign(Object.assign({}, newrequirementData), { cardId: newCardId }),
        });
        console.log("✅ New requirement created:", newrequirement);
        return newrequirement;
    }
    catch (error) {
        console.error("Error duplicating requirement:", error);
        throw error;
    }
});
exports.duplicateRequirementService = duplicateRequirementService;

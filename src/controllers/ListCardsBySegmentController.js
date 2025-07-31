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
exports.ListCardsBySegmentController = void 0;
const ListCardsBySegmentService_1 = require("../services/ListCardsBySegmentService");
class ListCardsBySegmentController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { segment, issuer } = request.query;
            const listCardsBySegmentService = new ListCardsBySegmentService_1.ListCardsBySegmentService();
            const cards = yield listCardsBySegmentService.execute({ segment, issuer });
            reply.send(cards);
        });
    }
}
exports.ListCardsBySegmentController = ListCardsBySegmentController;

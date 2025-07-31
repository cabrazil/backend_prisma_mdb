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
const fastify_1 = __importDefault(require("fastify"));
// Configuração mínima para Vercel
const app = (0, fastify_1.default)({
    logger: true,
    trustProxy: true
});
// Health check básico
app.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 'ok', message: 'Server is running', timestamp: new Date().toISOString() };
}));
app.get('/teste', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { ok: true, message: 'Test endpoint working' };
}));
// Para desenvolvimento local
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const port = process.env.PORT || 3333;
        const host = process.env.VERCEL ? '0.0.0.0' : 'localhost';
        yield app.listen({ port: Number(port), host });
        console.log(`🚀 Server running on http://${host}:${port}`);
    }
    catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
});
// Iniciar apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    start();
}
// Para Vercel
exports.default = app;

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
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = __importDefault(require("./routes/routes")); // Updated to use the refactored routes
// Assuming other route files follow a similar pattern
const cardRoutes_1 = __importDefault(require("./routes/cardRoutes"));
const loungeRoutes_1 = __importDefault(require("./routes/loungeRoutes"));
const rewardRoutes_1 = __importDefault(require("./routes/rewardRoutes"));
const mileageRoutes_1 = __importDefault(require("./routes/mileageRoutes"));
const zerofeeRoutes_1 = __importDefault(require("./routes/zerofeeRoutes"));
const exclusiveRoutes_1 = __importDefault(require("./routes/exclusiveRoutes"));
// Configuration
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;
const HOST = process.env.HOST || '0.0.0.0';
// Server setup
const serverOptions = {
    logger: {
        level: process.env.LOG_LEVEL || 'info',
    },
};
const app = (0, fastify_1.default)(serverOptions);
// Error handling
app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    const statusCode = error.statusCode || 400;
    reply.status(statusCode).send({
        error: 'Bad Request',
        message: error.message,
        statusCode,
    });
});
// Register plugins and routes
function registerPluginsAndRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        yield app.register(cors_1.default, {
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST', 'DELETE'],
        });
        // Register all route modules
        yield Promise.all([
            app.register(routes_1.default),
            app.register(cardRoutes_1.default),
            app.register(loungeRoutes_1.default),
            app.register(rewardRoutes_1.default),
            app.register(mileageRoutes_1.default),
            app.register(zerofeeRoutes_1.default),
            app.register(exclusiveRoutes_1.default),
        ]);
    });
}
// Start server
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield registerPluginsAndRoutes();
            yield app.listen({ port: PORT, host: HOST });
            app.log.info(`🚀 Server running on http://${HOST}:${PORT}`);
        }
        catch (err) {
            app.log.error('Server startup failed:', err);
            process.exit(1);
        }
    });
}
// Graceful shutdown
function shutdown() {
    return __awaiter(this, void 0, void 0, function* () {
        app.log.info('Shutting down server...');
        yield app.close();
        process.exit(0);
    });
}
// Handle process signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
// Start the server
start().catch((err) => {
    app.log.error('Unexpected error during startup:', err);
    process.exit(1);
});
exports.default = app; // For testing or other purposes

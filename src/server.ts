import Fastify from 'fastify';
import { routes } from './routes/routes';
import cardRoutes from './routes/cardRoutes';
import cors from '@fastify/cors';

// Configuração otimizada para Vercel - Deploy Test2
const app = Fastify({ 
  logger: process.env.NODE_ENV !== 'production' 
})

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message })
})

// Registrar CORS
app.register(cors, {
  origin: true,
  credentials: true
});

// Registrar apenas as rotas essenciais primeiro
const registerEssentialRoutes = async () => {
    await app.register(routes);
    await app.register(cardRoutes);
}

const start = async () => {
    try {
        // Registrar rotas essenciais primeiro
        await registerEssentialRoutes();
        
        const port = process.env.PORT || 3333;
        const host = process.env.VERCEL ? '0.0.0.0' : 'localhost';
        
        await app.listen({ port: Number(port), host })
        console.log(`🚀 Server running on http://${host}:${port}`);
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1)
    }
}

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    start();
}

// Para Vercel
export default app;
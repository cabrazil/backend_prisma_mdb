import Fastify from 'fastify';
import { routes } from './routes/routes';
import cardRoutes from './routes/cardRoutes';
import cors from '@fastify/cors';

// Configuração otimizada para Vercel
const app = Fastify({ 
  logger: false, // Desabilitar logger em produção para melhor performance
  trustProxy: true // Necessário para Vercel
})

app.setErrorHandler((error, request, reply) => {
    console.error('Server error:', error);
    reply.code(500).send({ message: 'Internal server error' })
})

// Registrar CORS
app.register(cors, {
  origin: true,
  credentials: true
});

// Registrar rotas
app.register(routes);
app.register(cardRoutes);

// Para Vercel - não iniciar automaticamente
export default app;
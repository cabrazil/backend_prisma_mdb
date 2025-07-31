import Fastify from 'fastify';

// Configuração mínima para Vercel
const app = Fastify({ 
  logger: true,
  trustProxy: true
})

// Health check básico
app.get('/', async (request, reply) => {
  return { status: 'ok', message: 'Server is running', timestamp: new Date().toISOString() }
})

app.get('/teste', async (request, reply) => {
  return { ok: true, message: 'Test endpoint working' }
})

// Para desenvolvimento local
const start = async () => {
    try {
        const port = process.env.PORT || 3333;
        const host = process.env.VERCEL ? '0.0.0.0' : 'localhost';
        
        await app.listen({ port: Number(port), host })
        console.log(`🚀 Server running on http://${host}:${port}`);
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1)
    }
}

// Iniciar apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    start();
}

// Para Vercel
export default app;
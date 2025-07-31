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

// Para Vercel
export default app;
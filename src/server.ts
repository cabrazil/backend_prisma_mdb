import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

// Inicializar Prisma com debug
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Testar conexão
console.log('Prisma Client initialized:', !!prisma);

// Configuração para desenvolvimento local
const app = Fastify({ 
  logger: true,
  trustProxy: true
})

// Registrar CORS
app.register(cors, {
  origin: true,
  credentials: true
});

// Health check básico
app.get('/', async (request, reply) => {
  return { status: 'ok', message: 'Server is running', timestamp: new Date().toISOString() }
})

app.get('/teste', async (request, reply) => {
  return { ok: true, message: 'Test endpoint working' }
})

app.get('/test-env', async (request, reply) => {
  return { 
    hasDatabase: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    databaseUrlLength: process.env.DATABASE_URL?.length || 0
  }
})

// Listar instituições
app.get('/issuers', async (request, reply) => {
  try {
    console.log('Buscando issuers no MongoDB...');
    
    // Buscar dados direto do MongoDB
    const result = await prisma.$runCommandRaw({
      find: 'issuers',
      sort: { issuer_name: 1 }
    });
    
    // Extrair dados do cursor MongoDB
    const issuers = (result as any).cursor.firstBatch.map((item: any) => ({
      id: item._id.$oid,
      issuer_name: item.issuer_name,
      issuer_type: item.issuer_type
    }));
    
    console.log('Issuers encontrados:', issuers.length);
    return issuers;
    
  } catch (dbError) {
    console.error('Erro no banco:', dbError);
    reply.code(500);
    return { 
      error: 'Database error', 
      details: dbError instanceof Error ? dbError.message : 'Unknown error' 
    };
  }
})

// Buscar cartões por segmento
app.get('/cards/segment/:segment', async (request: any, reply) => {
  try {
    const { segment } = request.params;
    
    const cards = await prisma.creditcards.findMany({
      where: {
        expense_segment: segment
      },
      select: {
        id: true,
        card_name: true,
        issuer_name: true,
        expense_segment: true,
        brand: true
      }
    });
    
    return cards;
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    reply.code(500);
    return { error: 'Database error' };
  }
})

// Detalhes do cartão
app.get('/cards/:cardId', async (request: any, reply) => {
  try {
    const { cardId } = request.params;
    
    const card = await prisma.creditcards.findUnique({
      where: {
        id: cardId
      },
      include: {
        requirements: true,
        zerofee: true,
        rewards: true,
        mileages: true,
        cashback: true,
        viplounge: true,
        cardbenefits: true,
        brandbenefits: true
      }
    });
    
    if (!card) {
      reply.code(404);
      return { error: 'Card not found' };
    }
    
    return card;
  } catch (error) {
    console.error('Erro ao buscar cartão:', error);
    reply.code(500);
    return { error: 'Database error' };
  }
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
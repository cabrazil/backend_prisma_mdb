import { PrismaClient } from '@prisma/client'

// Inicializar Prisma
const prisma = new PrismaClient()

// Handler principal para Vercel
export default async function handler(req: any, res: any) {
  console.log('Handler chamado:', req.method, req.url);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    // Health check endpoints
    if (req.url === '/teste') {
      res.status(200).json({ ok: true, message: 'Test endpoint working' });
      return;
    }
    
    if (req.url === '/') {
      res.status(200).json({ 
        status: 'ok', 
        message: 'Server is running', 
        timestamp: new Date().toISOString() 
      });
      return;
    }
    
    // Listar instituições
    if (req.url === '/issuers') {
      const issuers = await prisma.issuers.findMany({
        select: {
          id: true,
          issuer_name: true,
          issuer_type: true
        },
        orderBy: {
          issuer_name: 'asc'
        }
      });
      
      res.status(200).json(issuers);
      return;
    }
    
    // Buscar cartões por segmento
    if (req.url?.startsWith('/cards/segment/')) {
      const segment = req.url.split('/cards/segment/')[1];
      
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
      
      res.status(200).json(cards);
      return;
    }
    
    // Detalhes do cartão
    if (req.url?.startsWith('/cards/')) {
      const cardId = req.url.split('/cards/')[1];
      
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
        res.status(404).json({ error: 'Card not found' });
        return;
      }
      
      res.status(200).json(card);
      return;
    }
    
    // 404 para outras rotas
    res.status(404).json({ error: 'Not found' });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
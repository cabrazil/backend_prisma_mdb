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
    
    if (req.url === '/test-env') {
      res.status(200).json({ 
        hasDatabase: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV,
        databaseUrlLength: process.env.DATABASE_URL?.length || 0
      });
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
        res.status(200).json(issuers);
        return;
      } catch (dbError) {
        console.error('Erro no banco:', dbError);
        res.status(500).json({ 
          error: 'Database error', 
          details: dbError instanceof Error ? dbError.message : 'Unknown error' 
        });
        return;
      }
    }
    
    // Buscar cartões por segmento
    if (req.url?.startsWith('/cards/segment/')) {
      const segment = req.url.split('/cards/segment/')[1];
      
      try {
        console.log('Buscando cartões por segmento:', segment);
        
        // Buscar cartões direto do MongoDB
        const result = await prisma.$runCommandRaw({
          find: 'cards',
          filter: { segment: segment }
        });
        
        // Extrair dados do cursor MongoDB
        const cards = (result as any).cursor.firstBatch.map((item: any) => ({
          id: item._id.$oid,
          card_name: item.card_name,
          issuer_name: item.issuer_name,
          segment: item.segment,
          card_brand: item.card_brand,
          annual_fee: item.annual_fee
        }));
        
        console.log('Cartões encontrados:', cards.length);
        res.status(200).json(cards);
        return;
      } catch (dbError) {
        console.error('Erro ao buscar cartões:', dbError);
        res.status(500).json({ 
          error: 'Database error', 
          details: dbError instanceof Error ? dbError.message : 'Unknown error' 
        });
        return;
      }
    }
    
    // Detalhes do cartão
    if (req.url?.startsWith('/cards/')) {
      const cardId = req.url.split('/cards/')[1];
      
      try {
        console.log('Buscando detalhes do cartão:', cardId);
        
        // Buscar cartão direto do MongoDB
        const result = await prisma.$runCommandRaw({
          find: 'cards',
          filter: { _id: { $oid: cardId } }
        });
        
        if ((result as any).cursor.firstBatch.length === 0) {
          res.status(404).json({ error: 'Card not found' });
          return;
        }
        
        const card = (result as any).cursor.firstBatch[0];
        
        // Formatar resposta com dados principais
        const cardDetails = {
          id: card._id.$oid,
          card_name: card.card_name,
          issuer_name: card.issuer_name,
          segment: card.segment,
          card_brand: card.card_brand,
          annual_fee: card.annual_fee,
          category: card.category,
          international_card: card.international_card,
          virtual_cards: card.virtual_cards,
          contactless: card.contactless,
          card_material: card.card_material,
          ranking_points: card.ranking_points,
          ranking_benefits: card.ranking_benefits,
          ranking_annuity: card.ranking_annuity,
          ranking_miles_program: card.ranking_miles_program
        };
        
        console.log('Cartão encontrado:', card.card_name);
        res.status(200).json(cardDetails);
        return;
      } catch (dbError) {
        console.error('Erro ao buscar cartão:', dbError);
        res.status(500).json({ 
          error: 'Database error', 
          details: dbError instanceof Error ? dbError.message : 'Unknown error' 
        });
        return;
      }
    }
    
    // 404 para outras rotas
    res.status(404).json({ error: 'Not found' });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
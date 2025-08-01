import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

// Inicializar Prisma com debug
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Testar conexão
console.log('Prisma Client initialized:', !!prisma);

// Helper para converter dados do MongoDB
function convertMongoData(data: any) {
  if (data?.$date) return data.$date;
  if (data?.$oid) return data.$oid;
  if (Array.isArray(data)) return data.map(convertMongoData);
  if (data && typeof data === 'object') {
    const converted: any = {};
    for (const [key, value] of Object.entries(data)) {
      converted[key] = convertMongoData(value);
    }
    return converted;
  }
  return data;
}

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

// Endpoint para compatibilidade com frontend (search)
app.get('/cardexpense', async (request: any, reply) => {
  try {
    const { expense, issuer } = request.query;
    console.log('Buscando cartões - expense:', expense, 'issuer:', issuer);
    
    // Mapear expense para segment
    const segmentMap: { [key: string]: string } = {
      '5': 'ALTARENDA',
      '4': 'INTERMEDIARIO',
      '3': 'ENTRADA',
    };
    
    const segment = segmentMap[expense || '5'] || 'ALTARENDA';
    
    // Buscar cartões direto do MongoDB
    let filter: any = { segment: segment };
    
    // Se instituição especificada, filtrar também
    if (issuer && issuer !== 'all') {
      filter.issuer_name = issuer;
    }
    
    const result = await prisma.$runCommandRaw({
      find: 'cards',
      filter: filter
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
    return cards;
  } catch (dbError) {
    console.error('Erro ao buscar cartões:', dbError);
    reply.code(500);
    return { 
      error: 'Database error', 
      details: dbError instanceof Error ? dbError.message : 'Unknown error' 
    };
  }
})

// Endpoint para detalhes do cartão (compatibilidade)
app.get('/cardid', async (request: any, reply) => {
  try {
    const { id: cardId } = request.query;
    
    if (!cardId) {
      reply.code(400);
      return { error: 'Missing card ID' };
    }
    
    console.log('Buscando detalhes do cartão (endpoint antigo):', cardId);
    
    // Buscar cartão direto do MongoDB
    const result = await prisma.$runCommandRaw({
      find: 'cards',
      filter: { _id: { $oid: cardId } }
    });
    
    if ((result as any).cursor.firstBatch.length === 0) {
      reply.code(404);
      return { error: 'Card not found' };
    }
    
    const card = (result as any).cursor.firstBatch[0];
    
    // Estrutura completa esperada pelo frontend (igual ao Vercel)
    const cardDetails = {
      id: card._id,
      created_at: card.created_at || new Date().toISOString(),
      updated_at: card.updated_at || new Date().toISOString(),
      card_name: card.card_name,
      annual_fee: card.annual_fee || 0,
      card_brand: card.card_brand,
      category: card.category,
      ranking_points: card.ranking_points || 0,
      ranking_benefits: card.ranking_benefits || 0,
      ranking_annuity: card.ranking_annuity || 0,
      ranking_miles_program: card.ranking_miles_program || 0,
      virtual_wallets: card.virtual_wallets || [],
      card_material: card.card_material || '',
      contactless: card.contactless || false,
      spread_on: card.spread_on || '',
      cashback: card.cashback || '',
      international_card: card.international_card || false,
      card_modality: card.card_modality || '',
      vip_lounge_app: card.vip_lounge_app || '',
      spread_rate: card.spread_rate || 0,
      iof_rate: card.iof_rate || 0,
      ranking_vip_lounges: card.ranking_vip_lounges || 0,
      src_card_picture: card.src_card_picture || '',
      segment: card.segment,
      issuer_name: card.issuer_name,
      points_expire: card.points_expire || false,
      obs_system_points: card.obs_system_points || [],
      virtual_cards: card.virtual_cards || false,
      points_accelerator: card.points_accelerator || false,
      obs_summary: card.obs_summary || [],
      expense_code: card.expense_code || 0,
      additional_info: card.additional_info || [],
      is_debit: card.is_debit || false,

      // Arrays de objetos aninhados
      zerofees: card.zerofees || [],
      cashbacks: card.cashbacks || [],
      rewards: card.rewards || [],
      mileages: card.mileages || [],
      lounges: card.lounges || [],

      // Objetos únicos
      exclusives: card.exclusives || {
        id: '',
        tag_name: '',
        tag_amount: 0,
        exclusive_offers: [],
        additional_info: []
      },
      requirements: card.requirements || {
        id: '',
        account_holder: false,
        add_cards_amount: 0,
        obs_add_cards: '',
        add_cards_charge: 0,
        card_limit: '',
        get_conditions: [],
        notes: [],
        req_tips: []
      },
      brand: card.brand || {
        id: '',
        brand_name: card.card_brand || '',
        variant_name: '',
        general_benefits: [],
        isActive: false,
        site_info: ''
      },
      issuer: card.issuer || {
        id: '',
        issuer_name: card.issuer_name || '',
        issuer_type: '',
        created_at: new Date().toISOString()
      },
      brandId: card.brandId || '',
      issuerId: card.issuerId || ''
    };
    
    console.log('Cartão encontrado (endpoint antigo):', card.card_name);
    return cardDetails;
  } catch (dbError) {
    console.error('Erro ao buscar cartão (endpoint antigo):', dbError);
    reply.code(500);
    return { 
      error: 'Database error', 
      details: dbError instanceof Error ? dbError.message : 'Unknown error' 
    };
  }
})

// Buscar cartões por segmento (compatível com Vercel)
app.get('/cards/segment/:segment', async (request: any, reply) => {
  try {
    const { segment } = request.params;
    console.log('Buscando cartões por segmento:', segment);
    
    // Buscar cartões direto do MongoDB (igual ao Vercel)
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
    return cards;
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    reply.code(500);
    return { error: 'Database error' };
  }
})

// Detalhes do cartão (compatível com Vercel)
app.get('/cards/:cardId', async (request: any, reply) => {
  try {
    const { cardId } = request.params;
    console.log('Buscando detalhes do cartão:', cardId);
    
    // Buscar cartão com todas as relações usando Prisma ORM
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: {
        brand: true,
        issuer: true,
        zerofees: true,
        cashbacks: true,
        rewards: true,
        mileages: true,
        lounges: true,
        exclusives: true,
        requirements: true
      }
    });
    
    if (!card) {
      reply.code(404);
      return { error: 'Card not found' };
    }
    
    // Estrutura completa esperada pelo frontend usando dados do Prisma
    const cardDetails = {
      id: card.id,
      created_at: card.created_at?.toISOString() || new Date().toISOString(),
      updated_at: card.updated_at?.toISOString() || new Date().toISOString(),
      card_name: card.card_name,
      annual_fee: card.annual_fee || 0,
      card_brand: card.card_brand,
      category: card.category,
      ranking_points: card.ranking_points || 0,
      ranking_benefits: card.ranking_benefits || 0,
      ranking_annuity: card.ranking_annuity || 0,
      ranking_miles_program: card.ranking_miles_program || 0,
      virtual_wallets: card.virtual_wallets || [],
      card_material: card.card_material || '',
      contactless: card.contactless || false,
      spread_on: card.spread_on || '',
      cashback: card.cashback || '',
      international_card: card.international_card || false,
      card_modality: card.card_modality || '',
      vip_lounge_app: card.vip_lounge_app || '',
      spread_rate: card.spread_rate || 0,
      iof_rate: card.iof_rate || 0,
      ranking_vip_lounges: card.ranking_vip_lounges || 0,
      src_card_picture: card.src_card_picture || '',
      segment: card.segment,
      issuer_name: card.issuer_name,
      points_expire: card.points_expire || false,
      obs_system_points: card.obs_system_points || [],
      virtual_cards: card.virtual_cards || false,
      points_accelerator: card.points_accelerator || false,
      obs_summary: card.obs_summary || [],
      expense_code: card.expense_code || 0,
      additional_info: card.additional_info || [],
      is_debit: card.is_debit || false,

      // Arrays de objetos aninhados
      zerofees: card.zerofees || [],
      cashbacks: card.cashbacks || [],
      rewards: card.rewards || [],
      mileages: card.mileages || [],
      lounges: card.lounges || [],

      // Objetos únicos
      exclusives: card.exclusives || {
        id: '',
        tag_name: '',
        tag_amount: 0,
        exclusive_offers: [],
        additional_info: []
      },
      requirements: card.requirements || {
        id: '',
        account_holder: false,
        add_cards_amount: 0,
        obs_add_cards: '',
        add_cards_charge: 0,
        card_limit: '',
        get_conditions: [],
        notes: [],
        req_tips: []
      },
      brand: card.brand || {
        id: '',
        brand_name: card.card_brand || '',
        variant_name: '',
        general_benefits: [],
        isActive: false,
        site_info: ''
      },
      issuer: card.issuer || {
        id: '',
        issuer_name: card.issuer_name || '',
        issuer_type: '',
        created_at: new Date().toISOString()
      },
      brandId: card.brandId || '',
      issuerId: card.issuerId || ''
    };
    
    console.log('Cartão encontrado:', card.card_name);
    return cardDetails;
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
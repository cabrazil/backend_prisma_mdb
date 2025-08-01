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
    
    // Endpoint antigo para compatibilidade com frontend
    if (req.url?.startsWith('/cardexpense')) {
      try {
        const url = new URL(req.url, 'https://dummy.com');
        const expense = url.searchParams.get('expense');
        const issuer = url.searchParams.get('issuer');
        
        console.log('Buscando cartões - expense:', expense, 'issuer:', issuer);
        
        // Mapear expense para segment
        const segmentMap: { [key: string]: string } = {
          '5': 'ALTARENDA',      // expense=5 → ALTARENDA
          '4': 'INTERMEDIARIO',  // expense=4 → INTERMEDIARIO  
          '3': 'ENTRADA',        // expense=3 → ENTRADA
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
    
    // Endpoint antigo para detalhes do cartão (compatibilidade)
    if (req.url?.startsWith('/cardid')) {
      try {
        const url = new URL(req.url, 'https://dummy.com');
        const cardId = url.searchParams.get('id');
        
        if (!cardId) {
          res.status(400).json({ error: 'Missing card ID' });
          return;
        }
        
        console.log('Buscando detalhes do cartão (endpoint antigo):', cardId);
        
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
        
        // Estrutura completa esperada pelo frontend
        const cardDetails = {
          id: card._id.$oid,
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
        res.status(200).json(cardDetails);
        return;
      } catch (dbError) {
        console.error('Erro ao buscar cartão (endpoint antigo):', dbError);
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
        
        // Estrutura completa esperada pelo frontend
        const cardDetails = {
          id: card._id.$oid,
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
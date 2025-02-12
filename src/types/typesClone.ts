import { PrismaClient } from '@prisma/client'

export interface CloneRequestParams {
  model: {
    card_name: string;
    annual_fee: number;
    card_brand: string;
    category: string;
    card_limit: string;
    ranking_points: number;
    ranking_benefits: number;
    ranking_annuity: number;
    ranking_miles_program: number;
    virtual_wallets: string[];
    add_cards_amount: number;
    add_cards_charge: number;
    card_material: string;
    contactless: boolean;
    get_conditions: string[];
    spread_on: string;
    cashback: string;
    obs_add_cards: string;
    obs_cashback: string[];
    account_holder: boolean;
    international_card: boolean;
    card_modality: string;
    vip_lounge_app: string;
    spread_rate: number;
    iof_rate: number;
    ranking_vip_lounges: number;
    src_card_picture: string;
    segment: string;
    issuer_name: string;
    points_expire: boolean;
    obs_system_points: string[];
    virtual_cards: boolean;
    points_accelerator: boolean;
    brandId: string;
    issuerId: string;
  }
  id: string;
}

export interface CloneRequestBody {
  overrides?: Record<string, any>
}

export interface FastifyInstance {
  prisma: PrismaClient
}
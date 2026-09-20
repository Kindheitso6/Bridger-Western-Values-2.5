export type TierLevel = 'S+' | 'S' | 'S-' | 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C' | 'D';

export type DemandRating = 'Insana' | 'Muito Alta' | 'Alta' | 'Média-Alta' | 'Média' | 'Média-Baixa' | 'Baixa' | 'Muito Baixa';

export interface StandItem {
  id: string;
  name: string;
  abbreviation: string;
  tier: TierLevel;
  acceptanceRate: number; // e.g. 6.7, 9.8, etc.
  demand: DemandRating;
  demandScore: number; // 1-10
  valueScore: number; // Pontos para calculadora de trade (ex: 12000)
  moolaValue: string;
  rarity: 'Mítico' | 'Lendário' | 'Raro' | 'Comum' | 'Evoluído';
  method: string;
  abilities: string[];
  description: string;
  imageUrl: string;
  category: 'stand';
  isEvolved?: boolean;
  evolvesFrom?: string;
  status: 'Disponível' | 'Difícil' | 'Evento';
}

export interface SkinItem {
  id: string;
  name: string;
  standBase: string;
  standAbbreviation: string;
  tier: TierLevel;
  rarity: 'Mítica' | 'Lendária' | 'Épica' | 'Rara' | 'Incomum';
  demandScore: number;
  acceptanceRate: number;
  valueScore: number;
  imageUrl: string;
  description: string;
  isLimited?: boolean;
}

export interface PassiveCardItem {
  id: string;
  name: string;
  tier: TierLevel;
  effect: string;
  costMoola: number;
  location: string;
  demandScore: number;
  acceptanceRate: number;
  valueScore: number;
  isFauxAvailable: boolean;
  bestSynergy: string[];
  category: 'Dano' | 'Sobrevivência' | 'Mobilidade' | 'Utilidade';
  imageUrl: string;
}

export interface RemovedItem {
  id: string;
  name: string;
  type: 'Stand Removido' | 'Mecânica Removida' | 'Arma / Item Removido' | 'Habilidade Alterada';
  lastSeenVersion: string;
  removalReason: string;
  description: string;
  impactOnMeta: string;
  imageUrl: string;
}

export type ActiveTab = 'stands' | 'skins' | 'cards' | 'removed' | 'calculator' | 'videos';

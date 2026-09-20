import { useState, useMemo } from 'react';
import { PassiveCardItem, TierLevel } from '../types';
import { PASSIVE_CARDS_DATA } from '../data/cardsData';
import { getTierBadgeStyle } from '../utils/tierStyles';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Coins, 
  Plus, 
  Flame, 
  ShieldAlert, 
  Zap, 
  HeartHandshake 
} from 'lucide-react';

interface PassiveCardsListProps {
  searchQuery: string;
  onAddToTrade?: (item: any, side: 'you' | 'them') => void;
}

export function PassiveCardsList({ searchQuery, onAddToTrade }: PassiveCardsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<TierLevel | 'ALL'>('ALL');

  const filteredCards = useMemo(() => {
    return PASSIVE_CARDS_DATA.filter((card) => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.effect.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bestSynergy.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'ALL' || card.category === selectedCategory;
      const matchesTier = selectedTier === 'ALL' || card.tier === selectedTier;

      return matchesSearch && matchesCat && matchesTier;
    });
  }, [searchQuery, selectedCategory, selectedTier]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-stone-900/60 border border-amber-900/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-amber-200 uppercase tracking-wide font-serif">
                Cartas de Passiva (Mud Witch - Pântano)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              As cartas concedem efeitos passivos cruciais para PvP e sobrevivência. Obtidas na cabana da Bruxa da Lama (Mud Witch) 
              por 150 Moola a revelação de sorte. É possível equipar até 3 cartas em seu personagem.
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs text-stone-300 shrink-0">
            <span className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800">
              Custo da Bruxa: <strong className="text-amber-400">150 Moola</strong>
            </span>
            <span className="text-[11px] text-stone-400">Suporta Cartas FAUX</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 p-3.5 rounded-xl border border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-stone-400 mr-1">Categoria:</span>
          {['ALL', 'Dano', 'Sobrevivência', 'Mobilidade', 'Utilidade'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {cat === 'ALL' ? 'Todas' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-xs font-semibold text-stone-400 mr-1">Tier:</span>
          {(['ALL', 'S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'C'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-2 py-0.5 text-xs font-mono font-bold rounded-md transition-all ${
                selectedTier === tier
                  ? 'bg-amber-400 text-stone-950'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => {
          const tierStyle = getTierBadgeStyle(card.tier);

          return (
            <div
              key={card.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-md"
            >
              {/* Card Header */}
              <div className="p-3 bg-stone-950/60 border-b border-stone-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs border uppercase font-mono ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
                    Tier {card.tier}
                  </span>
                  <span className="text-[11px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                    {card.category}
                  </span>
                </div>

                {card.isFauxAvailable && (
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-1.5 py-0.5 rounded" title="Versão FAUX compatível com bônus dobrado">
                    FAUX OK
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {card.name}
                </h3>

                <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/70 p-3 rounded-lg border border-stone-800/60">
                  {card.effect}
                </p>

                {/* Best synergies */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Melhor Sinergia:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {card.bestSynergy.map((syn, idx) => (
                      <span key={idx} className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.5 rounded border border-stone-700/60">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats & Trade Footer */}
              <div className="px-4 py-2 bg-stone-950/40 border-t border-stone-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-stone-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aceitação: <strong className="text-emerald-400 font-mono">{card.acceptanceRate.toFixed(1)}/10</strong></span>
                </div>
                <div className="text-stone-400">
                  Demanda: <strong className="text-amber-300 font-mono">{card.demandScore}/10</strong>
                </div>
              </div>

              <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-stone-300">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono font-bold text-amber-300">{card.valueScore.toLocaleString()} pts</span>
                </div>

                {onAddToTrade && (
                  <button
                    onClick={() => onAddToTrade({
                      id: card.id,
                      name: `Carta: ${card.name}`,
                      tier: card.tier,
                      valueScore: card.valueScore,
                      acceptanceRate: card.acceptanceRate,
                      imageUrl: card.imageUrl,
                      type: 'card'
                    }, 'you')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Adicionar</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

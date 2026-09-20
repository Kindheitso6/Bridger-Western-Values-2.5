import { useState, useMemo } from 'react';
import { SkinItem, TierLevel } from '../types';
import { SKINS_DATA } from '../data/skinsData';
import { ImageWithFallback } from './ImageWithFallback';
import { getTierBadgeStyle } from '../utils/tierStyles';
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  Plus, 
  Flame, 
  Lock 
} from 'lucide-react';

interface SkinListProps {
  searchQuery: string;
  onAddToTrade?: (item: any, side: 'you' | 'them') => void;
}

export function SkinList({ searchQuery, onAddToTrade }: SkinListProps) {
  const [selectedTier, setSelectedTier] = useState<TierLevel | 'ALL'>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');

  const filteredSkins = useMemo(() => {
    return SKINS_DATA.filter((skin) => {
      const matchesSearch = 
        skin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skin.standBase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skin.standAbbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skin.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = selectedTier === 'ALL' || skin.tier === selectedTier;
      const matchesRarity = selectedRarity === 'ALL' || skin.rarity === selectedRarity;

      return matchesSearch && matchesTier && matchesRarity;
    });
  }, [searchQuery, selectedTier, selectedRarity]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-stone-900/60 border border-amber-900/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-amber-200 uppercase tracking-wide font-serif">
                Catálogo de Skins de Stands (Trading Update)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              As skins de Stands em Bridger Western são cosméticos raríssimos obtidos ao absorver Partes do Cadáver,
              usar Fragmentos de Flecha ou em Rerolls a partir do Tier 3. Algumas possuem auras cósmicas e efeitos únicos de partículas.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 shrink-0">
            Total de Skins: <strong className="text-amber-400">{SKINS_DATA.length}</strong>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 p-3.5 rounded-xl border border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-stone-400 mr-1">Filtrar Tier:</span>
          {(['ALL', 'S+', 'S', 'S-', 'A+', 'A', 'A-', 'B', 'C'] as const).map(tier => {
            const isSelected = selectedTier === tier;
            return (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {tier === 'ALL' ? 'Todos' : tier}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 font-semibold">Raridade:</span>
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="bg-stone-950 text-stone-200 border border-stone-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Todas as Raridades</option>
            <option value="Mítica">Mítica</option>
            <option value="Lendária">Lendária</option>
            <option value="Épica">Épica</option>
            <option value="Rara">Rara</option>
            <option value="Incomum">Incomum</option>
          </select>
        </div>
      </div>

      {/* Skins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkins.map((skin) => {
          const tierStyle = getTierBadgeStyle(skin.tier);

          return (
            <div
              key={skin.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-md"
            >
              {/* Header */}
              <div className="p-3 bg-stone-950/60 border-b border-stone-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs border uppercase font-mono ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
                    Tier {skin.tier}
                  </span>
                  <span className="text-xs font-mono font-bold bg-stone-800 text-amber-300 px-2 py-0.5 rounded border border-stone-700">
                    {skin.standAbbreviation}
                  </span>
                </div>
                {skin.isLimited && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-500/40">
                    <Lock className="w-2.5 h-2.5" />
                    Limitada
                  </span>
                )}
              </div>

              {/* Main Content */}
              <div className="p-4 flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-950 border border-stone-800 shrink-0 flex items-center justify-center p-1">
                  <ImageWithFallback
                    src={skin.imageUrl}
                    alt={skin.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    fallbackText={skin.standAbbreviation}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                    {skin.name}
                  </h3>
                  <p className="text-[11px] text-amber-400/80 font-medium">
                    Base: {skin.standBase}
                  </p>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                    {skin.description}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="px-4 py-2 bg-stone-950/50 border-t border-stone-800/60 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 text-stone-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aceit: <strong className="text-emerald-400 font-mono">{skin.acceptanceRate.toFixed(1)}/10</strong></span>
                </div>
                <div className="flex items-center gap-1 text-stone-400">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>Demanda: <strong className="text-amber-300 font-mono">{skin.demandScore}/10</strong></span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-stone-300">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono font-bold text-amber-300">{skin.valueScore.toLocaleString()} pts</span>
                </div>

                {onAddToTrade && (
                  <button
                    onClick={() => onAddToTrade({
                      id: skin.id,
                      name: `${skin.name} (${skin.standAbbreviation})`,
                      tier: skin.tier,
                      valueScore: skin.valueScore,
                      acceptanceRate: skin.acceptanceRate,
                      imageUrl: skin.imageUrl,
                      type: 'skin'
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

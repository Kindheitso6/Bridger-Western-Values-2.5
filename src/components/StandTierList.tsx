import { useState, useMemo } from 'react';
import { StandItem, TierLevel } from '../types';
import { STANDS_DATA } from '../data/standsData';
import { StandCard } from './StandCard';
import { StandDetailModal } from './StandDetailModal';
import { getTierBadgeStyle } from '../utils/tierStyles';
import { 
  Filter, 
  ArrowUpDown, 
  Layers, 
  Grid3X3, 
  Sparkles, 
  HelpCircle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface StandTierListProps {
  searchQuery: string;
  onAddToTrade?: (stand: StandItem, side: 'you' | 'them') => void;
}

const ALL_TIERS: TierLevel[] = ['S+', 'S', 'S-', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C', 'D'];

export function StandTierList({ searchQuery, onAddToTrade }: StandTierListProps) {
  const [selectedTier, setSelectedTier] = useState<TierLevel | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'tier' | 'acceptance' | 'demand' | 'value'>('tier');
  const [viewMode, setViewMode] = useState<'tier-rows' | 'grid'>('tier-rows');
  const [activeModalStand, setActiveModalStand] = useState<StandItem | null>(null);

  // Filtered stands
  const filteredStands = useMemo(() => {
    return STANDS_DATA.filter((stand) => {
      const matchesSearch = 
        stand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stand.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stand.rarity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stand.abilities.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTier = selectedTier === 'ALL' || stand.tier === selectedTier;

      return matchesSearch && matchesTier;
    });
  }, [searchQuery, selectedTier]);

  // Sorted stands
  const sortedStands = useMemo(() => {
    const list = [...filteredStands];

    if (sortBy === 'acceptance') {
      return list.sort((a, b) => b.acceptanceRate - a.acceptanceRate);
    }
    if (sortBy === 'demand') {
      return list.sort((a, b) => b.demandScore - a.demandScore);
    }
    if (sortBy === 'value') {
      return list.sort((a, b) => b.valueScore - a.valueScore);
    }

    // Default tier sort
    return list.sort((a, b) => ALL_TIERS.indexOf(a.tier) - ALL_TIERS.indexOf(b.tier));
  }, [filteredStands, sortBy]);

  // Grouped by tier for Tier Rows view
  const groupedByTier = useMemo(() => {
    const map = new Map<TierLevel, StandItem[]>();
    ALL_TIERS.forEach(t => map.set(t, []));

    sortedStands.forEach(stand => {
      map.get(stand.tier)?.push(stand);
    });

    return map;
  }, [sortedStands]);

  return (
    <div className="space-y-6">
      {/* Intro info card: Taxa de Aceitação & Abreviações */}
      <div className="bg-stone-900/60 border border-amber-900/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-lg font-black text-amber-200 uppercase tracking-wide font-serif">
                Tabela Oficial de Stands & Abreviações
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Consulte os valores verídicos de cada Stand do Bridger Western Roblox. A <strong>Taxa de Aceitação</strong> (ex: TW com 6.7/10) 
              indica a frequência com que jogadores aceitam o Stand em ofertas, e a <strong>Taxa de Procura</strong> reflete a liquidez de mercado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-stone-300">Aceitação Alta: <strong>8.0+</strong></span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-stone-300">Stands Ativos: <strong>{STANDS_DATA.length}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-900/90 p-3.5 rounded-xl border border-stone-800">
        {/* Tier filter pill buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="filter-tier-all"
            onClick={() => setSelectedTier('ALL')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedTier === 'ALL'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            Todos ({STANDS_DATA.length})
          </button>
          {ALL_TIERS.map(tier => {
            const count = STANDS_DATA.filter(s => s.tier === tier).length;
            const style = getTierBadgeStyle(tier);
            const isSelected = selectedTier === tier;
            return (
              <button
                key={tier}
                id={`filter-tier-${tier.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1 shrink-0 ${
                  isSelected
                    ? `${style.bg} ${style.text} border ${style.border} ${style.glow}`
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                <span>{tier}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* View mode & sorting */}
        <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              id="select-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-950 text-stone-200 border border-stone-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="tier">Classificação por Tier (S+ a D)</option>
              <option value="acceptance">Maior Taxa de Aceitação</option>
              <option value="demand">Maior Procura / Demanda</option>
              <option value="value">Maior Valor em Pontos</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800">
            <button
              onClick={() => setViewMode('tier-rows')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'tier-rows' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'}`}
              title="Organizado por Tiers"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'}`}
              title="Grade Livre"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stands Content */}
      {viewMode === 'tier-rows' && selectedTier === 'ALL' && sortBy === 'tier' ? (
        /* Tier Rows Display */
        <div className="space-y-8">
          {ALL_TIERS.map((tier) => {
            const items = groupedByTier.get(tier) || [];
            if (items.length === 0) return null;
            const style = getTierBadgeStyle(tier);

            return (
              <div key={tier} id={`tier-section-${tier}`} className="space-y-3">
                {/* Tier Row Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-stone-800">
                  <div className={`px-4 py-1 rounded-lg text-sm font-black border uppercase tracking-wider ${style.bg} ${style.text} ${style.border} ${style.glow}`}>
                    TIER {tier}
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    {items.length} {items.length === 1 ? 'Stand' : 'Stands'}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-stone-800 to-transparent" />
                </div>

                {/* Cards in this Tier */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((stand) => (
                    <StandCard
                      key={stand.id}
                      stand={stand}
                      onAddToTrade={onAddToTrade}
                      onSelectDetails={(s) => setActiveModalStand(s)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Uniform Grid Display */
        <div>
          {sortedStands.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/50 rounded-2xl border border-stone-800">
              <Sparkles className="w-10 h-10 text-stone-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-300">Nenhum Stand encontrado</h3>
              <p className="text-xs text-stone-500 mt-1">Tente ajustar o termo de pesquisa ou os filtros de Tier.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedStands.map((stand) => (
                <StandCard
                  key={stand.id}
                  stand={stand}
                  onAddToTrade={onAddToTrade}
                  onSelectDetails={(s) => setActiveModalStand(s)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stand Details Modal */}
      <StandDetailModal
        stand={activeModalStand}
        onClose={() => setActiveModalStand(null)}
        onAddToTrade={onAddToTrade}
      />
    </div>
  );
}

import { useState } from 'react';
import { StandItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { getTierBadgeStyle } from '../utils/tierStyles';
import { 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  Coins, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

interface StandCardProps {
  stand: StandItem;
  onAddToTrade?: (stand: StandItem, side: 'you' | 'them') => void;
  onSelectDetails?: (stand: StandItem) => void;
}

export function StandCard({ stand, onAddToTrade, onSelectDetails }: StandCardProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const tierStyle = getTierBadgeStyle(stand.tier);

  // Demand color indicator
  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case 'Insana':
        return 'text-red-400 bg-red-950/60 border-red-500/40';
      case 'Muito Alta':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'Alta':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-500/40';
      case 'Média':
      case 'Média-Alta':
      case 'Média-Baixa':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/40';
      default:
        return 'text-stone-400 bg-stone-900 border-stone-700';
    }
  };

  return (
    <div 
      id={`stand-card-${stand.id}`}
      className="group relative flex flex-col bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-amber-950/20"
    >
      {/* Top Banner Header: Tier Badge + Abbreviation Badge */}
      <div className="flex items-center justify-between p-3 border-b border-stone-800/80 bg-stone-950/50">
        <div className="flex items-center gap-2">
          {/* Tier Badge */}
          <span 
            className={`px-2.5 py-0.5 rounded-md text-xs border tracking-wider uppercase ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border} ${tierStyle.glow}`}
          >
            Tier {stand.tier}
          </span>

          {/* Abbreviation Badge */}
          <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {stand.abbreviation}
          </span>
        </div>

        {/* Rarity tag */}
        <span className="text-[11px] font-medium text-stone-400">
          {stand.rarity}
        </span>
      </div>

      {/* Image & Main Info */}
      <div className="p-4 flex gap-4">
        {/* Stand Portrait / Sprite */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-stone-950 border border-stone-800 shrink-0 flex items-center justify-center group-hover:border-amber-500/40 transition-colors">
          <ImageWithFallback
            src={stand.imageUrl}
            alt={stand.name}
            className="w-full h-full object-contain p-1.5 transform group-hover:scale-105 transition-transform duration-300"
            fallbackText={stand.abbreviation}
          />
          {stand.isEvolved && (
            <span className="absolute bottom-1 right-1 bg-purple-900/90 text-purple-200 text-[9px] font-bold px-1.5 py-0.5 rounded border border-purple-500/50">
              EVO
            </span>
          )}
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="font-bold text-stone-100 text-sm sm:text-base tracking-tight truncate group-hover:text-amber-300 transition-colors">
              {stand.name}
            </h3>
            <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">
              {stand.description}
            </p>
          </div>

          {/* Stats Badges: Acceptance Rate & Demand */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-stone-800/60">
            {/* Taxa de Aceitação (ex: 6.7) */}
            <div className="bg-stone-950/70 p-2 rounded-lg border border-stone-800/60">
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Aceitação
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {stand.acceptanceRate.toFixed(1)}/10
                </span>
              </div>
              <div className="w-full bg-stone-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(stand.acceptanceRate * 10, 100)}%` }}
                />
              </div>
            </div>

            {/* Taxa de Procura / Demanda */}
            <div className="bg-stone-950/70 p-2 rounded-lg border border-stone-800/60 flex flex-col justify-between">
              <span className="flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                <TrendingUp className="w-3 h-3 text-amber-400" />
                Procura
              </span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded border inline-block text-center mt-0.5 ${getDemandBadge(stand.demand)}`}>
                {stand.demand}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Value & Obtain Info */}
      <div className="px-4 py-2.5 bg-stone-950/40 border-t border-stone-800/70 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-stone-300">
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono font-bold text-amber-300">{stand.moolaValue}</span>
        </div>
        <span className="text-[11px] text-stone-400 font-mono">
          Val: <strong className="text-stone-200">{stand.valueScore.toLocaleString()} pts</strong>
        </span>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelectDetails?.(stand)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700/60 transition-colors"
        >
          <Info className="w-3.5 h-3.5 text-stone-400" />
          <span>Habilidades</span>
        </button>

        {onAddToTrade && (
          <div className="relative">
            <button
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
              title="Adicionar à Calculadora de Trocas"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Troca</span>
            </button>

            {showQuickAdd && (
              <div className="absolute right-0 bottom-full mb-1 z-20 w-36 bg-stone-900 border border-stone-700 rounded-lg shadow-xl p-1 flex flex-col gap-1 text-xs">
                <button
                  onClick={() => {
                    onAddToTrade(stand, 'you');
                    setShowQuickAdd(false);
                  }}
                  className="px-2 py-1.5 rounded text-left hover:bg-emerald-950 text-emerald-300 font-medium flex items-center justify-between"
                >
                  <span>Meu Lado</span>
                  <span className="text-[10px] text-emerald-400">Você</span>
                </button>
                <button
                  onClick={() => {
                    onAddToTrade(stand, 'them');
                    setShowQuickAdd(false);
                  }}
                  className="px-2 py-1.5 rounded text-left hover:bg-blue-950 text-blue-300 font-medium flex items-center justify-between"
                >
                  <span>Lado Deles</span>
                  <span className="text-[10px] text-blue-400">Outro</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

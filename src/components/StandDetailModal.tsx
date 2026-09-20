import { StandItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { getTierBadgeStyle } from '../utils/tierStyles';
import { X, CheckCircle2, TrendingUp, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

interface StandDetailModalProps {
  stand: StandItem | null;
  onClose: () => void;
  onAddToTrade?: (stand: StandItem, side: 'you' | 'them') => void;
}

export function StandDetailModal({ stand, onClose, onAddToTrade }: StandDetailModalProps) {
  if (!stand) return null;

  const tierStyle = getTierBadgeStyle(stand.tier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="stand-detail-modal-container"
        className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-1 rounded-md text-xs border ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border} ${tierStyle.glow}`}>
              Tier {stand.tier}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {stand.abbreviation}
            </span>
            <h2 className="text-lg font-bold tracking-tight text-white">{stand.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-stone-950/50 p-4 rounded-xl border border-stone-800/80">
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shrink-0 flex items-center justify-center p-2">
              <ImageWithFallback
                src={stand.imageUrl}
                alt={stand.name}
                className="w-full h-full object-contain"
                fallbackText={stand.abbreviation}
              />
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <p className="text-sm text-stone-300 leading-relaxed">
                {stand.description}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md border border-stone-700">
                  Raridade: <strong className="text-amber-300">{stand.rarity}</strong>
                </span>
                <span className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md border border-stone-700">
                  Status: <strong className="text-emerald-300">{stand.status}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Taxa de Aceitação</span>
              </div>
              <p className="text-lg font-black font-mono text-emerald-400">
                {stand.acceptanceRate.toFixed(1)} <span className="text-xs text-stone-500">/ 10</span>
              </p>
              <p className="text-[10px] text-stone-500 mt-0.5">Probabilidade em propostas de trade</p>
            </div>

            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Taxa de Procura</span>
              </div>
              <p className="text-lg font-black text-amber-300">
                {stand.demand}
              </p>
              <p className="text-[10px] text-stone-500 mt-0.5">Nota de demanda: {stand.demandScore}/10</p>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Valor de Troca</span>
              </div>
              <p className="text-lg font-black font-mono text-purple-300">
                {stand.valueScore.toLocaleString()} <span className="text-xs text-stone-500">pts</span>
              </p>
              <p className="text-[10px] text-stone-400 font-mono mt-0.5">{stand.moolaValue}</p>
            </div>
          </div>

          {/* How to obtain */}
          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Método de Obtenção no Jogo
            </h4>
            <p className="text-xs sm:text-sm text-stone-200">
              {stand.method}
            </p>
          </div>

          {/* Moveset / Abilities */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              Habilidades & Golpes Especiais
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stand.abilities.map((ability, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800/90 text-xs text-stone-200 flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{ability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        {onAddToTrade && (
          <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
            <span className="text-xs text-stone-400">Adicionar à calculadora de trocas:</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onAddToTrade(stand, 'you');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors"
              >
                + Meu Lado (Você)
              </button>
              <button
                onClick={() => {
                  onAddToTrade(stand, 'them');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold transition-colors"
              >
                + Lado Deles (Oferta)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

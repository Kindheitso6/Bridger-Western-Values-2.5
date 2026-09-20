import { useState } from 'react';
import { StandItem, SkinItem, PassiveCardItem } from '../types';
import { STANDS_DATA } from '../data/standsData';
import { SKINS_DATA } from '../data/skinsData';
import { PASSIVE_CARDS_DATA } from '../data/cardsData';
import { getTierBadgeStyle } from '../utils/tierStyles';
import { 
  Scale, 
  Plus, 
  Trash2, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Coins, 
  TrendingUp, 
  ArrowRightLeft 
} from 'lucide-react';

export interface TradeItem {
  id: string;
  name: string;
  tier: any;
  valueScore: number;
  acceptanceRate: number;
  type: 'stand' | 'skin' | 'card';
}

interface TradeCalculatorProps {
  yourOffer: TradeItem[];
  theirOffer: TradeItem[];
  onRemoveFromOffer: (index: number, side: 'you' | 'them') => void;
  onClearTrade: () => void;
  onAddItemToTrade: (item: TradeItem, side: 'you' | 'them') => void;
}

export function TradeCalculator({
  yourOffer,
  theirOffer,
  onRemoveFromOffer,
  onClearTrade,
  onAddItemToTrade
}: TradeCalculatorProps) {
  const [selectedSideToAdd, setSelectedSideToAdd] = useState<'you' | 'them'>('you');
  const [searchItem, setSearchItem] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'stand' | 'skin' | 'card'>('all');

  // Value calculation
  const totalYourValue = yourOffer.reduce((sum, item) => sum + item.valueScore, 0);
  const totalTheirValue = theirOffer.reduce((sum, item) => sum + item.valueScore, 0);

  const avgYourAcceptance = yourOffer.length > 0
    ? yourOffer.reduce((sum, item) => sum + item.acceptanceRate, 0) / yourOffer.length
    : 0;

  const avgTheirAcceptance = theirOffer.length > 0
    ? theirOffer.reduce((sum, item) => sum + item.acceptanceRate, 0) / theirOffer.length
    : 0;

  // Verdict calculation
  const getVerdict = () => {
    if (yourOffer.length === 0 && theirOffer.length === 0) {
      return { text: 'Adicione itens para simular a troca', color: 'text-stone-400', bg: 'bg-stone-900 border-stone-800' };
    }
    if (yourOffer.length === 0 || totalYourValue === 0) {
      return { text: '🎁 Presente / Doação Grátis', color: 'text-emerald-400', bg: 'bg-emerald-950 border-emerald-500/40' };
    }
    if (theirOffer.length === 0 || totalTheirValue === 0) {
      return { text: '⚠️ Você está doando sem receber nada', color: 'text-red-400', bg: 'bg-red-950 border-red-500/40' };
    }

    const diffPercent = ((totalTheirValue - totalYourValue) / totalYourValue) * 100;

    if (diffPercent >= 20) {
      return { text: '🏆 MASSIVE WIN (Enorme Lucro)', color: 'text-emerald-300 font-black', bg: 'bg-emerald-950/90 border-emerald-500 shadow-lg shadow-emerald-900/30' };
    }
    if (diffPercent >= 5) {
      return { text: '🟢 WIN (Troca Muito Favorável)', color: 'text-emerald-400 font-bold', bg: 'bg-emerald-950/80 border-emerald-500/50' };
    }
    if (diffPercent >= -5) {
      return { text: '⚖️ FAIR (Troca Justa e Equilibrada)', color: 'text-amber-300 font-bold', bg: 'bg-amber-950/80 border-amber-500/50' };
    }
    if (diffPercent >= -20) {
      return { text: '🔴 LOSE (Desvantagem / Prejuízo)', color: 'text-rose-400 font-bold', bg: 'bg-rose-950/80 border-rose-500/50' };
    }
    return { text: '⚠️ BIG LOSE (Grande Perda de Valor)', color: 'text-red-400 font-black', bg: 'bg-red-950 border-red-500 shadow-lg shadow-red-950/40' };
  };

  const verdict = getVerdict();

  // All searchable items
  const allAvailableItems: TradeItem[] = [
    ...STANDS_DATA.map(s => ({
      id: s.id,
      name: `${s.name} [${s.abbreviation}]`,
      tier: s.tier,
      valueScore: s.valueScore,
      acceptanceRate: s.acceptanceRate,
      type: 'stand' as const
    })),
    ...SKINS_DATA.map(sk => ({
      id: sk.id,
      name: `Skin: ${sk.name} (${sk.standAbbreviation})`,
      tier: sk.tier,
      valueScore: sk.valueScore,
      acceptanceRate: sk.acceptanceRate,
      type: 'skin' as const
    })),
    ...PASSIVE_CARDS_DATA.map(c => ({
      id: c.id,
      name: `Carta: ${c.name}`,
      tier: c.tier,
      valueScore: c.valueScore,
      acceptanceRate: c.acceptanceRate,
      type: 'card' as const
    }))
  ];

  const filteredSelectableItems = allAvailableItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchItem.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-stone-900/60 border border-amber-900/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-amber-200 uppercase tracking-wide font-serif">
                Calculadora de Trocas (Trade Value W / F / L)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Adicione os itens do seu lado e da oferta recebida para descobrir imediatamente se a troca é um 
              <strong> Ganho (Win)</strong>, <strong>Justa (Fair)</strong> ou <strong>Perda (Lose)</strong> no mercado de Bridger Western.
            </p>
          </div>

          <button
            onClick={onClearTrade}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 text-xs transition-colors shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Mesa</span>
          </button>
        </div>
      </div>

      {/* Verdict Bar */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all ${verdict.bg}`}>
        <div className="flex items-center gap-3">
          <ArrowRightLeft className="w-6 h-6 text-amber-400 shrink-0 hidden sm:block" />
          <div>
            <span className="text-xs uppercase font-bold text-stone-400 tracking-wider">
              Veredito da Oferta:
            </span>
            <h3 className={`text-base sm:text-lg ${verdict.color}`}>
              {verdict.text}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-stone-400 block text-[10px]">SEU VALOR</span>
            <strong className="text-emerald-400 text-sm">{totalYourValue.toLocaleString()} pts</strong>
          </div>
          <span className="text-stone-600 text-lg">vs</span>
          <div>
            <span className="text-stone-400 block text-[10px]">VALOR DELES</span>
            <strong className="text-blue-400 text-sm">{totalTheirValue.toLocaleString()} pts</strong>
          </div>
        </div>
      </div>

      {/* Trade Columns: You vs Them */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Your Side */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-stone-100 text-base">Seu Lado (O que você dá)</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {totalYourValue.toLocaleString()} pts
              </span>
            </div>

            {/* Item list */}
            <div className="space-y-2 mt-3 min-h-[140px]">
              {yourOffer.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-stone-500 text-xs border border-dashed border-stone-800 rounded-lg">
                  <span>Nenhum item adicionado no seu lado</span>
                  <span className="text-[10px] text-stone-600 mt-1">Use a busca abaixo para adicionar</span>
                </div>
              ) : (
                yourOffer.map((item, idx) => {
                  const style = getTierBadgeStyle(item.tier);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-stone-950 border border-stone-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${style.bg} ${style.text} ${style.border}`}>
                          {item.tier}
                        </span>
                        <span className="font-semibold text-stone-200 truncate">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="font-mono text-emerald-400 font-bold">
                          {item.valueScore.toLocaleString()} pts
                        </span>
                        <button
                          onClick={() => onRemoveFromOffer(idx, 'you')}
                          className="text-stone-500 hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>Média de Aceitação:</span>
            <strong className="text-stone-200 font-mono">{avgYourAcceptance.toFixed(1)}/10</strong>
          </div>
        </div>

        {/* Their Side */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <h3 className="font-bold text-stone-100 text-base">Lado Deles (O que você recebe)</h3>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400">
                {totalTheirValue.toLocaleString()} pts
              </span>
            </div>

            {/* Item list */}
            <div className="space-y-2 mt-3 min-h-[140px]">
              {theirOffer.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-stone-500 text-xs border border-dashed border-stone-800 rounded-lg">
                  <span>Nenhum item adicionado na oferta do oponente</span>
                  <span className="text-[10px] text-stone-600 mt-1">Selecione itens abaixo</span>
                </div>
              ) : (
                theirOffer.map((item, idx) => {
                  const style = getTierBadgeStyle(item.tier);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-stone-950 border border-stone-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${style.bg} ${style.text} ${style.border}`}>
                          {item.tier}
                        </span>
                        <span className="font-semibold text-stone-200 truncate">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="font-mono text-blue-400 font-bold">
                          {item.valueScore.toLocaleString()} pts
                        </span>
                        <button
                          onClick={() => onRemoveFromOffer(idx, 'them')}
                          className="text-stone-500 hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span>Média de Aceitação:</span>
            <strong className="text-stone-200 font-mono">{avgTheirAcceptance.toFixed(1)}/10</strong>
          </div>
        </div>
      </div>

      {/* Item Selector & Add to Trade Panel */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-sm text-stone-200">Adicionar Item Rápido à Mesa de Troca</h4>
          </div>

          {/* Side Selector */}
          <div className="flex items-center gap-2 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs">
            <span className="text-stone-400 text-[11px] px-2">Adicionar para:</span>
            <button
              onClick={() => setSelectedSideToAdd('you')}
              className={`px-3 py-1 rounded-md font-bold transition-colors ${
                selectedSideToAdd === 'you'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Meu Lado (Você)
            </button>
            <button
              onClick={() => setSelectedSideToAdd('them')}
              className={`px-3 py-1 rounded-md font-bold transition-colors ${
                selectedSideToAdd === 'them'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Lado Deles (Oferta)
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-1 w-full sm:w-auto">
            {(['all', 'stand', 'skin', 'card'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-lg transition-colors capitalize ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat === 'stand' ? 'Stands' : cat === 'skin' ? 'Skins' : 'Cartas'}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Filtrar por nome do Stand, Abreviação ou Skin..."
            className="w-full text-xs bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Available Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
          {filteredSelectableItems.map(item => {
            const style = getTierBadgeStyle(item.tier);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-950/80 hover:bg-stone-950 border border-stone-800/80 hover:border-amber-500/40 text-xs transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border shrink-0 ${style.bg} ${style.text} ${style.border}`}>
                    {item.tier}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-200 truncate">{item.name}</p>
                    <span className="text-[10px] text-amber-400 font-mono">
                      {item.valueScore.toLocaleString()} pts • Aceit: {item.acceptanceRate.toFixed(1)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onAddItemToTrade(item, selectedSideToAdd)}
                  className={`px-2 py-1 rounded text-[11px] font-bold shrink-0 ml-2 transition-colors ${
                    selectedSideToAdd === 'you'
                      ? 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40'
                      : 'bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-500/40'
                  }`}
                >
                  + {selectedSideToAdd === 'you' ? 'Meu' : 'Deles'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { REMOVED_DATA } from '../data/removedData';
import { RemovedItem } from '../types';
import { 
  Trash2, 
  AlertTriangle, 
  History, 
  Archive, 
  ShieldAlert, 
  FileText, 
  Flame 
} from 'lucide-react';

export function RemovedContentList() {
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filteredItems = REMOVED_DATA.filter((item) => {
    return selectedType === 'ALL' || item.type === selectedType;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-stone-900/60 border border-red-900/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Archive className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-black text-red-200 uppercase tracking-wide font-serif">
                Arquivo Histórico: Stands, Mecânicas & Itens Removidos
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Consulte todo o conteúdo legado, mecânicas extintas e habilidades reajustadas ao longo das atualizações de Bridger: Western.
              Muitos desses itens e mecânicas alteraram para sempre o meta de combate e a valorização das trocas.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 shrink-0 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>Itens Documentados: <strong className="text-red-400">{REMOVED_DATA.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-stone-900/90 p-3 rounded-xl border border-stone-800">
        {['ALL', 'Mecânica Removida', 'Stand Removido', 'Arma / Item Removido'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedType === type
                ? 'bg-red-950 text-red-300 border border-red-500/50 shadow-md shadow-red-950/40'
                : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            {type === 'ALL' ? 'Todos os Registros' : type}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 hover:border-red-500/40 rounded-xl overflow-hidden transition-all duration-200 p-5 space-y-4 shadow-md"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 inline-block mb-1.5">
                  {item.type}
                </span>
                <h3 className="text-base font-bold text-stone-100">
                  {item.name}
                </h3>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] font-mono text-stone-400 block">
                  Última versão:
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {item.lastSeenVersion}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-stone-950/70 p-3.5 rounded-lg border border-stone-800/80 space-y-2 text-xs text-stone-300 leading-relaxed">
              <p>{item.description}</p>
            </div>

            {/* Removal Reason & Meta Impact */}
            <div className="space-y-2 pt-2 border-t border-stone-800/80 text-xs">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-400 block font-semibold">Motivo da Remoção:</strong>
                  <span className="text-stone-300">{item.removalReason}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Flame className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-400 block font-semibold">Impacto no Meta Atual:</strong>
                  <span className="text-stone-300">{item.impactOnMeta}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

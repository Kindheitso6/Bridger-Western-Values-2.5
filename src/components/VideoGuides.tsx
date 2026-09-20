import { useState } from 'react';
import { Youtube, ExternalLink, Play, Lightbulb, ShieldCheck, BookOpen } from 'lucide-react';

export function VideoGuides() {
  const [activeVideoId, setActiveVideoId] = useState('-NpLBWDdBog');
  const [customUrl, setCustomUrl] = useState('');

  const handleSetCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    // Extract video ID from youtube url or id
    const match = customUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      setActiveVideoId(match[1]);
      setCustomUrl('');
    } else if (customUrl.trim().length === 11) {
      setActiveVideoId(customUrl.trim());
      setCustomUrl('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-stone-900/60 border border-amber-900/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Youtube className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-black text-amber-200 uppercase tracking-wide font-serif">
                Vídeo Oficial & Guia do Trading Update
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Assista ao vídeo de análise de valores de Bridger Western diretamente do YouTube.
              Entenda como a comunidade avalia cada Stand e item nas atualizações mais recentes.
            </p>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${activeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-xs transition-colors shrink-0 font-bold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no YouTube</span>
          </a>
        </div>
      </div>

      {/* Main Video Player & Trading Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Embed */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?rel=0`}
              title="Bridger Western Trading Value List"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-4 sm:p-5 space-y-3 bg-stone-900 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                Vídeo ID: {activeVideoId}
              </span>
              <span className="text-xs text-stone-400">
                Bridger Western Community Update
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-100">
              BRIDGER WESTERN VALUE LIST! TRADING UPDATE!
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Este guia aborda o lançamento do sistema de trocas oficiais no jogo: as exigências de Tier 3 para obter chances de skins, 
              o uso da fruta Rokakaka para equalizar negócios e como não cair em trocas desvantajosas com Stands comuns.
            </p>
          </div>
        </div>

        {/* Trading Rules & Tips Sidebar */}
        <div className="space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-stone-800 pb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Dicas de Ouro de Trading</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Nunca troque Stands S+ por ofertas em lote de Tier B/C:</strong> Stands como TWOH e Tusk Act 4 têm altíssima liquidez e nunca desvalorizam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Taxa de Aceitação (TW = 6.7):</strong> Stands como The World têm 6.7 de aceitação porque são sólidos, mas quase todo mundo já tem um ou busca a versão TWOH.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Skins Limitadas:</strong> Skins com auras cósmicas e efeitos especiais de fogo/gelo dobram o valor base do Stand original.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span><strong>Cartas de Passiva:</strong> Cartas como <em>Winged Man</em> e <em>Gunslinger's Grit</em> têm valores próximos a Stands de Tier A devido à sua utilidade no PvP.</span>
              </li>
            </ul>
          </div>

          {/* Embed custom video input */}
          <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-stone-200">Carregar Outro Vídeo de Bridger Western</h4>
            <form onSubmit={handleSetCustomUrl} className="space-y-2">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Cole o link ou ID do YouTube..."
                className="w-full text-xs bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3" />
                <span>Assistir no Player</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

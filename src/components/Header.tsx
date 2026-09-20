import { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  Sparkles, 
  Flame, 
  Layers, 
  Scale, 
  Youtube, 
  Trash2, 
  Search, 
  Github, 
  BookOpen,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenGithubGuide: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenGithubGuide
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-amber-900/30 shadow-xl">
      {/* Top News Ticker */}
      <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border-b border-amber-800/20 px-4 py-1 text-xs text-amber-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            Trading Update 2.3
          </span>
          <p className="truncate text-stone-300 text-[11px]">
            Tabela de valores com Taxa de Aceitação, Demanda, Abreviações e Sistema de Trocas (Cards & Stands)
          </p>
        </div>
        <button
          id="btn-github-pages-guide"
          onClick={onOpenGithubGuide}
          className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors shrink-0 font-medium px-2 py-0.5 rounded hover:bg-amber-900/30"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Guia GitHub Pages</span>
        </button>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-500/40">
                <Flame className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif">
                  BRIDGER: WESTERN
                </h1>
                <p className="text-[11px] font-semibold text-stone-400 tracking-wider uppercase">
                  Lista de Valores & Tier List • Roblox JoJo
                </p>
              </div>
            </div>

            <button
              onClick={onOpenGithubGuide}
              className="sm:hidden p-2 rounded-lg bg-stone-900 border border-stone-800 text-amber-400"
              title="Guia GitHub Pages"
            >
              <Github className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar Stand, TW, SPTW, Skin ou Carta..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-stone-900/90 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="tab-stands"
            onClick={() => setActiveTab('stands')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'stands'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stands (Tiers S+ a D)</span>
          </button>

          <button
            id="tab-skins"
            onClick={() => setActiveTab('skins')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'skins'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Skins de Stands</span>
          </button>

          <button
            id="tab-cards"
            onClick={() => setActiveTab('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'cards'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cartas de Passiva</span>
          </button>

          <button
            id="tab-removed"
            onClick={() => setActiveTab('removed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'removed'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Conteúdo Removido</span>
          </button>

          <button
            id="tab-calculator"
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Calculadora W/F/L</span>
          </button>

          <button
            id="tab-videos"
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'videos'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800/80'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>Vídeos & Trading</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

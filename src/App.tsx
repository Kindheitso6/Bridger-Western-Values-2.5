import { useState } from 'react';
import { ActiveTab, StandItem } from './types';
import { Header } from './components/Header';
import { StandTierList } from './components/StandTierList';
import { SkinList } from './components/SkinList';
import { PassiveCardsList } from './components/PassiveCardsList';
import { RemovedContentList } from './components/RemovedContentList';
import { TradeCalculator, TradeItem } from './components/TradeCalculator';
import { VideoGuides } from './components/VideoGuides';
import { GithubPagesGuideModal } from './components/GithubPagesGuideModal';
import { Scale, Check, ShieldCheck, Github } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('stands');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

  // Trade Calculator State
  const [yourOffer, setYourOffer] = useState<TradeItem[]>([]);
  const [theirOffer, setTheirOffer] = useState<TradeItem[]>([]);
  const [tradeNotification, setTradeNotification] = useState<string | null>(null);

  const handleAddToTrade = (item: any, side: 'you' | 'them') => {
    const tradeItem: TradeItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.abbreviation ? `${item.name} [${item.abbreviation}]` : item.name,
      tier: item.tier,
      valueScore: item.valueScore,
      acceptanceRate: item.acceptanceRate,
      type: item.category === 'stand' ? 'stand' : item.type === 'skin' ? 'skin' : 'card'
    };

    if (side === 'you') {
      setYourOffer(prev => [...prev, tradeItem]);
    } else {
      setTheirOffer(prev => [...prev, tradeItem]);
    }

    setTradeNotification(`Adicionado ao lado ${side === 'you' ? 'do seu inventário' : 'da oferta recebida'}!`);
    setTimeout(() => setTradeNotification(null), 2500);
  };

  const handleRemoveFromOffer = (index: number, side: 'you' | 'them') => {
    if (side === 'you') {
      setYourOffer(prev => prev.filter((_, i) => i !== index));
    } else {
      setTheirOffer(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleClearTrade = () => {
    setYourOffer([]);
    setTheirOffer([]);
  };

  const totalTradeItems = yourOffer.length + theirOffer.length;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenGithubGuide={() => setIsGithubModalOpen(true)}
      />

      {/* Floating Notification Toast */}
      {tradeNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-400 text-xs sm:text-sm animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4" />
          <span>{tradeNotification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'stands' && (
          <StandTierList
            searchQuery={searchQuery}
            onAddToTrade={handleAddToTrade}
          />
        )}

        {activeTab === 'skins' && (
          <SkinList
            searchQuery={searchQuery}
            onAddToTrade={handleAddToTrade}
          />
        )}

        {activeTab === 'cards' && (
          <PassiveCardsList
            searchQuery={searchQuery}
            onAddToTrade={handleAddToTrade}
          />
        )}

        {activeTab === 'removed' && (
          <RemovedContentList />
        )}

        {activeTab === 'calculator' && (
          <TradeCalculator
            yourOffer={yourOffer}
            theirOffer={theirOffer}
            onRemoveFromOffer={handleRemoveFromOffer}
            onClearTrade={handleClearTrade}
            onAddItemToTrade={handleAddToTrade}
          />
        )}

        {activeTab === 'videos' && (
          <VideoGuides />
        )}
      </main>

      {/* Floating Trade Bar Trigger if user has trade items and is in other tabs */}
      {totalTradeItems > 0 && activeTab !== 'calculator' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 backdrop-blur-md border border-amber-500/50 rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-stone-300">
              <strong className="text-amber-400 font-mono">{totalTradeItems}</strong> itens na mesa de troca
            </span>
          </div>
          <button
            onClick={() => setActiveTab('calculator')}
            className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-colors"
          >
            Abrir Calculadora
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 py-8 px-4 sm:px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-bold text-stone-300 font-serif">Bridger: Western Roblox Values</span>
            <span>• Baseado em dados verídicos da comunidade, Wikis e Trading Updates</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGithubModalOpen(true)}
              className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Publicar no GitHub Pages</span>
            </button>
            <span>v2.3 (Trading Release)</span>
          </div>
        </div>
      </footer>

      {/* GitHub Pages Setup Guide Modal */}
      <GithubPagesGuideModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
}

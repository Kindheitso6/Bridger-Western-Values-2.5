import { useState } from 'react';
import { X, Github, Check, Copy, Terminal, Globe, Rocket } from 'lucide-react';

interface GithubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GithubPagesGuideModal({ isOpen, onClose }: GithubPagesGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const workflowCode = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="github-pages-modal-container"
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">Como Publicar no GitHub Pages</h3>
              <p className="text-xs text-stone-400">Configuração automática com base relativa (./) já pronta</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs sm:text-sm text-stone-300">
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-xl flex items-start gap-3">
            <Rocket className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 font-bold block mb-0.5">
                Totalmente Compatível com GitHub Pages!
              </strong>
              <span>
                O arquivo <code className="bg-stone-900 px-1.5 py-0.5 rounded text-amber-300">vite.config.ts</code> já foi configurado com{' '}
                <code className="bg-stone-900 px-1.5 py-0.5 rounded text-amber-300">base: './'</code>. Isso garante que o site funcione perfeitamente em qualquer repositório (ex: <code className="text-emerald-300 font-mono">seu-usuario.github.io/bridger-western-values/</code>).
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Passo a Passo Rápido:
            </h4>

            {/* Step 1 */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-200">1. Gerar os arquivos estáticos de produção:</span>
                <button
                  onClick={() => handleCopy('npm run build', 1)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
                >
                  {copiedIndex === 1 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIndex === 1 ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="bg-stone-900 p-2 rounded text-xs font-mono text-amber-300 overflow-x-auto">
                npm run build
              </pre>
              <p className="text-[11px] text-stone-400">
                Isso criará a pasta <code className="text-stone-200">dist/</code> pronta com todo o HTML, CSS e JavaScript otimizados.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
              <span className="font-bold text-stone-200 block">
                2. No seu repositório do GitHub:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-stone-300 text-xs">
                <li>Acesse a aba <strong>Settings</strong> do seu repositório no GitHub.</li>
                <li>Clique no menu lateral em <strong>Pages</strong>.</li>
                <li>Em <strong>Build and deployment &gt; Source</strong>, selecione <strong>GitHub Actions</strong>.</li>
              </ol>
            </div>

            {/* Step 3 */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-200">
                  3. Arquivo do GitHub Actions (<code className="text-amber-300 font-mono">.github/workflows/deploy.yml</code>):
                </span>
                <button
                  onClick={() => handleCopy(workflowCode, 2)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
                >
                  {copiedIndex === 2 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIndex === 2 ? 'Copiado!' : 'Copiar Workflow'}</span>
                </button>
              </div>
              <pre className="bg-stone-900 p-2.5 rounded text-[11px] font-mono text-stone-300 max-h-40 overflow-y-auto">
                {workflowCode}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
          >
            Entendido, Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

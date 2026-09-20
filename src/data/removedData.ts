import { RemovedItem } from '../types';

export const REMOVED_DATA: RemovedItem[] = [
  {
    id: 'removed-limb-regeneration',
    name: 'Cura e Regeneração de Membros Decepados',
    type: 'Mecânica Removida',
    lastSeenVersion: 'Versão 1.9.4 (Removido no Update 1.9.5)',
    removalReason: 'Balanceamento do combate e letalidade no Velho Oeste.',
    description: 'Antes da atualização 1.9.5, quando um jogador humano perdia um braço ou perna pelo golpe de The Hand, usuários de Crazy Diamond ou Gold Experience podiam restaurar o membro com suas habilidades de cura. A partir do Update 1.9.5, a perda de membro para humanos tornou-se 100% PERMANENTE na vida atual, tornando The Hand o Stand mais temido para amputações.',
    impactOnMeta: 'Transformou The Hand em um dos Stands mais perigosos de emboscada. Quem perde um braço perde a capacidade de empunhar armas de duas mãos até morrer e renascer.',
    imageUrl: 'https://images.wikia.com/jjba/images/8/87/The_Hand_ASBR.png'
  },
  {
    id: 'removed-dual-derringers-stun',
    name: 'Stun Lock das Dual Derringers',
    type: 'Arma / Item Removido',
    lastSeenVersion: 'Versão 1.6 (Removido no Update 1.7)',
    removalReason: 'Exploit de Stun Infinito que quebrava o PvP.',
    description: 'As pistolas gêmeas Dual Derringers aplicavam um mini-atordoamento (stun) a cada tiro. Jogadores combinavam com ataques rápidos de Stand para travar o oponente sem que ele pudesse ativar Timestop, esquiva ou contra-golpes.',
    impactOnMeta: 'O stun foi totalmente extinto da arma, mantendo apenas o dano rápido a curta distância.',
    imageUrl: 'https://images.wikia.com/jjba/images/1/1a/Hol_Horse_ASBR.png'
  },
  {
    id: 'removed-tonicmaster-cap-bypass',
    name: 'Bypass de Limite do Tônico (Tonicmaster Exploit)',
    type: 'Mecânica Removida',
    lastSeenVersion: 'Versão 1.8.2',
    removalReason: 'Acúmulo infinito de poções tornando jogadores quase invencíveis.',
    description: 'A carta de passiva Tonicmaster possuía um bug no código que permitia aos jogadores ultrapassar o teto máximo de tônicos simultâneos (Tonic Cap), acumulando velocidade extrema, regeneração absurda e defesa impenetrável.',
    impactOnMeta: 'A carta foi reajustada para respeitar rigorosamente o limite do inventário e da saúde do personagem.',
    imageUrl: 'https://images.wikia.com/jjba/images/6/6d/Crazy_Diamond_ASBR.png'
  },
  {
    id: 'removed-old-fishing-shard-drop',
    name: 'Taxa Antiga de Pesca de Fragmento de Flecha (0.5%)',
    type: 'Mecânica Removida',
    lastSeenVersion: 'Versão Alpha / Beta Inicial',
    removalReason: 'Inflação severa de Stands no mercado do jogo.',
    description: 'Nas fases iniciais de Bridger Western, a chance de pescar um Stand Arrow Shard era de aproximadamente 0.5%. Isso inundava o servidor com flechas. A taxa foi reduzida drasticamente para 0.05%, tornando flechas e rerolls artigos de altíssimo valor de troca.',
    impactOnMeta: 'Aumentou o valor de todos os Stands raros (The World, King Crimson, Star Platinum) em mais de 10 vezes no mercado de trocas.',
    imageUrl: 'https://images.wikia.com/jjba/images/1/1a/The_World_ASBR.png'
  },
  {
    id: 'removed-soft-and-wet-early-build',
    name: 'Soft & Wet (Versão Experimental de Bolhas)',
    type: 'Stand Removido',
    lastSeenVersion: 'Build de Testes Pré-Update 2.0',
    removalReason: 'Retirado temporariamente para reformulação completa do sistema de atrito e roubo de propriedades.',
    description: 'Um protótipo de Soft & Wet estava nos arquivos e foi testado em servidores fechados. O Stand roubava a visão e a fricção do chão, mas causava travamentos graves na física dos cavalos no mapa de Faroeste.',
    impactOnMeta: 'O Stand foi guardado para uma atualização futura dedicada à Parte 8 JoJolion.',
    imageUrl: 'https://images.wikia.com/jjba/images/9/9c/Tusk_Act_4_ASBR.png'
  },
  {
    id: 'removed-halloween-essence-crafting',
    name: 'Poção de Essência do Pântano da Bruxa (Evento Antigo)',
    type: 'Arma / Item Removido',
    lastSeenVersion: 'Evento de Outono 2023',
    removalReason: 'Receita de evento sazonal desativada.',
    description: 'A Mud Witch oferecia uma poção especial que concedia 3 minutos de visão noturna total e detecção de oponentes através de paredes no Velho Oeste.',
    impactOnMeta: 'Atualmente é um item de colecionador obtível apenas por jogadores veteranos que guardaram frascos no inventário.',
    imageUrl: 'https://images.wikia.com/jjba/images/4/4d/Ringo_Roadagain.png'
  }
];

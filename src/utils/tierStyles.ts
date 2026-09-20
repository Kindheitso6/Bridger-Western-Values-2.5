import { TierLevel } from '../types';

export function getTierBadgeStyle(tier: TierLevel): { bg: string; text: string; border: string; glow: string } {
  switch (tier) {
    case 'S+':
      return {
        bg: 'bg-red-950/80',
        text: 'text-red-300 font-black',
        border: 'border-red-500/60',
        glow: 'shadow-[0_0_12px_rgba(239,68,68,0.35)]'
      };
    case 'S':
      return {
        bg: 'bg-amber-950/80',
        text: 'text-amber-300 font-extrabold',
        border: 'border-amber-500/60',
        glow: 'shadow-[0_0_10px_rgba(245,158,11,0.3)]'
      };
    case 'S-':
      return {
        bg: 'bg-yellow-950/80',
        text: 'text-yellow-300 font-bold',
        border: 'border-yellow-500/50',
        glow: 'shadow-[0_0_8px_rgba(234,179,8,0.25)]'
      };
    case 'A+':
      return {
        bg: 'bg-purple-950/80',
        text: 'text-purple-300 font-bold',
        border: 'border-purple-500/50',
        glow: 'shadow-[0_0_8px_rgba(168,85,247,0.25)]'
      };
    case 'A':
      return {
        bg: 'bg-violet-950/80',
        text: 'text-violet-300 font-bold',
        border: 'border-violet-500/50',
        glow: 'shadow-[0_0_8px_rgba(139,92,246,0.2)]'
      };
    case 'A-':
      return {
        bg: 'bg-indigo-950/80',
        text: 'text-indigo-300 font-semibold',
        border: 'border-indigo-500/40',
        glow: 'shadow-[0_0_6px_rgba(99,102,241,0.2)]'
      };
    case 'B+':
      return {
        bg: 'bg-emerald-950/80',
        text: 'text-emerald-300 font-semibold',
        border: 'border-emerald-500/40',
        glow: 'shadow-[0_0_6px_rgba(16,185,129,0.2)]'
      };
    case 'B':
      return {
        bg: 'bg-teal-950/80',
        text: 'text-teal-300 font-semibold',
        border: 'border-teal-500/40',
        glow: 'shadow-[0_0_6px_rgba(20,184,166,0.2)]'
      };
    case 'B-':
      return {
        bg: 'bg-cyan-950/80',
        text: 'text-cyan-300 font-medium',
        border: 'border-cyan-500/30',
        glow: 'shadow-none'
      };
    case 'C':
      return {
        bg: 'bg-stone-800/90',
        text: 'text-stone-300 font-medium',
        border: 'border-stone-600/40',
        glow: 'shadow-none'
      };
    case 'D':
      return {
        bg: 'bg-stone-900/90',
        text: 'text-stone-400 font-normal',
        border: 'border-stone-700/40',
        glow: 'shadow-none'
      };
  }
}

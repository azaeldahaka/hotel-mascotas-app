import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const ModeSelector: React.FC = () => {
  const { activeView, setActiveView, kpis } = useHotel();

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 flex justify-center pointer-events-none safe-top">
      <nav aria-label="Selector de Vista" className="pointer-events-auto apple-glass rounded-full p-1.5 shadow-xl flex items-center gap-1 border border-white/60 max-w-md w-full sm:w-auto">
        <button
          onClick={() => setActiveView('CLIENTE')}
          className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 pressable ${
            activeView === 'CLIENTE'
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <span className="text-base">🐾</span>
          <span>Vista Clientes</span>
        </button>

        <button
          onClick={() => setActiveView('EZEQUIEL')}
          className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 pressable relative ${
            activeView === 'EZEQUIEL'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Panel de Ezequiel</span>
          {kpis.alertasMedicas > 0 && (
            <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full font-bold animate-pulse">
              {kpis.alertasMedicas}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

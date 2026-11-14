import React from 'react';
import { useHotel } from '../context/HotelContext';
import { Phone, MapPin, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { filtroEspecieCliente, setFiltroEspecieCliente } = useHotel();

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-md shadow-amber-500/20">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">PetCapsule</span>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  HOTEL
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                Tres Cerritos, Salta Capital
              </p>
            </div>
          </div>

          {/* Emergency 24/7 Phone (Visible on mobile right side) */}
          <a
            href="tel:+5493874001234"
            className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold pressable"
          >
            <Phone className="w-3 h-3 text-rose-600" />
            <span>24/7</span>
          </a>
        </div>

        {/* Species Switcher & Desktop Emergency */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          {/* Segmented Perros / Gatos */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 w-full sm:w-auto">
            <button
              onClick={() => setFiltroEspecieCliente('DOG')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 pressable ${
                filtroEspecieCliente === 'DOG'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🐶</span>
              <span>Perros (10)</span>
            </button>
            <button
              onClick={() => setFiltroEspecieCliente('CAT')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 pressable ${
                filtroEspecieCliente === 'CAT'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🐱</span>
              <span>Gatos (6)</span>
            </button>
          </div>

          <a
            href="tel:+5493874001234"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold pressable"
          >
            <Phone className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Guardia Veterinaria 24/7</span>
          </a>
        </div>
      </div>
    </div>
  );
};

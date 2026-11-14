import React from 'react';
import { Capsula } from '../../types';
import { Camera, ShieldCheck, Thermometer, VolumeX, Sparkles, Check } from 'lucide-react';

interface CapsulaCardProps {
  capsula: Capsula;
  onReservar: (capsula: Capsula) => void;
}

export const CapsulaCard: React.FC<CapsulaCardProps> = ({ capsula, onReservar }) => {
  const isDisponible = capsula.estado === 'DISPONIBLE';

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
          <img
            src={capsula.fotoUrl}
            alt={capsula.nombre}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {/* Overlay Tag Category */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide">
              {capsula.categoria}
            </span>
            <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold flex items-center gap-1">
              {capsula.especie === 'DOG' ? '🐕 Canina' : '🐈 Felina'}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {isDisponible ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Disponible
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 backdrop-blur-md text-slate-200 text-[11px] font-semibold">
                Ocupada
              </span>
            )}
          </div>

          {/* Quick Specs Pill */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl">
            <span className="flex items-center gap-1">
              <Camera className="w-3 h-3 text-amber-300" /> Cámara 24/7
            </span>
            <span className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-cyan-300" /> Climatizada
            </span>
            <span className="flex items-center gap-1">
              <VolumeX className="w-3 h-3 text-emerald-300" /> Insonorizada
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[11px] font-bold text-amber-600 tracking-wider uppercase">
                {capsula.codigo}
              </span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                {capsula.nombre}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              Máx {capsula.capacidadKgMax} kg
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-1.5 my-3 text-xs text-slate-600">
            {capsula.caracteristicas.map((caract, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="line-clamp-1">{caract}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-50 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              ${capsula.precioNoche.toLocaleString('es-AR')}
            </span>
            <span className="text-xs text-slate-500">/ noche</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Guardería: ${capsula.precioHoraDaycare.toLocaleString('es-AR')}/h
          </p>
        </div>

        <button
          onClick={() => onReservar(capsula)}
          disabled={!isDisponible}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 pressable shadow-md ${
            isDisponible
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>{isDisponible ? 'Reservar' : 'Agotada'}</span>
        </button>
      </div>
    </div>
  );
};

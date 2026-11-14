import React from 'react';
import { Capsula, Reserva } from '../../types';
import { VolumeX, ShieldCheck, Camera, Sparkles, Check } from 'lucide-react';

interface CapsuleGridProps {
  capsulas: Capsula[];
  reservas: Reserva[];
  onSelectCapsule: (capsula: Capsula) => void;
}

export const CapsuleGrid: React.FC<CapsuleGridProps> = ({ capsulas, reservas, onSelectCapsule }) => {
  const caninas = capsulas.filter((c) => c.especie === 'DOG');
  const felinas = capsulas.filter((c) => c.especie === 'CAT');

  const renderCapsuleTile = (c: Capsula) => {
    const reservaActual = reservas.find(
      (r) => r.capsulaId === c.id && (r.estado === 'CHECKIN' || r.estado === 'CONFIRMADA')
    );

    const isOcupada = c.estado === 'OCUPADA';
    const isReservada = c.estado === 'RESERVADA';
    const isDisponible = c.estado === 'DISPONIBLE';

    return (
      <div
        key={c.id}
        onClick={() => onSelectCapsule(c)}
        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-150 pressable flex flex-col justify-between min-h-[140px] shadow-sm ${
          isOcupada
            ? 'bg-rose-50/60 border-rose-200 hover:border-rose-400'
            : isReservada
            ? 'bg-amber-50/70 border-amber-300 hover:border-amber-400'
            : 'bg-white border-slate-200 hover:border-emerald-400'
        }`}
      >
        <div>
          {/* Top Bar: Code & Badge */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-slate-900 text-white">
              {c.codigo}
            </span>

            {isOcupada && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                OCUPADA
              </span>
            )}
            {isReservada && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center gap-1">
                LLEGA HOY
              </span>
            )}
            {isDisponible && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                LIBRE
              </span>
            )}
          </div>

          {/* Guest or Specs Info */}
          {reservaActual ? (
            <div className="flex items-center gap-2.5 my-1">
              <img
                src={reservaActual.mascota.avatarUrl}
                alt={reservaActual.mascota.nombre}
                className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <span className="font-black text-slate-900 text-sm block truncate leading-tight">
                  {reservaActual.mascota.nombre}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {reservaActual.mascota.raza}
                </span>
                <span className="text-[10px] font-semibold text-slate-600 block truncate">
                  Sale: {reservaActual.fechaCheckOut}
                </span>
              </div>
            </div>
          ) : (
            <div className="my-1.5">
              <span className="text-xs font-bold text-slate-800 block truncate">
                {c.nombre}
              </span>
              <span className="text-[11px] text-slate-400 block">
                {c.categoria} • Hasta {c.capacidadKgMax}kg
              </span>
            </div>
          )}
        </div>

        {/* Bottom meta */}
        <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-semibold text-slate-800">
            ${c.precioNoche.toLocaleString('es-AR')}/n
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Tocar para ver</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Visual Legend */}
      <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-white rounded-2xl border border-slate-100 text-xs">
        <span className="font-bold text-slate-700">Estado de las 16 Cápsulas:</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Libre ({capsulas.filter(c => c.estado === 'DISPONIBLE').length})
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> En Hotel ({capsulas.filter(c => c.estado === 'OCUPADA').length})
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Llega Hoy ({capsulas.filter(c => c.estado === 'RESERVADA').length})
          </span>
        </div>
      </div>

      {/* Sector Canino (10) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐕</span>
            <div>
              <h3 className="font-black text-slate-900 text-base leading-tight">
                Sector Canino (10 Cápsulas C-01 a C-10)
              </h3>
              <p className="text-xs text-slate-500">
                Parque de recreación y patio privado integrado
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
            {caninas.filter((c) => c.estado === 'OCUPADA').length}/10 Ocupadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {caninas.map(renderCapsuleTile)}
        </div>
      </section>

      {/* Sector Felino (6) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐈</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base leading-tight">
                  Sector Felino Zen (6 Torres F-01 a F-06)
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-bold">
                  <VolumeX className="w-3 h-3" /> Aislamiento Acústico Total
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Ambiente silencioso, difusores Feliway y torres verticales
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
            {felinas.filter((c) => c.estado === 'OCUPADA').length}/6 Ocupadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {felinas.map(renderCapsuleTile)}
        </div>
      </section>
    </div>
  );
};

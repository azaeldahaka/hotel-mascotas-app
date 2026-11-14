import React, { useState } from 'react';
import { Reserva } from '../../types';
import { useHotel } from '../../context/HotelContext';
import { X, CheckCircle, Video, Phone, MapPin, Calendar, Share2, Sparkles, ArrowRight } from 'lucide-react';

interface VoucherModalProps {
  reserva: Reserva | null;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ reserva, onClose }) => {
  const { setActiveView, capsulas, serviciosExtra } = useHotel();
  const [verCamaraDemo, setVerCamaraDemo] = useState(false);

  if (!reserva) return null;

  const capsula = capsulas.find((c) => c.id === reserva.capsulaId);
  const extrasContratados = serviciosExtra.filter((s) => reserva.serviciosExtraIds.includes(s.id));

  // Generar link de WhatsApp
  const mensajeWA = encodeURI(
    `¡Hola Ezequiel! Acabo de reservar en PetCapsule Hotel Salta.\n` +
      `📌 Código: ${reserva.codigo}\n` +
      `🐾 Mascota: ${reserva.mascota.nombre} (${reserva.mascota.raza})\n` +
      `📅 Fechas: ${reserva.fechaCheckIn} al ${reserva.fechaCheckOut}\n` +
      `🏨 Cápsula: ${capsula?.nombre || reserva.capsulaId}\n` +
      `💰 Total: $${reserva.total.toLocaleString('es-AR')}`
  );
  const waUrl = `https://wa.me/5493874001234?text=${mensajeWA}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl max-h-[92dvh] overflow-y-auto flex flex-col shadow-2xl border border-slate-100 safe-bottom">
        {/* Header Voucher */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-t-3xl sm:rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black select-none pointer-events-none">
            🐾
          </div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold tracking-wide uppercase">
              Voucher Digital Confirmado
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 pressable"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span className="text-xs text-emerald-100 font-semibold">¡Estadía Reservada con Éxito!</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">{reserva.codigo}</h2>
            <p className="text-xs text-emerald-100/90 mt-1">
              {reserva.mascota.nombre} • {capsula?.nombre}
            </p>
          </div>
        </div>

        {/* Voucher Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-800">
          {/* Guest Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <img
              src={reserva.mascota.avatarUrl}
              alt={reserva.mascota.nombre}
              className="w-14 h-14 rounded-2xl object-cover border border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                {reserva.mascota.nombre}
              </h4>
              <p className="text-xs text-slate-500">
                {reserva.mascota.raza} • {reserva.mascota.pesoKg} kg
              </p>
              <p className="text-[11px] text-amber-700 font-medium">
                Dueño: {reserva.mascota.nombreDueno}
              </p>
            </div>
          </div>

          {/* Dates & Location */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Ingreso
              </span>
              <span className="font-bold text-slate-900 block">{reserva.fechaCheckIn}</span>
              <span className="text-[11px] text-slate-500">Desde las 10:00 hs</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Salida
              </span>
              <span className="font-bold text-slate-900 block">{reserva.fechaCheckOut}</span>
              <span className="text-[11px] text-slate-500">Hasta las 18:00 hs</span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-start gap-2 p-3 bg-amber-50/60 rounded-xl border border-amber-200/50 text-xs text-amber-900">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Ubicación del Hotel:</span>
              <span className="text-[11px] text-amber-800">
                Barrio Tres Cerritos (a 5 min del centro de Salta). Estacionamiento exclusivo para check-in.
              </span>
            </div>
          </div>

          {/* Simulated Webcam Feature */}
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-emerald-400" />
                  Streaming Cápsula HD (Demo)
                </span>
              </div>
              <button
                onClick={() => setVerCamaraDemo(!verCamaraDemo)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-slate-200 pressable"
              >
                {verCamaraDemo ? 'Ocultar' : 'Probar Cámara'}
              </button>
            </div>

            {verCamaraDemo ? (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                <img
                  src={capsula?.fotoUrl}
                  alt="Camara en vivo"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 bg-black/60 rounded-md text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE • {capsula?.codigo}
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded">
                  22°C • Token Activo
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-300">
                Tu token de cámara privado se activará automáticamente al momento del check-in para que veas a {reserva.mascota.nombre} en tiempo real.
              </p>
            )}
          </div>

          {/* Pricing Summary */}
          <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Total de la estadía</span>
              <span className="text-[11px] text-slate-400">
                {extrasContratados.length > 0 ? `Incluye ${extrasContratados.length} servicio(s) extra` : 'Sin extras'}
              </span>
            </div>
            <span className="text-2xl font-black text-slate-900">
              ${reserva.total.toLocaleString('es-AR')}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
          {/* WhatsApp Direct */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 pressable"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Enviar Reserva a Ezequiel por WhatsApp</span>
          </a>

          {/* Switch to Owner Dashboard Demo shortcut */}
          <button
            onClick={() => {
              onClose();
              setActiveView('EZEQUIEL');
            }}
            className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 pressable shadow-sm"
          >
            <span>Ver cómo aparece en el Panel de Ezequiel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

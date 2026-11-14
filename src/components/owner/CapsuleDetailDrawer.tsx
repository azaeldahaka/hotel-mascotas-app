import React, { useState } from 'react';
import { Capsula } from '../../types';
import { useHotel } from '../../context/HotelContext';
import { X, CheckCircle, LogOut, Sparkles, Phone, AlertTriangle, ShieldCheck, Clock, Calendar } from 'lucide-react';

interface CapsuleDetailDrawerProps {
  capsula: Capsula | null;
  onClose: () => void;
}

export const CapsuleDetailDrawer: React.FC<CapsuleDetailDrawerProps> = ({ capsula, onClose }) => {
  const { reservas, serviciosExtra, actualizarEstadoReserva, agregarServicioAReserva } = useHotel();

  const [mostrarSelectorExtras, setMostrarSelectorExtras] = useState(false);

  if (!capsula) return null;

  // Buscar la reserva actual asociada
  const reservaActual = reservas.find(
    (r) => r.capsulaId === capsula.id && (r.estado === 'CHECKIN' || r.estado === 'CONFIRMADA')
  );

  const extrasContratados = serviciosExtra.filter((s) =>
    reservaActual?.serviciosExtraIds.includes(s.id)
  );

  const extrasDisponiblesParaAgregar = serviciosExtra.filter(
    (s) =>
      !reservaActual?.serviciosExtraIds.includes(s.id) &&
      (s.especieAplicable === 'AMBOS' || s.especieAplicable === capsula.especie)
  );

  const handleCheckIn = () => {
    if (reservaActual) {
      actualizarEstadoReserva(reservaActual.id, 'CHECKIN');
      onClose();
    }
  };

  const handleCheckOut = () => {
    if (reservaActual) {
      actualizarEstadoReserva(reservaActual.id, 'COMPLETADA');
      onClose();
    }
  };

  const handleAgregarExtra = (extraId: string) => {
    if (reservaActual) {
      agregarServicioAReserva(reservaActual.id, extraId);
      setMostrarSelectorExtras(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl max-h-[90dvh] overflow-y-auto flex flex-col shadow-2xl border-t border-slate-200 safe-bottom">
        {/* Grab Handle (Apple style) */}
        <div className="w-full flex justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white">
                {capsula.codigo}
              </span>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {capsula.nombre}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sector {capsula.especie === 'DOG' ? 'Canino' : 'Felino Acústico'} • {capsula.categoria}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 pressable"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Status Banner */}
          <div
            className={`p-3 rounded-2xl flex items-center justify-between border ${
              capsula.estado === 'OCUPADA'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : capsula.estado === 'RESERVADA'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  capsula.estado === 'OCUPADA'
                    ? 'bg-rose-500 animate-pulse'
                    : capsula.estado === 'RESERVADA'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wide">
                Estado: {capsula.estado}
              </span>
            </div>
            <span className="text-xs font-semibold">
              ${capsula.precioNoche.toLocaleString('es-AR')}/noche
            </span>
          </div>

          {reservaActual ? (
            <>
              {/* Pet & Owner Info */}
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <img
                  src={reservaActual.mascota.avatarUrl}
                  alt={reservaActual.mascota.nombre}
                  className="w-14 h-14 rounded-2xl object-cover border border-white shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                      {reservaActual.mascota.nombre}
                    </h4>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {reservaActual.mascota.temperamento}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {reservaActual.mascota.raza} • {reservaActual.mascota.pesoKg} kg
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    Dueño: {reservaActual.mascota.nombreDueno}
                  </p>
                </div>
              </div>

              {/* Stay Dates */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Ingreso / Check-in
                  </span>
                  <span className="font-bold text-slate-900 block">{reservaActual.fechaCheckIn}</span>
                  <span className="text-[11px] text-slate-500">
                    {reservaActual.tipoServicio === 'HOSPEDAJE' ? 'Estadía Noche' : 'Guardería Daycare'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Salida / Check-out
                  </span>
                  <span className="font-bold text-slate-900 block">{reservaActual.fechaCheckOut}</span>
                  <span className="text-[11px] text-slate-500">
                    {reservaActual.estado === 'CHECKIN' ? 'En el hotel ahora' : 'Pendiente de llegada'}
                  </span>
                </div>
              </div>

              {/* Health & Clinical Alerts */}
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/70 space-y-1.5 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Ficha Clínica & Alimentación</span>
                </div>
                <p>
                  <strong className="text-slate-800">Alergias / Cuidados:</strong> {reservaActual.mascota.alergiasNotas}
                </p>
                <p>
                  <strong className="text-slate-800">Medicación:</strong> {reservaActual.mascota.medicacion}
                </p>
                {reservaActual.notasEspeciales && (
                  <p className="text-slate-700 italic border-t border-amber-200/50 pt-1">
                    "{reservaActual.notasEspeciales}"
                  </p>
                )}
              </div>

              {/* Contracted Extras */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Servicios Extra Facturados</span>
                  {extrasDisponiblesParaAgregar.length > 0 && (
                    <button
                      onClick={() => setMostrarSelectorExtras(!mostrarSelectorExtras)}
                      className="text-xs text-amber-600 font-bold hover:underline"
                    >
                      + Agregar Extra
                    </button>
                  )}
                </div>

                {extrasContratados.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {extrasContratados.map((extra) => (
                      <span
                        key={extra.id}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1 border border-slate-200"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {extra.nombre} (${extra.precio.toLocaleString('es-AR')})
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No tiene extras contratados aún.</p>
                )}

                {/* Dropdown to add extras */}
                {mostrarSelectorExtras && (
                  <div className="p-3 bg-slate-100 rounded-2xl space-y-1.5 border border-slate-200 animate-fade-in">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                      Seleccionar servicio para añadir:
                    </span>
                    {extrasDisponiblesParaAgregar.map((extra) => (
                      <button
                        key={extra.id}
                        onClick={() => handleAgregarExtra(extra.id)}
                        className="w-full text-left p-2 rounded-xl bg-white text-xs font-semibold hover:bg-amber-50 flex items-center justify-between transition-all"
                      >
                        <span>{extra.nombre}</span>
                        <span className="text-amber-600 font-bold">
                          +${extra.precio.toLocaleString('es-AR')}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Total Balance */}
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">Monto Total Reserva:</span>
                <span className="text-xl font-black text-slate-900">
                  ${reservaActual.total.toLocaleString('es-AR')}
                </span>
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                ✨
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Cápsula Completamente Libre</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Limpia, sanitizada y lista para recibir a un huésped canino o felino.
              </p>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          {reservaActual ? (
            <>
              {/* WhatsApp to Owner */}
              <a
                href={`https://wa.me/${reservaActual.mascota.telefonoDueno.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 pressable flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {reservaActual.estado === 'CONFIRMADA' && (
                <button
                  onClick={handleCheckIn}
                  className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 pressable"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Realizar Check-In (Ingreso)</span>
                </button>
              )}

              {reservaActual.estado === 'CHECKIN' && (
                <button
                  onClick={handleCheckOut}
                  className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 pressable"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Realizar Check-Out (Salida)</span>
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-slate-200 text-slate-700 font-bold text-xs pressable"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

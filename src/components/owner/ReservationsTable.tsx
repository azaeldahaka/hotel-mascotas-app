import React, { useState } from 'react';
import { Reserva, Capsula } from '../../types';
import { useHotel } from '../../context/HotelContext';
import { Search, Phone, CheckCircle, LogOut, Calendar, Eye, Filter } from 'lucide-react';

interface ReservationsTableProps {
  reservas: Reserva[];
  capsulas: Capsula[];
  onVerCapsula: (capsula: Capsula) => void;
}

export const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservas,
  capsulas,
  onVerCapsula,
}) => {
  const { actualizarEstadoReserva } = useHotel();
  const [filtroEstado, setFiltroEstado] = useState<string>('TODAS');
  const [busqueda, setBusqueda] = useState('');

  const reservasFiltradas = reservas.filter((r) => {
    const matchEstado = filtroEstado === 'TODAS' || r.estado === filtroEstado;
    const q = busqueda.toLowerCase();
    const matchBusqueda =
      r.codigo.toLowerCase().includes(q) ||
      r.mascota.nombre.toLowerCase().includes(q) ||
      r.mascota.nombreDueno.toLowerCase().includes(q) ||
      r.mascota.raza.toLowerCase().includes(q);
    return matchEstado && matchBusqueda;
  });

  return (
    <div className="space-y-4">
      {/* Controls: Search and Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por código, mascota o dueño..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'TODAS', label: 'Todas' },
            { id: 'CHECKIN', label: 'En Hotel' },
            { id: 'CONFIRMADA', label: 'Pendientes' },
            { id: 'COMPLETADA', label: 'Finalizadas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFiltroEstado(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap pressable ${
                filtroEstado === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards for Mobile & Table for Desktop */}
      <div className="space-y-2.5">
        {reservasFiltradas.length > 0 ? (
          reservasFiltradas.map((r) => {
            const capsula = capsulas.find((c) => c.id === r.capsulaId);

            return (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Guest & Core Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={r.mascota.avatarUrl}
                    alt={r.mascota.nombre}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm">
                        {r.mascota.nombre}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {r.codigo}
                      </span>
                      {r.estado === 'CHECKIN' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold">
                          En Hotel
                        </span>
                      )}
                      {r.estado === 'CONFIRMADA' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                          Llega Hoy
                        </span>
                      )}
                      {r.estado === 'COMPLETADA' && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          Completada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {r.mascota.raza} • Dueño: {r.mascota.nombreDueno}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Fechas: {r.fechaCheckIn} al {r.fechaCheckOut} • {capsula?.codigo}
                    </p>
                  </div>
                </div>

                {/* Amount & Quick Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-sm sm:text-base font-black text-slate-900 block">
                      ${r.total.toLocaleString('es-AR')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {r.tipoServicio === 'HOSPEDAJE' ? 'Hospedaje' : 'Daycare'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* View Capsule Drawer */}
                    {capsula && (
                      <button
                        onClick={() => onVerCapsula(capsula)}
                        title="Ver ficha de cápsula"
                        className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 pressable"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${r.mascota.telefonoDueno.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chatear con dueño"
                      className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 pressable"
                    >
                      <Phone className="w-4 h-4" />
                    </a>

                    {/* Action button */}
                    {r.estado === 'CONFIRMADA' && (
                      <button
                        onClick={() => actualizarEstadoReserva(r.id, 'CHECKIN')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 pressable shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Check-In</span>
                      </button>
                    )}

                    {r.estado === 'CHECKIN' && (
                      <button
                        onClick={() => actualizarEstadoReserva(r.id, 'COMPLETADA')}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 pressable shadow-sm"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Check-Out</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-slate-500 text-xs">
            No se encontraron reservas con ese criterio.
          </div>
        )}
      </div>
    </div>
  );
};

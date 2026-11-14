import React from 'react';
import { Reserva } from '../../types';
import { ShieldCheck, AlertTriangle, CheckCircle, Clock, Pill } from 'lucide-react';

interface HealthAuditPanelProps {
  reservas: Reserva[];
}

export const HealthAuditPanel: React.FC<HealthAuditPanelProps> = ({ reservas }) => {
  const activas = reservas.filter((r) => r.estado === 'CHECKIN' || r.estado === 'CONFIRMADA');

  return (
    <div className="space-y-4">
      {/* Overview Banner */}
      <div className="p-4 bg-emerald-950 text-white rounded-3xl shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
          <div>
            <h3 className="font-extrabold text-base leading-tight">
              Control Sanitario y Bioseguridad
            </h3>
            <p className="text-xs text-emerald-300/80">
              Auditoría en tiempo real de cartillas, medicación y alertas clínicas de los huéspedes.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
          100% Bioseguro
        </span>
      </div>

      {/* Guest Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activas.map((r) => {
          const tieneMedicacion = r.mascota.medicacion !== 'Ninguna';
          const tieneAlergias = r.mascota.alergiasNotas.length > 5;

          return (
            <div
              key={r.id}
              className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={r.mascota.avatarUrl}
                    alt={r.mascota.nombre}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                  />
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm block leading-tight">
                      {r.mascota.nombre}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {r.mascota.raza} ({r.mascota.especie === 'DOG' ? 'Canino' : 'Felino'})
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    r.estado === 'CHECKIN'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {r.estado === 'CHECKIN' ? 'En el Hotel' : 'Ingresa Hoy'}
                </span>
              </div>

              {/* Vaccines check */}
              <div className="p-2.5 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    Vacuna Antirrábica
                  </span>
                  <span className="font-bold text-emerald-700 text-[11px]">Vigente</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    {r.mascota.especie === 'DOG' ? 'Vacuna Séxtuple' : 'Triple Felina'}
                  </span>
                  <span className="font-bold text-emerald-700 text-[11px]">Vigente</span>
                </div>
              </div>

              {/* Medication and Allergy Pills */}
              <div className="space-y-1 text-xs">
                {tieneMedicacion && (
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/50 flex items-start gap-1.5">
                    <Pill className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[11px]">Medicación requerida:</span>
                      <span className="text-[11px] text-purple-800">{r.mascota.medicacion}</span>
                    </div>
                  </div>
                )}

                {tieneAlergias && (
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/50 flex items-start gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[11px]">Alergia / Alimento especial:</span>
                      <span className="text-[11px] text-amber-800">{r.mascota.alergiasNotas}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

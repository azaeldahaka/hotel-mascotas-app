import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { CapsuleGrid } from './CapsuleGrid';
import { ReservationsTable } from './ReservationsTable';
import { HealthAuditPanel } from './HealthAuditPanel';
import { CapsuleDetailDrawer } from './CapsuleDetailDrawer';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const {
    capsulas,
    reservas,
    kpis,
    modalDetalleCapsula,
    setModalDetalleCapsula,
    resetearDatosDemo,
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'GRILLA' | 'RESERVAS' | 'SALUD'>('GRILLA');

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-6 pb-24">
      {/* Top Bar Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-mono font-bold tracking-wide">
              ADMIN • EZEQUIEL
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Barrio Tres Cerritos, Salta
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Centro de Mando Operativo
          </h1>
          <p className="text-xs text-slate-500">
            Control de inventario de 16 cápsulas, ocupación y bioseguridad en tiempo real.
          </p>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (window.confirm('¿Deseas restaurar los datos de prueba iniciales del hotel?')) {
              resetearDatosDemo();
            }
          }}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all pressable shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer Demo</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Ocupación */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Ocupación Hoy</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              📊
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {kpis.porcentajeOcupacion}%
            </span>
            <span className="text-xs font-semibold text-slate-400">
              ({kpis.ocupadas}/{kpis.totalCapsulas})
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${kpis.porcentajeOcupacion}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Ingresos de la Jornada */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Facturación Estimada</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              💰
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 truncate">
              ${kpis.ingresosHoy.toLocaleString('es-AR')}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Hospedaje + Extras
          </p>
        </div>

        {/* KPI 3: Check-ins y Check-outs */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Movimientos Hoy</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              📅
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {kpis.reservadas}
            </span>
            <span className="text-xs font-semibold text-slate-400">por ingresar</span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold">
            {kpis.disponibles} cápsulas limpias listas
          </p>
        </div>

        {/* KPI 4: Alertas Médicas */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Alertas Clínicas</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              🛡️
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-rose-600">
              {kpis.alertasMedicas}
            </span>
            <span className="text-xs font-semibold text-slate-400">con medicación</span>
          </div>
          <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Supervisión veterinaria
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('GRILLA')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap pressable ${
            activeTab === 'GRILLA'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Grilla de 16 Cápsulas</span>
        </button>

        <button
          onClick={() => setActiveTab('RESERVAS')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap pressable ${
            activeTab === 'RESERVAS'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Gestión de Reservas ({reservas.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SALUD')}
          className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap pressable ${
            activeTab === 'SALUD'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Semáforo Sanitario</span>
          {kpis.alertasMedicas > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
              {kpis.alertasMedicas}
            </span>
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'GRILLA' && (
        <CapsuleGrid
          capsulas={capsulas}
          reservas={reservas}
          onSelectCapsule={(c) => setModalDetalleCapsula(c)}
        />
      )}

      {activeTab === 'RESERVAS' && (
        <ReservationsTable
          reservas={reservas}
          capsulas={capsulas}
          onVerCapsula={(c) => setModalDetalleCapsula(c)}
        />
      )}

      {activeTab === 'SALUD' && <HealthAuditPanel reservas={reservas} />}

      {/* Capsule Details Drawer (Apple Bottom Sheet) */}
      {modalDetalleCapsula && (
        <CapsuleDetailDrawer
          capsula={modalDetalleCapsula}
          onClose={() => setModalDetalleCapsula(null)}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { CapsulaCard } from './CapsulaCard';
import { BookingWizardModal } from './BookingWizardModal';
import { VoucherModal } from './VoucherModal';
import { Capsula } from '../../types';
import { Shield, Sparkles, Heart, Award, CheckCircle2, MapPin, Compass } from 'lucide-react';

export const ClientView: React.FC = () => {
  const {
    capsulas,
    filtroEspecieCliente,
    setFiltroEspecieCliente,
    reservaConfirmadaParaVoucher,
    setReservaConfirmadaParaVoucher,
  } = useHotel();

  const [capsulaParaReservar, setCapsulaParaReservar] = useState<Capsula | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('TODAS');

  // Filtrar por especie y categoría
  const capsulasFiltradas = capsulas.filter((c) => {
    const matchEspecie = c.especie === filtroEspecieCliente;
    const matchCategoria = filtroCategoria === 'TODAS' || c.categoria === filtroCategoria;
    return matchEspecie && matchCategoria;
  });

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative px-4 pt-4 pb-8 sm:pt-8 sm:pb-12 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>El Primer Hotel Cápsula del Norte Argentino</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Cuidado 5 estrellas sin jaulas para tu mascota
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            16 cápsulas individuales climatizadas e insonorizadas en Barrio Tres Cerritos.
            Cámaras en vivo 24/7 y áreas estrictamente separadas para perros y gatos.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-700">
            <span className="px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-100 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Guardia Veterinaria 24/7
            </span>
            <span className="px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-100 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Pet Spa & Baño Relax
            </span>
            <span className="px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-100 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Pet Taxi Salta Capital
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Category filters */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {filtroEspecieCliente === 'DOG' ? 'Cápsulas Caninas' : 'Cápsulas y Torres Felinas'}
            </h2>
            <p className="text-xs text-slate-500">
              {capsulasFiltradas.length} espacios acondicionados con desinfección UV-C
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {['TODAS', 'Standard', 'Deluxe', 'Master Penthouse'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all pressable whitespace-nowrap ${
                  filtroCategoria === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'TODAS' ? 'Todas las Suites' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {capsulasFiltradas.map((capsula) => (
            <CapsulaCard
              key={capsula.id}
              capsula={capsula}
              onReservar={(c) => setCapsulaParaReservar(c)}
            />
          ))}
        </div>

        {/* Informative Tourism & Location Banner */}
        <section className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <Compass className="w-3.5 h-3.5" />
              ¿Venís a turistear a Salta?
            </div>
            <h3 className="text-xl sm:text-2xl font-black leading-tight">
              Disfrutá tus excursiones sin preocuparte por tu mejor amigo
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Muchas atracciones turísticas (Tren a las Nubes, museos, peñas o Salinas) no permiten mascotas. Dejá a tu compañero en nuestra guardería de día por horas y recibí reportes con fotos y videos en tiempo real.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => {
                const disponible = capsulas.find((c) => c.estado === 'DISPONIBLE' && c.especie === filtroEspecieCliente);
                if (disponible) setCapsulaParaReservar(disponible);
              }}
              className="px-6 py-3 rounded-2xl bg-white text-amber-700 font-extrabold text-sm shadow-lg hover:bg-amber-50 pressable"
            >
              Reservar Guardería Ahora
            </button>
          </div>
        </section>
      </main>

      {/* Booking Wizard Modal */}
      {capsulaParaReservar && (
        <BookingWizardModal
          capsula={capsulaParaReservar}
          onClose={() => setCapsulaParaReservar(null)}
        />
      )}

      {/* Voucher Modal */}
      {reservaConfirmadaParaVoucher && (
        <VoucherModal
          reserva={reservaConfirmadaParaVoucher}
          onClose={() => setReservaConfirmadaParaVoucher(null)}
        />
      )}
    </div>
  );
};

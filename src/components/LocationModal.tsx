import React, { useState } from 'react';
import { X, MapPin, Bus, Navigation, Compass, ExternalLink } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [vistaMapa, setVistaMapa] = useState<'MAPA' | 'CROQUIS'>('MAPA');

  if (!isOpen) return null;

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Avenida+Reyes+Catolicos+Tres+Cerritos+Salta+Capital';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-3xl rounded-t-3xl max-h-[92dvh] overflow-y-auto flex flex-col shadow-2xl border border-slate-100 safe-bottom">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg">
              📍
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base leading-tight">
                Ubicación & Accesibilidad
              </h2>
              <p className="text-xs text-slate-500">
                Avenida Reyes Católicos • Barrio Tres Cerritos, Salta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 pressable"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-800">
          {/* Map / Croquis Switcher */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setVistaMapa('MAPA')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all pressable ${
                vistaMapa === 'MAPA'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🗺️ Mapa de Localización
            </button>
            <button
              onClick={() => setVistaMapa('CROQUIS')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all pressable ${
                vistaMapa === 'CROQUIS'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              📐 Croquis de Accesibilidad
            </button>
          </div>

          {/* Map Image Viewer */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-inner">
            {vistaMapa === 'MAPA' ? (
              <img
                src="/maps/mapa_localizacion_tres_cerritos_final.png"
                alt="Mapa de Localización Tres Cerritos"
                className="w-full h-56 sm:h-72 object-contain bg-slate-900"
              />
            ) : (
              <img
                src="/maps/croquis_localizacion_tres_cerritos.png"
                alt="Croquis Esquemático de Accesibilidad"
                className="w-full h-56 sm:h-72 object-contain bg-slate-900"
              />
            )}
          </div>

          {/* Location details card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-600" />
                Zona Estratégica
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Situado en el polo gastronómico y residencial de Tres Cerritos, a solo 5 minutos del centro y con estacionamiento prioritario para clientes.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-blue-600" />
                Transporte Público SAETA
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Líneas <strong>5A</strong> (ramal UCASAL, Profesionales y Samsón), <strong>5B</strong> y <strong>8 Transversal</strong> con paradas a menos de 100 metros.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Google Maps Link */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 pressable"
          >
            <Compass className="w-4 h-4" />
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
};

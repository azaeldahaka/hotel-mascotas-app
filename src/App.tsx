import React from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { ModeSelector } from './components/ModeSelector';
import { Header } from './components/Header';
import { ClientView } from './components/client/ClientView';
import { OwnerDashboard } from './components/owner/OwnerDashboard';

const MainContent: React.FC = () => {
  const { activeView } = useHotel();

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between">
      <div>
        <ModeSelector />
        {activeView === 'CLIENTE' ? (
          <>
            <Header />
            <ClientView />
          </>
        ) : (
          <OwnerDashboard />
        )}
      </div>

      {/* Shared Mobile-Friendly Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-xs border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-white font-extrabold text-sm">
              <span>🐾 PetCapsule Hotel Salta</span>
              <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                MVP v1.0
              </span>
            </div>
            <p className="text-slate-500">
              Barrio Tres Cerritos, Salta Capital • Hospedaje individual climatizado para perros y gatos.
            </p>
          </div>

          <div className="text-slate-500 text-[11px] space-y-0.5">
            <p>Proyecto Integrador de Turismo e Ingeniería de Software</p>
            <p className="text-slate-400 font-medium">Desarrollado para demostración a Ezequiel</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <HotelProvider>
      <MainContent />
    </HotelProvider>
  );
}

export default App;

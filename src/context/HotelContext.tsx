import React, { createContext, useContext, useState, useEffect } from 'react';
import { Capsula, Reserva, ServicioExtra, Especie, EstadoReserva } from '../types';
import { CAPSULAS_INICIALES, RESERVAS_INICIALES, SERVICIOS_EXTRA } from '../data/mockData';

export type ViewMode = 'CLIENTE' | 'EZEQUIEL';

interface HotelContextType {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  capsulas: Capsula[];
  reservas: Reserva[];
  serviciosExtra: ServicioExtra[];
  filtroEspecieCliente: Especie;
  setFiltroEspecieCliente: (especie: Especie) => void;
  crearReserva: (reservaData: {
    tipoServicio: 'HOSPEDAJE' | 'DAYCARE';
    fechaCheckIn: string;
    fechaCheckOut: string;
    horasDaycare?: number;
    capsulaId: string;
    serviciosExtraIds: string[];
    mascota: {
      nombre: string;
      especie: Especie;
      raza: string;
      edad: string;
      pesoKg: number;
      nombreDueno: string;
      telefonoDueno: string;
      emailDueno: string;
      alergiasNotas: string;
      medicacion: string;
      temperamento: 'Sociable' | 'Tranquilo' | 'Miedoso' | 'Enérgico';
      vacunasAlDia: boolean;
      vacunaAntirrabica: boolean;
      vacunaSextupleOTriple: boolean;
      avatarUrl?: string;
    };
    notasEspeciales?: string;
  }) => Reserva;
  actualizarEstadoReserva: (reservaId: string, nuevoEstado: EstadoReserva) => void;
  agregarServicioAReserva: (reservaId: string, servicioExtraId: string) => void;
  modalDetalleCapsula: Capsula | null;
  setModalDetalleCapsula: (capsula: Capsula | null) => void;
  reservaConfirmadaParaVoucher: Reserva | null;
  setReservaConfirmadaParaVoucher: (reserva: Reserva | null) => void;
  resetearDatosDemo: () => void;
  kpis: {
    totalCapsulas: number;
    ocupadas: number;
    disponibles: number;
    reservadas: number;
    porcentajeOcupacion: number;
    ingresosTotales: number;
    ingresosHoy: number;
    movimientosHoy: number;
    alertasMedicas: number;
  };
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEY_CAPSULAS = 'hotel_mascotas_capsulas_v1';
const STORAGE_KEY_RESERVAS = 'hotel_mascotas_reservas_v1';

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewMode>('CLIENTE');
  const [filtroEspecieCliente, setFiltroEspecieCliente] = useState<Especie>('DOG');
  const [modalDetalleCapsula, setModalDetalleCapsula] = useState<Capsula | null>(null);
  const [reservaConfirmadaParaVoucher, setReservaConfirmadaParaVoucher] = useState<Reserva | null>(null);

  const [capsulas, setCapsulas] = useState<Capsula[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CAPSULAS);
      return saved ? JSON.parse(saved) : CAPSULAS_INICIALES;
    } catch {
      return CAPSULAS_INICIALES;
    }
  });

  const [reservas, setReservas] = useState<Reserva[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESERVAS);
      return saved ? JSON.parse(saved) : RESERVAS_INICIALES;
    } catch {
      return RESERVAS_INICIALES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CAPSULAS, JSON.stringify(capsulas));
    } catch (e) {
      console.error('Error saving capsulas to localStorage', e);
    }
  }, [capsulas]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESERVAS, JSON.stringify(reservas));
    } catch (e) {
      console.error('Error saving reservas to localStorage', e);
    }
  }, [reservas]);

  const resetearDatosDemo = () => {
    localStorage.removeItem(STORAGE_KEY_CAPSULAS);
    localStorage.removeItem(STORAGE_KEY_RESERVAS);
    setCapsulas(CAPSULAS_INICIALES);
    setReservas(RESERVAS_INICIALES);
    setModalDetalleCapsula(null);
    setReservaConfirmadaParaVoucher(null);
  };

  const crearReserva: HotelContextType['crearReserva'] = (datos) => {
    const capsula = capsulas.find((c) => c.id === datos.capsulaId);
    if (!capsula) throw new Error('Cápsula no encontrada');

    // Calcular costos
    let subtotalHospedaje = 0;
    if (datos.tipoServicio === 'HOSPEDAJE') {
      const f1 = new Date(datos.fechaCheckIn);
      const f2 = new Date(datos.fechaCheckOut);
      const diffTime = Math.max(1, Math.round((f2.getTime() - f1.getTime()) / (1000 * 60 * 60 * 24)));
      subtotalHospedaje = diffTime * capsula.precioNoche;
    } else {
      subtotalHospedaje = (datos.horasDaycare || 6) * capsula.precioHoraDaycare;
    }

    const extrasSeleccionados = SERVICIOS_EXTRA.filter((s) => datos.serviciosExtraIds.includes(s.id));
    const totalExtras = extrasSeleccionados.reduce((sum, item) => sum + item.precio, 0);
    const total = subtotalHospedaje + totalExtras;

    const nuevaReservaId = `RES-${Date.now().toString().slice(-4)}`;
    const nuevoCodigo = `SALTA-${Math.floor(1000 + Math.random() * 9000)}`;

    const nuevaReserva: Reserva = {
      id: nuevaReservaId,
      codigo: nuevoCodigo,
      tipoServicio: datos.tipoServicio,
      fechaCheckIn: datos.fechaCheckIn,
      fechaCheckOut: datos.fechaCheckOut,
      horasDaycare: datos.horasDaycare,
      capsulaId: datos.capsulaId,
      serviciosExtraIds: datos.serviciosExtraIds,
      subtotalHospedaje,
      totalExtras,
      total,
      estado: 'CONFIRMADA',
      fechaCreacion: new Date().toISOString().split('T')[0],
      webcamToken: `cam_${datos.capsulaId.toLowerCase()}_${Date.now()}`,
      notasEspeciales: datos.notasEspeciales,
      mascota: {
        id: `PET-${Date.now().toString().slice(-4)}`,
        ...datos.mascota,
        avatarUrl:
          datos.mascota.avatarUrl ||
          (datos.mascota.especie === 'DOG'
            ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
            : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'),
      },
    };

    // Actualizar reservas y estado de la cápsula a RESERVADA
    setReservas((prev) => [nuevaReserva, ...prev]);
    setCapsulas((prev) =>
      prev.map((c) =>
        c.id === datos.capsulaId
          ? {
              ...c,
              estado: 'RESERVADA',
              reservaActualId: nuevaReservaId,
            }
          : c
      )
    );

    setReservaConfirmadaParaVoucher(nuevaReserva);
    return nuevaReserva;
  };

  const actualizarEstadoReserva = (reservaId: string, nuevoEstado: EstadoReserva) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === reservaId ? { ...r, estado: nuevoEstado } : r))
    );

    const reserva = reservas.find((r) => r.id === reservaId);
    if (!reserva) return;

    if (nuevoEstado === 'CHECKIN') {
      setCapsulas((prev) =>
        prev.map((c) =>
          c.id === reserva.capsulaId
            ? { ...c, estado: 'OCUPADA', reservaActualId: reservaId }
            : c
        )
      );
    } else if (nuevoEstado === 'COMPLETADA' || nuevoEstado === 'CANCELADA') {
      setCapsulas((prev) =>
        prev.map((c) =>
          c.id === reserva.capsulaId
            ? { ...c, estado: 'DISPONIBLE', reservaActualId: undefined }
            : c
        )
      );
    }
  };

  const agregarServicioAReserva = (reservaId: string, servicioExtraId: string) => {
    const servicio = SERVICIOS_EXTRA.find((s) => s.id === servicioExtraId);
    if (!servicio) return;

    setReservas((prev) =>
      prev.map((r) => {
        if (r.id !== reservaId) return r;
        if (r.serviciosExtraIds.includes(servicioExtraId)) return r;
        const nuevosExtras = [...r.serviciosExtraIds, servicioExtraId];
        const nuevoTotalExtras = r.totalExtras + servicio.precio;
        return {
          ...r,
          serviciosExtraIds: nuevosExtras,
          totalExtras: nuevoTotalExtras,
          total: r.subtotalHospedaje + nuevoTotalExtras,
        };
      })
    );
  };

  // KPIs en tiempo real
  const ocupadas = capsulas.filter((c) => c.estado === 'OCUPADA').length;
  const reservadas = capsulas.filter((c) => c.estado === 'RESERVADA').length;
  const disponibles = capsulas.filter((c) => c.estado === 'DISPONIBLE').length;
  const porcentajeOcupacion = Math.round((ocupadas / capsulas.length) * 100);

  const ingresosTotales = reservas.reduce((sum, r) => sum + r.total, 0);
  const ingresosHoy = reservas
    .filter((r) => r.estado === 'CHECKIN' || r.estado === 'CONFIRMADA')
    .reduce((sum, r) => sum + (r.tipoServicio === 'DAYCARE' ? r.total : r.total / 4), 0);

  const movimientosHoy = reservas.filter(
    (r) => r.fechaCheckIn === '2026-11-13' || r.fechaCheckOut === '2026-11-13'
  ).length;

  const alertasMedicas = reservas.filter(
    (r) =>
      r.estado === 'CHECKIN' &&
      (r.mascota.medicacion !== 'Ninguna' || !r.mascota.vacunasAlDia || r.mascota.alergiasNotas.length > 5)
  ).length;

  return (
    <HotelContext.Provider
      value={{
        activeView,
        setActiveView,
        capsulas,
        reservas,
        serviciosExtra: SERVICIOS_EXTRA,
        filtroEspecieCliente,
        setFiltroEspecieCliente,
        crearReserva,
        actualizarEstadoReserva,
        agregarServicioAReserva,
        modalDetalleCapsula,
        setModalDetalleCapsula,
        reservaConfirmadaParaVoucher,
        setReservaConfirmadaParaVoucher,
        resetearDatosDemo,
        kpis: {
          totalCapsulas: capsulas.length,
          ocupadas,
          disponibles,
          reservadas,
          porcentajeOcupacion,
          ingresosTotales,
          ingresosHoy: Math.round(ingresosHoy),
          movimientosHoy,
          alertasMedicas,
        },
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

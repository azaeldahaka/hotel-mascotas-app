export type Especie = 'DOG' | 'CAT';

export type EstadoCapsula = 'DISPONIBLE' | 'OCUPADA' | 'RESERVADA' | 'MANTENIMIENTO';

export type TipoServicio = 'HOSPEDAJE' | 'DAYCARE';

export type EstadoReserva = 'PENDIENTE' | 'CONFIRMADA' | 'CHECKIN' | 'COMPLETADA' | 'CANCELADA';

export type CategoriaCapsula = 'Standard' | 'Deluxe' | 'Master Penthouse';

export interface Capsula {
  id: string;
  codigo: string;
  nombre: string;
  especie: Especie;
  categoria: CategoriaCapsula;
  precioNoche: number;
  precioHoraDaycare: number;
  estado: EstadoCapsula;
  caracteristicas: string[];
  fotoUrl: string;
  reservaActualId?: string;
  capacidadKgMax: number;
}

export interface Mascota {
  id: string;
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
  avatarUrl: string;
}

export interface ServicioExtra {
  id: string;
  nombre: string;
  precio: number;
  icono: string;
  descripcion: string;
  unidad: string;
  especieAplicable: 'DOG' | 'CAT' | 'AMBOS';
}

export interface Reserva {
  id: string;
  codigo: string;
  tipoServicio: TipoServicio;
  fechaCheckIn: string;
  fechaCheckOut: string;
  horasDaycare?: number;
  mascota: Mascota;
  capsulaId: string;
  serviciosExtraIds: string[];
  subtotalHospedaje: number;
  totalExtras: number;
  total: number;
  estado: EstadoReserva;
  fechaCreacion: string;
  webcamToken: string;
  notasEspeciales?: string;
}

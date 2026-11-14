import React, { useState } from 'react';
import { Capsula, Especie, TipoServicio } from '../../types';
import { useHotel } from '../../context/HotelContext';
import { X, Calendar, User, Sparkles, Check, AlertCircle, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingWizardModalProps {
  capsula: Capsula | null;
  onClose: () => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({ capsula, onClose }) => {
  const { crearReserva, serviciosExtra } = useHotel();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Service & Dates
  const [tipoServicio, setTipoServicio] = useState<TipoServicio>('HOSPEDAJE');
  const [fechaCheckIn, setFechaCheckIn] = useState<string>('2026-11-15');
  const [fechaCheckOut, setFechaCheckOut] = useState<string>('2026-11-18');
  const [horasDaycare, setHorasDaycare] = useState<number>(6);

  // Step 2: Pet & Owner Info
  const [nombreMascota, setNombreMascota] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('2 años');
  const [pesoKg, setPesoKg] = useState<number>(capsula ? Math.min(10, capsula.capacidadKgMax) : 10);
  const [nombreDueno, setNombreDueno] = useState('');
  const [telefonoDueno, setTelefonoDueno] = useState('');
  const [emailDueno, setEmailDueno] = useState('');
  const [temperamento, setTemperamento] = useState<'Sociable' | 'Tranquilo' | 'Miedoso' | 'Enérgico'>('Sociable');
  const [alergiasNotas, setAlergiasNotas] = useState('');
  const [medicacion, setMedicacion] = useState('Ninguna');
  const [vacunaAntirrabica, setVacunaAntirrabica] = useState(true);
  const [vacunaSextupleOTriple, setVacunaSextupleOTriple] = useState(true);

  // Step 3: Extras
  const [serviciosExtraIds, setServiciosExtraIds] = useState<string[]>(['spa-banio']);
  const [notasEspeciales, setNotasEspeciales] = useState('');

  if (!capsula) return null;

  // Calculo de costos
  let noches = 1;
  let subtotal = 0;
  if (tipoServicio === 'HOSPEDAJE') {
    const f1 = new Date(fechaCheckIn);
    const f2 = new Date(fechaCheckOut);
    noches = Math.max(1, Math.round((f2.getTime() - f1.getTime()) / (1000 * 60 * 60 * 24)));
    subtotal = noches * capsula.precioNoche;
  } else {
    subtotal = horasDaycare * capsula.precioHoraDaycare;
  }

  const extrasDisponibles = serviciosExtra.filter(
    (s) => s.especieAplicable === 'AMBOS' || s.especieAplicable === capsula.especie
  );

  const totalExtras = extrasDisponibles
    .filter((s) => serviciosExtraIds.includes(s.id))
    .reduce((acc, curr) => acc + curr.precio, 0);

  const totalGeneral = subtotal + totalExtras;

  const toggleExtra = (id: string) => {
    setServiciosExtraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinalizar = (e: React.FormEvent) => {
    e.preventDefault();

    crearReserva({
      tipoServicio,
      fechaCheckIn,
      fechaCheckOut: tipoServicio === 'HOSPEDAJE' ? fechaCheckOut : fechaCheckIn,
      horasDaycare: tipoServicio === 'DAYCARE' ? horasDaycare : undefined,
      capsulaId: capsula.id,
      serviciosExtraIds,
      notasEspeciales,
      mascota: {
        nombre: nombreMascota || 'Mascota Mimada',
        especie: capsula.especie,
        raza: raza || (capsula.especie === 'DOG' ? 'Mestizo' : 'Común Europeo'),
        edad,
        pesoKg: Number(pesoKg) || 8,
        nombreDueno: nombreDueno || 'Dueño Responsable',
        telefonoDueno: telefonoDueno || '+54 9 387 123-4567',
        emailDueno: emailDueno || 'contacto@gmail.com',
        alergiasNotas: alergiasNotas || 'Sin alergias reportadas',
        medicacion: medicacion || 'Ninguna',
        temperamento,
        vacunasAlDia: vacunaAntirrabica && vacunaSextupleOTriple,
        vacunaAntirrabica,
        vacunaSextupleOTriple,
      },
    });

    // Disparar confeti de éxito
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-3xl rounded-t-3xl max-h-[92dvh] overflow-y-auto flex flex-col shadow-2xl border border-slate-100 safe-bottom">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg">
              {capsula.especie === 'DOG' ? '🐕' : '🐈'}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base leading-tight">
                Reservar {capsula.nombre}
              </h2>
              <p className="text-xs text-slate-500">
                Paso {step} de 3 — {step === 1 ? 'Estadía' : step === 2 ? 'Mascota' : 'Extras & Total'}
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

        {/* Form Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Tipo de Servicio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTipoServicio('HOSPEDAJE')}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all pressable ${
                      tipoServicio === 'HOSPEDAJE'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-sm">🌙 Hospedaje Nocturno</span>
                    <span className="text-[11px] text-slate-500">
                      Estadía completa por noches (${capsula.precioNoche.toLocaleString('es-AR')}/n)
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoServicio('DAYCARE')}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all pressable ${
                      tipoServicio === 'DAYCARE'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-sm">☀️ Guardería Daycare</span>
                    <span className="text-[11px] text-slate-500">
                      Por horas para excursiones (${capsula.precioHoraDaycare.toLocaleString('es-AR')}/h)
                    </span>
                  </button>
                </div>
              </div>

              {tipoServicio === 'HOSPEDAJE' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={fechaCheckIn}
                      onChange={(e) => setFechaCheckIn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={fechaCheckOut}
                      onChange={(e) => setFechaCheckOut(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Fecha del Turno
                    </label>
                    <input
                      type="date"
                      value={fechaCheckIn}
                      onChange={(e) => {
                        setFechaCheckIn(e.target.value);
                        setFechaCheckOut(e.target.value);
                      }}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Cantidad de Horas:</span>
                      <span className="text-amber-600 font-extrabold">{horasDaycare} horas</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      value={horasDaycare}
                      onChange={(e) => setHorasDaycare(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>2h (Mínimo)</span>
                      <span>6h (Media jornada)</span>
                      <span>12h (Día completo)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtotal Preview */}
              <div className="bg-slate-50 p-3.5 rounded-2xl flex items-center justify-between border border-slate-100">
                <span className="text-xs font-medium text-slate-600">
                  {tipoServicio === 'HOSPEDAJE' ? `${noches} noche(s) base:` : `${horasDaycare} horas base:`}
                </span>
                <span className="text-base font-black text-slate-900">
                  ${subtotal.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nombre Mascota *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Milo"
                    value={nombreMascota}
                    onChange={(e) => setNombreMascota(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Raza
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Golden / Siamés"
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Peso aprox. (kg)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={capsula.capacidadKgMax}
                    value={pesoKg}
                    onChange={(e) => setPesoKg(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Temperamento
                  </label>
                  <select
                    value={temperamento}
                    onChange={(e) => setTemperamento(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Sociable">Sociable y juguetón</option>
                    <option value="Tranquilo">Tranquilo y relajado</option>
                    <option value="Miedoso">Tímido / Miedoso</option>
                    <option value="Enérgico">Muy enérgico</option>
                  </select>
                </div>
              </div>

              {/* Owner details */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Datos del Responsable
                </span>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Nombre y Apellido del dueño"
                    value={nombreDueno}
                    onChange={(e) => setNombreDueno(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono móvil / WhatsApp (ej: +54 9 387 400-0000)"
                    value={telefonoDueno}
                    onChange={(e) => setTelefonoDueno(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Health Validation */}
              <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Protocolo de Bioseguridad Sanitaria</span>
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vacunaAntirrabica}
                    onChange={(e) => setVacunaAntirrabica(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>Vacuna Antirrábica vigente (Obligatoria)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vacunaSextupleOTriple}
                    onChange={(e) => setVacunaSextupleOTriple(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>
                    {capsula.especie === 'DOG'
                      ? 'Vacuna Séxtuple o Puppy al día'
                      : 'Vacuna Triple Felina y Leucemia al día'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Servicios Complementarios (Opcionales)
                </label>
                <div className="space-y-2">
                  {extrasDisponibles.map((extra) => {
                    const isSelected = serviciosExtraIds.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between gap-3 transition-all pressable ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                              isSelected
                                ? 'bg-amber-500 border-amber-500 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">
                              {extra.nombre}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {extra.descripcion}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-amber-700 whitespace-nowrap">
                          +${extra.precio.toLocaleString('es-AR')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Notas de Alimentación / Medicación
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Horarios de comida, comida propia que traen, etc."
                  value={notasEspeciales}
                  onChange={(e) => setNotasEspeciales(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Total Calculation Card */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 shadow-lg">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Hospedaje base:</span>
                  <span>${subtotal.toLocaleString('es-AR')}</span>
                </div>
                {totalExtras > 0 && (
                  <div className="flex justify-between text-xs text-amber-300">
                    <span>Servicios adicionales:</span>
                    <span>+${totalExtras.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold">Total Estimado:</span>
                  <span className="text-2xl font-black text-amber-400">
                    ${totalGeneral.toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 text-right">
                  Se abona en recepción al hacer check-in o por transferencia.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 hover:bg-white pressable"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as any)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-amber-500/20 pressable"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalizar}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 pressable"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirmar Reserva</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

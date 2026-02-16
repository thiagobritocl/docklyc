import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed, UtensilsCrossed, ChefHat, Music, Dice5, Sparkles,
  ShoppingBag, Headphones, Compass, Wrench, ChevronDown,
  Globe, Briefcase, Star, Clock, Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const HERO_IMG = "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=1920&q=80";

type EntryLevel = "entry-level" | "experiencia" | "especializado";

interface Dept {
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  entryLevel: EntryLevel;
  description: string;
  positions: string[];
  functions: string[];
  english: string;
  experience: string;
  skills: string[];
  conditions: string;
}

const entryBadge: Record<EntryLevel, { label: string; cls: string }> = {
  "entry-level": { label: "Entry-level", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  "experiencia": { label: "Requiere experiencia", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  "especializado": { label: "Especializado", cls: "bg-rose-500/15 text-rose-400 border-rose-500/25" },
};

const departments: Dept[] = [
  {
    name: "Hotel / Housekeeping",
    icon: Bed,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    entryLevel: "entry-level",
    description: "Se encarga de mantener la limpieza y el orden de cabinas, areas publicas y espacios comunes. Es una de las puertas de entrada mas accesibles para quienes inician en la industria.",
    positions: ["Stateroom Attendant", "Public Area Cleaner", "Laundry Attendant", "Housekeeping Supervisor", "Assistant Housekeeper"],
    functions: ["Limpieza y preparacion diaria de cabinas", "Reposicion de amenidades y ropa de cama", "Limpieza de areas publicas", "Servicio de lavanderia", "Atencion a solicitudes de huespedes"],
    english: "Basico a intermedio. Entender instrucciones y comunicarse con huespedes para solicitudes simples.",
    experience: "No siempre obligatoria. Experiencia en hoteleria es una ventaja, pero muchas navieras aceptan candidatos sin experiencia previa.",
    skills: ["Atencion al detalle", "Resistencia fisica", "Trabajo en equipo", "Organizacion", "Actitud de servicio"],
    conditions: "Jornadas de 10-12 horas diarias, 7 dias a la semana. Contratos de 6-9 meses. Alojamiento y alimentacion incluidos. Propinas pueden ser parte significativa del ingreso.",
  },
  {
    name: "Alimentos y Bebidas (F&B)",
    icon: UtensilsCrossed,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    entryLevel: "entry-level",
    description: "Gestiona restaurantes, bares, buffets y servicios de comida a bordo. Es uno de los departamentos mas grandes y con mayor interaccion directa con pasajeros.",
    positions: ["Waiter / Waitress", "Assistant Waiter", "Bartender", "Bar Waiter", "Buffet Attendant", "Head Waiter", "Sommelier"],
    functions: ["Servicio de alimentos en restaurantes y buffets", "Preparacion y servicio de bebidas", "Montaje y desmontaje de mesas", "Atencion personalizada a pasajeros", "Manejo de inventario de bebidas"],
    english: "Intermedio a avanzado. Comunicacion fluida para tomar pedidos y hacer recomendaciones.",
    experience: "Experiencia en restaurantes u hoteleria es altamente valorada. Algunos puestos de entrada pueden no requerirla.",
    skills: ["Comunicacion interpersonal", "Manejo de estres", "Memoria y atencion", "Conocimiento de vinos y cocteles", "Trabajo bajo presion"],
    conditions: "Jornadas de 10-13 horas, especialmente en dias de navegacion. Propinas son parte importante del salario. Contratos de 6-8 meses.",
  },
  {
    name: "Cocina / Galley",
    icon: ChefHat,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    entryLevel: "experiencia",
    description: "Produce miles de comidas diarias para pasajeros y tripulacion. Requiere personal con formacion culinaria y capacidad de trabajar en espacios reducidos bajo alta presion.",
    positions: ["Cook / Line Cook", "Commis Chef", "Demi Chef de Partie", "Chef de Partie", "Sous Chef", "Pastry Chef", "Executive Chef", "Galley Steward"],
    functions: ["Preparacion de alimentos segun estandares", "Manejo de cocina en linea", "Control de calidad e higiene alimentaria", "Gestion de inventario", "Cumplimiento de normativas sanitarias maritimas"],
    english: "Basico a intermedio. La comunicacion tecnica en cocina suele ser en ingles.",
    experience: "Generalmente se requiere formacion culinaria formal y/o experiencia en cocina profesional. Galley Steward puede ser entry-level.",
    skills: ["Formacion culinaria", "Resistencia al calor y presion", "Conocimiento de HACCP", "Trabajo en equipo", "Velocidad y precision"],
    conditions: "Jornadas de 10-14 horas en espacios calurosos. Contratos de 6-9 meses. Buena progresion de carrera para cocineros con talento.",
  },
  {
    name: "Entretenimiento",
    icon: Music,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    entryLevel: "especializado",
    description: "Se encarga de la programacion de actividades, shows, eventos y animacion. Incluye artistas de escenario, coordinadores de actividades y personal de programas infantiles.",
    positions: ["Cruise Director", "Activities Coordinator", "DJ", "Musician", "Dancer / Performer", "Sound & Light Technician", "Youth Staff"],
    functions: ["Planificacion y ejecucion de shows", "Animacion de actividades diurnas y nocturnas", "Coordinacion de artistas y tecnicos", "Conduccion de juegos y fiestas tematicas", "Supervision de programas infantiles"],
    english: "Avanzado. Interaccion constante y presentaciones ante audiencias internacionales.",
    experience: "Se requiere experiencia demostrable: actuacion, musica, danza, produccion de eventos o trabajo con ninos.",
    skills: ["Carisma y presencia escenica", "Comunicacion publica", "Creatividad", "Flexibilidad horaria", "Talento artistico especifico"],
    conditions: "Horarios variables incluyendo noches. Contratos de 4-8 meses. Ambiente de trabajo mas social que otros departamentos.",
  },
  {
    name: "Casino",
    icon: Dice5,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    entryLevel: "experiencia",
    description: "Opera las instalaciones de juego a bordo: mesas, maquinas tragamonedas y eventos de poker. Regulaciones estrictas y requisitos especificos de licencia.",
    positions: ["Casino Dealer", "Slot Technician", "Casino Cashier", "Casino Host", "Casino Manager"],
    functions: ["Operacion de mesas de juego", "Mantenimiento de maquinas", "Manejo de transacciones y fichas", "Atencion al cliente en casino", "Cumplimiento de regulaciones de juego maritimo"],
    english: "Intermedio a avanzado. Comunicar reglas de juego y manejar transacciones con pasajeros internacionales.",
    experience: "Formacion especifica como dealer. Algunas navieras ofrecen entrenamiento, pero experiencia previa en casinos es una ventaja.",
    skills: ["Habilidad matematica rapida", "Destreza manual", "Integridad y etica", "Atencion al detalle", "Manejo de presion"],
    conditions: "Horarios nocturnos principalmente. Opera en aguas internacionales. Contratos de 6-8 meses. Propinas pueden ser parte del ingreso.",
  },
  {
    name: "Spa & Wellness",
    icon: Sparkles,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    entryLevel: "especializado",
    description: "Ofrece servicios de belleza, masajes, tratamientos corporales y fitness. Generalmente operado por concesionarios externos como Steiner Leisure.",
    positions: ["Massage Therapist", "Hair Stylist", "Nail Technician", "Fitness Instructor", "Beauty Therapist", "Spa Receptionist"],
    functions: ["Tratamientos de masaje y corporales", "Servicios de peluqueria y estetica", "Clases de fitness", "Venta de productos de belleza", "Gestion de citas"],
    english: "Intermedio a avanzado. Explicar tratamientos, hacer recomendaciones y vender productos.",
    experience: "Se requieren certificaciones profesionales en el area especifica. Experiencia laboral previa generalmente obligatoria.",
    skills: ["Certificaciones profesionales vigentes", "Habilidades de venta", "Trato personalizado", "Conocimiento de productos", "Presentacion personal impecable"],
    conditions: "Trabajo basado en comisiones ademas del salario base. Ingresos dependen de ventas. Contratos de 6-8 meses.",
  },
  {
    name: "Tiendas / Retail",
    icon: ShoppingBag,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    entryLevel: "entry-level",
    description: "Gestiona tiendas duty-free a bordo: joyeria, perfumeria, ropa de marca, souvenirs y articulos de lujo. Ventas en aguas internacionales.",
    positions: ["Shop Assistant", "Sales Associate", "Jewelry Specialist", "Shop Manager", "Visual Merchandiser"],
    functions: ["Atencion y asesoria al cliente", "Manejo de inventario y exhibiciones", "Procesamiento de ventas", "Eventos de venta especiales", "Mantenimiento visual de tiendas"],
    english: "Intermedio a avanzado. Venta consultiva requiere comunicacion fluida.",
    experience: "Experiencia en ventas retail es valorada pero no siempre obligatoria. Conocimiento de productos de lujo es ventaja.",
    skills: ["Habilidades de venta", "Conocimiento de productos", "Presentacion personal", "Manejo de caja y POS", "Orientacion a metas"],
    conditions: "Salario base mas comisiones. Tiendas operan en aguas internacionales. Contratos de 6-8 meses.",
  },
  {
    name: "Recepcion / Guest Services",
    icon: Headphones,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    entryLevel: "experiencia",
    description: "Punto central de atencion al pasajero. Maneja consultas, quejas, informacion de itinerario, cambio de divisas y servicios especiales. La cara visible del servicio al cliente.",
    positions: ["Guest Services Agent", "Guest Services Officer", "Shore Excursion Staff", "Loyalty Ambassador", "Guest Relations Manager"],
    functions: ["Atencion de consultas y resolucion de problemas", "Manejo de quejas", "Informacion sobre itinerarios y excursiones", "Cambio de divisas", "Coordinacion de servicios especiales"],
    english: "Avanzado a fluido. Uno de los departamentos que mas nivel de ingles requiere.",
    experience: "Se requiere experiencia en hoteleria, recepcion o servicio al cliente. Formacion en turismo es valorada.",
    skills: ["Comunicacion excepcional", "Resolucion de conflictos", "Paciencia y empatia", "Manejo de sistemas informaticos", "Multiples idiomas (ventaja)"],
    conditions: "Turnos rotativos 24 horas. Alta responsabilidad y visibilidad. Contratos de 6-8 meses. Mejor remunerado que posiciones entry-level.",
  },
  {
    name: "Cubierta (Deck)",
    icon: Compass,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    entryLevel: "especializado",
    description: "Responsable de navegacion, maniobras, seguridad maritima y mantenimiento exterior del buque. Departamento tecnico que requiere formacion maritima formal.",
    positions: ["Ordinary Seaman (OS)", "Able Seaman (AB)", "Bosun", "Third Officer", "Second Officer", "First Officer", "Staff Captain", "Captain"],
    functions: ["Navegacion y vigilancia en el puente", "Maniobras de atraque y desatraque", "Mantenimiento de equipos de salvamento", "Operaciones de seguridad y simulacros", "Mantenimiento exterior del buque"],
    english: "Intermedio a avanzado. Comunicacion maritima internacional en ingles. Oficiales requieren ingles fluido.",
    experience: "Formacion maritima formal (escuela nautica) y certificaciones STCW. Oficiales requieren titulos de competencia maritima.",
    skills: ["Formacion nautica certificada", "Conocimiento de regulaciones SOLAS/MARPOL", "Liderazgo y toma de decisiones", "Resistencia fisica", "Trabajo en condiciones adversas"],
    conditions: "Turnos de guardia (4 horas on / 8 horas off). Contratos de 4-6 meses para oficiales. Alta responsabilidad. Carrera bien remunerada a largo plazo.",
  },
  {
    name: "Motor (Engine)",
    icon: Wrench,
    color: "text-red-400",
    bg: "bg-red-400/10",
    entryLevel: "especializado",
    description: "Mantiene y opera todos los sistemas mecanicos, electricos y de ingenieria del buque: motores, generadores, sistemas de agua, aire acondicionado y mas.",
    positions: ["Wiper", "Oiler", "Motorman", "Fourth Engineer", "Third Engineer", "Second Engineer", "Chief Engineer", "Electrician", "Refrigeration Engineer"],
    functions: ["Operacion y mantenimiento de motores principales", "Gestion de sistemas electricos", "Mantenimiento de sistemas de climatizacion", "Control de sistemas de agua y combustible", "Reparaciones mecanicas y electricas"],
    english: "Intermedio. Documentacion tecnica en ingles. Oficiales requieren nivel mas alto.",
    experience: "Formacion tecnica en ingenieria maritima, mecanica o electrica. Certificaciones STCW obligatorias. Wiper puede ser entry-level con formacion basica.",
    skills: ["Formacion tecnica certificada", "Conocimiento de sistemas mecanicos/electricos", "Resolucion de problemas tecnicos", "Trabajo en espacios confinados", "Resistencia al calor y ruido"],
    conditions: "Turnos de guardia similares a Cubierta. Trabajo en sala de maquinas (calor, ruido). Contratos de 4-6 meses. Carrera tecnica bien remunerada.",
  },
];

function DeptCard({ dept, index }: { dept: Dept; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = dept.icon;
  const badge = entryBadge[dept.entryLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-xl bg-card border border-border overflow-hidden hover:border-border/80 transition-colors"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${dept.bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${dept.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{dept.name}</h3>
              <span className={`inline-block mt-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${badge.cls}`}>
                {badge.label}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{dept.description}</p>

        {/* Positions */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Cargos comunes
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {dept.positions.map((p) => (
              <span key={p} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {open ? "Ver menos" : "Ver detalles completos"}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
              {/* Functions */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Funciones principales
                </h4>
                <ul className="space-y-1.5">
                  {dept.functions.map((f) => (
                    <li key={f} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-background/50">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Nivel de ingles
                  </h4>
                  <p className="text-sm text-zinc-300">{dept.english}</p>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> Experiencia
                  </h4>
                  <p className="text-sm text-zinc-300">{dept.experience}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Habilidades clave</h4>
                <div className="flex flex-wrap gap-1.5">
                  {dept.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div className="p-3 rounded-lg bg-background/50">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Condiciones generales
                </h4>
                <p className="text-sm text-zinc-300">{dept.conditions}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AreasPage() {
  return (
    <div>
      <PageHero
        title="Areas de trabajo en un crucero"
        subtitle="Conoce los principales departamentos a bordo, que se hace en cada uno y que se necesita para ingresar. Informacion orientativa para que entiendas donde puedes encajar segun tu perfil."
        imageUrl={HERO_IMG}
        badge="Guia de departamentos"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Los requisitos, cargos y condiciones pueden variar significativamente segun la naviera, el barco y la temporada. Esta informacion es referencial y no constituye oferta laboral." />

        <div className="mt-8 mb-6">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            Un crucero moderno funciona como una ciudad flotante con multiples departamentos especializados. Cada area tiene sus propios requisitos, dinamicas y oportunidades. A continuacion, te presentamos los 10 departamentos principales para que identifiques cual se ajusta mejor a tu experiencia y habilidades.
          </p>
        </div>

        {/* Entry level legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(entryBadge).map(([key, val]) => (
            <span key={key} className={`px-2.5 py-1 text-xs font-medium rounded-full border ${val.cls}`}>
              {val.label}
            </span>
          ))}
        </div>

        {/* Department cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {departments.map((dept, i) => (
            <DeptCard key={dept.name} dept={dept} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

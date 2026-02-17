import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed, UtensilsCrossed, ChefHat, Music, Dice5, Sparkles,
  ShoppingBag, Headphones, Compass, Wrench, ChevronDown,
  Globe, Briefcase, Star, Clock, Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=1920&q=80";

type EntryLevel = "entry-level" | "experiencia" | "especializado" | "experienced";

const entryBadge: Record<string, { label: string; cls: string }> = {
  "entry-level": { label: "Entry-level", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  "experiencia": { label: "Requiere experiencia", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  "experienced": { label: "Requiere experiencia", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  "especializado": { label: "Especializado", cls: "bg-rose-500/15 text-rose-400 border-rose-500/25" },
};

const iconMap: Record<string, React.ElementType> = {
  "Hotel / Housekeeping": Bed,
  "Alimentos y Bebidas (F&B)": UtensilsCrossed,
  "Cocina / Galley": ChefHat,
  "Entretenimiento": Music,
  "Casino": Dice5,
  "Spa & Wellness": Sparkles,
  "Tiendas / Retail": ShoppingBag,
  "Recepcion / Guest Services": Headphones,
  "Cubierta (Deck)": Compass,
  "Motor (Engine)": Wrench,
};

const colorMap: Record<string, { color: string; bg: string }> = {
  "Hotel / Housekeeping": { color: "text-blue-400", bg: "bg-blue-400/10" },
  "Alimentos y Bebidas (F&B)": { color: "text-amber-400", bg: "bg-amber-400/10" },
  "Cocina / Galley": { color: "text-orange-400", bg: "bg-orange-400/10" },
  "Entretenimiento": { color: "text-purple-400", bg: "bg-purple-400/10" },
  "Casino": { color: "text-emerald-400", bg: "bg-emerald-400/10" },
  "Spa & Wellness": { color: "text-pink-400", bg: "bg-pink-400/10" },
  "Tiendas / Retail": { color: "text-cyan-400", bg: "bg-cyan-400/10" },
  "Recepcion / Guest Services": { color: "text-indigo-400", bg: "bg-indigo-400/10" },
  "Cubierta (Deck)": { color: "text-sky-400", bg: "bg-sky-400/10" },
  "Motor (Engine)": { color: "text-red-400", bg: "bg-red-400/10" },
};

interface DeptCardProps {
  name: string;
  description: string;
  functions: string[];
  requirements: string[];
  entryLevel: string;
  index: number;
}

function DeptCard({ name, description, functions, requirements, entryLevel, index }: DeptCardProps) {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[name] || Briefcase;
  const colors = colorMap[name] || { color: "text-blue-400", bg: "bg-blue-400/10" };
  const badge = entryBadge[entryLevel] || entryBadge["entry-level"];

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
            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <span className={`inline-block mt-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${badge.cls}`}>
                {badge.label}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>

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
                  {functions.map((f) => (
                    <li key={f} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills / Requirements */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Habilidades clave</h4>
                <div className="flex flex-wrap gap-1.5">
                  {requirements.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AreasPage() {
  const { data: cmsAreas, isLoading } = trpc.cms.public.workAreas.useQuery();

  const areas = cmsAreas && cmsAreas.length > 0 ? cmsAreas : null;

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
            Un crucero moderno funciona como una ciudad flotante con multiples departamentos especializados. Cada area tiene sus propios requisitos, dinamicas y oportunidades. A continuacion, te presentamos los departamentos principales para que identifiques cual se ajusta mejor a tu experiencia y habilidades.
          </p>
        </div>

        {/* Entry level legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(entryBadge).filter(([key]) => key !== "experienced").map(([key, val]) => (
            <span key={key} className={`px-2.5 py-1 text-xs font-medium rounded-full border ${val.cls}`}>
              {val.label}
            </span>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando departamentos...</div>
        ) : areas ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {areas.map((area, i) => {
              let funcs: string[] = [];
              let reqs: string[] = [];
              try { funcs = JSON.parse(area.functions); } catch { funcs = [area.functions]; }
              try { reqs = JSON.parse(area.requirements); } catch { reqs = [area.requirements]; }
              return (
                <DeptCard
                  key={area.id}
                  name={area.name}
                  description={area.description}
                  functions={funcs}
                  requirements={reqs}
                  entryLevel={area.entryLevel}
                  index={i}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No hay departamentos disponibles.</div>
        )}
      </section>
    </div>
  );
}

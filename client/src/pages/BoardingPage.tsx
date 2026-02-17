import { motion } from "framer-motion";
import { FileText, Users, PenLine, Folder, GraduationCap, Plane, Mail, MapPin, Shield, Home, Clock, XCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=80";

const stepIcons: Record<number, React.ElementType> = {
  1: FileText, 2: Users, 3: PenLine, 4: Folder, 5: GraduationCap,
  6: Plane, 7: Mail, 8: MapPin, 9: Shield, 10: Home,
};

export default function BoardingPage() {
  const { data: cmsSteps, isLoading } = trpc.cms.public.boardingSteps.useQuery();

  const steps = cmsSteps && cmsSteps.length > 0 ? cmsSteps : null;

  return (
    <div>
      <PageHero
        title="Proceso de embarque"
        subtitle="Todo el camino desde la preseleccion hasta tus primeros dias a bordo, explicado paso a paso. El proceso puede variar segun la naviera y el puesto."
        imageUrl={HERO_IMG}
        badge="Guia paso a paso"
      />

      <section className="container py-12">
        <LegalDisclaimer text="El proceso de embarque puede variar segun la naviera, el puesto y el pais. Esta informacion es orientativa y no garantiza embarque. Cada naviera tiene sus propios procedimientos y tiempos." />

        <div className="mt-8 mb-10">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            El proceso desde que aplicas hasta que subes al barco puede tomar entre 2 y 6 meses, dependiendo de multiples factores. A continuacion te presentamos los pasos tipicos en orden cronologico, con lo que hace el candidato, lo que solicita la naviera, tiempos aproximados y errores comunes a evitar.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando pasos...</div>
        ) : steps ? (
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = stepIcons[step.order] || FileText;
                let candidate = "";
                let company = "";
                let errors: string[] = [];
                try { candidate = JSON.parse(step.candidateActions); } catch { candidate = step.candidateActions; }
                try { company = JSON.parse(step.shipperRequests); } catch { company = step.shipperRequests; }
                try { errors = JSON.parse(step.commonErrors); } catch { errors = [step.commonErrors]; }

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="relative md:pl-16"
                  >
                    <div className="hidden md:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-card border-2 border-primary/30 items-center justify-center z-10">
                      <span className="text-sm font-bold text-primary">{step.order}</span>
                    </div>

                    <div className="rounded-xl bg-card border border-border p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="md:hidden w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{step.order}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-primary" />
                            <h3 className="font-semibold text-foreground">{step.title}</h3>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {step.approximateTime}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-background/50">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5">Que hace el candidato</h4>
                          <p className="text-sm text-zinc-300 leading-relaxed">{candidate}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1.5">Que solicita la naviera</h4>
                          <p className="text-sm text-zinc-300 leading-relaxed">{company}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5" /> Errores comunes
                        </h4>
                        <ul className="space-y-1">
                          {errors.map((e, ei) => (
                            <li key={ei} className="text-xs text-red-300/80 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No hay pasos disponibles.</div>
        )}
      </section>
    </div>
  );
}

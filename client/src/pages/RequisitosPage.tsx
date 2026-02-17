import { motion } from "framer-motion";
import { FileCheck, Globe, Heart, BookOpen, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { trpc } from "@/lib/trpc";

const iconMap: Record<string, React.ElementType> = {
  "Pasaporte vigente": FileCheck,
  "Certificados STCW": Shield,
  "Examen medico maritimo": Heart,
  "Nivel de ingles": Globe,
  "Visa (si aplica)": BookOpen,
};

const colorMap: Record<string, { color: string; bg: string }> = {
  "Pasaporte vigente": { color: "text-blue-400", bg: "bg-blue-400/10" },
  "Certificados STCW": { color: "text-teal-400", bg: "bg-teal-400/10" },
  "Examen medico maritimo": { color: "text-rose-400", bg: "bg-rose-400/10" },
  "Nivel de ingles": { color: "text-violet-400", bg: "bg-violet-400/10" },
  "Visa (si aplica)": { color: "text-amber-400", bg: "bg-amber-400/10" },
};

const erroresComunes = [
  "Creer que no se necesita ingles para ningun puesto",
  "No verificar la vigencia del pasaporte con suficiente anticipacion",
  "Realizar el examen medico en una clinica no autorizada",
  "No completar todos los modulos STCW requeridos",
  "Dejar los tramites de visa para ultimo momento",
  "Enviar documentos sin traduccion oficial cuando se requiere",
  "No tener copias digitales de todos los documentos",
  "Confiar en agencias que prometen embarque sin requisitos",
];

export default function RequisitosPage() {
  const { data: cmsRequirements, isLoading } = trpc.cms.public.requirements.useQuery();

  const reqs = cmsRequirements && cmsRequirements.length > 0 ? cmsRequirements : null;

  return (
    <div>
      <PageHero
        title="Requisitos para trabajar en cruceros"
        subtitle="Documentos, certificaciones, idiomas y habilidades que generalmente se solicitan. Los requisitos pueden variar segun la naviera y el puesto."
        badge="Documentacion y certificaciones"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Los requisitos pueden variar segun la naviera, el pais de origen, el puesto y la temporada. Esta informacion es referencial. Siempre verifica directamente con la naviera o agencia autorizada." />

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando requisitos...</div>
        ) : reqs ? (
          <>
            {/* General requirements */}
            <div className="mt-10 mb-12">
              <h2 className="text-2xl font-bold mb-2">Requisitos generales</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl">Estos son los documentos y certificaciones que la mayoria de navieras solicitan, independientemente del departamento.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reqs.filter(r => r.category === "general").map((r, i) => {
                  const Icon = iconMap[r.title] || FileCheck;
                  const colors = colorMap[r.title] || { color: "text-blue-400", bg: "bg-blue-400/10" };
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="p-5 rounded-xl bg-card border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4.5 h-4.5 ${colors.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{r.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Non-general requirements grouped by category */}
            {(() => {
              const nonGeneral = reqs.filter(r => r.category !== "general");
              if (nonGeneral.length === 0) return null;
              const categories = [...new Set(nonGeneral.map(r => r.category))];
              return (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-2">Requisitos adicionales</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl">Requisitos adicionales por categoria.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((cat, i) => {
                      const catReqs = nonGeneral.filter(r => r.category === cat);
                      return (
                        <motion.div
                          key={cat}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className="p-4 rounded-xl bg-card border border-border"
                        >
                          <h3 className="font-semibold text-sm mb-3 capitalize">{cat}</h3>
                          <ul className="space-y-1.5">
                            {catReqs.map((r) => (
                              <li key={r.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                <div>
                                  <span className="font-medium text-foreground">{r.title}</span>
                                  {r.description && <span> — {r.description}</span>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No hay requisitos disponibles.</div>
        )}

        {/* Common errors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Errores comunes</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">Evita estos errores frecuentes que pueden retrasar o impedir tu proceso.</p>

          <div className="rounded-xl bg-card border border-border p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {erroresComunes.map((e) => (
                <div key={e} className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/5">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">{e}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scam warning */}
        <div className="rounded-xl bg-card border border-amber-500/20 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-300 mb-2">Advertencia sobre estafas</h3>
              <p className="text-sm text-amber-200/70 leading-relaxed mb-2">
                Desconfia de cualquier persona o agencia que te pida dinero a cambio de conseguirte empleo en cruceros. Las navieras legitimas y sus agencias autorizadas no cobran a los candidatos por conseguirles trabajo.
              </p>
              <p className="text-sm text-amber-200/70 leading-relaxed">
                Los unicos pagos que un candidato puede tener que realizar son por tramites oficiales: certificados STCW, examen medico, pasaporte y visa. Estos se pagan directamente a las instituciones correspondientes, nunca a intermediarios.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

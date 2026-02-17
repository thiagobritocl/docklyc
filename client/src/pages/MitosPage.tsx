import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { trpc } from "@/lib/trpc";

const verdictConfig: Record<string, { label: string; cls: string }> = {
  "Falso": { label: "Falso", cls: "bg-red-500/15 text-red-400 border-red-500/25" },
  "falso": { label: "Falso", cls: "bg-red-500/15 text-red-400 border-red-500/25" },
  "Verdadero": { label: "Verdadero", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  "verdadero": { label: "Verdadero", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  "parcial": { label: "Parcialmente cierto", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  "Parcial": { label: "Parcialmente cierto", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  "depende": { label: "Depende", cls: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
};

export default function MitosPage() {
  const { data: cmsMyths, isLoading } = trpc.cms.public.myths.useQuery();

  const myths = cmsMyths && cmsMyths.length > 0 ? cmsMyths : null;

  return (
    <div>
      <PageHero
        title="Mitos y verdades"
        subtitle="Desmontamos las creencias mas comunes sobre trabajar en cruceros con informacion realista y sin exageraciones."
        badge="Informacion realista"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Las experiencias pueden variar segun la naviera, el puesto, el barco y las circunstancias personales. Esta informacion busca ofrecer una perspectiva realista basada en datos generales de la industria." />

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando...</div>
        ) : myths ? (
          <div className="mt-10 space-y-6">
            {myths.map((m, i) => {
              const verdict = verdictConfig[m.verdict] || { label: m.verdict, cls: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25" };
              let details: string[] = [];
              try { details = JSON.parse(m.details); } catch { details = [m.details]; }

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="rounded-xl bg-card border border-border overflow-hidden"
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-foreground flex items-start gap-2">
                        <span className="text-muted-foreground font-mono text-sm mt-1">#{i + 1}</span>
                        "{m.title}"
                      </h3>
                      <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full border ${verdict.cls}`}>
                        {verdict.label}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{m.shortDescription}</p>
                    {m.detailedExplanation && (
                      <p className="text-sm text-zinc-400 leading-relaxed mt-1">{m.detailedExplanation}</p>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <div className="p-4 rounded-lg bg-background/50">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">La realidad en detalle</h4>
                      <ul className="space-y-2">
                        {details.map((d, di) => (
                          <li key={di} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No hay mitos disponibles.</div>
        )}
      </section>
    </div>
  );
}

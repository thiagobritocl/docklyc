import { motion } from "framer-motion";
import { AlertTriangle, XCircle, CheckCircle2, Search, Ban, DollarSign } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

// Static data for legitimate costs (not managed in CMS)
const cobrosLegitimos = [
  { item: "Certificados STCW", desc: "Se pagan directamente a centros de formacion maritima autorizados. Costo aproximado: $200-$800 USD dependiendo del pais." },
  { item: "Examen medico maritimo", desc: "Se paga directamente a la clinica autorizada por la autoridad maritima. Costo aproximado: $100-$300 USD." },
  { item: "Pasaporte", desc: "Se tramita y paga directamente en la oficina de pasaportes de tu pais." },
  { item: "Visa", desc: "Se tramita y paga directamente en el consulado o embajada correspondiente." },
  { item: "Libreta de embarque", desc: "Se tramita ante la autoridad maritima de tu pais. Costo variable." },
];

export default function EstafasPage() {
  const { data: cmsSignals, isLoading } = trpc.cms.public.fraudSignals.useQuery();

  const { redFlags, illegalCharges, verificationTips } = useMemo(() => {
    if (!cmsSignals || cmsSignals.length === 0) return { redFlags: [], illegalCharges: [], verificationTips: [] };
    return {
      redFlags: cmsSignals.filter(s => s.category === "red_flag"),
      illegalCharges: cmsSignals.filter(s => s.category === "illegal_charge"),
      verificationTips: cmsSignals.filter(s => s.category === "verification_tip"),
    };
  }, [cmsSignals]);

  return (
    <div>
      <PageHero
        title="Evita estafas"
        subtitle="Aprende a identificar fraudes, cobros ilegales y agencias falsas. Protege tu dinero y tu tiempo con informacion clara."
        badge="Proteccion al candidato"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Esta informacion es orientativa y busca ayudarte a identificar posibles fraudes. Ante cualquier duda, consulta con las autoridades competentes de tu pais." />

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando...</div>
        ) : (
          <>
            {/* Red flags */}
            {redFlags.length > 0 && (
              <div className="mt-10 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Senales de fraude</h2>
                    <p className="text-sm text-muted-foreground">Si detectas alguna de estas senales, procede con extrema precaucion.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {redFlags.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10"
                    >
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-zinc-300">{s.signal}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Illegal charges */}
            {illegalCharges.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Cobros ilegales</h2>
                    <p className="text-sm text-muted-foreground">Estos cobros NO deben existir en un proceso legitimo.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {illegalCharges.map((c, i) => {
                    const parts = c.signal.split(" — ");
                    const title = parts[0];
                    const desc = parts[1] || "";
                    return (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="p-4 rounded-xl bg-card border border-border"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Ban className="w-3.5 h-3.5 text-red-400" />
                          </span>
                          <div>
                            <h3 className="font-semibold text-sm text-red-300 mb-1">{title}</h3>
                            {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Legitimate costs */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Pagos que pueden existir</h2>
                  <p className="text-sm text-muted-foreground">Estos son costos reales que se pagan directamente a instituciones oficiales.</p>
                </div>
              </div>

              <div className="space-y-3">
                {cobrosLegitimos.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{c.item}</h3>
                        <p className="text-sm text-muted-foreground">{c.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How to verify */}
            {verificationTips.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Como verificar agencias</h2>
                    <p className="text-sm text-muted-foreground">Antes de confiar en cualquier agencia, verifica estos puntos.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verificationTips.map((v, i) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="p-4 rounded-xl bg-card border border-border"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.signal}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

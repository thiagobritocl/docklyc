import { motion } from "framer-motion";
import { DollarSign, Info, TrendingUp } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

const HERO_IMG = "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=1920&q=80";

export default function SalariosPage() {
  const { data: cmsSalaries, isLoading } = trpc.cms.public.salaries.useQuery();

  // Group salaries by department
  const groupedSalaries = useMemo(() => {
    if (!cmsSalaries || cmsSalaries.length === 0) return null;
    const groups: Record<string, typeof cmsSalaries> = {};
    for (const salary of cmsSalaries) {
      if (!groups[salary.department]) {
        groups[salary.department] = [];
      }
      groups[salary.department].push(salary);
    }
    return Object.entries(groups).map(([dept, rows]) => ({ dept, rows }));
  }, [cmsSalaries]);

  return (
    <div>
      <PageHero
        title="Salarios en cruceros"
        subtitle="Estimaciones promedio de salarios mensuales por cargo. Los montos son referenciales y pueden variar significativamente segun la naviera, el barco, la ruta y la temporada."
        imageUrl={HERO_IMG}
        badge="Estimaciones referenciales"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Todos los salarios mostrados son estimaciones promedio en dolares estadounidenses (USD) mensuales. No constituyen oferta salarial ni garantia de ingresos. Los montos reales pueden variar significativamente segun la naviera, el contrato, la experiencia del candidato y otros factores." />

        {/* Key info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: DollarSign, title: "Moneda", desc: "Todos los montos en USD mensuales", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { icon: TrendingUp, title: "Propinas", desc: "Pueden representar 30-100% adicional al salario base", color: "text-blue-400", bg: "bg-blue-400/10" },
            { icon: Info, title: "Beneficios incluidos", desc: "Alojamiento y alimentacion generalmente cubiertos por la naviera", color: "text-violet-400", bg: "bg-violet-400/10" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Salary tables */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando salarios...</div>
        ) : groupedSalaries ? (
          <div className="space-y-8">
            {groupedSalaries.map((section, si) => (
              <motion.div
                key={section.dept}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: si * 0.05 }}
              >
                <h2 className="text-xl font-bold mb-4">{section.dept}</h2>
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-card">
                          <th className="text-left p-3 font-semibold text-muted-foreground">Cargo</th>
                          <th className="text-left p-3 font-semibold text-muted-foreground">Rango mensual (USD)</th>
                          <th className="text-left p-3 font-semibold text-muted-foreground">Propinas</th>
                          <th className="text-left p-3 font-semibold text-muted-foreground hidden sm:table-cell">Notas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, ri) => (
                          <tr key={row.id} className={ri % 2 === 0 ? "bg-background/30" : "bg-card/50"}>
                            <td className="p-3 font-medium text-foreground">{row.position}</td>
                            <td className="p-3 font-mono text-emerald-400">
                              ${row.minSalary.toLocaleString()} - ${row.maxSalary.toLocaleString()}
                            </td>
                            <td className="p-3 text-muted-foreground">{row.tips || "-"}</td>
                            <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">{row.notes || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No hay datos de salarios disponibles.</div>
        )}

        {/* Additional notes */}
        <div className="mt-10 rounded-xl bg-card border border-border p-6">
          <h3 className="font-semibold mb-3">Consideraciones importantes</h3>
          <ul className="space-y-2">
            {[
              "Los salarios varian entre navieras. Royal Caribbean, Carnival, MSC, Norwegian y Disney tienen estructuras salariales diferentes.",
              "Las propinas en navieras americanas suelen ser mas altas que en navieras europeas.",
              "El salario neto puede ser mayor al de un empleo terrestre equivalente, ya que no hay gastos de alojamiento ni alimentacion.",
              "Algunos puestos (Spa, Retail) dependen fuertemente de comisiones y ventas.",
              "Los contratos iniciales suelen tener salarios en el rango inferior. Con experiencia y contratos sucesivos, los salarios tienden a mejorar.",
              "Los oficiales de Cubierta y Motor tienen las carreras mejor remuneradas a largo plazo, pero requieren formacion maritima formal.",
            ].map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

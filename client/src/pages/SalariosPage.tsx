import { motion } from "framer-motion";
import { DollarSign, Info, TrendingUp } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/Hj4w00wth7LE6lIusnbtO6/sandbox/leyGp7q7co6RgJeaK6NN2S-img-4_1771270036000_na1fn_aGVyby1zYWxhcmlvcw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSGo0dzAwd3RoN0xFNmxJdXNuYnRPNi9zYW5kYm94L2xleUdwN3E3Y282UmdKZWFLNk5OMlMtaW1nLTRfMTc3MTI3MDAzNjAwMF9uYTFmbl9hR1Z5YnkxellXeGhjbWx2Y3cuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DMTHh0SwNqCHwJ91qeq~1fgb3sZioTTOYWqvcXdu3~ZTvYDgBEOw1cYuBMsf9Gc6UDfbV7Dsr6EjOiLd2DpHtlrXHNehs~lrALPf9nKXd0wk~TZ~VQrXJKDBItBxiNuSf51ky~lCooD-X~5ig7RWW3-VSLX-PyPayMEzmDjli10OTdHQaZvU96c-WLY6IuQeTJ1HtMmO4mky-DcH7c-neK3Mg1oB16MERDaMo0O5e23rWShXam1ZnS85EpsH2TuALY9DxJ1i1g2hbrpM8c9To6H-TQYj223Q6kgcNFiXOXVGGxdRXZ4cxomffkPbsXJVAi025P2Q30GD7OimH-vSsw__";

interface SalaryRow {
  cargo: string;
  rangoMin: number;
  rangoMax: number;
  propinas: string;
  notas: string;
}

const salaryData: { dept: string; rows: SalaryRow[] }[] = [
  {
    dept: "Hotel / Housekeeping",
    rows: [
      { cargo: "Stateroom Attendant", rangoMin: 1200, rangoMax: 2000, propinas: "Si (significativas)", notas: "Propinas pueden duplicar el salario base" },
      { cargo: "Public Area Cleaner", rangoMin: 1000, rangoMax: 1500, propinas: "Limitadas", notas: "Salario base mas estable" },
      { cargo: "Laundry Attendant", rangoMin: 900, rangoMax: 1400, propinas: "No", notas: "Sin contacto directo con pasajeros" },
      { cargo: "Housekeeping Supervisor", rangoMin: 1800, rangoMax: 2800, propinas: "Si", notas: "Requiere experiencia previa a bordo" },
    ],
  },
  {
    dept: "Alimentos y Bebidas",
    rows: [
      { cargo: "Assistant Waiter", rangoMin: 1200, rangoMax: 1800, propinas: "Si", notas: "Propinas compartidas con equipo" },
      { cargo: "Waiter", rangoMin: 1500, rangoMax: 2500, propinas: "Si (altas)", notas: "Propinas pueden ser muy significativas" },
      { cargo: "Head Waiter", rangoMin: 2200, rangoMax: 3500, propinas: "Si", notas: "Puesto de supervision" },
      { cargo: "Bartender", rangoMin: 1400, rangoMax: 2200, propinas: "Si", notas: "Varia segun ubicacion del bar" },
      { cargo: "Buffet Attendant", rangoMin: 1000, rangoMax: 1600, propinas: "Limitadas", notas: "Menor interaccion con pasajeros" },
    ],
  },
  {
    dept: "Cocina / Galley",
    rows: [
      { cargo: "Galley Steward", rangoMin: 800, rangoMax: 1200, propinas: "No", notas: "Puesto entry-level" },
      { cargo: "Commis Chef", rangoMin: 1200, rangoMax: 1800, propinas: "No", notas: "Cocinero junior" },
      { cargo: "Chef de Partie", rangoMin: 2000, rangoMax: 3200, propinas: "No", notas: "Jefe de seccion" },
      { cargo: "Sous Chef", rangoMin: 3000, rangoMax: 4500, propinas: "No", notas: "Segundo al mando" },
      { cargo: "Executive Chef", rangoMin: 5000, rangoMax: 8000, propinas: "No", notas: "Maximo responsable" },
    ],
  },
  {
    dept: "Entretenimiento",
    rows: [
      { cargo: "Youth Staff", rangoMin: 1200, rangoMax: 1800, propinas: "No", notas: "Programas infantiles" },
      { cargo: "Activities Coordinator", rangoMin: 1500, rangoMax: 2500, propinas: "No", notas: "Animacion de actividades" },
      { cargo: "Musician", rangoMin: 2000, rangoMax: 4000, propinas: "Posibles", notas: "Varia segun tipo de contrato" },
      { cargo: "Cruise Director", rangoMin: 4000, rangoMax: 7000, propinas: "No", notas: "Puesto de alta responsabilidad" },
    ],
  },
  {
    dept: "Otros departamentos",
    rows: [
      { cargo: "Casino Dealer", rangoMin: 1200, rangoMax: 2000, propinas: "Si", notas: "Propinas variables" },
      { cargo: "Spa Therapist", rangoMin: 1000, rangoMax: 1500, propinas: "Si + comisiones", notas: "Ingresos dependen de ventas" },
      { cargo: "Shop Assistant", rangoMin: 1200, rangoMax: 1800, propinas: "No + comisiones", notas: "Comisiones por ventas" },
      { cargo: "Guest Services Agent", rangoMin: 1800, rangoMax: 2800, propinas: "Limitadas", notas: "Requiere ingles avanzado" },
      { cargo: "Able Seaman", rangoMin: 1800, rangoMax: 2800, propinas: "No", notas: "Departamento de Cubierta" },
      { cargo: "Third Engineer", rangoMin: 3000, rangoMax: 4500, propinas: "No", notas: "Departamento de Motor" },
    ],
  },
];

export default function SalariosPage() {
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
        <div className="space-y-8">
          {salaryData.map((section, si) => (
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
                        <tr key={row.cargo} className={ri % 2 === 0 ? "bg-background/30" : "bg-card/50"}>
                          <td className="p-3 font-medium text-foreground">{row.cargo}</td>
                          <td className="p-3 font-mono text-emerald-400">
                            ${row.rangoMin.toLocaleString()} - ${row.rangoMax.toLocaleString()}
                          </td>
                          <td className="p-3 text-muted-foreground">{row.propinas}</td>
                          <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">{row.notas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

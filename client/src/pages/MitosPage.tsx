import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";

interface Myth {
  myth: string;
  verdict: "falso" | "parcial" | "depende";
  reality: string;
  details: string[];
}

const myths: Myth[] = [
  {
    myth: "Te haces rico rapido trabajando en cruceros",
    verdict: "falso",
    reality: "Los salarios en cruceros pueden ser competitivos considerando que no tienes gastos de alojamiento ni alimentacion, pero no son fortunas. La acumulacion de ahorro depende de tu disciplina financiera, tu cargo y la naviera.",
    details: [
      "Los puestos entry-level tienen salarios modestos (USD $800-$1,500/mes base)",
      "Las propinas pueden mejorar significativamente el ingreso en algunos departamentos",
      "El verdadero beneficio es que puedes ahorrar un porcentaje alto al no tener gastos fijos",
      "Hacerse 'rico' requiere anos de experiencia, ascensos y buena gestion del dinero",
      "Muchos tripulantes gastan sus ahorros en los puertos si no tienen disciplina financiera",
    ],
  },
  {
    myth: "No necesitas ingles para trabajar en cruceros",
    verdict: "falso",
    reality: "El ingles es el idioma de trabajo a bordo de practicamente todas las navieras internacionales. El nivel requerido varia segun el departamento, pero un minimo basico es necesario en todos los casos.",
    details: [
      "Departamentos como Guest Services y Entretenimiento requieren ingles avanzado/fluido",
      "Housekeeping y Galley pueden requerir un nivel basico-intermedio",
      "Los simulacros de seguridad y comunicaciones oficiales son en ingles",
      "Sin ingles, tus opciones se reducen drasticamente",
      "Otros idiomas (espanol, portugues, frances, aleman) son una ventaja adicional, no un reemplazo del ingles",
    ],
  },
  {
    myth: "Todos los cargos ganan igual",
    verdict: "falso",
    reality: "Existe una diferencia enorme entre los salarios de diferentes cargos y departamentos. Un Galley Steward puede ganar $800/mes mientras que un Executive Chef puede superar los $8,000/mes.",
    details: [
      "Los oficiales de Cubierta y Motor tienen los salarios mas altos a largo plazo",
      "Las propinas crean diferencias significativas entre puestos similares",
      "Puestos basados en comisiones (Spa, Retail) tienen ingresos muy variables",
      "La experiencia y los contratos sucesivos mejoran gradualmente el salario",
      "Diferentes navieras pagan diferente por el mismo cargo",
    ],
  },
  {
    myth: "Es como estar de vacaciones",
    verdict: "falso",
    reality: "Trabajar en un crucero es un empleo demandante con jornadas largas, espacio personal limitado y separacion de familia y amigos. Los tripulantes trabajan mientras los pasajeros vacacionan.",
    details: [
      "Jornadas tipicas de 10-14 horas diarias, 7 dias a la semana",
      "Contratos de 4-9 meses sin dias libres en muchos departamentos",
      "Cabinas compartidas con espacio muy reducido",
      "Separacion prolongada de familia y amigos",
      "Acceso limitado a internet (costoso y lento en alta mar)",
      "Puedes visitar puertos en tu tiempo libre, pero el tiempo es limitado",
      "El desgaste fisico y emocional es real y debe considerarse",
    ],
  },
  {
    myth: "Cualquiera puede entrar sin requisitos",
    verdict: "falso",
    reality: "Todos los puestos a bordo requieren al menos documentacion basica (pasaporte, STCW, examen medico) y un nivel minimo de ingles. Los puestos especializados requieren formacion y experiencia especifica.",
    details: [
      "Los certificados STCW son obligatorios por regulacion maritima internacional",
      "El examen medico maritimo es un requisito innegociable",
      "Puestos tecnicos (Cubierta, Motor) requieren formacion maritima formal",
      "Puestos de Spa requieren certificaciones profesionales",
      "Incluso los puestos entry-level tienen un proceso de seleccion competitivo",
      "La presentacion personal, actitud y disposicion son evaluadas",
    ],
  },
  {
    myth: "Las navieras te pagan todo desde el principio",
    verdict: "parcial",
    reality: "Las navieras cubren alojamiento y alimentacion durante el contrato, pero los costos previos al embarque (certificados, examen medico, pasaporte, visa) generalmente son responsabilidad del candidato.",
    details: [
      "Alojamiento y alimentacion a bordo: cubiertos por la naviera",
      "Certificados STCW: generalmente a cargo del candidato",
      "Examen medico: generalmente a cargo del candidato",
      "Pasaporte y visa: siempre a cargo del candidato",
      "Pasaje al puerto de embarque: varia segun la naviera y el contrato",
      "Uniformes: generalmente proporcionados por la naviera",
    ],
  },
  {
    myth: "Una vez que entras, tienes trabajo de por vida",
    verdict: "falso",
    reality: "Los contratos en cruceros son temporales (4-9 meses tipicamente). La renovacion depende de tu desempeno, las necesidades de la naviera y la disponibilidad de vacantes.",
    details: [
      "Cada contrato es independiente; no hay garantia de renovacion",
      "Tu desempeno es evaluado constantemente a bordo",
      "Las navieras pueden reducir personal segun la temporada",
      "Mantener buenas evaluaciones aumenta las probabilidades de recontratacion",
      "Algunos tripulantes construyen carreras largas, pero no es automatico",
    ],
  },
];

const verdictConfig = {
  falso: { label: "Falso", cls: "bg-red-500/15 text-red-400 border-red-500/25" },
  parcial: { label: "Parcialmente cierto", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  depende: { label: "Depende", cls: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
};

export default function MitosPage() {
  return (
    <div>
      <PageHero
        title="Mitos y verdades"
        subtitle="Desmontamos las creencias mas comunes sobre trabajar en cruceros con informacion realista y sin exageraciones."
        badge="Informacion realista"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Las experiencias pueden variar segun la naviera, el puesto, el barco y las circunstancias personales. Esta informacion busca ofrecer una perspectiva realista basada en datos generales de la industria." />

        <div className="mt-10 space-y-6">
          {myths.map((m, i) => {
            const verdict = verdictConfig[m.verdict];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="rounded-xl bg-card border border-border overflow-hidden"
              >
                {/* Myth header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-foreground flex items-start gap-2">
                      <span className="text-muted-foreground font-mono text-sm mt-1">#{i + 1}</span>
                      "{m.myth}"
                    </h3>
                    <span className={`shrink-0 px-2.5 py-1 text-xs font-medium rounded-full border ${verdict.cls}`}>
                      {verdict.label}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">{m.reality}</p>
                </div>

                {/* Details */}
                <div className="px-6 pb-6">
                  <div className="p-4 rounded-lg bg-background/50">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">La realidad en detalle</h4>
                    <ul className="space-y-2">
                      {m.details.map((d, di) => (
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
      </section>
    </div>
  );
}

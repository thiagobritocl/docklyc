import { motion } from "framer-motion";
import { FileCheck, Globe, Heart, BookOpen, Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const reqGeneral = [
  {
    icon: FileCheck, color: "text-blue-400", bg: "bg-blue-400/10",
    title: "Pasaporte vigente",
    desc: "Pasaporte con minimo 6-12 meses de vigencia. Es el documento mas importante. Sin pasaporte vigente, no hay embarque posible.",
  },
  {
    icon: Shield, color: "text-teal-400", bg: "bg-teal-400/10",
    title: "Certificados STCW",
    desc: "Certificados basicos de seguridad maritima (STCW): seguridad personal y responsabilidades sociales, tecnicas de supervivencia, prevencion y lucha contra incendios, primeros auxilios. Son obligatorios por regulacion internacional.",
  },
  {
    icon: Heart, color: "text-rose-400", bg: "bg-rose-400/10",
    title: "Examen medico maritimo",
    desc: "Examen medico aprobado (ENG1 o equivalente segun el pais). Debe realizarse en clinicas autorizadas por la autoridad maritima. Incluye examen fisico completo, pruebas de vision, audicion y analisis de laboratorio.",
  },
  {
    icon: Globe, color: "text-violet-400", bg: "bg-violet-400/10",
    title: "Nivel de ingles",
    desc: "El ingles es el idioma de trabajo a bordo. El nivel requerido varia segun el departamento: desde basico (Housekeeping, Galley) hasta avanzado/fluido (Guest Services, Entretenimiento). Otros idiomas son una ventaja.",
  },
  {
    icon: BookOpen, color: "text-amber-400", bg: "bg-amber-400/10",
    title: "Visa (si aplica)",
    desc: "Dependiendo de tu nacionalidad y el puerto de embarque, podrias necesitar visa de transito o visa C1/D (para embarques en EE.UU.). Verifica con la naviera o agencia los requisitos especificos.",
  },
];

const reqByDept = [
  { dept: "Hotel / Housekeeping", reqs: ["Ingles basico-intermedio", "Buena condicion fisica", "Actitud de servicio", "No siempre requiere experiencia previa"] },
  { dept: "Alimentos y Bebidas", reqs: ["Ingles intermedio-avanzado", "Experiencia en restaurantes/hoteleria (valorada)", "Conocimiento de servicio de mesa", "Presentacion personal"] },
  { dept: "Cocina / Galley", reqs: ["Formacion culinaria formal", "Experiencia en cocina profesional", "Conocimiento de HACCP", "Ingles basico-intermedio"] },
  { dept: "Entretenimiento", reqs: ["Ingles avanzado/fluido", "Experiencia demostrable en el area", "Talento artistico especifico", "Carisma y presencia escenica"] },
  { dept: "Casino", reqs: ["Formacion como dealer", "Ingles intermedio-avanzado", "Habilidad matematica", "Integridad comprobable"] },
  { dept: "Spa & Wellness", reqs: ["Certificaciones profesionales vigentes", "Experiencia laboral previa", "Ingles intermedio-avanzado", "Habilidades de venta"] },
  { dept: "Tiendas / Retail", reqs: ["Ingles intermedio-avanzado", "Experiencia en ventas (valorada)", "Buena presentacion", "Orientacion a metas"] },
  { dept: "Guest Services", reqs: ["Ingles avanzado/fluido", "Experiencia en hoteleria/recepcion", "Manejo de sistemas informaticos", "Resolucion de conflictos"] },
  { dept: "Cubierta (Deck)", reqs: ["Formacion maritima formal", "Certificaciones STCW completas", "Titulos de competencia (oficiales)", "Ingles intermedio-avanzado"] },
  { dept: "Motor (Engine)", reqs: ["Formacion tecnica en ingenieria", "Certificaciones STCW", "Conocimiento de sistemas mecanicos/electricos", "Ingles intermedio"] },
];

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
  return (
    <div>
      <PageHero
        title="Requisitos para trabajar en cruceros"
        subtitle="Documentos, certificaciones, idiomas y habilidades que generalmente se solicitan. Los requisitos pueden variar segun la naviera y el puesto."
        badge="Documentacion y certificaciones"
      />

      <section className="container py-12">
        <LegalDisclaimer text="Los requisitos pueden variar segun la naviera, el pais de origen, el puesto y la temporada. Esta informacion es referencial. Siempre verifica directamente con la naviera o agencia autorizada." />

        {/* General requirements */}
        <div className="mt-10 mb-12">
          <h2 className="text-2xl font-bold mb-2">Requisitos generales</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">Estos son los documentos y certificaciones que la mayoria de navieras solicitan, independientemente del departamento.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reqGeneral.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="p-5 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${r.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4.5 h-4.5 ${r.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Requirements by department */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Requisitos por departamento</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">Ademas de los requisitos generales, cada departamento tiene necesidades especificas.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reqByDept.map((d, i) => (
              <motion.div
                key={d.dept}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <h3 className="font-semibold text-sm mb-3">{d.dept}</h3>
                <ul className="space-y-1.5">
                  {d.reqs.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

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

import { motion } from "framer-motion";
import { Anchor, CheckCircle2, XCircle, Heart, BookOpen, Shield, Users } from "lucide-react";
import PageHero from "@/components/PageHero";

const HERO_IMG = "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=1920&q=80";

const queEs = [
  { icon: BookOpen, title: "Portal informativo independiente", desc: "Dockly es un sitio web dedicado a reunir, organizar y presentar informacion clara y realista sobre la industria de cruceros para personas de Latinoamerica interesadas en trabajar a bordo." },
  { icon: Users, title: "Pensado para Latinoamerica", desc: "Nuestro contenido esta escrito en espanol neutro latino, pensado especificamente para personas de la region que buscan informacion accesible sobre oportunidades en cruceros." },
  { icon: Shield, title: "Legalmente responsable", desc: "Toda nuestra informacion es orientativa y educativa. Nos aseguramos de no hacer promesas, no exagerar y no generar expectativas falsas." },
];

const queHace = [
  "Explica las diferentes areas de trabajo a bordo de un crucero",
  "Detalla los requisitos generales y por departamento",
  "Presenta estimaciones salariales referenciales",
  "Describe el proceso de embarque paso a paso",
  "Alerta sobre estafas y cobros ilegales",
  "Desmonta mitos comunes con informacion realista",
  "Ofrece guias claras para personas sin experiencia previa",
];

const queNoHace = [
  "No operamos cruceros ni somos una naviera",
  "No somos una agencia de contratacion ni reclutamiento",
  "No ofrecemos vacantes ni gestionamos procesos de seleccion",
  "No garantizamos empleo, embarque ni salarios especificos",
  "No cobramos a candidatos por ningun concepto",
  "No solicitamos pagos, donaciones ni suscripciones",
  "No prometemos resultados ni plazos de embarque",
  "No recopilamos datos personales sensibles",
];

const compromisos = [
  { icon: Heart, color: "text-rose-400", bg: "bg-rose-400/10", title: "No cobramos por conseguir empleo", desc: "Dockly es un portal informativo gratuito. No cobramos a ningun candidato por informacion, contactos ni gestion de empleo. Si alguien te cobra en nombre de Dockly, es una estafa." },
  { icon: Shield, color: "text-blue-400", bg: "bg-blue-400/10", title: "No solicitamos pagos", desc: "No pedimos dinero por ningun concepto. No vendemos cursos, no ofrecemos servicios premium ni solicitamos donaciones obligatorias." },
  { icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-400/10", title: "No prometemos embarque", desc: "Nunca afirmaremos que puedes embarcar con certeza. Nuestro rol es informar, no generar falsas expectativas. El embarque depende de multiples factores fuera de nuestro control." },
];

export default function SobrePage() {
  return (
    <div>
      <PageHero
        title="Sobre Dockly"
        subtitle="Conoce que somos, que hacemos y — muy importante — que NO hacemos. La transparencia es nuestro principio fundamental."
        imageUrl={HERO_IMG}
        badge="Quienes somos"
      />

      <section className="container py-12">
        {/* What is Dockly */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Que es Dockly</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {queEs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="p-5 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* What Dockly does / doesn't do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Does */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-xl bg-card border border-border p-6"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold">Que hace Dockly</h2>
            </div>
            <ul className="space-y-2.5">
              {queHace.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Doesn't */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-xl bg-card border border-border p-6"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-4.5 h-4.5 text-red-400" />
              </div>
              <h2 className="text-xl font-bold">Que NO hace Dockly</h2>
            </div>
            <ul className="space-y-2.5">
              {queNoHace.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Ethical commitment */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Compromiso etico</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Estos son los principios que guian todo lo que hacemos en Dockly. Son innegociables.
          </p>

          <div className="space-y-4">
            {compromisos.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="p-5 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${c.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final note */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <Anchor className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Informacion libre, honesta y accesible</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Dockly existe porque creemos que la informacion sobre oportunidades laborales en cruceros debe ser clara, gratuita y libre de intereses comerciales. Si esta informacion te fue util, compartela con quien la necesite.
          </p>
        </div>
      </section>
    </div>
  );
}

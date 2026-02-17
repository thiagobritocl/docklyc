/*
 * Home.tsx — Dockly Landing Page
 * Design: Midnight Compass — dark, professional, informative
 * Hero with cruise ship image, feature cards linking to sections
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  ClipboardList,
  DollarSign,
  ShieldAlert,
  HelpCircle,
  Info,
  Anchor,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const HERO_IMG = "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80";

const sections = [
  {
    href: "/areas",
    icon: Briefcase,
    title: "Áreas de trabajo",
    desc: "Conoce los 10 departamentos principales a bordo de un crucero y qué se necesita para cada uno.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    href: "/proceso",
    icon: MapPin,
    title: "Proceso de embarque",
    desc: "Paso a paso desde la preselección hasta tu primer día a bordo. Sin confusiones.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
  },
  {
    href: "/requisitos",
    icon: ClipboardList,
    title: "Requisitos",
    desc: "Documentos, certificaciones, idiomas y habilidades que generalmente se solicitan.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    href: "/salarios",
    icon: DollarSign,
    title: "Salarios estimados",
    desc: "Rangos salariales referenciales por cargo y naviera. Sin promesas, solo datos.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    href: "/estafas",
    icon: ShieldAlert,
    title: "Evita estafas",
    desc: "Señales de fraude, cobros ilegales y cómo verificar agencias legítimas.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    href: "/mitos",
    icon: HelpCircle,
    title: "Mitos y verdades",
    desc: "Desmontamos las creencias más comunes sobre trabajar en cruceros.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    href: "/teste-de-realidade",
    icon: HelpCircle,
    title: "Teste de Realidad",
    desc: "Descubre si realmente estás listo para la vida y el trabajo a bordo de un crucero.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                <Anchor className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary tracking-wide uppercase">Portal informativo</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5">
              Información clara sobre{" "}
              <span className="text-primary">trabajo en cruceros</span>
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed mb-8 max-w-xl">
              Dockly es un portal independiente que reúne información orientativa sobre áreas de trabajo, requisitos, procesos y salarios estimados en la industria de cruceros.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/areas"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Explorar áreas de trabajo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sobre-dockly"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent border border-border text-foreground font-medium text-sm hover:bg-accent/80 transition-colors"
              >
                Conoce Dockly
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important notice */}
      <section className="container -mt-6 relative z-20">
        <LegalDisclaimer text="Dockly NO es una naviera ni una agencia de contratación. No garantizamos empleo, no cobramos a candidatos y toda la información es únicamente orientativa y educativa." />
      </section>

      {/* Sections grid */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Explora nuestras guías
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Cada sección está diseñada para darte información clara y realista. Sin promesas, sin marketing — solo datos útiles.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.href} variants={fadeUp}>
                <Link
                  href={s.href}
                  className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 h-full"
                >
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver más <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* What Dockly is NOT */}
      <section className="container pb-20">
        <div className="rounded-xl bg-card border border-border p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Qué NO es Dockly</h2>
              <p className="text-sm text-muted-foreground">
                Es importante que entiendas nuestros límites antes de navegar el sitio.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "No somos una naviera ni operamos cruceros.",
              "No somos una agencia de contratación ni reclutamiento.",
              "No garantizamos empleo, embarque ni salarios.",
              "No cobramos a candidatos por ningún concepto.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <span className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-red-400" />
                </span>
                <p className="text-sm text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function X(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

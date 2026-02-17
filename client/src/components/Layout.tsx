/*
 * Layout.tsx — Dockly Global Layout
 * Design: Midnight Compass (Scandinavian Dark Functionalism)
 * - Sticky navbar with backdrop-blur glassmorphism
 * - Responsive mobile menu
 * - Footer with legal disclaimers
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Menu,
  X,
  Anchor,
  Briefcase,
  ClipboardList,
  DollarSign,
  ShieldAlert,
  HelpCircle,
  Info,
  MapPin,
  FileText,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const navLinks = [
  { href: "/areas", label: "Áreas de trabajo", icon: Briefcase },
  { href: "/proceso", label: "Proceso de embarque", icon: MapPin },
  { href: "/requisitos", label: "Requisitos", icon: ClipboardList },
  { href: "/salarios", label: "Salarios", icon: DollarSign },
  { href: "/estafas", label: "Evita estafas", icon: ShieldAlert },
  { href: "/mitos", label: "Mitos y verdades", icon: HelpCircle },
  { href: "/sobre-dockly", label: "Sobre Dockly", icon: Info },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const dynamicPagesQuery = trpc.cms.public.pages.list.useQuery();
  const allNavLinks = [
    ...navLinks,
    ...(dynamicPagesQuery.data?.map(page => ({
      href: `/p/${page.slug}`,
      label: page.title,
      icon: FileText
    })) || [])
  ];
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <nav className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
              <Anchor className="w-4.5 h-4.5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Dockly</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            >
              <div className="container py-4 space-y-1">
                {allNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        location === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Anchor className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold">Dockly</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Portal informativo independiente. No somos una naviera ni una agencia de contratación.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Navegación</h4>
              <div className="grid grid-cols-2 gap-2">
                {allNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Aviso legal</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Toda la información publicada en Dockly es de carácter orientativo y educativo. No constituye oferta laboral, promesa de empleo ni garantía de embarque. Los datos pueden variar según la naviera, el puesto y el país.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Dockly. Información referencial.
            </p>
            <p className="text-xs text-muted-foreground">
              No cobramos a candidatos. No garantizamos empleo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

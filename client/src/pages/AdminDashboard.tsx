import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  ClipboardList,
  DollarSign,
  ShieldAlert,
  HelpCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (user?.role !== "admin") {
    return <div>Acceso denegado</div>;
  }

  const sections = [
    {
      title: "Áreas de trabajo",
      description: "Gestiona los 10 departamentos del crucero",
      icon: Briefcase,
      href: "#areas",
      color: "text-blue-500",
    },
    {
      title: "Proceso de embarque",
      description: "Edita los 10 pasos del proceso",
      icon: MapPin,
      href: "#boarding",
      color: "text-teal-500",
    },
    {
      title: "Requisitos",
      description: "Documentos y certificaciones necesarias",
      icon: ClipboardList,
      href: "#requisitos",
      color: "text-violet-500",
    },
    {
      title: "Salarios",
      description: "Tablas de salarios estimados",
      icon: DollarSign,
      href: "#salarios",
      color: "text-emerald-500",
    },
    {
      title: "Señales de fraude",
      description: "Avisos y cobros ilegales",
      icon: ShieldAlert,
      href: "#fraude",
      color: "text-amber-500",
    },
    {
      title: "Mitos y verdades",
      description: "Creencias comunes desmontadas",
      icon: HelpCircle,
      href: "#mitos",
      color: "text-rose-500",
    },
    {
      title: "Avisos legales",
      description: "Disclaimers y responsabilidades",
      icon: AlertTriangle,
      href: "#disclaimers",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">
          Bienvenido, {user?.name || "Administrador"}. Gestiona el contenido de Dockly desde aquí.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Secciones</p>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-sm text-muted-foreground">Avisos legales</p>
              <p className="text-2xl font-bold">Activos</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Departamentos</p>
              <p className="text-2xl font-bold">10</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Gestión de contenido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.href} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Próximamente
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Important Notice */}
      <Card className="p-6 bg-amber-500/10 border-amber-500/20">
        <div className="flex gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">Validación de contenido</h3>
            <p className="text-sm text-amber-800">
              El sistema detectará automáticamente frases como "empleo garantizado", "embarque seguro" y otras promesas ilegales. Estas serán bloqueadas para proteger la integridad legal de Dockly.
            </p>
          </div>
        </div>
      </Card>

      {/* API Documentation */}
      <Card className="p-6 bg-blue-500/10 border-blue-500/20">
        <h3 className="font-semibold text-blue-900 mb-3">API disponible</h3>
        <p className="text-sm text-blue-800 mb-4">
          El panel utiliza los siguientes endpoints tRPC para gestionar contenido:
        </p>
        <ul className="text-xs text-blue-800 space-y-1 font-mono">
          <li>• cms.workAreas.list / create / update / delete</li>
          <li>• cms.boardingSteps.list / create / update / delete</li>
          <li>• cms.requirements.list / create / update / delete</li>
          <li>• cms.salaries.list / create / update / delete</li>
          <li>• cms.fraudSignals.list / create / update / delete</li>
          <li>• cms.myths.list / create / update / delete</li>
          <li>• cms.disclaimers.list / get / update</li>
          <li>• cms.about.get / update</li>
        </ul>
      </Card>
    </div>
  );
}

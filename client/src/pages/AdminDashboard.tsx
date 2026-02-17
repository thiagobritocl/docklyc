import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Briefcase,
  MapPin,
  ClipboardList,
  DollarSign,
  ShieldAlert,
  HelpCircle,
  AlertTriangle,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Loader2,
  FileText,
  Eye,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (user?.role !== "admin") {
    return <div className="p-8">Acceso denegado</div>;
  }

  const sections = [
    {
      id: "areas",
      title: "Áreas de trabajo",
      description: "Gestiona los 10 departamentos del crucero",
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      id: "boarding",
      title: "Proceso de embarque",
      description: "Edita los 10 pasos del proceso",
      icon: MapPin,
      color: "text-teal-500",
    },
    {
      id: "requisitos",
      title: "Requisitos",
      description: "Documentos y certificaciones necesarias",
      icon: ClipboardList,
      color: "text-violet-500",
    },
    {
      id: "salarios",
      title: "Salarios",
      description: "Tablas de salarios estimados",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      id: "fraude",
      title: "Señales de fraude",
      description: "Avisos y cobros ilegales",
      icon: ShieldAlert,
      color: "text-amber-500",
    },
    {
      id: "mitos",
      title: "Mitos y verdades",
      description: "Creencias comunes desmontadas",
      icon: HelpCircle,
      color: "text-rose-500",
    },
    {
      id: "disclaimers",
      title: "Avisos legales",
      description: "Disclaimers y responsabilidades",
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      id: "pages",
      title: "Páginas",
      description: "Crea y gestiona páginas personalizadas",
      icon: FileText,
      color: "text-indigo-500",
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

      {/* Seed Button + Stats */}
      <SeedButton />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Secciones</p>
              <p className="text-2xl font-bold">{sections.length}</p>
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
              <Card
                key={section.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveSection(section.id)}
              >
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                  <Button size="sm" className="w-full">
                    Gestionar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Content Management Sections */}
      {activeSection === "areas" && <WorkAreasManager />}
      {activeSection === "boarding" && <BoardingStepsManager />}
      {activeSection === "requisitos" && <RequirementsManager />}
      {activeSection === "salarios" && <SalariesManager />}
      {activeSection === "fraude" && <FraudSignalsManager />}
      {activeSection === "mitos" && <MythsManager />}
      {activeSection === "disclaimers" && <DisclaimersManager />}
      {activeSection === "pages" && <PagesManager />}

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
    </div>
  );
}

// ============ Work Areas Manager ============
function WorkAreasManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", functions: "", requirements: "", entryLevel: "entry-level", order: 0 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const workAreas = trpc.cms.workAreas.list.useQuery();
  const createMutation = trpc.cms.workAreas.create.useMutation();
  const updateMutation = trpc.cms.workAreas.update.useMutation();
  const deleteMutation = trpc.cms.workAreas.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await workAreas.refetch();
      setIsOpen(false);
      setFormData({ name: "", description: "", functions: "", requirements: "", entryLevel: "entry-level", order: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving work area:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await workAreas.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting work area:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Áreas de trabajo</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ name: "", description: "", functions: "", requirements: "", entryLevel: "entry-level", order: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Área de trabajo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <Textarea placeholder="Funciones (JSON)" value={formData.functions} onChange={(e) => setFormData({ ...formData, functions: e.target.value })} />
              <Textarea placeholder="Requisitos (JSON)" value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} />
              <Select value={formData.entryLevel} onValueChange={(value) => setFormData({ ...formData, entryLevel: value as "entry-level" | "experienced" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry-level">Nivel de entrada</SelectItem>
                  <SelectItem value="experienced">Experimentado</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Orden" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {workAreas.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workAreas.data?.map((area) => (
              <TableRow key={area.id}>
                <TableCell>{area.name}</TableCell>
                <TableCell className="max-w-xs truncate">{area.description}</TableCell>
                <TableCell>{area.entryLevel}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(area.id);
                        setFormData({ name: area.name, description: area.description, functions: area.functions, requirements: area.requirements, entryLevel: area.entryLevel, order: area.order });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(area.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta área?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Boarding Steps Manager ============
function BoardingStepsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", approximateTime: "", commonErrors: "", candidateActions: "", shipperRequests: "", order: 0 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const steps = trpc.cms.boardingSteps.list.useQuery();
  const createMutation = trpc.cms.boardingSteps.create.useMutation();
  const updateMutation = trpc.cms.boardingSteps.update.useMutation();
  const deleteMutation = trpc.cms.boardingSteps.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await steps.refetch();
      setIsOpen(false);
      setFormData({ title: "", description: "", approximateTime: "", commonErrors: "", candidateActions: "", shipperRequests: "", order: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving boarding step:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await steps.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting boarding step:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Proceso de embarque</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ title: "", description: "", approximateTime: "", commonErrors: "", candidateActions: "", shipperRequests: "", order: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Paso de embarque</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Título" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <Textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <Input placeholder="Tiempo aproximado" value={formData.approximateTime} onChange={(e) => setFormData({ ...formData, approximateTime: e.target.value })} />
              <Textarea placeholder="Errores comunes (JSON)" value={formData.commonErrors} onChange={(e) => setFormData({ ...formData, commonErrors: e.target.value })} />
              <Textarea placeholder="Acciones del candidato (JSON)" value={formData.candidateActions} onChange={(e) => setFormData({ ...formData, candidateActions: e.target.value })} />
              <Textarea placeholder="Solicitudes del armador (JSON)" value={formData.shipperRequests} onChange={(e) => setFormData({ ...formData, shipperRequests: e.target.value })} />
              <Input type="number" placeholder="Orden" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {steps.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Tiempo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps.data?.map((step) => (
              <TableRow key={step.id}>
                <TableCell>{step.title}</TableCell>
                <TableCell className="max-w-xs truncate">{step.description}</TableCell>
                <TableCell>{step.approximateTime}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(step.id);
                        setFormData({ title: step.title, description: step.description, approximateTime: step.approximateTime, commonErrors: step.commonErrors, candidateActions: step.candidateActions, shipperRequests: step.shipperRequests, order: step.order });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(step.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este paso?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Requirements Manager ============
function RequirementsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ category: "", title: "", description: "", order: 0 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const requirements = trpc.cms.requirements.list.useQuery();
  const createMutation = trpc.cms.requirements.create.useMutation();
  const updateMutation = trpc.cms.requirements.update.useMutation();
  const deleteMutation = trpc.cms.requirements.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await requirements.refetch();
      setIsOpen(false);
      setFormData({ category: "", title: "", description: "", order: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving requirement:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await requirements.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting requirement:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Requisitos</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ category: "", title: "", description: "", order: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Requisito</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Categoría" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <Input placeholder="Título" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <Textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <Input type="number" placeholder="Orden" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {requirements.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.data?.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.category}</TableCell>
                <TableCell>{req.title}</TableCell>
                <TableCell className="max-w-xs truncate">{req.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(req.id);
                        setFormData({ category: req.category, title: req.title, description: req.description, order: req.order });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(req.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este requisito?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Salaries Manager ============
function SalariesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ department: "", position: "", minSalary: 0, maxSalary: 0, tips: "", notes: "", order: 0 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const salaries = trpc.cms.salaries.list.useQuery();
  const createMutation = trpc.cms.salaries.create.useMutation();
  const updateMutation = trpc.cms.salaries.update.useMutation();
  const deleteMutation = trpc.cms.salaries.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await salaries.refetch();
      setIsOpen(false);
      setFormData({ department: "", position: "", minSalary: 0, maxSalary: 0, tips: "", notes: "", order: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving salary:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await salaries.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting salary:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Salarios</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ department: "", position: "", minSalary: 0, maxSalary: 0, tips: "", notes: "", order: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Salario</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Departamento" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
              <Input placeholder="Posición" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
              <Input type="number" placeholder="Salario mínimo" value={formData.minSalary} onChange={(e) => setFormData({ ...formData, minSalary: parseFloat(e.target.value) })} />
              <Input type="number" placeholder="Salario máximo" value={formData.maxSalary} onChange={(e) => setFormData({ ...formData, maxSalary: parseFloat(e.target.value) })} />
              <Textarea placeholder="Propinas" value={formData.tips || ""} onChange={(e) => setFormData({ ...formData, tips: e.target.value })} />
              <Textarea placeholder="Notas" value={formData.notes || ""} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
              <Input type="number" placeholder="Orden" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {salaries.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departamento</TableHead>
              <TableHead>Posición</TableHead>
              <TableHead>Salario (min-max)</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaries.data?.map((salary) => (
              <TableRow key={salary.id}>
                <TableCell>{salary.department}</TableCell>
                <TableCell>{salary.position}</TableCell>
                <TableCell>${salary.minSalary} - ${salary.maxSalary}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(salary.id);
                        setFormData({ department: salary.department, position: salary.position, minSalary: salary.minSalary, maxSalary: salary.maxSalary, tips: salary.tips || "", notes: salary.notes || "", order: salary.order });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(salary.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este salario?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Fraud Signals Manager ============
function FraudSignalsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ signal: "", category: "red_flag" as "red_flag" | "illegal_charge" | "verification_tip", order: 0 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const signals = trpc.cms.fraudSignals.list.useQuery();
  const createMutation = trpc.cms.fraudSignals.create.useMutation();
  const updateMutation = trpc.cms.fraudSignals.update.useMutation();
  const deleteMutation = trpc.cms.fraudSignals.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await signals.refetch();
      setIsOpen(false);
      setFormData({ signal: "", category: "red_flag", order: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving fraud signal:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await signals.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting fraud signal:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Señales de fraude</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ signal: "", category: "red_flag", order: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Señal de fraude</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea placeholder="Señal" value={formData.signal} onChange={(e) => setFormData({ ...formData, signal: e.target.value })} />
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as "red_flag" | "illegal_charge" | "verification_tip" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red_flag">Bandera roja</SelectItem>
                  <SelectItem value="illegal_charge">Cobro ilegal</SelectItem>
                  <SelectItem value="verification_tip">Consejo de verificación</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Orden" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {signals.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Señal</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signals.data?.map((signal) => (
              <TableRow key={signal.id}>
                <TableCell className="max-w-xs truncate">{signal.signal}</TableCell>
                <TableCell>{signal.category}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(signal.id);
                        setFormData({ signal: signal.signal, category: signal.category, order: signal.order });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(signal.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta señal?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Myths Manager ============
function MythsManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", verdict: "Verdadero" as "Verdadero" | "Falso", shortDescription: "", detailedExplanation: "", details: "", order: 0 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const myths = trpc.cms.myths.list.useQuery();
  const createMutation = trpc.cms.myths.create.useMutation();
  const updateMutation = trpc.cms.myths.update.useMutation();
  const deleteMutation = trpc.cms.myths.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await myths.refetch();
      setIsOpen(false);
      setFormData({ title: "", verdict: "Verdadero", shortDescription: "", detailedExplanation: "", details: "", order: 0 });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving myth:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await myths.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting myth:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Mitos y verdades</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ title: "", verdict: "Verdadero", shortDescription: "", detailedExplanation: "", details: "", order: 0 }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Mito</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Título" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <Select value={formData.verdict} onValueChange={(value) => setFormData({ ...formData, verdict: value as "Verdadero" | "Falso" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Verdadero">Verdadero</SelectItem>
                  <SelectItem value="Falso">Falso</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Descripción corta" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} />
              <Textarea placeholder="Explicación detallada" value={formData.detailedExplanation} onChange={(e) => setFormData({ ...formData, detailedExplanation: e.target.value })} />
              <Textarea placeholder="Detalles (JSON)" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
              <Input type="number" placeholder="Orden" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {myths.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Veredicto</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myths.data?.map((myth) => (
              <TableRow key={myth.id}>
                <TableCell>{myth.title}</TableCell>
                <TableCell>{myth.verdict}</TableCell>
                <TableCell className="max-w-xs truncate">{myth.shortDescription}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(myth.id);
                        setFormData({ title: myth.title, verdict: myth.verdict, shortDescription: myth.shortDescription, detailedExplanation: myth.detailedExplanation, details: myth.details, order: myth.order });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(myth.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este mito?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Seed Button ============
function SeedButton() {
  const seedMutation = trpc.cms.seed.useMutation();
  const [done, setDone] = useState(false);

  const handleSeed = async () => {
    try {
      await seedMutation.mutateAsync();
      setDone(true);
      // Reload page to refresh all data
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error seeding:", error);
    }
  };

  return (
    <Card className="p-4 bg-blue-500/10 border-blue-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-semibold text-sm">Inicializar datos</h3>
            <p className="text-xs text-muted-foreground">Carga los datos predeterminados en la base de datos (solo si las tablas estan vacias)</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleSeed}
          disabled={seedMutation.isPending || done}
        >
          {seedMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {done ? "Listo!" : "Inicializar"}
        </Button>
      </div>
    </Card>
  );
}

// ============ Disclaimers Manager ============
function DisclaimersManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({ key: "", title: "", content: "" });
  const [deleteKey, setDeleteKey] = useState<string | null>(null);

  const disclaimers = trpc.cms.disclaimers.list.useQuery();
  const createMutation = trpc.cms.disclaimers.create.useMutation();
  const updateMutation = trpc.cms.disclaimers.update.useMutation();
  const deleteMutation = trpc.cms.disclaimers.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingKey) {
        await updateMutation.mutateAsync({ key: editingKey, data: { title: formData.title, content: formData.content } });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await disclaimers.refetch();
      setIsOpen(false);
      setFormData({ key: "", title: "", content: "" });
      setEditingKey(null);
    } catch (error) {
      console.error("Error saving disclaimer:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteKey) {
      try {
        await deleteMutation.mutateAsync({ key: deleteKey });
        await disclaimers.refetch();
        setDeleteKey(null);
      } catch (error) {
        console.error("Error deleting disclaimer:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Avisos legales</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingKey(null); setFormData({ key: "", title: "", content: "" }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingKey ? "Editar" : "Crear"} Aviso legal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Clave unica (ej: home_disclaimer)"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                disabled={!!editingKey}
              />
              <Input placeholder="Titulo" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <Textarea placeholder="Contenido" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={5} />
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {disclaimers.isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clave</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Contenido</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disclaimers.data?.map((disclaimer) => (
              <TableRow key={disclaimer.key}>
                <TableCell className="font-mono text-xs">{disclaimer.key}</TableCell>
                <TableCell>{disclaimer.title}</TableCell>
                <TableCell className="max-w-xs truncate">{disclaimer.content}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingKey(disclaimer.key);
                        setFormData({ key: disclaimer.key, title: disclaimer.title, content: disclaimer.content });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteKey(disclaimer.key)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteKey !== null} onOpenChange={(open) => !open && setDeleteKey(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar este aviso legal?</AlertDialogTitle>
            <AlertDialogDescription>Esta accion no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ============ Pages Manager ============
function PagesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    content: "",
    imageUrl: "",
    order: 0,
    showInMenu: true,
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const pages = trpc.cms.dynamicPages.list.useQuery();
  const createMutation = trpc.cms.dynamicPages.create.useMutation();
  const updateMutation = trpc.cms.dynamicPages.update.useMutation();
  const deleteMutation = trpc.cms.dynamicPages.delete.useMutation();

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      await pages.refetch();
      setIsOpen(false);
      setEditingId(null);
      setFormData({ slug: "", title: "", subtitle: "", content: "", imageUrl: "", order: 0, showInMenu: true });
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteMutation.mutateAsync({ id: deleteId });
        await pages.refetch();
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting page:", error);
      }
    }
  };

  return (
    <Card className="p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Páginas Dinámicas</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { setEditingId(null); setFormData({ slug: "", title: "", subtitle: "", content: "", imageUrl: "", order: 0, showInMenu: true }); }}>
              <Plus className="w-4 h-4 mr-2" /> Nueva Página
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar" : "Crear"} Página</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ej: Mi nueva página" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug (URL)</label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="Ej: mi-nueva-pagina" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Subtítulo (opcional)</label>
                <Input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Breve descripción" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">URL de la Imagen</label>
                <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Contenido (Texto)</label>
                <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} placeholder="Contenido de la página..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Orden en menú</label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <input type="checkbox" id="showInMenu" checked={formData.showInMenu} onChange={(e) => setFormData({ ...formData, showInMenu: e.target.checked })} />
                <label htmlFor="showInMenu" className="text-sm font-medium">Mostrar en menú</label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Guardar Página
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {pages.isLoading ? (
        <div className="text-center py-8">Cargando páginas...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Menú</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.data?.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="text-xs text-muted-foreground">/p/{page.slug}</TableCell>
                <TableCell>{page.showInMenu ? "Sí" : "No"}</TableCell>
                <TableCell>{page.order}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer">
                        <Eye className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(page.id);
                        setFormData({
                          slug: page.slug,
                          title: page.title,
                          subtitle: page.subtitle || "",
                          content: page.content,
                          imageUrl: page.imageUrl || "",
                          order: page.order,
                          showInMenu: page.showInMenu,
                        });
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(page.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta página?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending} className="bg-destructive text-destructive-foreground">
              {deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

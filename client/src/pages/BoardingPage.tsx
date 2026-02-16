import { motion } from "framer-motion";
import { FileText, Users, PenLine, Folder, GraduationCap, Plane, Mail, MapPin, Shield, Home, AlertTriangle, Clock, XCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const HERO_IMG = "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=80";

interface Step {
  num: number;
  title: string;
  icon: React.ElementType;
  candidate: string;
  company: string;
  time: string;
  errors: string[];
}

const steps: Step[] = [
  {
    num: 1, title: "Oferta o preseleccion", icon: FileText,
    candidate: "Aplicas a vacantes a traves de portales oficiales de navieras, agencias autorizadas o ferias de empleo maritimo. Preparas tu CV en ingles con foto profesional.",
    company: "La naviera o agencia revisa perfiles y preselecciona candidatos que cumplen requisitos basicos. No hay garantia de avanzar en el proceso.",
    time: "1-4 semanas (puede variar ampliamente)",
    errors: ["Enviar CV sin foto o en formato incorrecto", "Aplicar a puestos sin cumplir requisitos minimos", "No verificar que la agencia sea legitima"],
  },
  {
    num: 2, title: "Entrevistas finales", icon: Users,
    candidate: "Participas en entrevistas (presenciales o virtuales). Demuestras tu nivel de ingles, experiencia y actitud de servicio. Pueden incluir pruebas practicas.",
    company: "Evaluan competencias tecnicas, nivel de idioma, presentacion personal y compatibilidad con la cultura de la naviera.",
    time: "1-3 semanas",
    errors: ["No practicar ingles antes de la entrevista", "No investigar sobre la naviera", "Vestimenta inapropiada en entrevista presencial"],
  },
  {
    num: 3, title: "Firma de contrato", icon: PenLine,
    candidate: "Revisas cuidadosamente los terminos del contrato: duracion, salario, beneficios, politicas de la naviera. Firmas solo si estas de acuerdo con todo.",
    company: "Presenta contrato formal con terminos, condiciones, duracion y compensacion. Debe cumplir con el Convenio de Trabajo Maritimo (MLC 2006).",
    time: "1-2 semanas",
    errors: ["Firmar sin leer el contrato completo", "No preguntar sobre clausulas que no entiendas", "Aceptar condiciones verbales sin respaldo escrito"],
  },
  {
    num: 4, title: "Documentacion requerida", icon: Folder,
    candidate: "Gestionas toda la documentacion necesaria: pasaporte vigente (minimo 6 meses), certificados STCW, examen medico maritimo (ENG1 o equivalente), visa si aplica, libreta de embarque.",
    company: "Proporciona lista detallada de documentos requeridos, clinicas autorizadas para examen medico y plazos de entrega.",
    time: "2-8 semanas (dependiendo del pais y tramites)",
    errors: ["Pasaporte proximo a vencer", "No verificar requisitos de visa del puerto de embarque", "Realizar examen medico en clinica no autorizada", "Dejar tramites para ultimo momento"],
  },
  {
    num: 5, title: "Entrenamientos previos", icon: GraduationCap,
    candidate: "Completas cursos STCW basicos (seguridad, supervivencia, primeros auxilios, prevencion de incendios) y cualquier entrenamiento especifico requerido por la naviera.",
    company: "Puede ofrecer entrenamientos adicionales en linea o presenciales sobre politicas, sistemas y procedimientos especificos de la compania.",
    time: "1-4 semanas",
    errors: ["No completar todos los modulos STCW requeridos", "Certificados STCW vencidos", "No guardar copias digitales de todos los certificados"],
  },
  {
    num: 6, title: "Compra o asignacion de pasajes", icon: Plane,
    candidate: "Coordinas tu viaje al puerto de embarque. En algunos casos la naviera cubre el pasaje; en otros, es responsabilidad del tripulante (revisar contrato).",
    company: "Informa sobre el puerto de embarque, fecha y hora exacta. Puede proporcionar instrucciones de viaje o asistencia con reservas.",
    time: "1-2 semanas antes del embarque",
    errors: ["No confirmar quien cubre el costo del pasaje", "No tener plan B ante cancelaciones de vuelos", "No llevar copias impresas de documentos de viaje"],
  },
  {
    num: 7, title: "Instrucciones de embarque", icon: Mail,
    candidate: "Recibes instrucciones detalladas: puerto, terminal, hora de presentacion, que llevar, codigo de vestimenta, contacto de emergencia.",
    company: "Envia joining instructions con toda la informacion logistica. Puede incluir contacto local para asistencia.",
    time: "1-2 semanas antes del embarque",
    errors: ["No leer las instrucciones completas", "No confirmar recepcion de las instrucciones", "No preparar equipaje segun las indicaciones"],
  },
  {
    num: 8, title: "Llegada al puerto", icon: MapPin,
    candidate: "Te presentas en el puerto/terminal en la fecha y hora indicada con toda tu documentacion original. Sigues las instrucciones del personal de la naviera.",
    company: "Personal de la naviera recibe a la tripulacion, verifica documentacion y coordina el abordaje.",
    time: "Dia de embarque",
    errors: ["Llegar tarde al puerto", "No llevar documentos originales", "No tener copias de respaldo de documentos importantes"],
  },
  {
    num: 9, title: "Seguridad e induccion inicial", icon: Shield,
    candidate: "Participas en la induccion de seguridad obligatoria: simulacros de emergencia, ubicacion de equipos de salvamento, procedimientos de evacuacion, normas del barco.",
    company: "Realiza induccion de seguridad obligatoria por regulacion maritima internacional (SOLAS). Asigna estacion de emergencia.",
    time: "Primeras 24 horas a bordo",
    errors: ["No prestar atencion a los simulacros", "No memorizar tu estacion de emergencia", "No familiarizarte con las rutas de evacuacion"],
  },
  {
    num: 10, title: "Asignacion de cabina y primeros dias", icon: Home,
    candidate: "Recibes tu cabina compartida, uniforme, tarjeta de identificacion y horario de trabajo. Comienzas periodo de adaptacion y entrenamiento en tu puesto especifico.",
    company: "Asigna cabina, proporciona uniformes y credenciales. Inicia periodo de entrenamiento supervisado en el departamento correspondiente.",
    time: "Primeros 3-7 dias a bordo",
    errors: ["No adaptarse rapidamente a los horarios", "No pedir ayuda cuando la necesitas", "No respetar las normas de convivencia en cabinas compartidas"],
  },
];

export default function BoardingPage() {
  return (
    <div>
      <PageHero
        title="Proceso de embarque"
        subtitle="Todo el camino desde la preseleccion hasta tus primeros dias a bordo, explicado paso a paso. El proceso puede variar segun la naviera y el puesto."
        imageUrl={HERO_IMG}
        badge="Guia paso a paso"
      />

      <section className="container py-12">
        <LegalDisclaimer text="El proceso de embarque puede variar segun la naviera, el puesto y el pais. Esta informacion es orientativa y no garantiza embarque. Cada naviera tiene sus propios procedimientos y tiempos." />

        <div className="mt-8 mb-10">
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            El proceso desde que aplicas hasta que subes al barco puede tomar entre 2 y 6 meses, dependiendo de multiples factores. A continuacion te presentamos los pasos tipicos en orden cronologico, con lo que hace el candidato, lo que solicita la naviera, tiempos aproximados y errores comunes a evitar.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="relative md:pl-16"
                >
                  {/* Step number circle */}
                  <div className="hidden md:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-card border-2 border-primary/30 items-center justify-center z-10">
                    <span className="text-sm font-bold text-primary">{step.num}</span>
                  </div>

                  <div className="rounded-xl bg-card border border-border p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="md:hidden w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">{step.num}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-foreground">{step.title}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {step.time}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-background/50">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5">Que hace el candidato</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">{step.candidate}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1.5">Que solicita la naviera</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">{step.company}</p>
                      </div>
                    </div>

                    {/* Common errors */}
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Errores comunes
                      </h4>
                      <ul className="space-y-1">
                        {step.errors.map((e) => (
                          <li key={e} className="text-xs text-red-300/80 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

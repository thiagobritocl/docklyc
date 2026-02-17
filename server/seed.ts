/**
 * Seed script to populate the CMS database with the hardcoded data
 * from the public pages. This ensures the admin panel shows existing content
 * and allows editing/deleting.
 */
import { getDb } from "./db";
import {
  workAreas,
  boardingSteps,
  requirements,
  salaryData,
  fraudSignals,
  myths,
  legalDisclaimers,
} from "../drizzle/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  const db = await getDb();
  if (!db) throw new Error("Database not available for seeding");

  console.log("[Seed] Starting database seed...");

  // ============ Work Areas ============
  const workAreasCount = await db.select({ count: sql<number>`count(*)` }).from(workAreas);
  if (Number(workAreasCount[0].count) === 0) {
    console.log("[Seed] Seeding work areas...");
    await db.insert(workAreas).values([
      {
        name: "Hotel / Housekeeping",
        description: "Se encarga de mantener la limpieza y el orden de cabinas, areas publicas y espacios comunes. Es una de las puertas de entrada mas accesibles para quienes inician en la industria.",
        functions: JSON.stringify(["Limpieza y preparacion diaria de cabinas", "Reposicion de amenidades y ropa de cama", "Limpieza de areas publicas", "Servicio de lavanderia", "Atencion a solicitudes de huespedes"]),
        requirements: JSON.stringify(["Atencion al detalle", "Resistencia fisica", "Trabajo en equipo", "Organizacion", "Actitud de servicio"]),
        entryLevel: "entry-level",
        order: 1,
        isActive: true,
      },
      {
        name: "Alimentos y Bebidas (F&B)",
        description: "Gestiona restaurantes, bares, buffets y servicios de comida a bordo. Es uno de los departamentos mas grandes y con mayor interaccion directa con pasajeros.",
        functions: JSON.stringify(["Servicio de alimentos en restaurantes y buffets", "Preparacion y servicio de bebidas", "Montaje y desmontaje de mesas", "Atencion personalizada a pasajeros", "Manejo de inventario de bebidas"]),
        requirements: JSON.stringify(["Comunicacion interpersonal", "Manejo de estres", "Memoria y atencion", "Conocimiento de vinos y cocteles", "Trabajo bajo presion"]),
        entryLevel: "entry-level",
        order: 2,
        isActive: true,
      },
      {
        name: "Cocina / Galley",
        description: "Produce miles de comidas diarias para pasajeros y tripulacion. Requiere personal con formacion culinaria y capacidad de trabajar en espacios reducidos bajo alta presion.",
        functions: JSON.stringify(["Preparacion de alimentos segun estandares", "Manejo de cocina en linea", "Control de calidad e higiene alimentaria", "Gestion de inventario", "Cumplimiento de normativas sanitarias maritimas"]),
        requirements: JSON.stringify(["Formacion culinaria", "Resistencia al calor y presion", "Conocimiento de HACCP", "Trabajo en equipo", "Velocidad y precision"]),
        entryLevel: "experienced",
        order: 3,
        isActive: true,
      },
      {
        name: "Entretenimiento",
        description: "Se encarga de la programacion de actividades, shows, eventos y animacion. Incluye artistas de escenario, coordinadores de actividades y personal de programas infantiles.",
        functions: JSON.stringify(["Planificacion y ejecucion de shows", "Animacion de actividades diurnas y nocturnas", "Coordinacion de artistas y tecnicos", "Conduccion de juegos y fiestas tematicas", "Supervision de programas infantiles"]),
        requirements: JSON.stringify(["Carisma y presencia escenica", "Comunicacion publica", "Creatividad", "Flexibilidad horaria", "Talento artistico especifico"]),
        entryLevel: "experienced",
        order: 4,
        isActive: true,
      },
      {
        name: "Casino",
        description: "Opera las instalaciones de juego a bordo: mesas, maquinas tragamonedas y eventos de poker. Regulaciones estrictas y requisitos especificos de licencia.",
        functions: JSON.stringify(["Operacion de mesas de juego", "Mantenimiento de maquinas", "Manejo de transacciones y fichas", "Atencion al cliente en casino", "Cumplimiento de regulaciones de juego maritimo"]),
        requirements: JSON.stringify(["Habilidad matematica rapida", "Destreza manual", "Integridad y etica", "Atencion al detalle", "Manejo de presion"]),
        entryLevel: "experienced",
        order: 5,
        isActive: true,
      },
      {
        name: "Spa & Wellness",
        description: "Ofrece servicios de belleza, masajes, tratamientos corporales y fitness. Generalmente operado por concesionarios externos como Steiner Leisure.",
        functions: JSON.stringify(["Tratamientos de masaje y corporales", "Servicios de peluqueria y estetica", "Clases de fitness", "Venta de productos de belleza", "Gestion de citas"]),
        requirements: JSON.stringify(["Certificaciones profesionales vigentes", "Habilidades de venta", "Trato personalizado", "Conocimiento de productos", "Presentacion personal impecable"]),
        entryLevel: "experienced",
        order: 6,
        isActive: true,
      },
      {
        name: "Tiendas / Retail",
        description: "Gestiona tiendas duty-free a bordo: joyeria, perfumeria, ropa de marca, souvenirs y articulos de lujo. Ventas en aguas internacionales.",
        functions: JSON.stringify(["Atencion y asesoria al cliente", "Manejo de inventario y exhibiciones", "Procesamiento de ventas", "Eventos de venta especiales", "Mantenimiento visual de tiendas"]),
        requirements: JSON.stringify(["Habilidades de venta", "Conocimiento de productos", "Presentacion personal", "Manejo de caja y POS", "Orientacion a metas"]),
        entryLevel: "entry-level",
        order: 7,
        isActive: true,
      },
      {
        name: "Recepcion / Guest Services",
        description: "Punto central de atencion al pasajero. Maneja consultas, quejas, informacion de itinerario, cambio de divisas y servicios especiales. La cara visible del servicio al cliente.",
        functions: JSON.stringify(["Atencion de consultas y resolucion de problemas", "Manejo de quejas", "Informacion sobre itinerarios y excursiones", "Cambio de divisas", "Coordinacion de servicios especiales"]),
        requirements: JSON.stringify(["Comunicacion excepcional", "Resolucion de conflictos", "Paciencia y empatia", "Manejo de sistemas informaticos", "Multiples idiomas (ventaja)"]),
        entryLevel: "experienced",
        order: 8,
        isActive: true,
      },
      {
        name: "Cubierta (Deck)",
        description: "Responsable de navegacion, maniobras, seguridad maritima y mantenimiento exterior del buque. Departamento tecnico que requiere formacion maritima formal.",
        functions: JSON.stringify(["Navegacion y vigilancia en el puente", "Maniobras de atraque y desatraque", "Mantenimiento de equipos de salvamento", "Operaciones de seguridad y simulacros", "Mantenimiento exterior del buque"]),
        requirements: JSON.stringify(["Formacion nautica certificada", "Conocimiento de regulaciones SOLAS/MARPOL", "Liderazgo y toma de decisiones", "Resistencia fisica", "Trabajo en condiciones adversas"]),
        entryLevel: "experienced",
        order: 9,
        isActive: true,
      },
      {
        name: "Motor (Engine)",
        description: "Mantiene y opera todos los sistemas mecanicos, electricos y de ingenieria del buque: motores, generadores, sistemas de agua, aire acondicionado y mas.",
        functions: JSON.stringify(["Operacion y mantenimiento de motores principales", "Gestion de sistemas electricos", "Mantenimiento de sistemas de climatizacion", "Control de sistemas de agua y combustible", "Reparaciones mecanicas y electricas"]),
        requirements: JSON.stringify(["Formacion tecnica certificada", "Conocimiento de sistemas mecanicos/electricos", "Resolucion de problemas tecnicos", "Trabajo en espacios confinados", "Resistencia al calor y ruido"]),
        entryLevel: "experienced",
        order: 10,
        isActive: true,
      },
    ]);
    console.log("[Seed] Work areas seeded.");
  }

  // ============ Boarding Steps ============
  const stepsCount = await db.select({ count: sql<number>`count(*)` }).from(boardingSteps);
  if (Number(stepsCount[0].count) === 0) {
    console.log("[Seed] Seeding boarding steps...");
    await db.insert(boardingSteps).values([
      {
        title: "Oferta o preseleccion",
        description: "Aplicas a vacantes a traves de portales oficiales de navieras, agencias autorizadas o ferias de empleo maritimo. Preparas tu CV en ingles con foto profesional.",
        approximateTime: "1-4 semanas",
        commonErrors: JSON.stringify(["Enviar CV sin foto o en formato incorrecto", "Aplicar a puestos sin cumplir requisitos minimos", "No verificar que la agencia sea legitima"]),
        candidateActions: JSON.stringify("Aplicas a vacantes a traves de portales oficiales de navieras, agencias autorizadas o ferias de empleo maritimo. Preparas tu CV en ingles con foto profesional."),
        shipperRequests: JSON.stringify("La naviera o agencia revisa perfiles y preselecciona candidatos que cumplen requisitos basicos. No hay garantia de avanzar en el proceso."),
        order: 1, isActive: true,
      },
      {
        title: "Entrevistas finales",
        description: "Participas en entrevistas (presenciales o virtuales). Demuestras tu nivel de ingles, experiencia y actitud de servicio. Pueden incluir pruebas practicas.",
        approximateTime: "1-3 semanas",
        commonErrors: JSON.stringify(["No practicar ingles antes de la entrevista", "No investigar sobre la naviera", "Vestimenta inapropiada en entrevista presencial"]),
        candidateActions: JSON.stringify("Participas en entrevistas (presenciales o virtuales). Demuestras tu nivel de ingles, experiencia y actitud de servicio. Pueden incluir pruebas practicas."),
        shipperRequests: JSON.stringify("Evaluan competencias tecnicas, nivel de idioma, presentacion personal y compatibilidad con la cultura de la naviera."),
        order: 2, isActive: true,
      },
      {
        title: "Firma de contrato",
        description: "Revisas cuidadosamente los terminos del contrato: duracion, salario, beneficios, politicas de la naviera. Firmas solo si estas de acuerdo con todo.",
        approximateTime: "1-2 semanas",
        commonErrors: JSON.stringify(["Firmar sin leer el contrato completo", "No preguntar sobre clausulas que no entiendas", "Aceptar condiciones verbales sin respaldo escrito"]),
        candidateActions: JSON.stringify("Revisas cuidadosamente los terminos del contrato: duracion, salario, beneficios, politicas de la naviera. Firmas solo si estas de acuerdo con todo."),
        shipperRequests: JSON.stringify("Presenta contrato formal con terminos, condiciones, duracion y compensacion. Debe cumplir con el Convenio de Trabajo Maritimo (MLC 2006)."),
        order: 3, isActive: true,
      },
      {
        title: "Documentacion requerida",
        description: "Gestionas toda la documentacion necesaria: pasaporte vigente, certificados STCW, examen medico maritimo, visa si aplica, libreta de embarque.",
        approximateTime: "2-8 semanas",
        commonErrors: JSON.stringify(["Pasaporte proximo a vencer", "No verificar requisitos de visa del puerto de embarque", "Realizar examen medico en clinica no autorizada", "Dejar tramites para ultimo momento"]),
        candidateActions: JSON.stringify("Gestionas toda la documentacion necesaria: pasaporte vigente (minimo 6 meses), certificados STCW, examen medico maritimo (ENG1 o equivalente), visa si aplica, libreta de embarque."),
        shipperRequests: JSON.stringify("Proporciona lista detallada de documentos requeridos, clinicas autorizadas para examen medico y plazos de entrega."),
        order: 4, isActive: true,
      },
      {
        title: "Entrenamientos previos",
        description: "Completas cursos STCW basicos y cualquier entrenamiento especifico requerido por la naviera.",
        approximateTime: "1-4 semanas",
        commonErrors: JSON.stringify(["No completar todos los modulos STCW requeridos", "Certificados STCW vencidos", "No guardar copias digitales de todos los certificados"]),
        candidateActions: JSON.stringify("Completas cursos STCW basicos (seguridad, supervivencia, primeros auxilios, prevencion de incendios) y cualquier entrenamiento especifico requerido por la naviera."),
        shipperRequests: JSON.stringify("Puede ofrecer entrenamientos adicionales en linea o presenciales sobre politicas, sistemas y procedimientos especificos de la compania."),
        order: 5, isActive: true,
      },
      {
        title: "Compra o asignacion de pasajes",
        description: "Coordinas tu viaje al puerto de embarque. En algunos casos la naviera cubre el pasaje; en otros, es responsabilidad del tripulante.",
        approximateTime: "1-2 semanas antes del embarque",
        commonErrors: JSON.stringify(["No confirmar quien cubre el costo del pasaje", "No tener plan B ante cancelaciones de vuelos", "No llevar copias impresas de documentos de viaje"]),
        candidateActions: JSON.stringify("Coordinas tu viaje al puerto de embarque. En algunos casos la naviera cubre el pasaje; en otros, es responsabilidad del tripulante (revisar contrato)."),
        shipperRequests: JSON.stringify("Informa sobre el puerto de embarque, fecha y hora exacta. Puede proporcionar instrucciones de viaje o asistencia con reservas."),
        order: 6, isActive: true,
      },
      {
        title: "Instrucciones de embarque",
        description: "Recibes instrucciones detalladas: puerto, terminal, hora de presentacion, que llevar, codigo de vestimenta, contacto de emergencia.",
        approximateTime: "1-2 semanas antes del embarque",
        commonErrors: JSON.stringify(["No leer las instrucciones completas", "No confirmar recepcion de las instrucciones", "No preparar equipaje segun las indicaciones"]),
        candidateActions: JSON.stringify("Recibes instrucciones detalladas: puerto, terminal, hora de presentacion, que llevar, codigo de vestimenta, contacto de emergencia."),
        shipperRequests: JSON.stringify("Envia joining instructions con toda la informacion logistica. Puede incluir contacto local para asistencia."),
        order: 7, isActive: true,
      },
      {
        title: "Llegada al puerto",
        description: "Te presentas en el puerto/terminal en la fecha y hora indicada con toda tu documentacion original.",
        approximateTime: "Dia de embarque",
        commonErrors: JSON.stringify(["Llegar tarde al puerto", "No llevar documentos originales", "No tener copias de respaldo de documentos importantes"]),
        candidateActions: JSON.stringify("Te presentas en el puerto/terminal en la fecha y hora indicada con toda tu documentacion original. Sigues las instrucciones del personal de la naviera."),
        shipperRequests: JSON.stringify("Personal de la naviera recibe a la tripulacion, verifica documentacion y coordina el abordaje."),
        order: 8, isActive: true,
      },
      {
        title: "Seguridad e induccion inicial",
        description: "Participas en la induccion de seguridad obligatoria: simulacros de emergencia, ubicacion de equipos de salvamento, procedimientos de evacuacion.",
        approximateTime: "Primeras 24 horas a bordo",
        commonErrors: JSON.stringify(["No prestar atencion a los simulacros", "No memorizar tu estacion de emergencia", "No familiarizarte con las rutas de evacuacion"]),
        candidateActions: JSON.stringify("Participas en la induccion de seguridad obligatoria: simulacros de emergencia, ubicacion de equipos de salvamento, procedimientos de evacuacion, normas del barco."),
        shipperRequests: JSON.stringify("Realiza induccion de seguridad obligatoria por regulacion maritima internacional (SOLAS). Asigna estacion de emergencia."),
        order: 9, isActive: true,
      },
      {
        title: "Asignacion de cabina y primeros dias",
        description: "Recibes tu cabina compartida, uniforme, tarjeta de identificacion y horario de trabajo. Comienzas periodo de adaptacion.",
        approximateTime: "Primeros 3-7 dias a bordo",
        commonErrors: JSON.stringify(["No adaptarse rapidamente a los horarios", "No pedir ayuda cuando la necesitas", "No respetar las normas de convivencia en cabinas compartidas"]),
        candidateActions: JSON.stringify("Recibes tu cabina compartida, uniforme, tarjeta de identificacion y horario de trabajo. Comienzas periodo de adaptacion y entrenamiento en tu puesto especifico."),
        shipperRequests: JSON.stringify("Asigna cabina, proporciona uniformes y credenciales. Inicia periodo de entrenamiento supervisado en el departamento correspondiente."),
        order: 10, isActive: true,
      },
    ]);
    console.log("[Seed] Boarding steps seeded.");
  }

  // ============ Requirements ============
  const reqCount = await db.select({ count: sql<number>`count(*)` }).from(requirements);
  if (Number(reqCount[0].count) === 0) {
    console.log("[Seed] Seeding requirements...");
    await db.insert(requirements).values([
      { category: "general", title: "Pasaporte vigente", description: "Pasaporte con minimo 6-12 meses de vigencia. Es el documento mas importante. Sin pasaporte vigente, no hay embarque posible.", order: 1, isActive: true },
      { category: "general", title: "Certificados STCW", description: "Certificados basicos de seguridad maritima (STCW): seguridad personal y responsabilidades sociales, tecnicas de supervivencia, prevencion y lucha contra incendios, primeros auxilios. Son obligatorios por regulacion internacional.", order: 2, isActive: true },
      { category: "general", title: "Examen medico maritimo", description: "Examen medico aprobado (ENG1 o equivalente segun el pais). Debe realizarse en clinicas autorizadas por la autoridad maritima. Incluye examen fisico completo, pruebas de vision, audicion y analisis de laboratorio.", order: 3, isActive: true },
      { category: "general", title: "Nivel de ingles", description: "El ingles es el idioma de trabajo a bordo. El nivel requerido varia segun el departamento: desde basico (Housekeeping, Galley) hasta avanzado/fluido (Guest Services, Entretenimiento). Otros idiomas son una ventaja.", order: 4, isActive: true },
      { category: "general", title: "Visa (si aplica)", description: "Dependiendo de tu nacionalidad y el puerto de embarque, podrias necesitar visa de transito o visa C1/D (para embarques en EE.UU.). Verifica con la naviera o agencia los requisitos especificos.", order: 5, isActive: true },
    ]);
    console.log("[Seed] Requirements seeded.");
  }

  // ============ Salary Data ============
  const salaryCount = await db.select({ count: sql<number>`count(*)` }).from(salaryData);
  if (Number(salaryCount[0].count) === 0) {
    console.log("[Seed] Seeding salary data...");
    await db.insert(salaryData).values([
      { department: "Hotel / Housekeeping", position: "Stateroom Attendant", minSalary: 1200, maxSalary: 2000, tips: "Si (significativas)", notes: "Propinas pueden duplicar el salario base", order: 1, isActive: true },
      { department: "Hotel / Housekeeping", position: "Public Area Cleaner", minSalary: 1000, maxSalary: 1500, tips: "Limitadas", notes: "Salario base mas estable", order: 2, isActive: true },
      { department: "Hotel / Housekeeping", position: "Laundry Attendant", minSalary: 900, maxSalary: 1400, tips: "No", notes: "Sin contacto directo con pasajeros", order: 3, isActive: true },
      { department: "Hotel / Housekeeping", position: "Housekeeping Supervisor", minSalary: 1800, maxSalary: 2800, tips: "Si", notes: "Requiere experiencia previa a bordo", order: 4, isActive: true },
      { department: "Alimentos y Bebidas", position: "Assistant Waiter", minSalary: 1200, maxSalary: 1800, tips: "Si", notes: "Propinas compartidas con equipo", order: 5, isActive: true },
      { department: "Alimentos y Bebidas", position: "Waiter", minSalary: 1500, maxSalary: 2500, tips: "Si (altas)", notes: "Propinas pueden ser muy significativas", order: 6, isActive: true },
      { department: "Alimentos y Bebidas", position: "Head Waiter", minSalary: 2200, maxSalary: 3500, tips: "Si", notes: "Puesto de supervision", order: 7, isActive: true },
      { department: "Alimentos y Bebidas", position: "Bartender", minSalary: 1400, maxSalary: 2200, tips: "Si", notes: "Varia segun ubicacion del bar", order: 8, isActive: true },
      { department: "Alimentos y Bebidas", position: "Buffet Attendant", minSalary: 1000, maxSalary: 1600, tips: "Limitadas", notes: "Menor interaccion con pasajeros", order: 9, isActive: true },
      { department: "Cocina / Galley", position: "Galley Steward", minSalary: 800, maxSalary: 1200, tips: "No", notes: "Puesto entry-level", order: 10, isActive: true },
      { department: "Cocina / Galley", position: "Commis Chef", minSalary: 1200, maxSalary: 1800, tips: "No", notes: "Cocinero junior", order: 11, isActive: true },
      { department: "Cocina / Galley", position: "Chef de Partie", minSalary: 2000, maxSalary: 3200, tips: "No", notes: "Jefe de seccion", order: 12, isActive: true },
      { department: "Cocina / Galley", position: "Sous Chef", minSalary: 3000, maxSalary: 4500, tips: "No", notes: "Segundo al mando", order: 13, isActive: true },
      { department: "Cocina / Galley", position: "Executive Chef", minSalary: 5000, maxSalary: 8000, tips: "No", notes: "Maximo responsable", order: 14, isActive: true },
      { department: "Entretenimiento", position: "Youth Staff", minSalary: 1200, maxSalary: 1800, tips: "No", notes: "Programas infantiles", order: 15, isActive: true },
      { department: "Entretenimiento", position: "Activities Coordinator", minSalary: 1500, maxSalary: 2500, tips: "No", notes: "Animacion de actividades", order: 16, isActive: true },
      { department: "Entretenimiento", position: "Musician", minSalary: 2000, maxSalary: 4000, tips: "Posibles", notes: "Varia segun tipo de contrato", order: 17, isActive: true },
      { department: "Entretenimiento", position: "Cruise Director", minSalary: 4000, maxSalary: 7000, tips: "No", notes: "Puesto de alta responsabilidad", order: 18, isActive: true },
      { department: "Otros departamentos", position: "Casino Dealer", minSalary: 1200, maxSalary: 2000, tips: "Si", notes: "Propinas variables", order: 19, isActive: true },
      { department: "Otros departamentos", position: "Spa Therapist", minSalary: 1000, maxSalary: 1500, tips: "Si + comisiones", notes: "Ingresos dependen de ventas", order: 20, isActive: true },
      { department: "Otros departamentos", position: "Shop Assistant", minSalary: 1200, maxSalary: 1800, tips: "No + comisiones", notes: "Comisiones por ventas", order: 21, isActive: true },
      { department: "Otros departamentos", position: "Guest Services Agent", minSalary: 1800, maxSalary: 2800, tips: "Limitadas", notes: "Requiere ingles avanzado", order: 22, isActive: true },
      { department: "Otros departamentos", position: "Able Seaman", minSalary: 1800, maxSalary: 2800, tips: "No", notes: "Departamento de Cubierta", order: 23, isActive: true },
      { department: "Otros departamentos", position: "Third Engineer", minSalary: 3000, maxSalary: 4500, tips: "No", notes: "Departamento de Motor", order: 24, isActive: true },
    ]);
    console.log("[Seed] Salary data seeded.");
  }

  // ============ Fraud Signals ============
  const fraudCount = await db.select({ count: sql<number>`count(*)` }).from(fraudSignals);
  if (Number(fraudCount[0].count) === 0) {
    console.log("[Seed] Seeding fraud signals...");
    const redFlags = [
      "Prometen embarque garantizado o empleo seguro",
      "Cobran por vacantes, contratos o 'acceso a bases de datos'",
      "Solicitan pagos urgentes sin documentacion formal",
      "Usan correos no oficiales (gmail, hotmail) en lugar de dominios corporativos",
      "No tienen sitio web profesional o su presencia en linea es minima",
      "Presionan para que tomes decisiones rapidas sin tiempo para pensar",
      "Ofrecen salarios muy por encima del promedio del mercado",
      "No pueden demostrar relacion con navieras especificas",
      "Piden informacion personal sensible antes de cualquier proceso formal",
      "No proporcionan contrato escrito ni documentacion oficial",
    ];

    const illegalCharges = [
      "Pago por conseguir empleo o 'colocarte' en una naviera — Ninguna agencia legitima cobra al candidato por conseguirle trabajo.",
      "Pago por 'contactos internos' o 'acceso privilegiado' — No existen atajos pagados para conseguir empleo en cruceros.",
      "Pago por 'reservar' una vacante o 'asegurar' tu puesto — Las vacantes no se reservan con dinero.",
      "Comisiones por 'gestionar' tu documentacion — Tu documentacion la gestionas directamente con las instituciones oficiales.",
    ];

    const verificationTips = [
      "Verifica que la agencia tenga registro mercantil, RUT/NIT y domicilio fiscal real.",
      "Sitio web profesional con dominio propio, informacion de contacto verificable, direccion fisica.",
      "Las agencias legitimas declaran abiertamente que no cobran a los candidatos.",
      "Deben poder demostrar que son agencias autorizadas por navieras especificas.",
      "Busca resenas, testimonios y referencias de personas que hayan embarcado a traves de esa agencia.",
      "El proceso de seleccion debe ser claro, con etapas definidas y comunicacion profesional.",
    ];

    const allSignals = [
      ...redFlags.map((s, i) => ({ signal: s, category: "red_flag" as const, order: i + 1, isActive: true as const })),
      ...illegalCharges.map((s, i) => ({ signal: s, category: "illegal_charge" as const, order: i + 20, isActive: true as const })),
      ...verificationTips.map((s, i) => ({ signal: s, category: "verification_tip" as const, order: i + 30, isActive: true as const })),
    ];

    await db.insert(fraudSignals).values(allSignals);
    console.log("[Seed] Fraud signals seeded.");
  }

  // ============ Myths ============
  const mythsCount = await db.select({ count: sql<number>`count(*)` }).from(myths);
  if (Number(mythsCount[0].count) === 0) {
    console.log("[Seed] Seeding myths...");
    await db.insert(myths).values([
      {
        title: "Te haces rico rapido trabajando en cruceros",
        verdict: "Falso",
        shortDescription: "Los salarios en cruceros pueden ser competitivos considerando que no tienes gastos de alojamiento ni alimentacion, pero no son fortunas.",
        detailedExplanation: "La acumulacion de ahorro depende de tu disciplina financiera, tu cargo y la naviera.",
        details: JSON.stringify(["Los puestos entry-level tienen salarios modestos (USD $800-$1,500/mes base)", "Las propinas pueden mejorar significativamente el ingreso en algunos departamentos", "El verdadero beneficio es que puedes ahorrar un porcentaje alto al no tener gastos fijos", "Hacerse 'rico' requiere anos de experiencia, ascensos y buena gestion del dinero", "Muchos tripulantes gastan sus ahorros en los puertos si no tienen disciplina financiera"]),
        order: 1, isActive: true,
      },
      {
        title: "No necesitas ingles para trabajar en cruceros",
        verdict: "Falso",
        shortDescription: "El ingles es el idioma de trabajo a bordo de practicamente todas las navieras internacionales.",
        detailedExplanation: "El nivel requerido varia segun el departamento, pero un minimo basico es necesario en todos los casos.",
        details: JSON.stringify(["Departamentos como Guest Services y Entretenimiento requieren ingles avanzado/fluido", "Housekeeping y Galley pueden requerir un nivel basico-intermedio", "Los simulacros de seguridad y comunicaciones oficiales son en ingles", "Sin ingles, tus opciones se reducen drasticamente", "Otros idiomas son una ventaja adicional, no un reemplazo del ingles"]),
        order: 2, isActive: true,
      },
      {
        title: "Todos los cargos ganan igual",
        verdict: "Falso",
        shortDescription: "Existe una diferencia enorme entre los salarios de diferentes cargos y departamentos.",
        detailedExplanation: "Un Galley Steward puede ganar $800/mes mientras que un Executive Chef puede superar los $8,000/mes.",
        details: JSON.stringify(["Los oficiales de Cubierta y Motor tienen los salarios mas altos a largo plazo", "Las propinas crean diferencias significativas entre puestos similares", "Puestos basados en comisiones (Spa, Retail) tienen ingresos muy variables", "La experiencia y los contratos sucesivos mejoran gradualmente el salario", "Diferentes navieras pagan diferente por el mismo cargo"]),
        order: 3, isActive: true,
      },
      {
        title: "Es como estar de vacaciones",
        verdict: "Falso",
        shortDescription: "Trabajar en un crucero es un empleo demandante con jornadas largas, espacio personal limitado y separacion de familia y amigos.",
        detailedExplanation: "Los tripulantes trabajan mientras los pasajeros vacacionan.",
        details: JSON.stringify(["Jornadas tipicas de 10-14 horas diarias, 7 dias a la semana", "Contratos de 4-9 meses sin dias libres en muchos departamentos", "Cabinas compartidas con espacio muy reducido", "Separacion prolongada de familia y amigos", "Acceso limitado a internet (costoso y lento en alta mar)", "Puedes visitar puertos en tu tiempo libre, pero el tiempo es limitado"]),
        order: 4, isActive: true,
      },
      {
        title: "Cualquiera puede entrar sin requisitos",
        verdict: "Falso",
        shortDescription: "Todos los puestos a bordo requieren al menos documentacion basica y un nivel minimo de ingles.",
        detailedExplanation: "Los puestos especializados requieren formacion y experiencia especifica.",
        details: JSON.stringify(["Los certificados STCW son obligatorios por regulacion maritima internacional", "El examen medico maritimo es un requisito innegociable", "Puestos tecnicos requieren formacion maritima formal", "Puestos de Spa requieren certificaciones profesionales", "Incluso los puestos entry-level tienen un proceso de seleccion competitivo"]),
        order: 5, isActive: true,
      },
      {
        title: "Las navieras te pagan todo desde el principio",
        verdict: "Verdadero",
        shortDescription: "Las navieras cubren alojamiento y alimentacion durante el contrato, pero los costos previos son del candidato.",
        detailedExplanation: "Los costos previos al embarque (certificados, examen medico, pasaporte, visa) generalmente son responsabilidad del candidato.",
        details: JSON.stringify(["Alojamiento y alimentacion a bordo: cubiertos por la naviera", "Certificados STCW: generalmente a cargo del candidato", "Examen medico: generalmente a cargo del candidato", "Pasaporte y visa: siempre a cargo del candidato", "Pasaje al puerto de embarque: varia segun la naviera y el contrato"]),
        order: 6, isActive: true,
      },
      {
        title: "Una vez que entras, tienes trabajo de por vida",
        verdict: "Falso",
        shortDescription: "Los contratos en cruceros son temporales (4-9 meses tipicamente).",
        detailedExplanation: "La renovacion depende de tu desempeno, las necesidades de la naviera y la disponibilidad de vacantes.",
        details: JSON.stringify(["Cada contrato es independiente; no hay garantia de renovacion", "Tu desempeno es evaluado constantemente a bordo", "Las navieras pueden reducir personal segun la temporada", "Mantener buenas evaluaciones aumenta las probabilidades de recontratacion", "Algunos tripulantes construyen carreras largas, pero no es automatico"]),
        order: 7, isActive: true,
      },
    ]);
    console.log("[Seed] Myths seeded.");
  }

  // ============ Legal Disclaimers ============
  const disclaimerCount = await db.select({ count: sql<number>`count(*)` }).from(legalDisclaimers);
  if (Number(disclaimerCount[0].count) === 0) {
    console.log("[Seed] Seeding legal disclaimers...");
    await db.insert(legalDisclaimers).values([
      {
        key: "general",
        title: "Aviso legal general",
        content: "Dockly NO es una naviera ni una agencia de contratacion. No garantizamos empleo, no cobramos a candidatos y toda la informacion es unicamente orientativa y educativa.",
        isActive: true,
      },
      {
        key: "areas",
        title: "Aviso legal - Areas de trabajo",
        content: "Los requisitos, cargos y condiciones pueden variar significativamente segun la naviera, el barco y la temporada. Esta informacion es referencial y no constituye oferta laboral.",
        isActive: true,
      },
      {
        key: "boarding",
        title: "Aviso legal - Proceso de embarque",
        content: "El proceso de embarque puede variar segun la naviera, el puesto y el pais. Esta informacion es orientativa y no garantiza embarque. Cada naviera tiene sus propios procedimientos y tiempos.",
        isActive: true,
      },
      {
        key: "requisitos",
        title: "Aviso legal - Requisitos",
        content: "Los requisitos pueden variar segun la naviera, el pais de origen, el puesto y la temporada. Esta informacion es referencial. Siempre verifica directamente con la naviera o agencia autorizada.",
        isActive: true,
      },
      {
        key: "salarios",
        title: "Aviso legal - Salarios",
        content: "Todos los salarios mostrados son estimaciones promedio en dolares estadounidenses (USD) mensuales. No constituyen oferta salarial ni garantia de ingresos. Los montos reales pueden variar significativamente.",
        isActive: true,
      },
      {
        key: "estafas",
        title: "Aviso legal - Estafas",
        content: "Esta informacion es orientativa y busca ayudarte a identificar posibles fraudes. Ante cualquier duda, consulta con las autoridades competentes de tu pais.",
        isActive: true,
      },
      {
        key: "mitos",
        title: "Aviso legal - Mitos y verdades",
        content: "Las experiencias pueden variar segun la naviera, el puesto, el barco y las circunstancias personales. Esta informacion busca ofrecer una perspectiva realista basada en datos generales de la industria.",
        isActive: true,
      },
    ]);
    console.log("[Seed] Legal disclaimers seeded.");
  }

  console.log("[Seed] Database seed complete!");
}

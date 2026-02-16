# Documentación del CMS de Dockly

## Descripción General

Dockly ahora cuenta con un **Sistema de Gestión de Contenidos (CMS) completo** que permite a los administradores editar todo el contenido del sitio web desde una interfaz web segura. El CMS está integrado con una base de datos MySQL y utiliza procedimientos tRPC para comunicación segura entre el frontend y el backend.

## Características Principales

### 1. **Autenticación y Autorización**
- Solo usuarios con rol **admin** pueden acceder al panel de administración
- La autenticación se realiza a través de Manus OAuth
- Todos los cambios quedan registrados en el audit log

### 2. **Gestión de Contenido**
El CMS permite gestionar los siguientes elementos:

#### Áreas de Trabajo (10 departamentos)
- Nombre del departamento
- Descripción detallada
- Funciones (JSON array)
- Requisitos (JSON array)
- Nivel de entrada (entry-level / experienced)
- Orden de visualización

#### Proceso de Embarque (10 pasos)
- Título del paso
- Descripción completa
- Tiempo aproximado
- Errores comunes (JSON array)
- Acciones del candidato (JSON)
- Solicitudes del armador (JSON)
- Orden de visualización

#### Requisitos
- Categoría (general, housekeeping, galley, etc.)
- Título del requisito
- Descripción detallada
- Orden de visualización

#### Salarios Estimados
- Departamento
- Posición/Cargo
- Salario mínimo (USD)
- Salario máximo (USD)
- Información sobre propinas
- Notas adicionales
- Orden de visualización

#### Señales de Fraude
- Descripción de la señal de alerta
- Categoría (red_flag, illegal_charge, verification_tip)
- Orden de visualización

#### Mitos y Verdades
- Título del mito
- Veredicto (Verdadero / Falso)
- Descripción corta
- Explicación detallada
- Detalles (JSON array de puntos)
- Orden de visualización

#### Avisos Legales
- Clave única (home_disclaimer, salarios_disclaimer, etc.)
- Título
- Contenido completo
- Estado activo/inactivo

#### Página "Sobre Dockly"
- Qué es Dockly
- Qué hace Dockly (JSON array)
- Qué NO hace Dockly (JSON array)
- Compromiso ético

## Arquitectura Técnica

### Base de Datos
El CMS utiliza las siguientes tablas:

```
- users (autenticación)
- work_areas (departamentos)
- boarding_steps (proceso de embarque)
- requirements (requisitos)
- salary_data (salarios)
- fraud_signals (señales de fraude)
- myths (mitos y verdades)
- legal_disclaimers (avisos legales)
- about_page (página sobre)
- audit_log (registro de cambios)
```

### Procedimientos tRPC

Todos los procedimientos están bajo el namespace `cms`:

```typescript
// Work Areas
cms.workAreas.list()                    // GET - Listar todas
cms.workAreas.get({ id })              // GET - Obtener una
cms.workAreas.create(data)              // POST - Crear
cms.workAreas.update({ id, data })     // PUT - Actualizar
cms.workAreas.delete({ id })           // DELETE - Eliminar (soft delete)

// Boarding Steps
cms.boardingSteps.list()                // GET
cms.boardingSteps.create(data)          // POST
cms.boardingSteps.update({ id, data })  // PUT
cms.boardingSteps.delete({ id })        // DELETE

// Requirements
cms.requirements.list({ category })     // GET (con filtro opcional)
cms.requirements.create(data)           // POST
cms.requirements.update({ id, data })   // PUT
cms.requirements.delete({ id })         // DELETE

// Salary Data
cms.salaries.list()                     // GET
cms.salaries.create(data)               // POST
cms.salaries.update({ id, data })       // PUT
cms.salaries.delete({ id })             // DELETE

// Fraud Signals
cms.fraudSignals.list({ category })     // GET (con filtro opcional)
cms.fraudSignals.create(data)           // POST
cms.fraudSignals.update({ id, data })   // PUT
cms.fraudSignals.delete({ id })         // DELETE

// Myths
cms.myths.list()                        // GET
cms.myths.create(data)                  // POST
cms.myths.update({ id, data })          // PUT
cms.myths.delete({ id })                // DELETE

// Legal Disclaimers
cms.disclaimers.list()                  // GET
cms.disclaimers.get({ key })            // GET por clave
cms.disclaimers.update({ key, data })   // PUT

// About Page
cms.about.get()                         // GET
cms.about.update(data)                  // PUT
```

## Seguridad

### Validación de Contenido
- **Frases prohibidas**: El sistema detecta y bloquea automáticamente frases como:
  - "empleo garantizado"
  - "embarque seguro"
  - "dinero rápido"
  - Otras promesas ilegales que violen regulaciones marítimas

### Control de Acceso
- Solo administradores pueden crear, editar o eliminar contenido
- Los usuarios regulares solo pueden ver el contenido
- Todos los cambios quedan registrados en el audit log

### Validación de Datos
- Todos los inputs se validan con Zod
- Los campos requeridos son obligatorios
- Los tipos de datos se verifican antes de guardar

## Panel de Administración

### Acceso
- URL: `/admin`
- Requiere autenticación como administrador
- Redirige automáticamente si no tienes permisos

### Interfaz
El panel muestra:
- Dashboard con estadísticas
- Acceso a cada sección de contenido
- Botones para crear, editar y eliminar elementos
- Historial de cambios (audit log)

## Ejemplos de Uso

### Crear un área de trabajo
```typescript
const result = await trpc.cms.workAreas.create({
  name: "Housekeeping",
  description: "Mantenimiento y limpieza de camarotes",
  functions: JSON.stringify([
    "Limpiar camarotes",
    "Mantener áreas comunes",
    "Reportar daños"
  ]),
  requirements: JSON.stringify([
    "Experiencia en limpieza",
    "Buena condición física"
  ]),
  entryLevel: "entry-level",
  order: 1
});
```

### Actualizar un requisito
```typescript
const result = await trpc.cms.requirements.update({
  id: 5,
  data: {
    description: "Certificado STCW actualizado (válido por 5 años)"
  }
});
```

### Obtener salarios por departamento
```typescript
const salaries = await trpc.cms.salaries.list();
const hotelSalaries = salaries.filter(s => s.department === "Hotel");
```

## Testing

El CMS incluye tests completos en `server/routers/cms.test.ts`:

```bash
pnpm test
```

Los tests cubren:
- Listado de contenido (protegido)
- Creación de elementos (solo admin)
- Actualización de elementos (solo admin)
- Eliminación de elementos (soft delete)
- Control de acceso (FORBIDDEN para no-admin)
- Validación de datos

## Próximas Mejoras

1. **Interfaz visual mejorada**: Crear componentes React para cada sección
2. **Editor de contenido enriquecido**: Soporte para Markdown o WYSIWYG
3. **Búsqueda y filtrado**: Búsqueda avanzada en todas las secciones
4. **Versionado**: Historial completo de cambios con rollback
5. **Exportación**: Exportar contenido a JSON/CSV
6. **Importación**: Importar contenido desde archivos
7. **Notificaciones**: Alertas cuando se realicen cambios importantes
8. **Validación de frases**: Sistema mejorado de detección de contenido prohibido

## Soporte

Para reportar problemas o sugerir mejoras, contacta al equipo de desarrollo de Dockly.

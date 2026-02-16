# Guía de Despliegue en Railway

## Requisitos Previos

1. Cuenta en [Railway.app](https://railway.app)
2. GitHub conectado a tu cuenta de Railway
3. Variables de entorno configuradas

## Pasos para Desplegar

### 1. Conectar GitHub a Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub"
4. Autoriza Railway a acceder a tu repositorio
5. Selecciona el repositorio `dockly`

### 2. Configurar Variables de Entorno

En el dashboard de Railway, ve a "Variables" y agrega:

```
DATABASE_URL=mysql://user:password@host:port/dockly
JWT_SECRET=tu_jwt_secret_aqui
VITE_APP_ID=tu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_OPEN_ID=tu_owner_open_id
OWNER_NAME=Tu Nombre
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=tu_api_key
VITE_FRONTEND_FORGE_API_KEY=tu_frontend_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_ANALYTICS_ENDPOINT=tu_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=tu_website_id
VITE_APP_TITLE=Dockly
VITE_APP_LOGO=https://tu-logo-url.com/logo.png
NODE_ENV=production
```

### 3. Agregar Base de Datos MySQL

1. En Railway, haz clic en "Add Service"
2. Selecciona "MySQL"
3. Railway creará automáticamente la variable `DATABASE_URL`
4. Ejecuta las migraciones:

```bash
pnpm db:push
```

### 4. Desplegar

1. Railway detectará automáticamente el `package.json`
2. Ejecutará `pnpm install && pnpm build`
3. Iniciará con `pnpm start`
4. Tu sitio estará disponible en la URL generada por Railway

## Variables de Entorno Críticas

### Autenticación OAuth
- `VITE_APP_ID`: ID de aplicación Manus
- `OAUTH_SERVER_URL`: Servidor OAuth de Manus
- `VITE_OAUTH_PORTAL_URL`: Portal de login de Manus
- `JWT_SECRET`: Clave para firmar sesiones

### Base de Datos
- `DATABASE_URL`: Conexión MySQL (Railway la proporciona)

### APIs Internas
- `BUILT_IN_FORGE_API_URL`: URL de APIs internas de Manus
- `BUILT_IN_FORGE_API_KEY`: Clave de API para servidor
- `VITE_FRONTEND_FORGE_API_KEY`: Clave de API para cliente

### Información del Propietario
- `OWNER_OPEN_ID`: OpenID del administrador
- `OWNER_NAME`: Nombre del administrador

## Monitoreo y Logs

1. En Railway, ve a "Deployments"
2. Haz clic en el deployment activo
3. Ve a "Logs" para ver la salida del servidor
4. Busca errores de conexión a base de datos o OAuth

## Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté correctamente configurada
- Asegúrate de que la base de datos MySQL está activa en Railway
- Ejecuta `pnpm db:push` para crear las tablas

### Error: "OAuth callback failed"
- Verifica que `VITE_APP_ID` y `OAUTH_SERVER_URL` sean correctos
- Asegúrate de que la URL de callback esté registrada en Manus
- Comprueba que `JWT_SECRET` no esté vacío

### Error: "Port already in use"
- Railway asigna automáticamente el puerto
- Asegúrate de no hardcodear puertos en el código
- El servidor debe escuchar en `process.env.PORT || 3000`

## Actualizaciones Futuras

Cada vez que hagas push a GitHub:
1. Railway detectará automáticamente los cambios
2. Ejecutará el build nuevamente
3. Desplegará la nueva versión

Para hacer push desde el sandbox:
```bash
cd /home/ubuntu/dockly
git add .
git commit -m "tu mensaje"
git push origin main
```

## Dominios Personalizados

Para agregar un dominio personalizado en Railway:
1. Ve a "Settings" en tu proyecto
2. Haz clic en "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones de DNS

## Soporte

- [Documentación de Railway](https://docs.railway.app)
- [Comunidad de Railway](https://railway.app/community)
- [Manus Support](https://help.manus.im)

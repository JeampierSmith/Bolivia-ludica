# Bolivia Lúdica

Aplicación web para la comunidad de juegos de mesa en Bolivia.

## Requisitos
- Node.js >= 16
- npm >= 8
- (Opcional) Docker y Docker Compose

## Instalación y ejecución local

1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia la app en modo desarrollo:
   ```sh
   npm run dev
   ```
3. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## Construcción para producción

1. Genera los archivos estáticos:
   ```sh
   npm run build
   ```
2. Sirve la carpeta `dist` con tu servidor favorito o usa:
   ```sh
   npm run preview
   ```

## Ejecución con Docker

1. Asegúrate de tener Docker Desktop instalado y en ejecución.
2. Construye y levanta el contenedor:
   ```sh
   docker-compose up --build
   ```
3. Abre tu navegador en [http://localhost:8080](http://localhost:8080)

## Archivos importantes
- `Dockerfile`: Construye la imagen de la app y la sirve con nginx.
- `docker-compose.yml`: Facilita el despliegue con un solo comando.
- `.dockerignore`: Evita copiar archivos innecesarios al contenedor.
- `nginx.conf`: Configuración para servir la app como SPA.



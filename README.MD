# Bolivia Lúdica - Deploy con Docker

Aplicación web para la comunidad de juegos de mesa en Bolivia.
Incluye:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express + MongoDB

---

## Requisitos
- Docker y Docker Compose
- (Para desarrollo local: Node.js >= 16, npm >= 8)

---

## Estructura del proyecto
```
/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── docker-compose.yml
├── Dockerfile (solo frontend)
└── README.MD
```

---

## Variables de entorno necesarias

### Backend (`backend/.env`)
```
MONGO_URI=mongodb://mongo:27017/bolivialudica
PORT=3000
```
- Cambia `MONGO_URI` según tu entorno. Si usas Docker Compose, usa el nombre del servicio `mongo`.

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:3000/api
VITE_UPLOADS_URL=http://localhost:3000
```
- Ajusta las URLs según el entorno y los puertos expuestos.

---

## Ejecución con Docker Compose (Frontend + Backend + MongoDB)

1. Crea los archivos `.env` en `backend/` y `frontend/` como se indica arriba.
2. Ejecuta:
   ```sh
   docker-compose up --build
   ```
3. Accede a:
   - Frontend: [http://localhost:8080](http://localhost:8080)
   - Backend API: [http://localhost:3000/api](http://localhost:3000/api)
   - MongoDB: puerto 27017 (opcional, para administración)

---

## Desarrollo local (sin Docker)

### Backend
```sh
cd backend
npm install
npm start
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```

---

## Notas
- Los archivos subidos (imágenes) se guardan en `backend/uploads`.
- El frontend se sirve en producción con nginx (ver Dockerfile).
- Puedes personalizar los puertos en los archivos `.env` y `docker-compose.yml`.

---

## Créditos
Desarrollado por la comunidad Bolivia Lúdica.

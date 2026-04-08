# Usamos la versión 22 de Node (la que te salvó la vida en las pruebas)
FROM node:22-alpine AS builder

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos todo
RUN npm install

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# --- Segunda etapa: Imagen limpia para producción ---
FROM node:22-alpine

WORKDIR /app

# Solo copiamos lo necesario para correr, ahorrando espacio
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "start:prod"]
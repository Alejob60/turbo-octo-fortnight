# Etapa de construcción
FROM node:24-alpine AS builder

WORKDIR /app

# Copiar archivos de configuración primero para aprovechar caché
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:24-alpine AS runner

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos (si existen)
RUN if [ -d "/app/public" ]; then cp -r /app/public ./; fi

# Configurar permisos para .next
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar build de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Puerto expuesto
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando de inicio
CMD ["node", "server.js"]
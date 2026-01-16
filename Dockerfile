# ESTÁGIO 1: Compilação
FROM node:18-alpine AS builder

# Instala ferramentas necessárias para minificação de imagens (imagemin)
RUN apk add --no-cache autoconf automake libtool make g++ zlib-dev libpng-dev nasm

WORKDIR /app

# Copia apenas os arquivos de pacotes primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos (incluindo a pasta build-website)
COPY . .

# Roda o comando Gulp que você definiu (clean -> copy -> build)
RUN npm run build

# ESTÁGIO 2: Servidor Web Leve
FROM nginx:stable-alpine

# Copia a pasta 'dist' que o Gulp gerou no estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80 para o tráfego web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
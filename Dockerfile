# 1. Node.js 환경에서 빌드
FROM node:18 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# 빌드된 정적 파일을 호스트 서버의 `/var/www/html`로 복사
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/dist /var/www/html
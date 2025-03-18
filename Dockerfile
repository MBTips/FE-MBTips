# 1. Node.js 환경에서 빌드
FROM node:18 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# 2️⃣ Production 단계 (Nginx를 사용해 정적 파일 서빙)
FROM nginx:1.23-alpine
COPY --from=build /app/build /usr/share/nginx/html

# 🚀 컨테이너를 계속 유지하도록 추가
CMD ["nginx", "-g", "daemon off;"]
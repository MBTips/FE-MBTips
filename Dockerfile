# 1. Node.js 환경에서 빌드
FROM node:18 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

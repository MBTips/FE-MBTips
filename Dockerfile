# 1. Node.js 환경에서 빌드
FROM node:20-alpine
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

# 🚀 컨테이너를 계속 유지하도록 추가
CMD ["npm", "start"]
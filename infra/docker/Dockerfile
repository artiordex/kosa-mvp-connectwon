FROM node:20-alpine

WORKDIR /app

# 루트의 package.json과 pnpm-lock.yaml 복사
COPY ../../package.json ../../pnpm-lock.yaml ./

# pnpm 설치
RUN npm install -g pnpm

# 종속성 설치 (루트 기준)
RUN pnpm install

# 각각의 앱 소스 복사 (context 기준 상대 경로)
COPY . .

# 빌드
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]

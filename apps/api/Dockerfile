# API 서버용 Docker 이미지 빌드 파일
# Express.js 기반 Node.js 백엔드 서버

# 빌드 스테이지 - 소스코드 빌드 및 의존성 설치
FROM node:20-slim AS build
WORKDIR /app

# pnpm 패키지 매니저 활성화 (최신 버전 사용)
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# 의존성 파일만 먼저 복사 (Docker 레이어 캐싱 최적화)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json packages/*/
COPY apps/api/package.json apps/api/

# 의존성 설치 (lock 파일 기반 정확한 버전)
RUN pnpm install --frozen-lockfile

# 전체 소스코드 복사
COPY . .

# API 서버 빌드 (TypeScript → JavaScript 컴파일)
RUN pnpm --filter @connectwon/api build

# 프로덕션 스테이지 - 실행 환경만 포함
FROM node:20-slim AS production
WORKDIR /app

# 프로덕션 환경 변수 설정
ENV NODE_ENV=production

# 빌드된 결과물과 필요한 파일만 복사
COPY --from=build /app/apps/api/dist ./
COPY --from=build /app/apps/api/package.json ./
COPY --from=build /app/node_modules ./node_modules

# API 서버 포트 노출
EXPOSE 8000

# 컨테이너 시작 시 API 서버 실행
CMD ["node", "app.js"]

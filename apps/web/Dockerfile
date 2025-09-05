# 웹 프론트엔드용 Docker 이미지 빌드 파일
# Next.js 기반 React 웹 애플리케이션

# 빌드 스테이지 - Next.js 애플리케이션 빌드
FROM node:20-slim AS build
WORKDIR /app

# pnpm 패키지 매니저 활성화
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# 의존성 파일만 먼저 복사 (캐싱 최적화)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json packages/*/
COPY apps/web/package.json apps/web/

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스코드 복사
COPY . .

# Next.js 웹 애플리케이션 빌드 (정적 파일 생성)
RUN pnpm --filter @connectwon/web build

# 프로덕션 스테이지 - Next.js standalone 모드 실행
FROM node:20-slim AS production
WORKDIR /app

# 프로덕션 환경 변수 설정
ENV NODE_ENV=production

# Next.js standalone 빌드 결과물 복사
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./.next/static
COPY --from=build /app/apps/web/public ./public

# 웹 서버 포트 노출
EXPOSE 3000

# 컨테이너 시작 시 Next.js 서버 실행
CMD ["node", "server.js"]

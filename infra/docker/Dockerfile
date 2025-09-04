FROM node:20-slim AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

# 의존성 파일들 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json packages/*/
COPY apps/*/package.json apps/*/

# 전체 설치
ENV NODE_ENV=development
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store \
    pnpm install --no-frozen-lockfile

# 소스 복사
COPY . .

# 전체 빌드 (nx 사용)
RUN pnpm build

FROM node:20-slim AS runtime
WORKDIR /app
ARG APP_DIR

# 런타임 의존성만 설치
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && \
    pnpm install --prod --no-frozen-lockfile

# 빌드 결과만 복사
COPY --from=build /app/dist/${APP_DIR} ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]

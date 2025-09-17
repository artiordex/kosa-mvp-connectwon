```
kosa-mvp-connectwon
├─ .changeset
│  ├─ config.json
│  └─ README.md
├─ .cz-config.cjs
├─ .eslintignore
├─ .eslintrc.json
├─ .husky
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .prettierrc.json
├─ apps
│  ├─ admin
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  └─ app
│  │  │     ├─ (auth)
│  │  │     │  └─ login
│  │  │     │     └─ page.tsx
│  │  │     ├─ dashboard
│  │  │     │  └─ page.tsx
│  │  │     ├─ error.tsx
│  │  │     ├─ loading.tsx
│  │  │     ├─ page.tsx
│  │  │     ├─ programs
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ [id]
│  │  │     │     ├─ edit
│  │  │     │     └─ sessions
│  │  │     ├─ reservation
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ [id]
│  │  │     ├─ users
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ [id]
│  │  │     │     └─ edit
│  │  │     └─ venues
│  │  │        ├─ page.tsx
│  │  │        └─ [id]
│  │  │           ├─ edit
│  │  │           └─ rooms
│  │  │              └─ [roomId]
│  │  ├─ tailwind.config.ts
│  │  └─ tsconfig.json
│  ├─ api
│  │  ├─ ecosystem.config.js
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ app.module.ts
│  │  │  ├─ main.ts
│  │  │  └─ modules
│  │  │     ├─ ai
│  │  │     │  ├─ controller.ts
│  │  │     │  ├─ module.ts
│  │  │     │  ├─ processor.ts
│  │  │     │  └─ service.ts
│  │  │     ├─ auth
│  │  │     │  ├─ controller.ts
│  │  │     │  ├─ module.ts
│  │  │     │  ├─ processor.ts
│  │  │     │  └─ service.ts
│  │  │     ├─ index.ts
│  │  │     ├─ payments
│  │  │     │  ├─ controller.ts
│  │  │     │  ├─ module.ts
│  │  │     │  ├─ processor.ts
│  │  │     │  └─ service.ts
│  │  │     ├─ programs
│  │  │     │  ├─ controller.ts
│  │  │     │  ├─ module.ts
│  │  │     │  ├─ processor.ts
│  │  │     │  └─ service.ts
│  │  │     ├─ reservations
│  │  │     │  ├─ controller.ts
│  │  │     │  ├─ module.ts
│  │  │     │  ├─ processor.ts
│  │  │     │  └─ service.ts
│  │  │     ├─ users
│  │  │     │  ├─ controller.ts
│  │  │     │  ├─ module.ts
│  │  │     │  ├─ processor.ts
│  │  │     │  └─ service.ts
│  │  │     └─ venues
│  │  │        ├─ controller.ts
│  │  │        ├─ module.ts
│  │  │        ├─ processor.ts
│  │  │        └─ service.ts
│  │  └─ tsconfig.json
│  ├─ e2e
│  │  ├─ actions
│  │  │  ├─ BaseActions.ts
│  │  │  ├─ JsForceActions.ts
│  │  │  └─ WebActions.ts
│  │  ├─ e2e-types.ts
│  │  ├─ GlobalSetup.ts
│  │  ├─ GlobalTeardown.ts
│  │  ├─ locators
│  │  │  └─ locator.ts
│  │  ├─ package.json
│  │  ├─ playwright.config.ts
│  │  ├─ project.json
│  │  ├─ test-results
│  │  ├─ tests
│  │  │  ├─ admin
│  │  │  │  └─ dashboard.spec.ts
│  │  │  ├─ api
│  │  │  │  └─ health.spec.ts
│  │  │  ├─ auth
│  │  │  │  └─ login.spec.ts
│  │  │  └─ user
│  │  │     └─ reservation.spec.ts
│  │  └─ tsconfig.json
│  ├─ web
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  └─ app
│  │  │     ├─ (auth)
│  │  │     │  ├─ login
│  │  │     │  │  └─ page.tsx
│  │  │     │  └─ signup
│  │  │     │     └─ page.tsx
│  │  │     ├─ (marketing)
│  │  │     │  └─ page.tsx
│  │  │     ├─ api
│  │  │     │  ├─ auth
│  │  │     │  ├─ proxy
│  │  │     │  │  └─ [...path]
│  │  │     │  └─ webhooks
│  │  │     │     └─ stripe
│  │  │     ├─ mypage
│  │  │     │  ├─ page.tsx
│  │  │     │  ├─ points
│  │  │     │  │  └─ page.tsx
│  │  │     │  ├─ profile
│  │  │     │  │  └─ page.tsx
│  │  │     │  └─ reservation
│  │  │     │     └─ page.tsx
│  │  │     ├─ page.tsx
│  │  │     ├─ programs
│  │  │     │  ├─ loading.tsx
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ [id]
│  │  │     │     └─ page.tsx
│  │  │     ├─ reservation
│  │  │     │  ├─ success
│  │  │     │  │  └─ page.tsx
│  │  │     │  └─ [id]
│  │  │     │     └─ page.tsx
│  │  │     ├─ users
│  │  │     │  └─ page.tsx
│  │  │     └─ venues
│  │  │        ├─ page.tsx
│  │  │        └─ [id]
│  │  │           └─ page.tsx
│  │  ├─ tailwind.config.ts
│  │  ├─ tsconfig.json
│  │  └─ web-types.ts
│  └─ worker
│     ├─ package.json
│     ├─ project.json
│     ├─ src
│     │  ├─ main.ts
│     │  ├─ processors
│     │  │  ├─ notification.ts
│     │  │  └─ reservation.ts
│     │  └─ schedules
│     │     └─ nightly.ts
│     └─ tsconfig.json
├─ connectwon-env.ts
├─ docs
│  ├─ 01_프로젝트소개.md
│  ├─ 02_비즈니스모델.md
│  ├─ 03_서비스플로우.md
│  ├─ 04_도메인정의.md
│  ├─ 05_기술스택개요.md
│  ├─ 06_모노레포구조.md
│  ├─ 07_전체아키텍처.md
│  ├─ 08_도메인모듈패턴.md
│  ├─ 09_데이터베이스설계.md
│  ├─ 10_개발환경설정.md
│  ├─ 11_코딩컨벤션.md
│  ├─ 12_Git워크플로우.md
│  ├─ 13_AI_API통합가이드.md
│  ├─ 14_AI_서비스플로우.md
│  ├─ 15_REST_API문서.md
│  ├─ 16_인증권한.md
│  ├─ 17_배포가이드.md
│  ├─ 18_기술스택가이드.md
│  ├─ 19_트러블슈팅건.md
│  └─ 20_참고자료.md
├─ infra
│  ├─ database
│  │  ├─ conf
│  │  │  ├─ pg_hba.conf
│  │  │  └─ postgresql.conf
│  │  └─ init
│  │     ├─ 00-extensions.sql
│  │     ├─ 20-ddl.sql
│  │     ├─ 30-seed.sql
│  │     └─ 99-final-setup.sql
│  ├─ docker
│  │  ├─ .dockerignore
│  │  ├─ docker-compose.yml
│  │  ├─ Dockerfile.admin
│  │  ├─ Dockerfile.api
│  │  ├─ Dockerfile.db
│  │  ├─ Dockerfile.e2e
│  │  ├─ Dockerfile.web
│  │  ├─ Dockerfile.worker
│  │  └─ nginx.conf
│  ├─ infra-types.ts
│  ├─ k8s
│  │  ├─ app.yml
│  │  └─ argocd-app.yml
│  ├─ monitoring
│  │  ├─ alerts.yml
│  │  ├─ dashboards.json
│  │  ├─ grafana.ini
│  │  └─ prometheus.yml
│  └─ n8n
│     ├─ package.json
│     ├─ project.json
│     ├─ scripts
│     │  ├─ build.sh
│     │  ├─ cleanup.sh
│     │  ├─ deploy.sh
│     │  └─ setup.sh
│     └─ workflows
│        └─ exported
├─ LICENSE
├─ nx.json
├─ package.json
├─ packages
│  ├─ api-contract
│  │  ├─ api-contract-types.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ client.ts
│  │  │  ├─ contracts
│  │  │  │  ├─ ai.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ participants.ts
│  │  │  │  ├─ payments.ts
│  │  │  │  ├─ programs.ts
│  │  │  │  ├─ reservation.ts
│  │  │  │  ├─ sessions.ts
│  │  │  │  ├─ users.ts
│  │  │  │  └─ venues.ts
│  │  │  ├─ openapi
│  │  │  │  ├─ document.ts
│  │  │  │  ├─ emit.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ registry.ts
│  │  │  │  └─ setup.ts
│  │  │  └─ schemas
│  │  │     ├─ ai.ts
│  │  │     ├─ api.ts
│  │  │     ├─ auth.ts
│  │  │     ├─ common.ts
│  │  │     ├─ index.ts
│  │  │     ├─ payments.ts
│  │  │     ├─ programs.ts
│  │  │     ├─ reservations.ts
│  │  │     ├─ session.ts
│  │  │     ├─ users.ts
│  │  │     └─ venues.ts
│  │  └─ tsconfig.json
│  ├─ client
│  │  ├─ client-types.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ hooks
│  │  │  │  └─ useAuth.ts
│  │  │  ├─ index.ts
│  │  │  └─ providers
│  │  │     ├─ AuthProvider.tsx
│  │  │     └─ QueryProvider.tsx
│  │  └─ tsconfig.json
│  ├─ configs
│  │  ├─ eslint
│  │  │  └─ base.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ tailwind
│  │  │  ├─ admin.ts
│  │  │  ├─ base.ts
│  │  │  └─ web.ts
│  │  ├─ testing
│  │  │  ├─ playwright.ts
│  │  │  └─ vitest.ts
│  │  ├─ tsconfig.json
│  │  └─ typescript
│  │     ├─ base.json
│  │     ├─ node.json
│  │     └─ web.json
│  ├─ core
│  │  ├─ core-types.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ adapters
│  │  │  │  ├─ ai
│  │  │  │  │  ├─ anthropic.ts
│  │  │  │  │  ├─ huggingface.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ openai.ts
│  │  │  │  └─ notification
│  │  │  │     ├─ email.ts
│  │  │  │     ├─ factory.ts
│  │  │  │     ├─ index.ts
│  │  │  │     └─ slack.ts
│  │  │  ├─ application
│  │  │  │  ├─ application.module.ts
│  │  │  │  ├─ guards
│  │  │  │  │  └─ require-role.ts
│  │  │  │  ├─ policies
│  │  │  │  │  ├─ overbooking.ts
│  │  │  │  │  └─ waitlist.ts
│  │  │  │  └─ usecases
│  │  │  │     ├─ program.ts
│  │  │  │     ├─ reservation.ts
│  │  │  │     └─ schedule.ts
│  │  │  ├─ domain
│  │  │  │  └─ value-objects.ts
│  │  │  ├─ infrastructure
│  │  │  │  ├─ cache.ts
│  │  │  │  ├─ clock.ts
│  │  │  │  ├─ db.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ payments.ts
│  │  │  │  └─ search.ts
│  │  │  ├─ ports
│  │  │  │  ├─ ai.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ cache.ts
│  │  │  │  ├─ db.ts
│  │  │  │  ├─ email.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ notification.ts
│  │  │  │  ├─ program.ts
│  │  │  │  ├─ room.ts
│  │  │  │  ├─ session.ts
│  │  │  │  ├─ slack.ts
│  │  │  │  ├─ time.ts
│  │  │  │  ├─ user.ts
│  │  │  │  └─ venue.ts
│  │  │  └─ queue
│  │  │     ├─ bull.ts
│  │  │     ├─ index.ts
│  │  │     ├─ manager.ts
│  │  │     ├─ processor.ts
│  │  │     └─ scheduler.ts
│  │  └─ tsconfig.json
│  ├─ database
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  └─ schema.prisma
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ client.ts
│  │  │  ├─ index.ts
│  │  │  └─ utils.ts
│  │  ├─ test-smoke.ts
│  │  └─ tsconfig.json
│  ├─ logger
│  │  ├─ logger-types.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ logger.ts
│  │  │  └─ transports
│  │  │     ├─ console.ts
│  │  │     ├─ file.ts
│  │  │     ├─ http.ts
│  │  │     ├─ index.ts
│  │  │     ├─ pretty.ts
│  │  │     └─ slack.ts
│  │  └─ tsconfig.json
│  ├─ sdk
│  │  ├─ package.json
│  │  ├─ sdk-types.ts
│  │  ├─ src
│  │  │  ├─ auth.ts
│  │  │  ├─ errors.ts
│  │  │  ├─ http.ts
│  │  │  ├─ index.ts
│  │  │  ├─ middleware.ts
│  │  │  ├─ pagination.ts
│  │  │  └─ tracing.ts
│  │  └─ tsconfig.json
│  ├─ server
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ server-types.ts
│  │  ├─ src
│  │  │  ├─ decorators
│  │  │  │  ├─ api-response.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ permissions.ts
│  │  │  │  ├─ program.ts
│  │  │  │  └─ public.ts
│  │  │  ├─ guards
│  │  │  │  └─ auth.guard.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ response.interceptor.ts
│  │  │  ├─ middleware
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ cookies.ts
│  │  │  │  ├─ error.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ validation.ts
│  │  │  ├─ pipes
│  │  │  │  └─ validation.pipe.ts
│  │  │  ├─ plugins
│  │  │  │  ├─ swagger.ts
│  │  │  │  └─ validation.ts
│  │  │  └─ rsc-cache.ts
│  │  └─ tsconfig.json
│  └─ ui
│     ├─ package.json
│     ├─ project.json
│     ├─ public
│     │  ├─ favicon
│     │  │  ├─ android-chrome-192x192.png
│     │  │  ├─ android-chrome-512x512.png
│     │  │  ├─ apple-touch-icon.png
│     │  │  ├─ favicon-16x16.png
│     │  │  ├─ favicon-32x32.png
│     │  │  ├─ favicon.ico
│     │  │  └─ site.webmanifest
│     │  ├─ fonts
│     │  ├─ icons
│     │  └─ images
│     │     ├─ arti.png
│     │     └─ artiordex.png
│     ├─ src
│     │  ├─ animations
│     │  │  ├─ Animation.tsx
│     │  │  ├─ index.ts
│     │  │  └─ tailwind-animations.ts
│     │  ├─ charts
│     │  │  ├─ AreaChart.tsx
│     │  │  ├─ BarChart.tsx
│     │  │  ├─ DonutChart.tsx
│     │  │  ├─ FunnelChart.tsx
│     │  │  ├─ GaugeChart.tsx
│     │  │  ├─ index.ts
│     │  │  ├─ LineChart.tsx
│     │  │  ├─ PieChart.tsx
│     │  │  ├─ ProgressChart.tsx
│     │  │  ├─ SparklineChart.tsx
│     │  │  └─ WaterfallChart.tsx
│     │  ├─ components
│     │  │  ├─ Button.tsx
│     │  │  ├─ Card.tsx
│     │  │  ├─ Checkbox.tsx
│     │  │  ├─ Container.tsx
│     │  │  ├─ Divider.tsx
│     │  │  ├─ Drawer.tsx
│     │  │  ├─ EmptyState.tsx
│     │  │  ├─ ErrorPage.tsx
│     │  │  ├─ Field.tsx
│     │  │  ├─ Form.tsx
│     │  │  ├─ Grid.tsx
│     │  │  ├─ index.ts
│     │  │  ├─ Input.tsx
│     │  │  ├─ LoadingPage.tsx
│     │  │  ├─ LoadingSpinner.tsx
│     │  │  ├─ Modal.tsx
│     │  │  ├─ PageHeader.tsx
│     │  │  ├─ RadioGroup.tsx
│     │  │  ├─ Section.tsx
│     │  │  ├─ Select.tsx
│     │  │  ├─ Stack.tsx
│     │  │  ├─ Textarea.tsx
│     │  │  └─ Toolbar.tsx
│     │  ├─ hooks
│     │  │  ├─ index.ts
│     │  │  ├─ useBoolean.ts
│     │  │  ├─ useDebounce.ts
│     │  │  ├─ useDisclosure.ts
│     │  │  ├─ useEventListener.ts
│     │  │  ├─ useIsMounted.ts
│     │  │  ├─ useMediaQuery.ts
│     │  │  ├─ useOnClickOutside.ts
│     │  │  └─ useThrottle.ts
│     │  ├─ lib
│     │  ├─ public
│     │  │  ├─ icons
│     │  │  └─ images
│     │  ├─ styles
│     │  │  ├─ animations.css
│     │  │  └─ customs.css
│     │  └─ templates
│     │     ├─ error.tsx
│     │     ├─ index.ts
│     │     └─ loading.tsx
│     ├─ tailwind.config.ts
│     ├─ tsconfig.json
│     └─ ui-types.ts
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ PROJECT-ARCH.md
├─ README.md
├─ setup-structure.ps1
├─ test
│  └─ setup.ts
├─ tools
│  ├─ services
│  │  └─ webhook-catcher.ts
│  ├─ testkit
│  │  └─ test-artifacts.ts
│  ├─ tool-types.ts
│  └─ utils
│     └─ assert.ts
├─ tsconfig.base.json
├─ tsconfig.json
└─ vitest.config.ts
```

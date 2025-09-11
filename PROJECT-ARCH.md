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
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ bookings
│  │  │  │  │  ├─ components
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ components
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ programs
│  │  │  │  │  ├─ components
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ edit
│  │  │  │  │     └─ sessions
│  │  │  │  ├─ settings
│  │  │  │  │  ├─ ai
│  │  │  │  │  ├─ notifications
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ payments
│  │  │  │  ├─ users
│  │  │  │  │  ├─ components
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ edit
│  │  │  │  └─ venues
│  │  │  │     ├─ components
│  │  │  │     ├─ page.tsx
│  │  │  │     └─ [id]
│  │  │  │        ├─ edit
│  │  │  │        └─ rooms
│  │  │  │           └─ [roomId]
│  │  │  ├─ hooks
│  │  │  │  └─ page.tsx
│  │  │  └─ lib
│  │  ├─ tailwind.config.ts
│  │  └─ tsconfig.json
│  ├─ api
│  │  ├─ database.ts
│  │  ├─ ecosystem.config.js
│  │  ├─ main.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ app.module.ts
│  │  │  ├─ app.ts
│  │  │  ├─ common
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  ├─ current-user.decorator.ts
│  │  │  │  ├─ http-exception.filter.ts
│  │  │  │  ├─ response.interceptor.ts
│  │  │  │  └─ validation.pipe.ts
│  │  │  ├─ jobs
│  │  │  │  └─ reservation.processor.ts
│  │  │  ├─ middleware
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ error.ts
│  │  │  │  ├─ logger.middleware.ts
│  │  │  │  └─ validation.ts
│  │  │  ├─ modules
│  │  │  │  ├─ admin
│  │  │  │  ├─ admin.ts
│  │  │  │  ├─ ai
│  │  │  │  ├─ ai.ts
│  │  │  │  ├─ auth
│  │  │  │  ├─ bookings
│  │  │  │  ├─ bookings.ts
│  │  │  │  ├─ payments
│  │  │  │  ├─ payments.ts
│  │  │  │  ├─ programs
│  │  │  │  │  └─ [id]
│  │  │  │  ├─ programs.ts
│  │  │  │  ├─ redis.ts
│  │  │  │  ├─ sessions.ts
│  │  │  │  ├─ users
│  │  │  │  ├─ users.ts
│  │  │  │  ├─ venues
│  │  │  │  │  └─ [id]
│  │  │  │  └─ venues.ts
│  │  │  ├─ plugins
│  │  │  ├─ server.ts
│  │  │  └─ services
│  │  │     ├─ email.ts
│  │  │     ├─ payment.ts
│  │  │     └─ reservation.ts
│  │  └─ tsconfig.json
│  ├─ e2e
│  │  ├─ actions
│  │  │  ├─ BaseActions.ts
│  │  │  ├─ JsForceActions.ts
│  │  │  └─ WebActions.ts
│  │  ├─ config
│  │  │  └─ baseConfig.ts
│  │  ├─ globalSetup.ts
│  │  ├─ globalTeardown.ts
│  │  ├─ locators
│  │  │  └─ locator.ts
│  │  ├─ package.json
│  │  ├─ platform-types.ts
│  │  ├─ playwright-types.ts
│  │  ├─ playwright.config.ts
│  │  ├─ project.json
│  │  ├─ test-context.ts
│  │  ├─ tests
│  │  │  ├─ admin
│  │  │  │  └─ dashboard.spec.ts
│  │  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ login.spec.ts
│  │  │  └─ user
│  │  │     └─ booking-flow.spec.ts
│  │  └─ tsconfig.json
│  └─ web
│     ├─ next.config.mjs
│     ├─ package.json
│     ├─ project.json
│     ├─ public
│     │  ├─ icons
│     │  └─ images
│     ├─ src
│     │  ├─ app
│     │  │  ├─ (auth)
│     │  │  │  ├─ login
│     │  │  │  │  └─ page.tsx
│     │  │  │  └─ signup
│     │  │  │     └─ page.tsx
│     │  │  ├─ api
│     │  │  │  ├─ auth
│     │  │  │  ├─ proxy
│     │  │  │  │  └─ [...path]
│     │  │  │  └─ webhooks
│     │  │  │     └─ stripe
│     │  │  ├─ booking
│     │  │  │  ├─ page.tsx
│     │  │  │  ├─ success
│     │  │  │  │  └─ page.tsx
│     │  │  │  └─ [id]
│     │  │  │     └─ page.tsx
│     │  │  ├─ bookings
│     │  │  ├─ dashboard
│     │  │  ├─ error.tsx
│     │  │  ├─ globals.css
│     │  │  ├─ loading.tsx
│     │  │  ├─ mypage
│     │  │  │  ├─ bookings
│     │  │  │  │  └─ page.tsx
│     │  │  │  ├─ page.tsx
│     │  │  │  ├─ points
│     │  │  │  │  └─ page.tsx
│     │  │  │  └─ profile
│     │  │  │     └─ page.tsx
│     │  │  ├─ not-found.tsx
│     │  │  ├─ page.tsx
│     │  │  ├─ programs
│     │  │  │  ├─ loading.tsx
│     │  │  │  ├─ page.tsx
│     │  │  │  └─ [id]
│     │  │  │     └─ page.tsx
│     │  │  ├─ settings
│     │  │  ├─ users
│     │  │  └─ venues
│     │  │     ├─ page.tsx
│     │  │     └─ [id]
│     │  │        └─ page.tsx
│     │  ├─ hooks
│     │  ├─ lib
│     │  └─ types
│     │     └─ ui.ts
│     ├─ tailwind.config.ts
│     └─ tsconfig.json
├─ clean.tree
├─ connectwon-env.ts
├─ docs
│  ├─ api
│  │  └─ README.md
│  ├─ deployment
│  │  └─ README.md
│  ├─ development
│  │  └─ setup.md
│  └─ README.md
├─ folders-only.tree
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
│  │  ├─ Dockerfile.web
│  │  └─ nginx.conf
│  ├─ infra-types.ts
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
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ client.ts
│  │  │  ├─ index.ts
│  │  │  ├─ openapi
│  │  │  └─ schemas
│  │  │     ├─ api.ts
│  │  │     ├─ auth.ts
│  │  │     ├─ bookings.ts
│  │  │     ├─ common.ts
│  │  │     ├─ payments.ts
│  │  │     ├─ programs.ts
│  │  │     ├─ users.ts
│  │  │     └─ venues.ts
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
│  │  ├─ tsconfig.json
│  │  └─ typescript
│  │     └─ base.json
│  ├─ core
│  │  ├─ notification-types.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ ai
│  │  │  │  ├─ anthropic.ts
│  │  │  │  ├─ huggingface.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ openai.ts
│  │  │  ├─ domain
│  │  │  │  ├─ authz
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ booking
│  │  │  │  ├─ payment
│  │  │  │  ├─ user
│  │  │  │  └─ venue
│  │  │  ├─ notifications
│  │  │  │  ├─ email
│  │  │  │  │  ├─ project.json
│  │  │  │  │  ├─ src
│  │  │  │  │  │  ├─ index.ts
│  │  │  │  │  │  ├─ services
│  │  │  │  │  │  ├─ templates
│  │  │  │  │  │  └─ utils
│  │  │  │  │  └─ tsconfig.json
│  │  │  │  └─ slack
│  │  │  ├─ queue
│  │  │  ├─ services
│  │  │  └─ utils
│  │  │     └─ assertUtils.ts
│  │  └─ tsconfig.json
│  ├─ database
│  │  ├─ generated
│  │  │  ├─ default.d.ts
│  │  │  ├─ default.js
│  │  │  ├─ edge.d.ts
│  │  │  ├─ edge.js
│  │  │  ├─ index-browser.js
│  │  │  ├─ index.d.ts
│  │  │  ├─ index.js
│  │  │  ├─ package.json
│  │  │  ├─ query_engine-windows.dll.node
│  │  │  ├─ runtime
│  │  │  │  ├─ edge-esm.js
│  │  │  │  ├─ edge.js
│  │  │  │  ├─ index-browser.d.ts
│  │  │  │  ├─ index-browser.js
│  │  │  │  ├─ library.d.ts
│  │  │  │  ├─ library.js
│  │  │  │  ├─ react-native.js
│  │  │  │  └─ wasm.js
│  │  │  ├─ schema.prisma
│  │  │  ├─ wasm.d.ts
│  │  │  └─ wasm.js
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  └─ schema.prisma
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ client.ts
│  │  │  ├─ index.ts
│  │  │  └─ utils.ts
│  │  └─ tsconfig.json
│  ├─ logger
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ customLogger.ts
│  │  │  ├─ index.ts
│  │  │  └─ resultHandler.ts
│  │  └─ tsconfig.json
│  ├─ sdk
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ auth.ts
│  │  │  ├─ errors.ts
│  │  │  ├─ http.ts
│  │  │  ├─ index.ts
│  │  │  ├─ middleware.ts
│  │  │  ├─ pagination.ts
│  │  │  └─ tracing.ts
│  │  └─ tsconfig.json
│  └─ ui
│     ├─ index.ts
│     ├─ package.json
│     ├─ project.json
│     ├─ src
│     │  ├─ charts
│     │  │  ├─ AreaChart.tsx
│     │  │  ├─ BarChart.tsx
│     │  │  ├─ charts.css
│     │  │  ├─ DonutChart.tsx
│     │  │  ├─ FunnelChart.tsx
│     │  │  ├─ GaugeChart.tsx
│     │  │  ├─ LineChart.tsx
│     │  │  ├─ PieChart.tsx
│     │  │  ├─ ProgressChart.tsx
│     │  │  ├─ SparklineChart.tsx
│     │  │  └─ WaterfallChart.tsx
│     │  ├─ components
│     │  │  ├─ features
│     │  │  │  ├─ auth
│     │  │  │  ├─ booking
│     │  │  │  ├─ profile
│     │  │  │  └─ programs
│     │  │  ├─ forms
│     │  │  │  ├─ Button.tsx
│     │  │  │  ├─ Checkbox.tsx
│     │  │  │  ├─ Field.tsx
│     │  │  │  ├─ Form.tsx
│     │  │  │  ├─ Input.tsx
│     │  │  │  ├─ RadioGroup.tsx
│     │  │  │  ├─ Select.tsx
│     │  │  │  ├─ Textarea.tsx
│     │  │  │  └─ types.ts
│     │  │  └─ providers
│     │  ├─ hooks
│     │  │  ├─ useBoolean.ts
│     │  │  ├─ useDebounce.ts
│     │  │  ├─ useDisclosure.ts
│     │  │  ├─ useEventListener.ts
│     │  │  ├─ useIsMounted.ts
│     │  │  ├─ useMediaQuery.ts
│     │  │  ├─ useOnClickOutside.ts
│     │  │  └─ useThrottle.ts
│     │  ├─ styles
│     │  └─ tailwind
│     ├─ tailwind.config.ts
│     ├─ tsconfig.json
│     └─ ui-types.ts
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ project_structure.txt
├─ README.md
├─ setup-structure.ps1
├─ structure.txt
├─ tsconfig.base.json
├─ tsconfig.json
└─ vitest.config.ts

```

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
│  │  ├─ main.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ ai
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ dto.ts
│  │  │  │  ├─ module.ts
│  │  │  │  ├─ processor.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ app.module.ts
│  │  │  ├─ auth
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ dto.ts
│  │  │  │  ├─ module.ts
│  │  │  │  ├─ processor.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ guard
│  │  │  │  ├─ permissions.ts
│  │  │  │  └─ program.ts
│  │  │  ├─ payments
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ dto.ts
│  │  │  │  ├─ module.ts
│  │  │  │  ├─ processor.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ programs
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ dto.ts
│  │  │  │  ├─ module.ts
│  │  │  │  ├─ processor.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ reservation
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ dto.ts
│  │  │  │  ├─ module.ts
│  │  │  │  ├─ processor.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ users
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ dto.ts
│  │  │  │  ├─ module.ts
│  │  │  │  ├─ processor.ts
│  │  │  │  └─ service.ts
│  │  │  └─ venues
│  │  │     ├─ controller.ts
│  │  │     ├─ dto.ts
│  │  │     ├─ module.ts
│  │  │     ├─ processor.ts
│  │  │     └─ service.ts
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
│  ├─ 18_기술스택가이트.md
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
│  │  ├─ Dockerfile.web
│  │  ├─ Dockerfile.worker
│  │  └─ nginx.conf
│  ├─ infra-types.ts
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
│  │  │     ├─ api.ts
│  │  │     ├─ auth.ts
│  │  │     ├─ bookings.ts
│  │  │     ├─ common.ts
│  │  │     ├─ index.ts
│  │  │     ├─ payments.ts
│  │  │     ├─ programs.ts
│  │  │     ├─ session.ts
│  │  │     ├─ users.ts
│  │  │     └─ venues.ts
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
│  ├─ nest-kit
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ client
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ useAuth.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ providers
│  │  │  │     ├─ AuthProvider.tsx
│  │  │  │     └─ QueryProvider.tsx
│  │  │  ├─ decorators
│  │  │  │  ├─ api-response.ts
│  │  │  │  └─ public.ts
│  │  │  ├─ guards
│  │  │  │  └─ auth.guard.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ response.interceptor.ts
│  │  │  ├─ middleware
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ error.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ validation.ts
│  │  │  ├─ nest-types.ts
│  │  │  ├─ pipes
│  │  │  │  └─ validation.pipe.ts
│  │  │  ├─ plugins
│  │  │  │  ├─ swagger.ts
│  │  │  │  └─ validation.ts
│  │  │  └─ server
│  │  │     ├─ auth.ts
│  │  │     ├─ cookies.ts
│  │  │     ├─ errors.ts
│  │  │     └─ rsc-cache.ts
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
│  └─ ui
│     ├─ component-types.ts
│     ├─ hook-types.ts
│     ├─ package.json
│     ├─ project.json
│     ├─ public
│     │  ├─ animations
│     │  ├─ favicon
│     │  ├─ fonts
│     │  ├─ icons
│     │  └─ images
│     ├─ src
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

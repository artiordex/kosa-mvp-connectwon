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
│  │  ├─ database.ts
│  │  ├─ ecosystem.config.js
│  │  ├─ main.ts
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ admin.ts
│  │  │  ├─ ai
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ module.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ ai.ts
│  │  │  ├─ app.module.ts
│  │  │  ├─ app.ts
│  │  │  ├─ auth
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ module.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ jobs
│  │  │  │  └─ reservation.processor.ts
│  │  │  ├─ payments
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ module.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ programs
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ module.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ reservation
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ module.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ users
│  │  │  │  ├─ controller.ts
│  │  │  │  ├─ module.ts
│  │  │  │  └─ service.ts
│  │  │  └─ venues
│  │  │     ├─ controller.ts
│  │  │     ├─ module.ts
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
│  │  ├─ middleware
│  │  │  ├─ auth.ts
│  │  │  ├─ error.ts
│  │  │  └─ validation.ts
│  │  ├─ package.json
│  │  ├─ plugins
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
│  │  │  │  └─ current-user.decorator.ts
│  │  │  ├─ filters
│  │  │  │  └─ http-exception.filter.ts
│  │  │  ├─ guards
│  │  │  │  └─ auth.guard.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ response.interceptor.ts
│  │  │  ├─ nest-types.ts
│  │  │  ├─ next
│  │  │  ├─ pipes
│  │  │  │  └─ validation.pipe.ts
│  │  │  ├─ server
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ cookies.ts
│  │  │  │  ├─ errors.ts
│  │  │  │  └─ rsc-cache.ts
│  │  │  └─ utils
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

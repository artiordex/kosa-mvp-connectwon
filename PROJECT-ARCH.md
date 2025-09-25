```
kosa-mvp-connectwon
├─ .changeset
├─ .cz-config.cjs
├─ .dockerignore
├─ .eslintignore
├─ .eslintrc.json
├─ .hintrc
├─ .husky
├─ .pnpmrc
├─ .prettierrc.json
├─ apps
│  ├─ admin
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ public
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  └─ app
│  │  │     ├─ (auth)
│  │  │     │  └─ login
│  │  │     │     └─ page.tsx
│  │  │     ├─ api
│  │  │     │  ├─ auth
│  │  │     │  ├─ proxy
│  │  │     │  │  └─ [...path]
│  │  │     │  └─ webhooks
│  │  │     │     └─ stripe
│  │  │     ├─ dashboard
│  │  │     │  └─ page.tsx
│  │  │     ├─ error.tsx
│  │  │     ├─ loading.tsx
│  │  │     ├─ page.tsx
│  │  │     ├─ programs
│  │  │     │  ├─ page.tsx
│  │  │     │  └─ [id]
│  │  │     │     ├─ edit
│  │  │     │     │  └─ page.tsx
│  │  │     │     └─ sessions
│  │  │     │        └─ page.tsx
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
│  │  │                 └─ page.tsx
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
│  │  │  └─ WebActions.ts
│  │  ├─ e2e-types.ts
│  │  ├─ locators
│  │  │  └─ locator.ts
│  │  ├─ package.json
│  │  ├─ playwright.config.ts
│  │  ├─ project.json
│  │  ├─ setup.ts
│  │  ├─ teardown.ts
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
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ public
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
│  ├─ assets
│  │  └─ ConnectWon.png
│  ├─ guideline
│  │  ├─ 01_프로젝트아키텍처.md
│  │  ├─ 02_개발환경설정.md
│  │  ├─ 03_외부라이브러리목록.md
│  │  ├─ 04_의존성관리가이드.md
│  │  └─ 05_배포및운영가이드.md
│  └─ study
│     ├─ 01_프로젝트소개.md
│     ├─ 02_비즈니스모델.md
│     ├─ 03_서비스플로우.md
│     ├─ 04_도메인정의.md
│     ├─ 05_기술스택개요.md
│     ├─ 06_모노레포구조.md
│     ├─ 07_전체아키텍처.md
│     ├─ 08_도메인모듈패턴.md
│     ├─ 09_데이터베이스설계.md
│     ├─ 10_개발환경설정.md
│     ├─ 11_코딩컨벤션.md
│     ├─ 12_Git워크플로우.md
│     ├─ 13_AI_API통합가이드.md
│     ├─ 14_AI_서비스플로우.md
│     ├─ 15_REST_API문서.md
│     ├─ 16_인증권한.md
│     ├─ 17_배포가이드.md
│     ├─ 18_기술스택가이드.md
│     ├─ 19_트러블슈팅건.md
│     └─ 20_참고자료.md
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
│  ├─ client
│  ├─ configs
│  ├─ core
│  ├─ logger
│  ├─ sdk
│  ├─ server
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
│     ├─ src
│     │  ├─ animations
│     │  │  ├─ Animation.tsx
│     │  │  └─ index.ts
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
│     │  ├─ layout
│     │  │  ├─ AppShell.tsx
│     │  │  ├─ Footer.tsx
│     │  │  ├─ Header.tsx
│     │  │  ├─ HeroCarousel.tsx
│     │  │  ├─ QuickMenu.tsx
│     │  │  ├─ SidebarNav.tsx
│     │  │  └─ index.ts
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
│     │  ├─ public
│     │  │  ├─ icons
│     │  │  └─ images
│     │  ├─ styles
│     │  │  ├─ animations.css
│     │  │  └─ customs.css
│     │  ├─ templates
│     │  │  ├─ error.tsx
│     │  │  ├─ index.ts
│     │  │  └─ loading.tsx
│     │  └─ utils
│     │     └─ cn.ts
│     ├─ tailwind.config.ts
│     ├─ tsconfig.json
│     └─ ui-types.ts
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ PROJECT-ARCH.md
├─ README.md
├─ renovate.json
├─ setup-structure.ps1
├─ test
│  └─ setup.ts
├─ tmp
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

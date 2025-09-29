```
kosa-mvp-connectwon
├─ .changeset
├─ .cz-config.cjs
├─ .dockerignore
├─ .eslintignore
├─ .hintrc
├─ .husky
├─ .pnpmrc
├─ .prettierrc.json
├─ apps
│  ├─ admin
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ [id]
│  │  │  │  │        └─ edit
│  │  │  │  │           └─ page.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ auth
│  │  │  │  │  ├─ proxy
│  │  │  │  │  │  └─ [...path]
│  │  │  │  │  └─ webhooks
│  │  │  │  │     └─ stripe
│  │  │  │  ├─ content
│  │  │  │  │  └─ AdminContent.tsx
│  │  │  │  ├─ dashboard
│  │  │  │  │  └─ Dashboard.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ feedback
│  │  │  │  │  └─ Feedback.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ page2.tsx
│  │  │  │  ├─ programs
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ edit
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ sessions
│  │  │  │  │        └─ page.tsx
│  │  │  │  ├─ reservation
│  │  │  │  │  ├─ Reservation.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  ├─ settings
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ users
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ edit
│  │  │  │  └─ venues
│  │  │  │     ├─ page.tsx
│  │  │  │     ├─ RoomSettings.tsx
│  │  │  │     └─ [id]
│  │  │  │        ├─ edit
│  │  │  │        └─ rooms
│  │  │  │           └─ [roomId]
│  │  │  │              └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ ai
│  │  │  │  │  ├─ AutomationTasks.tsx
│  │  │  │  │  ├─ PredictionAnalysis.tsx
│  │  │  │  │  ├─ SentimentAnalysis.tsx
│  │  │  │  │  └─ TimeSlotEfficiency.tsx
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ n8n
│  │  │  │  │  ├─ ApiConnections.tsx
│  │  │  │  │  ├─ AutomationTriggers.tsx
│  │  │  │  │  ├─ NotificationCenter.tsx
│  │  │  │  │  ├─ SlackIntegration.tsx
│  │  │  │  │  ├─ WebhookManager.tsx
│  │  │  │  │  └─ WorkflowAutomation.tsx
│  │  │  │  ├─ PeriodFilter.tsx
│  │  │  │  ├─ RealTimeStats.tsx
│  │  │  │  ├─ RoomUsagePrediction.tsx
│  │  │  │  ├─ Sidebar.tsx
│  │  │  │  └─ WeeklyTrends.tsx
│  │  │  └─ data
│  │  │     ├─ content.json
│  │  │     ├─ devices.json
│  │  │     ├─ features.json
│  │  │     ├─ hero.json
│  │  │     ├─ insights.json
│  │  │     ├─ partners.json
│  │  │     ├─ programs.json
│  │  │     ├─ rooms.json
│  │  │     └─ venues.json
│  │  ├─ tailwind.config.ts
│  │  └─ tsconfig.json
│  ├─ api
│  │  ├─ ecosystem.config.js
│  │  ├─ nest-cli.json
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ app.module.ts
│  │  │  ├─ main.ts
│  │  │  └─ modules
│  │  │     ├─ admin
│  │  │     │  ├─ admin.controller.ts
│  │  │     │  ├─ admin.interface.ts
│  │  │     │  ├─ admin.module.ts
│  │  │     │  └─ admin.service.ts
│  │  │     ├─ ai
│  │  │     │  ├─ ai.controller.ts
│  │  │     │  ├─ ai.interface.ts
│  │  │     │  ├─ ai.module.ts
│  │  │     │  ├─ ai.processor.ts
│  │  │     │  └─ ai.service.ts
│  │  │     ├─ auth
│  │  │     │  ├─ auth.controller.ts
│  │  │     │  ├─ auth.interface.ts
│  │  │     │  ├─ auth.module.ts
│  │  │     │  ├─ auth.processor.ts
│  │  │     │  └─ auth.service.ts
│  │  │     ├─ index.ts
│  │  │     ├─ mypage
│  │  │     │  ├─ mypage.controller.ts
│  │  │     │  ├─ mypage.interface.ts
│  │  │     │  ├─ mypage.module.ts
│  │  │     │  ├─ mypage.processor.ts
│  │  │     │  └─ mypage.service.ts
│  │  │     ├─ payments
│  │  │     │  ├─ payment.controller.ts
│  │  │     │  ├─ payment.interface.ts
│  │  │     │  ├─ payment.module.ts
│  │  │     │  ├─ payment.processor.ts
│  │  │     │  └─ payment.service.ts
│  │  │     ├─ programs
│  │  │     │  ├─ program.controller.ts
│  │  │     │  ├─ program.interface.ts
│  │  │     │  ├─ program.module.ts
│  │  │     │  ├─ program.processor.ts
│  │  │     │  └─ program.service.ts
│  │  │     ├─ reservations
│  │  │     │  ├─ reservation.controller.ts
│  │  │     │  ├─ reservation.interface.ts
│  │  │     │  ├─ reservation.module.ts
│  │  │     │  ├─ reservation.processor.ts
│  │  │     │  └─ reservation.service.ts
│  │  │     ├─ users
│  │  │     │  ├─ user.controller.ts
│  │  │     │  ├─ user.interface.ts
│  │  │     │  ├─ user.module.ts
│  │  │     │  └─ user.service.ts
│  │  │     └─ venues
│  │  │        ├─ venue.controller.ts
│  │  │        ├─ venue.interface.ts
│  │  │        ├─ venue.module.ts
│  │  │        └─ venue.service.ts
│  │  └─ tsconfig.json
│  ├─ e2e
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ actions
│  │  │  │  └─ PlaywrightActions.ts
│  │  │  ├─ e2e-types.ts
│  │  │  ├─ locators
│  │  │  │  └─ locator.ts
│  │  │  ├─ playwright.config.ts
│  │  │  ├─ setup.ts
│  │  │  ├─ teardown.ts
│  │  │  └─ tests
│  │  │     ├─ admin
│  │  │     │  └─ dashboard.spec.ts
│  │  │     ├─ api
│  │  │     │  └─ health.spec.ts
│  │  │     ├─ auth
│  │  │     │  ├─ admin.spec.ts
│  │  │     │  └─ user.spec.ts
│  │  │     ├─ flow
│  │  │     │  ├─ admin-flow.spec.ts
│  │  │     │  └─ user-flow.spec.ts
│  │  │     ├─ program
│  │  │     │  └─ participant.spec.ts
│  │  │     └─ venues
│  │  │        └─ reservation.spec.ts
│  │  └─ tsconfig.json
│  ├─ web
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  ├─ images
│  │  │  │  ├─ avatar.jpg
│  │  │  │  ├─ creator_hero_bg.jpg
│  │  │  │  ├─ cta_sec_bk.jpg
│  │  │  │  ├─ feature_sp_1.png
│  │  │  │  ├─ feature_sp_2.png
│  │  │  │  ├─ feature_sp_3.png
│  │  │  │  ├─ footer_logo.png
│  │  │  │  ├─ header_logo.png
│  │  │  │  ├─ hero_sp_1.png
│  │  │  │  ├─ hero_sp_2.png
│  │  │  │  ├─ hero_sp_3.png
│  │  │  │  ├─ logo.png
│  │  │  │  ├─ program_sp_1.png
│  │  │  │  ├─ program_sp_2.png
│  │  │  │  ├─ program_sp_3.png
│  │  │  │  ├─ program_sp_4.png
│  │  │  │  ├─ room_sp_1.jpg
│  │  │  │  ├─ room_sp_2.jpg
│  │  │  │  ├─ room_sp_3.jpg
│  │  │  │  ├─ room_sp_4.jpg
│  │  │  │  └─ social_hero_bk.jpg
│  │  │  └─ policies
│  │  │     ├─ privacy.html
│  │  │     └─ terms.html
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  ├─ callback
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ login
│  │  │  │  │  │  ├─ login.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ onboarding
│  │  │  │  │  │  ├─ Onboarding.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ StepIndicator.tsx
│  │  │  │  │  └─ signup
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ Signup.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ auth
│  │  │  │  │  ├─ proxy
│  │  │  │  │  │  └─ [...path]
│  │  │  │  │  ├─ translate
│  │  │  │  │  └─ webhooks
│  │  │  │  │     └─ stripe
│  │  │  │  ├─ contact
│  │  │  │  │  ├─ ContactForm.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ creator
│  │  │  │  │  ├─ CreatorHero.tsx
│  │  │  │  │  ├─ CreatorSection.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ devices
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ insights
│  │  │  │  │  ├─ InsightsContent.tsx
│  │  │  │  │  ├─ InsightsHero.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ InsightDetail.tsx
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ mypage
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ points
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ profile
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ reservation
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ programs
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ ProgramDetail.tsx
│  │  │  │  ├─ reservation
│  │  │  │  │  ├─ new
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ success
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ social-value
│  │  │  │  │  ├─ CTASection.tsx
│  │  │  │  │  ├─ EquipmentSpaceSection.tsx
│  │  │  │  │  ├─ ImpactAreas.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ PartnershipsSection.tsx
│  │  │  │  │  ├─ ProgramsSection.tsx
│  │  │  │  │  ├─ SocialValueHero.tsx
│  │  │  │  │  ├─ StorySection.tsx
│  │  │  │  │  └─ ValueIntroduction.tsx
│  │  │  │  ├─ users
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ venues
│  │  │  │     ├─ CentersHero.tsx
│  │  │  │     ├─ CentersList.tsx
│  │  │  │     ├─ gangnam
│  │  │  │     │  ├─ CenterDetail.tsx
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ gwangmyeong
│  │  │  │     │  ├─ CenterDetail.tsx
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ mapo
│  │  │  │     │  ├─ CenterDetail.tsx
│  │  │  │     │  └─ page.tsx
│  │  │  │     ├─ page.tsx
│  │  │  │     ├─ rooms
│  │  │  │     │  ├─ floor-plan
│  │  │  │     │  │  └─ page.tsx
│  │  │  │     │  ├─ page.tsx
│  │  │  │     │  └─ [id]
│  │  │  │     │     └─ booking
│  │  │  │     │        └─ page.tsx
│  │  │  │     └─ [id]
│  │  │  │        └─ page.tsx
│  │  │  ├─ components
│  │  │  │  ├─ ai
│  │  │  │  │  ├─ AIChat.tsx
│  │  │  │  │  ├─ AIInsights.tsx
│  │  │  │  │  └─ AIRecommendations.tsx
│  │  │  │  ├─ AIInsights.tsx
│  │  │  │  ├─ AppShell.tsx
│  │  │  │  ├─ Footer.tsx
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ home
│  │  │  │  │  ├─ AIViewSection.tsx
│  │  │  │  │  ├─ CTASection.tsx
│  │  │  │  │  ├─ FeatureSection.tsx
│  │  │  │  │  ├─ HeroSection.tsx
│  │  │  │  │  ├─ InsightSection.tsx
│  │  │  │  │  ├─ PartnerSlideSection.tsx
│  │  │  │  │  ├─ ProgramSection.tsx
│  │  │  │  │  ├─ QuickMenuSection.tsx
│  │  │  │  │  └─ RoomSection.tsx
│  │  │  │  ├─ programs
│  │  │  │  │  ├─ ProgramCard.tsx
│  │  │  │  │  ├─ ProgramList.tsx
│  │  │  │  │  └─ SearchFilterSection.tsx
│  │  │  │  ├─ QuickFab.tsx
│  │  │  │  └─ TermsModal.tsx
│  │  │  ├─ data
│  │  │  │  ├─ creator.json
│  │  │  │  ├─ devices.json
│  │  │  │  ├─ features.json
│  │  │  │  ├─ hero.json
│  │  │  │  ├─ insights.json
│  │  │  │  ├─ partners.json
│  │  │  │  ├─ programs.json
│  │  │  │  ├─ rooms.json
│  │  │  │  └─ venues.json
│  │  │  └─ lib
│  │  │     ├─ email.ts
│  │  │     └─ huggingface.ts
│  │  ├─ tailwind.config.ts
│  │  ├─ tsconfig.json
│  │  ├─ web-types.d.ts
│  │  └─ web-types.ts
│  └─ worker
│     ├─ package.json
│     ├─ project.json
│     ├─ src
│     │  ├─ events
│     │  │  ├─ notification.ts
│     │  │  └─ reservation.ts
│     │  ├─ main.ts
│     │  ├─ metrics.ts
│     │  ├─ processors
│     │  │  ├─ notification.ts
│     │  │  └─ reservation.ts
│     │  └─ schedules
│     │     └─ scheduler.ts
│     └─ tsconfig.json
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
├─ eslint.config.mjs
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
│  │  ├─ .wslconfig
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
│  │  ├─ argocd-app.yml
│  │  ├─ kustomization.yaml
│  │  └─ secret.yml
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
│  │  │  ├─ api-contract-types.ts
│  │  │  ├─ client.ts
│  │  │  ├─ contracts
│  │  │  │  ├─ ai.contract.ts
│  │  │  │  ├─ auth.contract.ts
│  │  │  │  ├─ common.contract.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ payment.contract.ts
│  │  │  │  ├─ program.contract.ts
│  │  │  │  └─ venue.contract.ts
│  │  │  ├─ openapi
│  │  │  │  ├─ document.ts
│  │  │  │  ├─ emit.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ registry.ts
│  │  │  │  └─ setup.ts
│  │  │  └─ schemas
│  │  │     ├─ ai.schema.ts
│  │  │     ├─ auth.schema.ts
│  │  │     ├─ common.schema.ts
│  │  │     ├─ index.ts
│  │  │     ├─ payment.schema.ts
│  │  │     ├─ program.schema.ts
│  │  │     └─ venue.schema.ts
│  │  └─ tsconfig.json
│  ├─ client
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ client-types.ts
│  │  │  ├─ hooks
│  │  │  │  ├─ useAuth.ts
│  │  │  │  ├─ useDebounce.ts
│  │  │  │  ├─ useInfiniteScroll.ts
│  │  │  │  ├─ useMediaQuery.ts
│  │  │  │  ├─ useOnlineStatus.ts
│  │  │  │  └─ useToggle.ts
│  │  │  ├─ index.ts
│  │  │  └─ providers
│  │  │     ├─ AuthProvider.tsx
│  │  │     └─ QueryProvider.tsx
│  │  └─ tsconfig.json
│  ├─ core
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ application
│  │  │  │  ├─ policies
│  │  │  │  │  ├─ overbooking.policies.ts
│  │  │  │  │  └─ waitlist.policy.ts
│  │  │  │  └─ usecases
│  │  │  │     ├─ program.usecase.ts
│  │  │  │     ├─ reservation.usecase.ts
│  │  │  │     └─ schedule.usecase.ts
│  │  │  ├─ configs
│  │  │  │  ├─ eslint
│  │  │  │  │  └─ base.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ tailwind
│  │  │  │  │  ├─ admin.ts
│  │  │  │  │  ├─ base.ts
│  │  │  │  │  └─ web.ts
│  │  │  │  ├─ testing
│  │  │  │  │  ├─ playwright.ts
│  │  │  │  │  └─ vitest.ts
│  │  │  │  └─ typescript
│  │  │  │     ├─ base.json
│  │  │  │     ├─ node.json
│  │  │  │     └─ web.json
│  │  │  ├─ connectwon-env.ts
│  │  │  ├─ core-types.ts
│  │  │  ├─ domain
│  │  │  │  └─ value-objects.ts
│  │  │  ├─ index.ts
│  │  │  ├─ ports
│  │  │  │  ├─ ai.port.ts
│  │  │  │  ├─ cache.port.ts
│  │  │  │  ├─ db.port.ts
│  │  │  │  ├─ device.port.ts
│  │  │  │  ├─ notification.port.ts
│  │  │  │  ├─ program.port.ts
│  │  │  │  ├─ review.port.ts
│  │  │  │  ├─ room.port.ts
│  │  │  │  ├─ search.port.ts
│  │  │  │  ├─ session.port.ts
│  │  │  │  ├─ time.port.ts
│  │  │  │  ├─ user.port.ts
│  │  │  │  └─ venue.port.ts
│  │  │  └─ queue
│  │  │     ├─ bull.queue.ts
│  │  │     ├─ manager.queue.ts
│  │  │     ├─ processor.queue.ts
│  │  │     └─ scheduler.queue.ts
│  │  └─ tsconfig.json
│  ├─ database
│  │  ├─ package.json
│  │  ├─ prisma
│  │  │  └─ schema.prisma
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ adapters
│  │  │  │  ├─ ai.adapter.ts
│  │  │  │  ├─ db.adapter.ts
│  │  │  │  ├─ device.adapter.ts
│  │  │  │  ├─ program.adapter.ts
│  │  │  │  ├─ review.adapter.ts
│  │  │  │  ├─ room.adapter.ts
│  │  │  │  ├─ user-activity.adapter.ts
│  │  │  │  ├─ user.adapter.ts
│  │  │  │  └─ venue.adapter.ts
│  │  │  ├─ client.ts
│  │  │  ├─ index.ts
│  │  │  └─ utils.ts
│  │  ├─ test-smoke.ts
│  │  └─ tsconfig.json
│  ├─ logger
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ console.ts
│  │  │  ├─ file.ts
│  │  │  ├─ http.ts
│  │  │  ├─ index.ts
│  │  │  ├─ logger-types.ts
│  │  │  ├─ logger.ts
│  │  │  ├─ pretty.ts
│  │  │  └─ slack.ts
│  │  └─ tsconfig.json
│  ├─ sdk
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ python
│  │  │  ├─ connectwon_sdk
│  │  │  │  ├─ client.py
│  │  │  │  ├─ errors.py
│  │  │  │  ├─ models.py
│  │  │  │  └─ __init__.py
│  │  │  └─ pyproject.toml
│  │  ├─ tsconfig.json
│  │  └─ typescript
│  │     └─ src
│  │        ├─ auth.ts
│  │        ├─ errors.ts
│  │        ├─ http.ts
│  │        ├─ index.ts
│  │        ├─ middleware.ts
│  │        ├─ pagination.ts
│  │        ├─ sdk-types.ts
│  │        └─ tracing.ts
│  ├─ server
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ adapters
│  │  │  │  ├─ anthropic.adapter.ts
│  │  │  │  ├─ auth.adapter.ts
│  │  │  │  ├─ cache.adapter.ts
│  │  │  │  ├─ clock.adapter.ts
│  │  │  │  ├─ email.adapter.ts
│  │  │  │  ├─ huggingface.adapter.ts
│  │  │  │  ├─ openai.adapter.ts
│  │  │  │  ├─ search.adapter.ts
│  │  │  │  ├─ session.adapter.ts
│  │  │  │  └─ slack.adapter.ts
│  │  │  ├─ application.module.ts
│  │  │  ├─ decorators
│  │  │  │  ├─ api-response.ts
│  │  │  │  ├─ permissions.ts
│  │  │  │  └─ program.ts
│  │  │  ├─ filters
│  │  │  │  └─ http-exception.filter.ts
│  │  │  ├─ guards
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  └─ role.guard.ts
│  │  │  ├─ index.ts
│  │  │  ├─ instrument.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ response.interceptor.ts
│  │  │  ├─ middleware
│  │  │  │  ├─ auth.middleware.ts
│  │  │  │  └─ cookie.middleware.ts
│  │  │  ├─ pipes
│  │  │  │  └─ validation.pipe.ts
│  │  │  ├─ plugins
│  │  │  │  └─ swagger.ts
│  │  │  ├─ rsc-cache.ts
│  │  │  ├─ server-types.ts
│  │  │  └─ services
│  │  │     └─ ai.service.ts
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
│     │     ├─ artiordex.png
│     │     ├─ footer_logo.png
│     │     ├─ header_logo.png
│     │     └─ logo.png
│     ├─ src
│     │  ├─ animations
│     │  │  └─ Animation.tsx
│     │  ├─ charts
│     │  │  ├─ AreaChart.tsx
│     │  │  ├─ BarChart.tsx
│     │  │  ├─ DonutChart.tsx
│     │  │  ├─ FunnelChart.tsx
│     │  │  ├─ GaugeChart.tsx
│     │  │  ├─ LineChart.tsx
│     │  │  ├─ PieChart.tsx
│     │  │  ├─ ProgressChart.tsx
│     │  │  ├─ SparklineChart.tsx
│     │  │  └─ WaterfallChart.tsx
│     │  ├─ components
│     │  │  ├─ Button.tsx
│     │  │  ├─ Card.tsx
│     │  │  ├─ Checkbox.tsx
│     │  │  ├─ Divider.tsx
│     │  │  ├─ Drawer.tsx
│     │  │  ├─ EmptyState.tsx
│     │  │  ├─ ErrorPage.tsx
│     │  │  ├─ Field.tsx
│     │  │  ├─ Form.tsx
│     │  │  ├─ Input.tsx
│     │  │  ├─ LoadingPage.tsx
│     │  │  ├─ LoadingSpinner.tsx
│     │  │  ├─ Modal.tsx
│     │  │  ├─ RadioGroup.tsx
│     │  │  ├─ Select.tsx
│     │  │  ├─ Textarea.tsx
│     │  │  └─ Toolbar.tsx
│     │  ├─ hooks
│     │  │  ├─ useBoolean.ts
│     │  │  ├─ useDebounce.ts
│     │  │  ├─ useDisclosure.ts
│     │  │  ├─ useEventListener.ts
│     │  │  ├─ useIsMounted.ts
│     │  │  ├─ useMediaQuery.ts
│     │  │  ├─ useOnClickOutside.ts
│     │  │  └─ useThrottle.ts
│     │  ├─ index.ts
│     │  ├─ public
│     │  │  ├─ icons
│     │  │  └─ images
│     │  ├─ styles
│     │  │  ├─ animations.css
│     │  │  └─ customs.css
│     │  ├─ templates
│     │  │  ├─ error.tsx
│     │  │  └─ loading.tsx
│     │  ├─ ui-types.ts
│     │  └─ utils
│     │     └─ cn.ts
│     ├─ tailwind.config.ts
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ PROJECT-ARCH.md
├─ README.md
├─ renovate.json
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

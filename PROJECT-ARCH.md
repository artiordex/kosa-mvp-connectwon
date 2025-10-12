```
kosa-mvp-connectwon
├─ .changeset
│  ├─ config.json
│  └─ README.md
├─ .cz-config.cjs
├─ .firebaserc
├─ .hintrc
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
├─ .pnpmrc
├─ apps
│  ├─ admin
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  ├─ favicon
│  │  │  │  ├─ android-chrome-192x192.png
│  │  │  │  ├─ android-chrome-512x512.png
│  │  │  │  ├─ apple-touch-icon.png
│  │  │  │  ├─ favicon-16x16.png
│  │  │  │  ├─ favicon-32x32.png
│  │  │  │  ├─ favicon.ico
│  │  │  │  └─ site.webmanifest
│  │  │  └─ images
│  │  │     ├─ avatar.png
│  │  │     ├─ footer_logo.png
│  │  │     ├─ header_logo.png
│  │  │     ├─ logo.png
│  │  │     ├─ venue_sp_1.jpg
│  │  │     ├─ venue_sp_2.jpg
│  │  │     └─ venue_sp_3.jpg
│  │  ├─ server.ts
│  │  ├─ src
│  │  │  ├─ app
│  │  │  │  ├─ (auth)
│  │  │  │  │  └─ login
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ [id]
│  │  │  │  ├─ (protected)
│  │  │  │  │  ├─ board
│  │  │  │  │  │  ├─ BoardManagement.tsx
│  │  │  │  │  │  ├─ ContentCreation.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ dashboard
│  │  │  │  │  │  ├─ AiDashboard.tsx
│  │  │  │  │  │  ├─ AnalyticsDashboard.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ facilities
│  │  │  │  │  │  ├─ equipments
│  │  │  │  │  │  │  ├─ add
│  │  │  │  │  │  │  │  ├─ EquipmentAddForm.tsx
│  │  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  │  ├─ Equipment.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     ├─ edit
│  │  │  │  │  │  │     │  ├─ EquipmentEditForm.tsx
│  │  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │  │     └─ EquipmentDetail.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ rooms
│  │  │  │  │  │  │  ├─ add
│  │  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  │  └─ RoomAddForm.tsx
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  ├─ Room.tsx
│  │  │  │  │  │  │  └─ [id]
│  │  │  │  │  │  │     ├─ edit
│  │  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │  │     │  └─ RoomEditForm.tsx
│  │  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │  │     └─ RoomDetail.tsx
│  │  │  │  │  │  └─ venues
│  │  │  │  │  │     ├─ add
│  │  │  │  │  │     │  ├─ page.tsx
│  │  │  │  │  │     │  └─ VenueAddForm.tsx
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ Venue.tsx
│  │  │  │  │  │     └─ [id]
│  │  │  │  │  │        ├─ edit
│  │  │  │  │  │        │  ├─ page.tsx
│  │  │  │  │  │        │  └─ VenueEditForm.tsx
│  │  │  │  │  │        ├─ equipments
│  │  │  │  │  │        ├─ page.tsx
│  │  │  │  │  │        ├─ rooms
│  │  │  │  │  │        └─ VenueDetail.tsx
│  │  │  │  │  ├─ feedback
│  │  │  │  │  │  └─ Feedback.tsx
│  │  │  │  │  ├─ help
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ profile
│  │  │  │  │  │  ├─ edit
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ programs
│  │  │  │  │  │  ├─ add
│  │  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  │  └─ Post.tsx
│  │  │  │  │  │  ├─ OfflineProgram.tsx
│  │  │  │  │  │  ├─ OnlineProgram.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ [id]
│  │  │  │  │  │     ├─ edit
│  │  │  │  │  │     │  └─ page.tsx
│  │  │  │  │  │     └─ sessions
│  │  │  │  │  │        └─ page.tsx
│  │  │  │  │  ├─ reservations
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ ProgramReservation.tsx
│  │  │  │  │  │  ├─ Reservation.tsx
│  │  │  │  │  │  ├─ Scheduler.tsx
│  │  │  │  │  │  └─ SpaceReservation.tsx
│  │  │  │  │  ├─ settings
│  │  │  │  │  │  ├─ Contact.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ users
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ UserSettings.tsx
│  │  │  │  ├─ (public)
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ api
│  │  │  │  │  ├─ auth
│  │  │  │  │  ├─ proxy
│  │  │  │  │  │  └─ [...path]
│  │  │  │  │  └─ webhooks
│  │  │  │  │     └─ stripe
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  └─ test-firebase
│  │  │  │     └─ page.tsx
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
│  │  │  │  ├─ Pagination.tsx
│  │  │  │  ├─ PeriodFilter.tsx
│  │  │  │  ├─ RealTimeStats.tsx
│  │  │  │  ├─ RoomUsagePrediction.tsx
│  │  │  │  ├─ Sidebar.tsx
│  │  │  │  └─ WeeklyTrends.tsx
│  │  │  ├─ data
│  │  │  │  ├─ comments.json
│  │  │  │  ├─ content.json
│  │  │  │  ├─ devices.json
│  │  │  │  ├─ equipment-with-venues.json
│  │  │  │  ├─ equipmentRentals.json
│  │  │  │  ├─ features.json
│  │  │  │  ├─ hero.json
│  │  │  │  ├─ insights.json
│  │  │  │  ├─ inventories.json
│  │  │  │  ├─ menu.json
│  │  │  │  ├─ partners.json
│  │  │  │  ├─ posts.json
│  │  │  │  ├─ programs.json
│  │  │  │  ├─ rooms-by-venue.json
│  │  │  │  ├─ rooms.json
│  │  │  │  ├─ users.json
│  │  │  │  └─ venues.json
│  │  │  └─ providers
│  │  │     └─ RootProvider.tsx
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
│  │  ├─ playwright.config.ts
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ actions
│  │  │  │  └─ PlaywrightActions.ts
│  │  │  ├─ e2e-types.ts
│  │  │  ├─ locators
│  │  │  │  └─ locator.ts
│  │  │  ├─ setup.ts
│  │  │  ├─ teardown.ts
│  │  │  └─ tests
│  │  │     ├─ admin
│  │  │     ├─ api
│  │  │     ├─ auth
│  │  │     ├─ flow
│  │  │     ├─ program
│  │  │     └─ venues
│  │  └─ tsconfig.json
│  ├─ web
│  │  ├─ next-env.d.ts
│  │  ├─ next.config.mjs
│  │  ├─ package.json
│  │  ├─ postcss.config.mjs
│  │  ├─ project.json
│  │  ├─ public
│  │  │  ├─ favicon
│  │  │  │  ├─ android-chrome-192x192.png
│  │  │  │  ├─ android-chrome-512x512.png
│  │  │  │  ├─ apple-touch-icon.png
│  │  │  │  ├─ favicon-16x16.png
│  │  │  │  ├─ favicon-32x32.png
│  │  │  │  ├─ favicon.ico
│  │  │  │  └─ site.webmanifest
│  │  │  ├─ images
│  │  │  │  ├─ avatar.png
│  │  │  │  ├─ creator_hero_bg.jpg
│  │  │  │  ├─ cta_sec_bk.jpg
│  │  │  │  ├─ facilities_hero_bg.jpg
│  │  │  │  ├─ feature_sp_1.png
│  │  │  │  ├─ feature_sp_2.png
│  │  │  │  ├─ feature_sp_3.png
│  │  │  │  ├─ footer_logo.png
│  │  │  │  ├─ header_logo.png
│  │  │  │  ├─ hero_sp_1.png
│  │  │  │  ├─ hero_sp_2.png
│  │  │  │  ├─ hero_sp_3.png
│  │  │  │  ├─ logo.png
│  │  │  │  ├─ program_hero_bg.png
│  │  │  │  ├─ room_sp_1.jpg
│  │  │  │  ├─ room_sp_2.jpg
│  │  │  │  ├─ room_sp_3.jpg
│  │  │  │  ├─ room_sp_4.jpg
│  │  │  │  ├─ social_hero_bk.jpg
│  │  │  │  ├─ venue_sp_1.jpg
│  │  │  │  ├─ venue_sp_2.jpg
│  │  │  │  └─ venue_sp_3.jpg
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
│  │  │  │  │  │  ├─ Login.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ SSO.tsx
│  │  │  │  │  ├─ onboarding
│  │  │  │  │  │  ├─ Onboarding.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ signup
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ Signup.tsx
│  │  │  │  ├─ (protected)
│  │  │  │  │  └─ mypage
│  │  │  │  │     ├─ MyPageMainContent.tsx
│  │  │  │  │     ├─ MyPageSidebar.tsx
│  │  │  │  │     ├─ notifications
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     ├─ points
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ profile
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ programs
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ reservations
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     ├─ reviews
│  │  │  │  │     │  └─ page.tsx
│  │  │  │  │     └─ security
│  │  │  │  │        └─ page.tsx
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
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ facilities
│  │  │  │  │  ├─ equipments
│  │  │  │  │  │  ├─ Equipment.tsx
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ FacilitiesHero.tsx
│  │  │  │  │  ├─ FacilitiesSelector.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ reservations
│  │  │  │  │  │  ├─ complete
│  │  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  │  ├─ EquipmentSelection.tsx
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ ReservationFlow.tsx
│  │  │  │  │  │  ├─ ReservationSidebar.tsx
│  │  │  │  │  │  ├─ RoomDetail.tsx
│  │  │  │  │  │  ├─ RoomSelection.tsx
│  │  │  │  │  │  ├─ TimeSelection.tsx
│  │  │  │  │  │  └─ VenueSelection.tsx
│  │  │  │  │  └─ venues
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ [id]
│  │  │  │  │        ├─ page.tsx
│  │  │  │  │        ├─ rooms
│  │  │  │  │        │  └─ [roomId]
│  │  │  │  │        │     ├─ page.tsx
│  │  │  │  │        │     └─ RoomDetail.tsx
│  │  │  │  │        └─ VenueDetail.tsx
│  │  │  │  ├─ globals.css
│  │  │  │  ├─ insights
│  │  │  │  │  ├─ InsightsContent.tsx
│  │  │  │  │  ├─ InsightsHero.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ InsightDetail.tsx
│  │  │  │  │     └─ page.tsx
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ programs
│  │  │  │  │  ├─ create
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ ProgramCreate.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ Program.tsx
│  │  │  │  │  ├─ ProgramHero.tsx
│  │  │  │  │  ├─ ProgramProposalSection.tsx
│  │  │  │  │  └─ [id]
│  │  │  │  │     ├─ page.tsx
│  │  │  │  │     └─ ProgramDetail.tsx
│  │  │  │  └─ social-value
│  │  │  │     ├─ ImpactAreas.tsx
│  │  │  │     ├─ page.tsx
│  │  │  │     ├─ PartnershipsSection.tsx
│  │  │  │     ├─ ProgramsSection.tsx
│  │  │  │     ├─ SocialValueHero.tsx
│  │  │  │     ├─ StorySection.tsx
│  │  │  │     └─ ValueIntroduction.tsx
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
│  │  │  │  │  ├─ InsightSection.tsx
│  │  │  │  │  ├─ MainHeroSection.tsx
│  │  │  │  │  ├─ PartnerSlideSection.tsx
│  │  │  │  │  ├─ ProgramSection.tsx
│  │  │  │  │  ├─ QuickMenuSection.tsx
│  │  │  │  │  └─ RoomSection.tsx
│  │  │  │  ├─ Input.tsx
│  │  │  │  ├─ Pagination.tsx
│  │  │  │  ├─ programs
│  │  │  │  │  ├─ ProgramCard.tsx
│  │  │  │  │  ├─ ProgramList.tsx
│  │  │  │  │  └─ SearchFilterSection.tsx
│  │  │  │  ├─ QuickFab.tsx
│  │  │  │  └─ TermsModal.tsx
│  │  │  ├─ data
│  │  │  │  ├─ ai.json
│  │  │  │  ├─ creator.json
│  │  │  │  ├─ devices.json
│  │  │  │  ├─ equipment-with-venues.json
│  │  │  │  ├─ equipmentRentals.json
│  │  │  │  ├─ features.json
│  │  │  │  ├─ hero.json
│  │  │  │  ├─ insights.json
│  │  │  │  ├─ mypage-with-user.json
│  │  │  │  ├─ partners.json
│  │  │  │  ├─ posts.json
│  │  │  │  ├─ program-details.json
│  │  │  │  ├─ programs.json
│  │  │  │  ├─ rooms-by-venue.json
│  │  │  │  ├─ rooms.json
│  │  │  │  └─ venues.json
│  │  │  ├─ global.d.ts
│  │  │  ├─ lib
│  │  │  │  ├─ email.ts
│  │  │  │  └─ huggingface.ts
│  │  │  ├─ next-env.d.ts
│  │  │  ├─ providers
│  │  │  │  └─ RootProvider.tsx
│  │  │  ├─ web-types.d.ts
│  │  │  └─ web-types.ts
│  │  └─ tsconfig.json
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
├─ firebase.json
├─ infra
│  ├─ cloudbuild.yaml
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
│     └─ scripts
│        ├─ build.sh
│        └─ setup.sh
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
│  │  │  │  ├─ payment.contract.ts
│  │  │  │  ├─ program.contract.ts
│  │  │  │  └─ venue.contract.ts
│  │  │  ├─ index.ts
│  │  │  ├─ openapi
│  │  │  │  ├─ document.ts
│  │  │  │  ├─ emit.ts
│  │  │  │  ├─ registry.ts
│  │  │  │  └─ setup.ts
│  │  │  └─ schemas
│  │  │     ├─ ai.schema.ts
│  │  │     ├─ auth.schema.ts
│  │  │     ├─ common.schema.ts
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
│  │  │  ├─ mock-types.ts
│  │  │  ├─ mocks
│  │  │  │  ├─ browser.ts
│  │  │  │  ├─ data
│  │  │  │  │  ├─ admin
│  │  │  │  │  │  ├─ activities.json
│  │  │  │  │  │  ├─ reports.json
│  │  │  │  │  │  └─ stats.json
│  │  │  │  │  ├─ ai
│  │  │  │  │  │  ├─ interactions.json
│  │  │  │  │  │  ├─ recommendations.json
│  │  │  │  │  │  └─ sentiments.json
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ memberships
│  │  │  │  │  │  ├─ comparisons.json
│  │  │  │  │  │  ├─ plans.json
│  │  │  │  │  │  └─ subscriptions.json
│  │  │  │  │  ├─ notifications
│  │  │  │  │  │  └─ notifications.json
│  │  │  │  │  ├─ payments
│  │  │  │  │  │  └─ payments.json
│  │  │  │  │  ├─ posts
│  │  │  │  │  │  ├─ comments.json
│  │  │  │  │  │  └─ posts.json
│  │  │  │  │  ├─ programs
│  │  │  │  │  │  ├─ programs.json
│  │  │  │  │  │  ├─ reviews.json
│  │  │  │  │  │  └─ sessions.json
│  │  │  │  │  ├─ reservations
│  │  │  │  │  │  ├─ attendance.json
│  │  │  │  │  │  ├─ reservations.json
│  │  │  │  │  │  └─ scheduler.json
│  │  │  │  │  ├─ users
│  │  │  │  │  │  ├─ activities.json
│  │  │  │  │  │  ├─ creators.json
│  │  │  │  │  │  ├─ profiles.json
│  │  │  │  │  │  ├─ stats.json
│  │  │  │  │  │  └─ users.json
│  │  │  │  │  └─ venues
│  │  │  │  │     ├─ equipment.json
│  │  │  │  │     ├─ equipmentRentals.json
│  │  │  │  │     ├─ inventories.json
│  │  │  │  │     ├─ rooms.json
│  │  │  │  │     └─ venues.json
│  │  │  │  ├─ db
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ schema.ts
│  │  │  │  │  └─ seeds.ts
│  │  │  │  ├─ generators
│  │  │  │  │  ├─ admin.generator.ts
│  │  │  │  │  ├─ ai.generator.ts
│  │  │  │  │  ├─ equipment.generator.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ membership.generator.ts
│  │  │  │  │  ├─ notification.generator.ts
│  │  │  │  │  ├─ payment.generator.ts
│  │  │  │  │  ├─ post.generator.ts
│  │  │  │  │  ├─ program.generator.ts
│  │  │  │  │  ├─ reservation.generator.ts
│  │  │  │  │  ├─ scheduler.generator.ts
│  │  │  │  │  ├─ user.generator.ts
│  │  │  │  │  └─ venue.generator.ts
│  │  │  │  ├─ handlers
│  │  │  │  │  ├─ admin
│  │  │  │  │  │  ├─ dashboard.handler.ts
│  │  │  │  │  │  ├─ program-management.handler.ts
│  │  │  │  │  │  ├─ report-management.handler.ts
│  │  │  │  │  │  ├─ user-management.handler.ts
│  │  │  │  │  │  └─ venue-management.handler.ts
│  │  │  │  │  ├─ ai
│  │  │  │  │  │  ├─ ai.handler.ts
│  │  │  │  │  │  ├─ chat.handler.ts
│  │  │  │  │  │  ├─ moderation.handler.ts
│  │  │  │  │  │  ├─ recommendation.handler.ts
│  │  │  │  │  │  └─ summary.handler.ts
│  │  │  │  │  ├─ auth
│  │  │  │  │  │  ├─ auth.handler.ts
│  │  │  │  │  │  ├─ session.handler.ts
│  │  │  │  │  │  └─ sso.handler.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ memberships
│  │  │  │  │  │  ├─ benefit.handler.ts
│  │  │  │  │  │  └─ membership.handler.ts
│  │  │  │  │  ├─ notifications
│  │  │  │  │  │  ├─ message.handler.ts
│  │  │  │  │  │  ├─ notification.handler.ts
│  │  │  │  │  │  └─ slack.handler.ts
│  │  │  │  │  ├─ payments
│  │  │  │  │  │  ├─ payment.handler.ts
│  │  │  │  │  │  ├─ receipt.handler.ts
│  │  │  │  │  │  └─ subscription.handler.ts
│  │  │  │  │  ├─ posts
│  │  │  │  │  │  ├─ comment.handler.ts
│  │  │  │  │  │  ├─ post.handler.ts
│  │  │  │  │  │  └─ report.handler.ts
│  │  │  │  │  ├─ programs
│  │  │  │  │  │  ├─ participant.handler.ts
│  │  │  │  │  │  ├─ program.handler.ts
│  │  │  │  │  │  ├─ review.handler.ts
│  │  │  │  │  │  └─ session.handler.ts
│  │  │  │  │  ├─ users
│  │  │  │  │  │  ├─ activity.handler.ts
│  │  │  │  │  │  ├─ creator.handler.ts
│  │  │  │  │  │  ├─ profile.handler.ts
│  │  │  │  │  │  └─ user.handler.ts
│  │  │  │  │  └─ venues
│  │  │  │  │     ├─ equipment.handler.ts
│  │  │  │  │     ├─ reservation.handler.ts
│  │  │  │  │     ├─ room.handler.ts
│  │  │  │  │     ├─ scheduler.handler.ts
│  │  │  │  │     └─ venue.handler.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ utils
│  │  │  │     ├─ delay.ts
│  │  │  │     ├─ pagination.ts
│  │  │  │     ├─ response.ts
│  │  │  │     └─ search.ts
│  │  │  └─ providers
│  │  │     ├─ AuthProvider.tsx
│  │  │     ├─ firebase-init.ts
│  │  │     ├─ firebase.ts
│  │  │     ├─ FirebaseProvider.tsx
│  │  │     ├─ QueryProvider.tsx
│  │  │     └─ RootProvider.tsx
│  │  └─ tsconfig.json
│  ├─ configs
│  │  ├─ package.json
│  │  ├─ project.json
│  │  ├─ src
│  │  │  ├─ eslint
│  │  │  │  └─ base.ts
│  │  │  ├─ index.ts
│  │  │  ├─ testing
│  │  │  │  ├─ playwright.ts
│  │  │  │  └─ vitest.ts
│  │  │  └─ typescript
│  │  │     ├─ base.json
│  │  │     ├─ node.json
│  │  │     └─ web.json
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
│  │  │  ├─ connectwon-env.ts
│  │  │  ├─ core-types.ts
│  │  │  ├─ domain
│  │  │  │  └─ value-objects.ts
│  │  │  ├─ index.ts
│  │  │  ├─ locales
│  │  │  │  ├─ en.json
│  │  │  │  ├─ ja.json
│  │  │  │  ├─ ko.json
│  │  │  │  └─ vi.json
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
│  │  │  ├─ test-smoke.ts
│  │  │  └─ utils.ts
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
│  │  ├─ src
│  │  │  ├─ auth.ts
│  │  │  ├─ errors.ts
│  │  │  ├─ http.ts
│  │  │  ├─ index.ts
│  │  │  ├─ middleware.ts
│  │  │  ├─ pagination.ts
│  │  │  ├─ sdk-types.ts
│  │  │  └─ tracing.ts
│  │  └─ tsconfig.json
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
│     │  ├─ styles
│     │  │  ├─ animations.css
│     │  │  └─ customs.css
│     │  ├─ templates
│     │  │  ├─ error.tsx
│     │  │  └─ loading.tsx
│     │  ├─ ui-types.ts
│     │  └─ utils
│     │     └─ cn.ts
│     ├─ tailwind.config.mjs
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ prettier.config.mjs
├─ PROJECT-ARCH.md
├─ README.md
├─ renovate.json
├─ setup-structure.ps1
├─ tmp
│  └─ packages
│     ├─ api-contract
│     ├─ configs
│     ├─ core
│     ├─ database
│     ├─ logger
│     ├─ sdk
│     └─ ui
├─ tools
│  ├─ services
│  │  ├─ postbuild.ts
│  │  └─ webhook-catcher.ts
│  ├─ testkit
│  │  ├─ setup.ts
│  │  └─ test-artifacts.ts
│  ├─ tool-types.ts
│  └─ utils
│     └─ assert.ts
├─ tsconfig.base.json
└─ tsconfig.json

```

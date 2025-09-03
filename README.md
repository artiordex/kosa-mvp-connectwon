# 🚀 ConnectWon

> **도전하는 모든 이에게 공정한 기회와 지속되는 연결의 장을 제공한다.**

ConnectWon은 취업 및 창업 준비자를 위한 예약 기반 생활 서비스 플랫폼입니다. 인큐베이터형 공유 오피스 예약, AI 기반 프로그램 매칭, 멘토링 네트워크를 통해 청년들의 성장과 도전을 지원합니다.

[![GitHub Actions](https://github.com/your-username/kosa-mvp-connectwon/workflows/CI/badge.svg)](https://github.com/your-username/kosa-mvp-connectwon/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 프로젝트 개요

- **프로젝트명**: ConnectWon (커넥트원)
- **기간**: 2025.09.01 - 2025.10.10 (6주)
- **팀**: 아티올덱스(Artiordex) - 민시우, 소나무
- **멘토**: 이영희 교수님 (KOSA)

## 🎯 핵심 가치

### 비즈니스 모델
- **하이브리드 커뮤니티**: 플랫폼 공식 프로그램 + 회원 주도 프로그램 공존
- **수익 구조**: 멤버십 구독, 공간 대여, 멘토링 서비스, 부가서비스
- **사회적 가치**: 저비용·고효율 공간 제공으로 청년 창업 지원

### 주요 기능
- 🏢 **공유 오피스 예약**: 실시간 가용성 확인 및 예약 시스템
- 🤖 **AI 기반 서비스**: 프로그램 추천, 콘텐츠 요약, 모더레이션
- 💳 **통합 결제 시스템**: Stripe 기반 포인트 및 멤버십 관리
- 📱 **관리자 대시보드**: 실시간 통계, 사용자 관리, 운영 분석
- 🔔 **자동화 알림**: n8n 기반 예약/취소/리마인더 시스템

## 🛠️ 기술 스택

### Core Technologies
- **Framework**: Next.js 14 (App Router, Server Actions)
- **Language**: TypeScript, Node.js
- **Package Manager**: pnpm
- **Architecture**: Monorepo (NX)

### Frontend
- **UI**: Tailwind CSS, shadcn/ui
- **State**: Zustand
- **Auth**: Auth.js (Google/Naver/Kakao)

### Backend & Database
- **Database**: PostgreSQL, Prisma ORM
- **Cache**: Redis
- **API**: REST API (zod-openapi)
- **Background Jobs**: BullMQ

### AI & External Services
- **AI APIs**: OpenAI, Anthropic, Hugging Face
- **Payment**: Stripe
- **Notifications**: Slack
- **Automation**: n8n

### DevOps & Monitoring
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, Vercel Analytics
- **Logging**: pino
- **Testing**: Vitest, Playwright

## 🏗️ 프로젝트 구조

```
kosa-mvp-connectwon/
├── apps/
│   ├── web/          # 사용자 웹 애플리케이션
│   ├── admin/        # 관리자 대시보드
│   ├── api/          # 백엔드 API 서버
│   └── e2e/          # E2E 테스트
├── packages/
│   ├── database/     # Prisma 스키마 & DB 클라이언트
│   ├── ui/           # 공통 UI 컴포넌트
│   ├── api-contract/ # API 스키마 정의
│   ├── core/         # 비즈니스 로직
│   ├── email/        # 이메일 템플릿
│   └── testing/      # 테스트 유틸리티
├── configs/          # 공통 설정 파일
├── docker/           # Docker 설정
└── docs/             # 프로젝트 문서
```

## 🚀 빠른 시작

### 필요 조건
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+
- Redis 6+

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/kosa-mvp-connectwon.git
   cd kosa-mvp-connectwon
   ```

2. **의존성 설치**
   ```bash
   pnpm install
   ```

3. **환경변수 설정**
   ```bash
   cp .env.example .env.local
   # .env.local 파일을 편집하여 필요한 환경변수 설정
   ```

4. **데이터베이스 설정**
   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

5. **개발 서버 실행**
   ```bash
   # 모든 앱 실행
   pnpm dev

   # 특정 앱만 실행
   pnpm dev:web    # 사용자 앱
   pnpm dev:admin  # 관리자 앱
   pnpm dev:api    # API 서버
   ```

## 📚 주요 스크립트

```bash
# 개발
pnpm dev                 # 모든 앱 개발 모드 실행
pnpm build              # 전체 빌드
pnpm test               # 테스트 실행
pnpm test:e2e           # E2E 테스트

# 데이터베이스
pnpm db:migrate         # 마이그레이션 실행
pnpm db:seed            # 시드 데이터 생성
pnpm db:studio          # Prisma Studio 실행

# 코드 품질
pnpm lint               # ESLint 실행
pnpm type-check         # TypeScript 타입 체크
pnpm format             # Prettier 포맷팅
```

## 🎨 주요 화면

### 사용자 앱 (Web)
- **홈페이지**: 서비스 소개 및 주요 기능
- **프로그램 목록**: AI 추천 기반 프로그램 탐색
- **예약 시스템**: 실시간 캘린더 기반 예약
- **마이페이지**: 예약 내역, 포인트 관리, 프로필

### 관리자 앱 (Admin)
- **대시보드**: 실시간 통계 및 주요 지표
- **사용자 관리**: 회원 정보 및 멤버십 관리
- **공간 관리**: 지점/룸 관리 및 가용성 설정
- **프로그램 관리**: 프로그램/세션 관리

## 🔍 벤치마킹 및 참고 자료

### 국내외 동종업계 조사
프로젝트 개발에 참고한 주요 서비스들:

#### 공간 예약 플랫폼
- **[Shareit](https://www.shareit.kr)**: 소규모 공간 예약 모델, 검색 필터 및 카테고리 UX
- **[SpaceCloud](https://spacecloud.kr)**: 프로그램 모집, 검색 필터, 카테고리 구조

#### 코워킹 스페이스
- **[WeWork](https://www.wework.com/ko-KR)**: 글로벌 코워킹 운영 및 커뮤니티 라운지 모델
- **[SparkPlus](https://sparkplus.co)**: 국내 지점 운영 및 스타트업 중심 이벤트
- **[FastFive](https://www.fastfive.co.kr)**: 스타트업 중심 코워킹 환경
- **[Industrious](https://www.industriousoffice.com)**: 프리미엄 오피스 및 호스피털리티 중심 생산성 공간

#### 스타트업 지원형 공간
- **[DreamPlus](https://www.dreamplus.io)**: 스타트업 지원형 공간 및 프로그램 연계
- **[Orange Planet](https://www.op.gg)**: 창업 커뮤니티 및 지원 프로그램 통합

#### 공공/커뮤니티 서비스
- **[서울청년포털](https://youth.seoul.go.kr)**: 공공 청년 라운지 및 정책 연계
- **[스마트플레이스](https://www.smartplace.kr)**: 리뷰 기반 O2O 운영 모델

#### 가치혁신 및 커뮤니티
- **[Impact Hub](https://www.impacthub.net)**: 기업/공공/스타트업/투자자 간 협력 플랫폼
- **[MOSF 블로그](https://blog.mosf.kr)**: 공간 플랫폼 기획 및 공간의 의미 탐구

### 차별화 포인트
위 서비스들과 차별화되는 ConnectWon만의 특징:
- **하이브리드 커뮤니티**: 공식 프로그램 + 회원 주도 프로그램 공존
- **AI 기반 개인화**: OpenAI/Anthropic을 활용한 프로그램 매칭 및 콘텐츠 생성
- **사회적 가치 중심**: 취창업 준비자 특화 저비용 고효율 서비스
- **통합 자동화**: n8n 기반 예약부터 결제, 알림까지 end-to-end 자동화

## 🔧 개발 가이드

### MVP 개발 일정 (6주)

#### Week 1-2: 기획 및 기반 구축
- 비즈니스 모델 검증
- ERD 설계 및 DB 구축
- 기본 UI/UX 설계
- 프로젝트 아키텍처 구성

#### Week 3-4: 핵심 기능 개발
- 사용자 인증 시스템
- 예약 시스템 구현
- 결제 시스템 연동
- AI 서비스 통합

#### Week 5-6: 완성 및 최적화
- 관리자 대시보드
- 자동화 시스템 구축
- 테스트 및 QA
- 성능 최적화

### 코딩 컨벤션
- **언어**: TypeScript 사용
- **스타일**: ESLint + Prettier 설정 준수
- **커밋**: Conventional Commits 규칙
- **브랜치**: Git Flow 전략 사용

## 🧪 테스트

### 테스트 전략
- **단위 테스트**: Vitest로 핵심 비즈니스 로직
- **통합 테스트**: API 엔드포인트 검증
- **E2E 테스트**: Playwright로 사용자 시나리오
- **성능 테스트**: 부하 테스트 및 최적화

```bash
# 전체 테스트
pnpm test

# 특정 패키지 테스트
pnpm test --filter=@repo/database

# E2E 테스트
pnpm test:e2e

# 테스트 커버리지
pnpm test:coverage
```

## 🚀 배포

### 배포 환경
- **Production**: Vercel (프론트엔드/API)
- **Database**: Supabase/Neon PostgreSQL
- **Cache**: Redis Cloud
- **Monitoring**: Sentry, Vercel Analytics

### CI/CD 파이프라인
1. **코드 푸시** → GitHub Actions 트리거
2. **테스트 실행** → 단위/통합/E2E 테스트
3. **빌드** → Next.js 앱 빌드
4. **배포** → Vercel 자동 배포
5. **모니터링** → 배포 상태 Slack 알림

## 📊 모니터링

### 성능 지표
- **응답 시간**: API 평균 응답 시간 < 200ms
- **가용성**: 99.9% 업타임 목표
- **에러율**: < 1% 에러율 유지
- **사용자 경험**: Core Web Vitals 최적화

### 알림 시스템
- **에러 알림**: Sentry → Slack
- **성능 알림**: Vercel Analytics
- **비즈니스 메트릭**: 커스텀 대시보드

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 개발 가이드라인
- 코드 리뷰 필수
- 테스트 커버리지 80% 이상 유지
- TypeScript strict 모드 준수
- 접근성(a11y) 가이드라인 준수

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

- **팀 리드**: 민시우 - [contact@example.com](mailto:contact@example.com)
- **프로젝트**: 소나무 - [project@example.com](mailto:project@example.com)
- **멘토**: 이영희 교수님 - KOSA 한국소프트웨어산업협회

## 🙏 감사의 말

이 프로젝트는 KOSA(한국소프트웨어산업협회)의 지원을 받아 개발되었습니다. 멘토링을 제공해주신 이영희 교수님과 모든 관계자분들께 감사드립니다.

---

**ConnectWon** - 도전하는 모든 이에게 공정한 기회와 지속되는 연결의 장을 제공합니다. 💪

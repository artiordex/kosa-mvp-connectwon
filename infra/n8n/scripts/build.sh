#!/bin/bash

# Description : build.sh - 📌 프론트엔드와 백엔드를 빌드하는 스크립트
# Author : Shiwoo Min
# Date : 2025-09-22

set -e  # 에러 발생시 즉시 종료

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 환경 변수 설정
ENV=${1:-"development"}
BUILD_DIR="./dist"
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"

log_info "ConnectWon MVP 빌드 시작 (환경: $ENV)"

# Node.js 버전 체크
check_node_version() {
    log_info "Node.js 버전 확인 중..."

    if ! command -v node &> /dev/null; then
        log_error "Node.js가 설치되어 있지 않습니다."
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2)
    REQUIRED_VERSION="18.0.0"

    if ! npx semver -r ">=$REQUIRED_VERSION" "$NODE_VERSION" &> /dev/null; then
        log_error "Node.js 버전 $REQUIRED_VERSION 이상이 필요합니다. (현재: $NODE_VERSION)"
        exit 1
    fi

    log_success "Node.js 버전 확인 완료: v$NODE_VERSION"
}

# 의존성 설치
install_dependencies() {
    log_info "의존성 설치 중..."

    # 루트 의존성 설치
    if [ -f "package.json" ]; then
        pnpm install --frozen-lockfile
    fi

    # 프론트엔드 의존성 설치
    if [ -d "$FRONTEND_DIR" ] && [ -f "$FRONTEND_DIR/package.json" ]; then
        log_info "프론트엔드 의존성 설치 중..."
        cd "$FRONTEND_DIR"
        pnpm install --frozen-lockfile
        cd ..
    fi

    # 백엔드 의존성 설치
    if [ -d "$BACKEND_DIR" ] && [ -f "$BACKEND_DIR/package.json" ]; then
        log_info "백엔드 의존성 설치 중..."
        cd "$BACKEND_DIR"
        pnpm install --frozen-lockfile
        cd ..
    fi

    log_success "의존성 설치 완료"
}

# 환경별 설정 파일 복사
setup_env_config() {
    log_info "환경별 설정 파일 구성 중..."

    # 프론트엔드 환경 파일
    if [ -d "$FRONTEND_DIR" ]; then
        if [ -f "$FRONTEND_DIR/.env.$ENV" ]; then
            cp "$FRONTEND_DIR/.env.$ENV" "$FRONTEND_DIR/.env"
            log_success "프론트엔드 환경 파일 설정 완료: .env.$ENV"
        else
            log_warning "프론트엔드 환경 파일이 없습니다: .env.$ENV"
        fi
    fi

    # 백엔드 환경 파일
    if [ -d "$BACKEND_DIR" ]; then
        if [ -f "$BACKEND_DIR/.env.$ENV" ]; then
            cp "$BACKEND_DIR/.env.$ENV" "$BACKEND_DIR/.env"
            log_success "백엔드 환경 파일 설정 완료: .env.$ENV"
        else
            log_warning "백엔드 환경 파일이 없습니다: .env.$ENV"
        fi
    fi
}

# TypeScript 타입 체크
type_check() {
    log_info "TypeScript 타입 체크 실행 중..."

    # 프론트엔드 타입 체크
    if [ -d "$FRONTEND_DIR" ] && [ -f "$FRONTEND_DIR/tsconfig.json" ]; then
        cd "$FRONTEND_DIR"
        pnpm run type-check || npx tsc --noEmit
        cd ..
        log_success "프론트엔드 타입 체크 완료"
    fi

    # 백엔드 타입 체크
    if [ -d "$BACKEND_DIR" ] && [ -f "$BACKEND_DIR/tsconfig.json" ]; then
        cd "$BACKEND_DIR"
        pnpm run type-check || npx tsc --noEmit
        cd ..
        log_success "백엔드 타입 체크 완료"
    fi
}

# 린트 검사
lint_check() {
    log_info "코드 린트 검사 실행 중..."

    # 프론트엔드 린트
    if [ -d "$FRONTEND_DIR" ] && [ -f "$FRONTEND_DIR/.eslintrc.json" ]; then
        cd "$FRONTEND_DIR"
        pnpm run lint || npx eslint . --ext .ts,.tsx,.js,.jsx
        cd ..
        log_success "프론트엔드 린트 검사 완료"
    fi

    # 백엔드 린트
    if [ -d "$BACKEND_DIR" ] && [ -f "$BACKEND_DIR/.eslintrc.json" ]; then
        cd "$BACKEND_DIR"
        pnpm run lint || npx eslint . --ext .ts,.js
        cd ..
        log_success "백엔드 린트 검사 완료"
    fi
}

# 빌드 실행
build_project() {
    log_info "프로젝트 빌드 실행 중..."

    # 빌드 디렉토리 정리
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"

    # 백엔드 빌드 (프론트엔드보다 먼저)
    if [ -d "$BACKEND_DIR" ]; then
        log_info "백엔드 빌드 중..."
        cd "$BACKEND_DIR"

        if [ -f "package.json" ] && grep -q '"build"' package.json; then
            pnpm run build
        else
            npx tsc
        fi

        # 빌드 결과물 복사
        if [ -d "dist" ]; then
            cp -r dist/* "../$BUILD_DIR/"
        elif [ -d "build" ]; then
            cp -r build/* "../$BUILD_DIR/"
        fi

        cd ..
        log_success "백엔드 빌드 완료"
    fi

    # 프론트엔드 빌드
    if [ -d "$FRONTEND_DIR" ]; then
        log_info "프론트엔드 빌드 중..."
        cd "$FRONTEND_DIR"

        if [ -f "package.json" ] && grep -q '"build"' package.json; then
            pnpm run build
        else
            npx next build || npx vite build
        fi

        # 빌드 결과물 복사
        if [ -d ".next" ]; then
            cp -r .next "../$BUILD_DIR/frontend"
            cp -r public "../$BUILD_DIR/public" 2>/dev/null || true
        elif [ -d "dist" ]; then
            cp -r dist "../$BUILD_DIR/frontend"
        elif [ -d "build" ]; then
            cp -r build "../$BUILD_DIR/frontend"
        fi

        cd ..
        log_success "프론트엔드 빌드 완료"
    fi
}

# 빌드 후 검증
verify_build() {
    log_info "빌드 결과 검증 중..."

    if [ ! -d "$BUILD_DIR" ]; then
        log_error "빌드 디렉토리가 생성되지 않았습니다."
        exit 1
    fi

    BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
    log_success "빌드 완료! 크기: $BUILD_SIZE"

    # 주요 파일들 존재 확인
    if [ -d "$BUILD_DIR/frontend" ]; then
        log_success "프론트엔드 빌드 파일 확인됨"
    fi

    if [ -f "$BUILD_DIR/package.json" ] || [ -f "$BUILD_DIR/server.js" ] || [ -f "$BUILD_DIR/index.js" ]; then
        log_success "백엔드 빌드 파일 확인됨"
    fi
}

# 메인 실행
main() {
    log_info "===================="
    log_info "ConnectWon MVP Build"
    log_info "Environment: $ENV"
    log_info "===================="

    check_node_version
    install_dependencies
    setup_env_config
    type_check
    lint_check
    build_project
    verify_build

    log_success "✨ 빌드가 성공적으로 완료되었습니다!"
    log_info "빌드 결과물: $BUILD_DIR"
}

# 스크립트 실행
main "$@"

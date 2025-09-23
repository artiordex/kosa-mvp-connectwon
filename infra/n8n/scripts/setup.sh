#!/bin/bash

# Description : setup.sh - 📌 개발 환경 초기 설정을 위한 스크립트
# Author : Shiwoo Min
# Date : 2025-09-22
set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

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

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# 시스템 정보 확인
check_system() {
    log_step "시스템 환경 확인 중..."

    OS=$(uname -s)
    ARCH=$(uname -m)

    log_info "운영체제: $OS"
    log_info "아키텍처: $ARCH"

    if [[ "$OS" == "Darwin" ]]; then
        log_info "macOS 감지됨"
        PACKAGE_MANAGER="brew"
    elif [[ "$OS" == "Linux" ]]; then
        log_info "Linux 감지됨"
        if command -v apt-get &> /dev/null; then
            PACKAGE_MANAGER="apt"
        elif command -v yum &> /dev/null; then
            PACKAGE_MANAGER="yum"
        elif command -v pacman &> /dev/null; then
            PACKAGE_MANAGER="pacman"
        fi
    elif [[ "$OS" == MINGW* ]] || [[ "$OS" == "MSYS"* ]]; then
        log_info "Windows (Git Bash/WSL) 감지됨"
        PACKAGE_MANAGER="manual"
    fi
}

# Node.js 설치 및 확인
setup_nodejs() {
    log_step "Node.js 설정 중..."

    # Node.js 설치 확인
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        log_success "Node.js 설치됨: $NODE_VERSION"

        # 버전 확인 (18.0.0 이상 필요)
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            log_warning "Node.js 18.0.0 이상을 권장합니다. 현재: $NODE_VERSION"
        fi
    else
        log_warning "Node.js가 설치되어 있지 않습니다."

        # NVM을 통한 Node.js 설치 시도
        if command -v nvm &> /dev/null; then
            log_info "NVM을 통해 Node.js LTS 설치 중..."
            nvm install --lts
            nvm use --lts
        else
            log_info "NVM 설치 중..."
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

            nvm install --lts
            nvm use --lts
        fi
    fi
}

# pnpm 설치 및 확인
setup_pnpm() {
    log_step "pnpm 설정 중..."

    if command -v pnpm &> /dev/null; then
        PNPM_VERSION=$(pnpm -v)
        log_success "pnpm 설치됨: v$PNPM_VERSION"
    else
        log_info "pnpm 설치 중..."
        npm install -g pnpm
        log_success "pnpm 설치 완료"
    fi

    # pnpm 설정
    pnpm config set registry https://registry.npmjs.org/
    pnpm config set store-dir ~/.pnpm-store
}

# Git 설정 확인
setup_git() {
    log_step "Git 설정 확인 중..."

    if ! command -v git &> /dev/null; then
        log_error "Git이 설치되어 있지 않습니다."
        case $PACKAGE_MANAGER in
            "brew")
                brew install git
                ;;
            "apt")
                sudo apt-get update && sudo apt-get install -y git
                ;;
            "yum")
                sudo yum install -y git
                ;;
            *)
                log_error "Git을 수동으로 설치해주세요."
                exit 1
                ;;
        esac
    fi

    # Git 사용자 정보 확인
    if ! git config user.name &> /dev/null; then
        echo -n "Git 사용자 이름을 입력하세요: "
        read -r GIT_NAME
        git config --global user.name "$GIT_NAME"
    fi

    if ! git config user.email &> /dev/null; then
        echo -n "Git 이메일을 입력하세요: "
        read -r GIT_EMAIL
        git config --global user.email "$GIT_EMAIL"
    fi

    log_success "Git 사용자: $(git config user.name) <$(git config user.email)>"
}

# Docker 설치 확인 (선택사항)
setup_docker() {
    log_step "Docker 설정 확인 중..."

    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        log_success "Docker 설치됨: $DOCKER_VERSION"

        # Docker Compose 확인
        if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
            log_success "Docker Compose 사용 가능"
        else
            log_warning "Docker Compose가 설치되어 있지 않습니다."
        fi
    else
        log_warning "Docker가 설치되어 있지 않습니다. (개발용 데이터베이스 등에 필요할 수 있음)"

        echo -n "Docker를 설치하시겠습니까? (y/N): "
        read -r INSTALL_DOCKER

        if [[ $INSTALL_DOCKER =~ ^[Yy]$ ]]; then
            case $PACKAGE_MANAGER in
                "brew")
                    brew install --cask docker
                    ;;
                "apt")
                    curl -fsSL https://get.docker.com -o get-docker.sh
                    sudo sh get-docker.sh
                    sudo usermod -aG docker $USER
                    ;;
                *)
                    log_info "Docker 공식 웹사이트에서 설치해주세요: https://docs.docker.com/get-docker/"
                    ;;
            esac
        fi
    fi
}

# 개발 도구 설치
setup_dev_tools() {
    log_step "개발 도구 설정 중..."

    # 전역 패키지 설치
    GLOBAL_PACKAGES=(
        "typescript"
        "@typescript-eslint/cli"
        "prettier"
        "concurrently"
        "nodemon"
        "pm2"
    )

    log_info "전역 패키지 설치 중..."
    for package in "${GLOBAL_PACKAGES[@]}"; do
        pnpm add -g "$package"
    done

    log_success "개발 도구 설치 완료"
}

# 환경 파일 생성
setup_env_files() {
    log_step "환경 파일 생성 중..."

    # 루트 환경 파일
    if [ ! -f ".env" ]; then
        cat > .env << 'EOF'
# ConnectWon MVP Environment Variables

# 환경 설정
NODE_ENV=development
PORT=3000

# 데이터베이스 설정
DATABASE_URL=postgresql://username:password@localhost:5432/connectwon_dev
REDIS_URL=redis://localhost:6379

# JWT 설정
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# API 설정
API_BASE_URL=http://localhost:3000/api

# 외부 서비스 설정
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=

# 파일 업로드 설정
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,application/pdf

# 로그 설정
LOG_LEVEL=debug
LOG_FILE=./logs/app.log
EOF
        log_success ".env 파일 생성됨"
    fi

    # 개발환경별 파일들
    for env in development staging production; do
        if [ ! -f ".env.$env" ]; then
            cp .env ".env.$env"
            log_info ".env.$env 파일 생성됨 (기본값 사용)"
        fi
    done
}

# 프로젝트 의존성 설치
install_dependencies() {
    log_step "프로젝트 의존성 설치 중..."

    # 루트 의존성
    if [ -f "package.json" ]; then
        pnpm install
        log_success "루트 의존성 설치 완료"
    fi

    # 프론트엔드 의존성
    if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
        log_info "프론트엔드 의존성 설치 중..."
        cd frontend
        pnpm install
        cd ..
        log_success "프론트엔드 의존성 설치 완료"
    fi

    # 백엔드 의존성
    if [ -d "backend" ] && [ -f "backend/package.json" ]; then
        log_info "백엔드 의존성 설치 중..."
        cd backend
        pnpm install
        cd ..
        log_success "백엔드 의존성 설치 완료"
    fi
}

# Git hooks 설정
setup_git_hooks() {
    log_step "Git hooks 설정 중..."

    if [ -d ".git" ]; then
        # Husky 설치 및 설정 (있는 경우)
        if [ -f "package.json" ] && grep -q '"husky"' package.json; then
            pnpm exec husky install
            log_success "Husky hooks 설정 완료"
        fi

        # 기본 pre-commit hook 생성
        mkdir -p .git/hooks
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Pre-commit checks..."

# ESLint 검사
if command -v pnpm &> /dev/null; then
    pnpm run lint || exit 1
fi

# TypeScript 컴파일 검사
if [ -f "tsconfig.json" ]; then
    pnpm run type-check || exit 1
fi

echo "✅ Pre-commit checks passed!"
EOF
        chmod +x .git/hooks/pre-commit
        log_success "Git pre-commit hook 설정 완료"
    fi
}

# 개발 서버 테스트
test_setup() {
    log_step "설정 테스트 중..."

    # Node.js 및 pnpm 버전 확인
    log_info "Node.js: $(node -v)"
    log_info "pnpm: v$(pnpm -v)"

    # TypeScript 컴파일 테스트
    if [ -f "tsconfig.json" ]; then
        log_info "TypeScript 설정 확인 중..."
        npx tsc --noEmit || log_warning "TypeScript 설정에 문제가 있을 수 있습니다."
    fi

    log_success "기본 설정 테스트 완료"
}

# 완료 메시지 및 다음 단계 안내
show_completion_message() {
    log_step "설정 완료!"
    echo ""
    echo "🎉 ConnectWon MVP 개발 환경 설정이 완료되었습니다!"
    echo ""
    echo "📋 다음 단계:"
    echo "   1. .env 파일의 설정값들을 확인하고 수정해주세요"
    echo "   2. 데이터베이스 연결 정보를 설정해주세요"
    echo "   3. 개발 서버를 시작하세요:"
    echo "      $ pnpm run dev"
    echo ""
    echo "🛠 유용한 명령어들:"
    echo "   $ pnpm run build     # 프로젝트 빌드"
    echo "   $ pnpm run test      # 테스트 실행"
    echo "   $ pnpm run lint      # 코드 린트 검사"
    echo "   $ pnpm run dev       # 개발 서버 시작"
    echo ""
    echo "📚 문서: https://github.com/connectwon/mvp#readme"
}

# 메인 실행 함수
main() {
    echo "🚀 ConnectWon MVP 개발 환경 설정을 시작합니다..."
    echo ""

    check_system
    setup_nodejs
    setup_pnpm
    setup_git
    setup_docker
    setup_dev_tools
    setup_env_files
    install_dependencies
    setup_git_hooks
    test_setup
    show_completion_message
}

# 스크립트 실행
main "$@"

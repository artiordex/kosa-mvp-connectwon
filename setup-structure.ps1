# setup-structure.ps1
# ConnectWon MVP project folder structure setup with NX

$root = Get-Location
if (Test-Path $root) {
    Write-Host "Directory $root already exists. Proceeding..."
    Set-Location $root
} else {
    New-Item -ItemType Directory -Force -Path $root | Out-Null
    Set-Location $root
}

# Function to create directory and empty files
function Make-DirsAndFiles($dirs, $files) {
    foreach ($d in $dirs) {
        New-Item -ItemType Directory -Force -Path $d | Out-Null
    }
    foreach ($f in $files) {
        if (-not (Test-Path $f)) {
            New-Item -ItemType File -Force -Path $f | Out-Null
        }
    }
}

Write-Host "Creating ConnectWon project structure..."

# .github/workflows
Make-DirsAndFiles @(".github\workflows") @(
    ".github\workflows\ci.yml",
    ".github\workflows\deploy.yml"
)

# .vscode
Make-DirsAndFiles @(".vscode") @(
    ".vscode\settings.json",
    ".vscode\extensions.json",
    ".vscode\launch.json",
    ".vscode\tasks.json"
)

# apps structure
Write-Host "Creating apps structure..."

# apps/web (Next.js User App)
Make-DirsAndFiles @(
    "apps\web\src\app\(auth)\login",
    "apps\web\src\app\(auth)\signup",
    "apps\web\src\app\programs\[id]",
    "apps\web\src\app\booking\[id]",
    "apps\web\src\app\booking\success",
    "apps\web\src\app\mypage\bookings",
    "apps\web\src\app\mypage\profile",
    "apps\web\src\app\mypage\points",
    "apps\web\src\app\venues\[id]",
    "apps\web\src\app\api\auth\[...nextauth]",
    "apps\web\src\app\api\webhooks\stripe",
    "apps\web\src\app\api\proxy\[...path]",
    "apps\web\src\components\layout",
    "apps\web\src\components\ui",
    "apps\web\src\components\features\auth",
    "apps\web\src\components\features\booking",
    "apps\web\src\components\features\programs",
    "apps\web\src\components\features\profile",
    "apps\web\src\components\providers",
    "apps\web\src\lib",
    "apps\web\src\hooks",
    "apps\web\src\styles",
    "apps\web\src\types",
    "apps\web\public\images",
    "apps\web\public\icons"
) @(
    "apps\web\project.json",
    "apps\web\next.config.js",
    "apps\web\package.json",
    "apps\web\tailwind.config.js",
    "apps\web\tsconfig.json",
    "apps\web\.env.local.example",
    "apps\web\src\app\(auth)\layout.tsx",
    "apps\web\src\app\(auth)\login\page.tsx",
    "apps\web\src\app\(auth)\signup\page.tsx",
    "apps\web\src\app\programs\page.tsx",
    "apps\web\src\app\programs\[id]\page.tsx",
    "apps\web\src\app\programs\loading.tsx",
    "apps\web\src\app\booking\page.tsx",
    "apps\web\src\app\booking\[id]\page.tsx",
    "apps\web\src\app\booking\success\page.tsx",
    "apps\web\src\app\mypage\page.tsx",
    "apps\web\src\app\mypage\bookings\page.tsx",
    "apps\web\src\app\mypage\profile\page.tsx",
    "apps\web\src\app\mypage\points\page.tsx",
    "apps\web\src\app\venues\page.tsx",
    "apps\web\src\app\venues\[id]\page.tsx",
    "apps\web\src\app\api\auth\[...nextauth]\route.ts",
    "apps\web\src\app\api\webhooks\stripe\route.ts",
    "apps\web\src\app\api\proxy\[...path]\route.ts",
    "apps\web\src\app\globals.css",
    "apps\web\src\app\layout.tsx",
    "apps\web\src\app\page.tsx",
    "apps\web\src\app\loading.tsx",
    "apps\web\src\app\error.tsx",
    "apps\web\src\app\not-found.tsx"
)

# apps/admin (Next.js Admin App)
Make-DirsAndFiles @(
    "apps\admin\src\app\(auth)\login",
    "apps\admin\src\app\dashboard\components",
    "apps\admin\src\app\users\[id]\edit",
    "apps\admin\src\app\users\components",
    "apps\admin\src\app\venues\[id]\edit",
    "apps\admin\src\app\venues\[id]\rooms\[roomId]",
    "apps\admin\src\app\venues\components",
    "apps\admin\src\app\programs\[id]\edit",
    "apps\admin\src\app\programs\[id]\sessions",
    "apps\admin\src\app\programs\components",
    "apps\admin\src\app\bookings\[id]",
    "apps\admin\src\app\bookings\components",
    "apps\admin\src\app\settings\notifications",
    "apps\admin\src\app\settings\ai",
    "apps\admin\src\app\settings\payments",
    "apps\admin\src\components\layout",
    "apps\admin\src\components\ui",
    "apps\admin\src\components\charts",
    "apps\admin\src\lib",
    "apps\admin\src\hooks"
) @(
    "apps\admin\project.json",
    "apps\admin\next.config.js",
    "apps\admin\package.json",
    "apps\admin\tailwind.config.js",
    "apps\admin\tsconfig.json",
    "apps\admin\.env.local.example",
    "apps\admin\src\app\(auth)\login\page.tsx",
    "apps\admin\src\app\(auth)\layout.tsx",
    "apps\admin\src\app\dashboard\page.tsx",
    "apps\admin\src\app\users\page.tsx",
    "apps\admin\src\app\venues\page.tsx",
    "apps\admin\src\app\programs\page.tsx",
    "apps\admin\src\app\bookings\page.tsx",
    "apps\admin\src\app\settings\page.tsx",
    "apps\admin\src\app\globals.css",
    "apps\admin\src\app\layout.tsx",
    "apps\admin\src\app\loading.tsx",
    "apps\admin\src\app\error.tsx"
)

# apps/api (Fastify Backend)
Make-DirsAndFiles @(
    "apps\api\src\routes\auth",
    "apps\api\src\routes\users",
    "apps\api\src\routes\venues\[id]",
    "apps\api\src\routes\programs\[id]",
    "apps\api\src\routes\bookings",
    "apps\api\src\routes\payments",
    "apps\api\src\routes\ai",
    "apps\api\src\routes\admin",
    "apps\api\src\middleware",
    "apps\api\src\services",
    "apps\api\src\jobs",
    "apps\api\src\utils",
    "apps\api\src\config",
    "apps\api\src\types",
    "apps\api\src\plugins"
) @(
    "apps\api\project.json",
    "apps\api\package.json",
    "apps\api\tsconfig.json",
    "apps\api\Dockerfile",
    "apps\api\.env.example",
    "apps\api\ecosystem.config.js",
    "apps\api\src\app.ts",
    "apps\api\src\server.ts"
)

# apps/e2e (Playwright Tests)
Make-DirsAndFiles @(
    "apps\e2e\tests\auth",
    "apps\e2e\tests\user",
    "apps\e2e\tests\admin",
    "apps\e2e\tests\api",
    "apps\e2e\fixtures",
    "apps\e2e\support",
    "apps\e2e\config"
) @(
    "apps\e2e\project.json",
    "apps\e2e\package.json",
    "apps\e2e\playwright.config.ts",
    "apps\e2e\tsconfig.json",
    "apps\e2e\tests\auth\login.spec.ts",
    "apps\e2e\tests\user\booking-flow.spec.ts",
    "apps\e2e\tests\admin\dashboard.spec.ts"
)

# packages structure
Write-Host "Creating packages structure..."

$packages = @("database", "ui", "api-contract", "core", "email", "testing")
foreach ($pkg in $packages) {
    Make-DirsAndFiles @("packages\$pkg\src") @(
        "packages\$pkg\project.json",
        "packages\$pkg\package.json",
        "packages\$pkg\tsconfig.json"
    )
}

# packages/database specific
Make-DirsAndFiles @(
    "packages\database\prisma\migrations",
    "packages\database\prisma\seeds"
) @(
    "packages\database\prisma\schema.prisma",
    "packages\database\prisma\dev.db",
    "packages\database\src\client.ts",
    "packages\database\src\types.ts",
    "packages\database\src\utils.ts"
)

# packages/ui specific
Make-DirsAndFiles @(
    "packages\ui\src\components\ui",
    "packages\ui\src\components\forms",
    "packages\ui\src\components\layout",
    "packages\ui\src\hooks",
    "packages\ui\src\utils"
) @(
    "packages\ui\tailwind.config.js",
    "packages\ui\src\index.ts"
)

# packages/api-contract specific
Make-DirsAndFiles @("packages\api-contract\src\schemas") @(
    "packages\api-contract\src\schemas\auth.ts",
    "packages\api-contract\src\schemas\users.ts",
    "packages\api-contract\src\schemas\venues.ts",
    "packages\api-contract\src\schemas\programs.ts",
    "packages\api-contract\src\schemas\bookings.ts",
    "packages\api-contract\src\schemas\payments.ts",
    "packages\api-contract\src\schemas\common.ts",
    "packages\api-contract\src\types.ts",
    "packages\api-contract\src\client.ts",
    "packages\api-contract\src\index.ts"
)

# packages/core specific
Make-DirsAndFiles @(
    "packages\core\src\domain\auth",
    "packages\core\src\domain\user",
    "packages\core\src\domain\booking",
    "packages\core\src\domain\payment",
    "packages\core\src\domain\venue",
    "packages\core\src\utils",
    "packages\core\src\types"
) @()

# packages/email specific
Make-DirsAndFiles @(
    "packages\email\src\templates",
    "packages\email\src\services",
    "packages\email\src\utils"
) @(
    "packages\email\src\index.ts"
)

# packages/testing specific
Make-DirsAndFiles @(
    "packages\testing\src\setup",
    "packages\testing\src\fixtures",
    "packages\testing\src\helpers",
    "packages\testing\src\mocks"
) @()

# configs structure
Make-DirsAndFiles @(
    "configs\eslint",
    "configs\tailwind",
    "configs\typescript"
) @(
    "configs\eslint\base.js",
    "configs\eslint\next.js",
    "configs\eslint\node.js",
    "configs\eslint\react.js",
    "configs\tailwind\base.js",
    "configs\tailwind\admin.js",
    "configs\tailwind\web.js",
    "configs\typescript\base.json",
    "configs\typescript\nextjs.json",
    "configs\typescript\node.json",
    "configs\typescript\react.json"
)

# docker structure
Make-DirsAndFiles @("docker") @(
    "docker\docker-compose.yml",
    "docker\docker-compose.prod.yml",
    "docker\docker-compose.test.yml",
    "docker\Dockerfile.api",
    "docker\Dockerfile.base",
    "docker\nginx.conf"
)

# docs structure
Make-DirsAndFiles @(
    "docs\api",
    "docs\deployment",
    "docs\development"
) @(
    "docs\README.md",
    "docs\api\README.md",
    "docs\deployment\README.md",
    "docs\development\setup.md"
)

# scripts
Make-DirsAndFiles @("scripts") @(
    "scripts\setup.sh",
    "scripts\seed-data.ts",
    "scripts\build.sh",
    "scripts\test.sh",
    "scripts\deploy.sh",
    "scripts\cleanup.sh"
)

# Root configuration files
$rootFiles = @(
    ".env.example",
    ".gitignore",
    ".eslintrc.js",
    ".prettierrc.json",
    "nx.json",
    "package.json",
    "pnpm-workspace.yaml",
    "tsconfig.base.json",
    "README.md"
)

foreach ($f in $rootFiles) {
    if (-not (Test-Path $f)) {
        New-Item -ItemType File -Force -Path $f | Out-Null
    }
}

Write-Host "ConnectWon project structure created successfully!"
Write-Host "Next steps:"
Write-Host "1. Run: pnpm install"
Write-Host "2. Setup database: cd packages/database && pnpm prisma generate"
Write-Host "3. Start development: pnpm dev"

# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# .\setup-structure.ps1

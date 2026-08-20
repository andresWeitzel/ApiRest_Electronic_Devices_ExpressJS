#Requires -Version 5.1
<#
.SYNOPSIS
  Build and start the full local stack: PostgreSQL + API (ApiRest Electronic Devices).

.DESCRIPTION
  IMPORTANT: Open Docker Desktop yourself and wait until "Engine running".
  This script does NOT start Docker Desktop.

  From the repo root:
    .\scripts\docker\Start-Stack-Docker.ps1
  Or double-click:
    scripts\docker\Start-Stack-Docker.bat
  Or:
    npm run docker:up

  Linux/macOS:
    ./scripts/docker/Start-Stack-Docker.sh

  Services:
    - postgres  -> dispositivos_electronicos_postgres  (localhost:5432)
    - api       -> dispositivos_electronicos_api       (localhost:8082)

.PARAMETER SkipStart
  Build only; do not run "docker compose up -d".

.PARAMETER SkipBuild
  Do not rebuild the API image (only recreate/start containers).

.PARAMETER Clean
  docker compose down --remove-orphans before build/start (keeps DB volume).

.PARAMETER ResetData
  Also remove volumes (wipes DB + re-seed on next postgres boot).

.PARAMETER DbOnly
  Start only the postgres service (no API container).
#>
param(
  [switch]$SkipStart,
  [switch]$SkipBuild,
  [switch]$Clean,
  [switch]$ResetData,
  [switch]$DbOnly
)

$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $RepoRoot

$ApiContainer = "dispositivos_electronicos_api"
$DbContainer = "dispositivos_electronicos_postgres"
$ApiService = "api"
$DbService = "postgres"
$ImageName = "apirest-electronic-devices:local"
$LauncherRel = "scripts\docker\Start-Stack-Docker"

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Test-DockerCli {
  return ($null -ne (Get-Command docker -ErrorAction SilentlyContinue))
}

function Test-DockerEngine {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  docker info 1>$null 2>$null
  $ok = ($LASTEXITCODE -eq 0)
  $ErrorActionPreference = $prev
  return $ok
}

function Assert-DockerEngineReady {
  if (-not (Test-DockerCli)) {
    throw "docker CLI not found. Install Docker Desktop, open it, wait for Engine running, then re-run this script."
  }
  if (Test-DockerEngine) {
    Write-Host "Docker engine is ready."
    return
  }
  $msg = "Docker engine is NOT ready.`n`n" +
    "Do this manually (this script will NOT start Docker Desktop):`n" +
    "  1. Quit Docker Desktop completely if it is stuck (system tray > Quit)`n" +
    "  2. Open Docker Desktop from the Start menu`n" +
    "  3. Wait until it says Engine running`n" +
    "  4. Re-run: $LauncherRel.bat  (or npm run docker:up)`n"
  throw $msg
}

function Ensure-EnvFile {
  $envPath = Join-Path $RepoRoot ".env"
  $examplePath = Join-Path $RepoRoot ".env.example"
  if (Test-Path $envPath) {
    Write-Host ".env found."
    return
  }
  if (Test-Path $examplePath) {
    Copy-Item $examplePath $envPath
    Write-Host "Created .env from .env.example" -ForegroundColor Yellow
    return
  }
  Write-Host "WARNING: No .env or .env.example found." -ForegroundColor Yellow
}

function Clear-ProjectContainers {
  param([switch]$WithVolumes)
  if ($WithVolumes) {
    Write-Step "Cleaning compose containers + volumes (DB data will be wiped)"
    docker compose down --remove-orphans -v
  } else {
    Write-Step "Cleaning leftover compose containers for this project"
    docker compose down --remove-orphans
  }
  if ($LASTEXITCODE -ne 0) { throw "docker compose down failed" }
}

function Wait-ContainerHealthy {
  param(
    [string]$Name,
    [int]$Seconds = 120
  )
  $deadline = (Get-Date).AddSeconds($Seconds)
  while ((Get-Date) -lt $deadline) {
    $status = docker inspect -f "{{.State.Health.Status}}" $Name 2>$null
    if ($status -eq "healthy") {
      Write-Host "Container is healthy: $Name"
      return
    }
    $running = docker inspect -f "{{.State.Running}}" $Name 2>$null
    if ($running -ne "true" -and $running -ne "") {
      Start-Sleep -Seconds 2
      continue
    }
    Start-Sleep -Seconds 2
  }
  $running = docker inspect -f "{{.State.Running}}" $Name 2>$null
  if ($running -eq "true") {
    Write-Host "Container is running (health still warming up): $Name" -ForegroundColor Yellow
    return
  }
  throw "Container $Name did not become ready. Check: docker compose logs"
}

Write-Host "ApiRest Electronic Devices - Docker stack (Postgres + API)"
Write-Host "Repo: $RepoRoot"
Write-Host "Note: Open Docker Desktop first. This script will not start it."

Assert-DockerEngineReady
Ensure-EnvFile

if ($ResetData) {
  Clear-ProjectContainers -WithVolumes
} elseif ($Clean) {
  Clear-ProjectContainers
}

if (-not $SkipBuild -and -not $DbOnly) {
  Write-Step "Building image $ImageName"
  docker compose build $ApiService
  if ($LASTEXITCODE -ne 0) { throw "docker compose build failed" }
}

if (-not $SkipStart) {
  if ($DbOnly) {
    Write-Step "Starting postgres only"
    docker compose up -d --force-recreate --remove-orphans $DbService
    if ($LASTEXITCODE -ne 0) { throw "docker compose up failed" }
    Wait-ContainerHealthy -Name $DbContainer -Seconds 90
  } else {
    Write-Step "Starting stack (postgres + api) detached"
    docker compose up -d --force-recreate --remove-orphans
    if ($LASTEXITCODE -ne 0) { throw "docker compose up failed" }
    Wait-ContainerHealthy -Name $DbContainer -Seconds 90
    Wait-ContainerHealthy -Name $ApiContainer -Seconds 120
  }
}

Write-Step "Done"
Write-Host ""
Write-Step "Compose status"
docker compose ps
Write-Host ""
Write-Host "What you have now:"
Write-Host "  IMAGE     : $ImageName"
Write-Host "  POSTGRES  : $DbContainer  -> localhost:5432"
if (-not $DbOnly) {
  Write-Host "  API       : $ApiContainer -> http://localhost:8082"
  Write-Host "  HEALTH    : http://localhost:8082/health"
  Write-Host "  SWAGGER   : http://localhost:8082/api-docs"
}
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Green
Write-Host "  Containers run detached (-d). Closing this window does NOT stop them."
Write-Host "  Control Start/Stop from Docker Desktop, or: docker compose stop / start"
Write-Host ""
Write-Host "On re-run (code changes):"
Write-Host "  - Run the .bat again (build + recreate API)"
Write-Host "  - Fresh DB seed: npm run docker:reset"
Write-Host "  - Postgres only: .\scripts\docker\Start-Stack-Docker.ps1 -DbOnly"
Write-Host "  - Host npm still works if you only need Postgres: -DbOnly then npm run start:dev"
Write-Host ""

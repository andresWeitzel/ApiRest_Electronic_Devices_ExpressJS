#!/usr/bin/env bash
# Build + start full stack: PostgreSQL + API (Linux / macOS).
# Prerequisite: Docker Engine running.
#
# Usage (from repo root):
#   chmod +x scripts/docker/Start-Stack-Docker.sh
#   ./scripts/docker/Start-Stack-Docker.sh
#   ./scripts/docker/Start-Stack-Docker.sh --clean
#   ./scripts/docker/Start-Stack-Docker.sh --reset-data
#   ./scripts/docker/Start-Stack-Docker.sh --db-only
#   ./scripts/docker/Start-Stack-Docker.sh --skip-build
#   ./scripts/docker/Start-Stack-Docker.sh --skip-start

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

API_CONTAINER="dispositivos_electronicos_api"
DB_CONTAINER="dispositivos_electronicos_postgres"
API_SERVICE="api"
DB_SERVICE="postgres"
IMAGE_NAME="apirest-electronic-devices:local"

SKIP_START=0
SKIP_BUILD=0
CLEAN=0
RESET_DATA=0
DB_ONLY=0

for arg in "$@"; do
  case "$arg" in
    --skip-start) SKIP_START=1 ;;
    --skip-build) SKIP_BUILD=1 ;;
    --clean) CLEAN=1 ;;
    --reset-data) RESET_DATA=1 ;;
    --db-only) DB_ONLY=1 ;;
    -h|--help)
      echo "Usage: ./scripts/docker/Start-Stack-Docker.sh [--clean] [--reset-data] [--db-only] [--skip-build] [--skip-start]"
      exit 0
      ;;
    *)
      echo "Unknown flag: $arg" >&2
      exit 1
      ;;
  esac
done

step() { printf '\n==> %s\n' "$1"; }

assert_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "docker CLI not found." >&2
    exit 1
  fi
  if ! docker info >/dev/null 2>&1; then
    echo "Docker engine is NOT ready." >&2
    exit 1
  fi
  echo "Docker engine is ready."
}

ensure_env() {
  if [[ -f .env ]]; then
    echo ".env found."
    return
  fi
  if [[ -f .env.example ]]; then
    cp .env.example .env
    echo "Created .env from .env.example"
    return
  fi
  echo "WARNING: No .env or .env.example found."
}

wait_healthy() {
  local name="$1"
  local seconds="${2:-120}"
  local deadline=$((SECONDS + seconds))
  local status=""
  while (( SECONDS < deadline )); do
    status="$(docker inspect -f '{{.State.Health.Status}}' "$name" 2>/dev/null || true)"
    if [[ "$status" == "healthy" ]]; then
      echo "Container is healthy: $name"
      return 0
    fi
    sleep 2
  done
  local running
  running="$(docker inspect -f '{{.State.Running}}' "$name" 2>/dev/null || true)"
  if [[ "$running" == "true" ]]; then
    echo "Container is running (health still warming up): $name"
    return 0
  fi
  echo "Container $name did not become ready." >&2
  return 1
}

echo "ApiRest Electronic Devices - Docker stack (Postgres + API)"
echo "Repo: $REPO_ROOT"

assert_docker
ensure_env

if [[ "$RESET_DATA" -eq 1 ]]; then
  step "Cleaning compose containers + volumes (DB data will be wiped)"
  docker compose down --remove-orphans -v
elif [[ "$CLEAN" -eq 1 ]]; then
  step "Cleaning leftover compose containers"
  docker compose down --remove-orphans
fi

if [[ "$SKIP_BUILD" -eq 0 && "$DB_ONLY" -eq 0 ]]; then
  step "Building image $IMAGE_NAME"
  docker compose build "$API_SERVICE"
fi

if [[ "$SKIP_START" -eq 0 ]]; then
  if [[ "$DB_ONLY" -eq 1 ]]; then
    step "Starting postgres only"
    docker compose up -d --force-recreate --remove-orphans "$DB_SERVICE"
    wait_healthy "$DB_CONTAINER" 90
  else
    step "Starting stack (postgres + api) detached"
    docker compose up -d --force-recreate --remove-orphans
    wait_healthy "$DB_CONTAINER" 90
    wait_healthy "$API_CONTAINER" 120
  fi
fi

step "Done"
echo ""
docker compose ps
echo ""
echo "IMPORTANT: containers run detached (-d). Closing this terminal does NOT stop them."
echo "API:     http://localhost:8082"
echo "Health:  http://localhost:8082/health"
echo "Swagger: http://localhost:8082/api-docs"
echo ""

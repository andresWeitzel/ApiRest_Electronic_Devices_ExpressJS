@echo off
setlocal
title ApiRest Electronic Devices - Docker stack
cd /d "%~dp0"
echo.
echo ApiRest Electronic Devices ExpressJS
echo Build API image + start Postgres + API containers
echo Launcher folder: scripts\docker
echo.
echo Prerequisite: Docker Desktop already open and Engine running.
echo Order: 1) Docker Desktop  2) this script
echo This launcher will NOT start Docker Desktop.
echo.
echo Containers start DETACHED (-d): they keep running after you close CMD.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Start-Stack-Docker.ps1" %*
set EXITCODE=%ERRORLEVEL%
echo.
if %EXITCODE% neq 0 (
  echo Failed with exit code %EXITCODE%.
  echo If Docker Desktop is stuck: Quit it from the tray, reopen, wait for Engine running, retry.
  echo.
  echo Press Enter to close this window...
  pause >nul
  exit /b %EXITCODE%
)

echo Finished OK.
echo.
echo ============================================================
echo  Postgres + API keep running in Docker after you leave.
echo  Press Enter only closes THIS window — it does NOT stop them.
echo  API:     http://localhost:8082
echo  Health:  http://localhost:8082/health
echo  Swagger: http://localhost:8082/api-docs
echo ============================================================
echo.
echo Press Enter to exit the launcher...
pause >nul
exit /b 0

@echo off
title Black Raven Localhost Server
echo ========================================================
echo    BLACK RAVEN - Avian Conservation & Care Platform
echo ========================================================
echo.
echo Starting local HTTP server on port 8080...
start http://localhost:8080/
powershell -NoExit -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 8080
pause

@echo off
REM Reads the auto-assigned internal port written by control-api.js
REM (see the 'task-port' action type) before this task is run.
REM File name must match: varan-port-<serviceId>-<instanceId>.txt
set PORTFILE=C:\Windows\Temp\varan-port-vite-hiddendao.txt

if not exist "%PORTFILE%" (
    echo Port file not found: %PORTFILE%
    echo This bat file must be launched via the Varan Portal control API,
    echo not run directly, since the port is assigned dynamically.
    pause
    exit /b 1
)

set /p VARAN_PORT=<"%PORTFILE%"

cd /d D:\MyCode\hidden-dao-website
node_modules\.bin\vite dev --port %VARAN_PORT%

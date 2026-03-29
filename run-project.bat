@echo off
chcp 65001 > nul
echo ==========================================
echo Ajándék ajánló oldal rendszer indítása...
echo ==========================================

:: Portok felszabadítása (3000 a Backend, 5173 a Frontend számára)
echo.
echo Portok ellenőrzése és felszabadítása...

:: PowerShell használata a folyamatok leállításához (megbízhatóbb)
powershell -Command "Get-NetTCPConnection -LocalPort 3000, 5173 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"
echo Portok felszabadítva (ha foglaltak voltak).

:: Backend beállítása és indítása
echo.
echo [1/2] Backend beállítása és indítása...
cd Backend

if not exist node_modules\.bin\sequelize-cli (
    echo Backend függőségek telepítése...
    call npm install
)

echo Adatbázis alaphelyzetbe állítása és adatok feltöltése...
call npx sequelize-cli db:drop
call npx sequelize-cli db:create
call npx sequelize-cli db:migrate
call npx sequelize-cli db:seed:all

echo Backend indítása új ablakban...
start cmd /k "chcp 65001 > nul && npm start"

:: Frontend beállítása és indítása
echo.
echo [2/2] Frontend beállítása és indítása...
cd ..\Frontend

if not exist node_modules\.bin\vite (
    echo Frontend függőségek telepítése...
    call npm install
)

echo Frontend indítása...
call npm run dev

pause
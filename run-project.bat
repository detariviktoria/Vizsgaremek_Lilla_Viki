@echo off
chcp 65001 > nul
echo ==========================================
echo Ajándák ajánló oldal rendszer indítása...
echo ==========================================

:: Backend beállítása és indítása
echo.
echo [1/2] Backend beállítása és indítása...
cd Backend

if not exist node_modules (
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

if not exist node_modules (
    echo Frontend függőségek telepítése...
    call npm install
)

echo Frontend indítása...
call npm run dev

pause

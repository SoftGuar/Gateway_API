@echo off
REM filepath: C:\path\to\start.bat

REM Color codes for output messages
set "GREEN=92"
set "RED=91"

echo [%GREEN%mStarting development environment...[0m

REM Get current branch name
for /f "tokens=*" %%a in ('git branch --show-current') do set CURRENT_BRANCH=%%a
echo [%GREEN%mCurrent branch: %CURRENT_BRANCH%[0m

REM Pull latest changes
echo [%GREEN%mPulling latest changes from %CURRENT_BRANCH%...[0m
git pull origin %CURRENT_BRANCH%
if %ERRORLEVEL% NEQ 0 (
    echo [%RED%mFailed to pull latest changes.[0m
    exit /b 1
)

REM Install dependencies
echo [%GREEN%mInstalling dependencies...[0m
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [%RED%mFailed to install dependencies.[0m
    exit /b 1
)

REM Start development server
echo [%GREEN%mStarting development server...[0m
call npm run dev

exit /b 0
@echo OFF

echo Starting creation of the default project(Progress - JarJS)

echo Installing required frameworks

serify install get

echo Creating folders

mkdir pages
mkdir progress-logs

echo Creating files(Require internet)

serify web dcompress project make progress-default

echo Finishing

serify mod _jarjs.json add script "start-progress" "start index.html"

echo Finish!
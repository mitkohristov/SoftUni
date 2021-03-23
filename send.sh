#!/bin/bash

$GIT="$(cd / && pwd -W | sed 's/\//\\/g')"

#GIT="C:\Program\ Files\Git"

echo $GIT\git status
#echo $GIT
echo  "Adding to  github"
$GIT\git add .

sleep 1s

echo  "Committing to gihub"

$GIT\git commit -m "updated"

sleep 1s

echo  "Pushing to  github"

$GIT\git push

sleep 1s



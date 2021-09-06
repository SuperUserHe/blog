#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add .

curTime=$(date "+%Y-%m-%d/%H:%M:%S")

git commit -m "A Rich and Meaningful Day 📝"$curTime

git push origin master:gh-pages

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'summery1874.site' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
git push -f git@github.com:SuperUserHe/blog.git gh-pages

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
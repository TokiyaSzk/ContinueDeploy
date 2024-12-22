#!/bin/bash

# 切换到项目目录
cd /home/dev/MaiWeb-CN || exit 1

# 拉取最新代码
git pull origin dev || exit 1

# 安装依赖
npm install || exit 1

# 构建项目
npm run build || exit 1

# 删除旧的 pm2 应用
pm2 delete dev-app || true

# 启动新服务
PORT=5000 pm2 start npm --name "dev-app" -- run start || exit 1

echo "Deployment successful"
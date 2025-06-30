#!/bin/bash

# 切换到项目目录
cd /home/dev/Maimaimoe-Back-Go || exit 1

# 拉取最新代码
git pull origin dev || exit 1

# 安装依赖
go mod tidy || exit 1

# 删除旧的 pm2 应用
pm2 delete my-gf-app || true

# 启动新服务
pm2 start bash --name my-gf-app -- -c "gf run main.go" || exit 1

echo "Deployment successful"
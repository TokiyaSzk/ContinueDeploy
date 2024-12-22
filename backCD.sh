#!/bin/bash

# 切换到项目目录
cd /home/dev/MaiWeb-Backend || exit 1

# 拉取最新代码
git pull origin dev || exit 1

# 安装依赖
poetry install || exit 1

# 删除旧的 pm2 应用
pm2 delete dev-server || true

# 启动新服务
pm2 start "poetry run serve" --name dev-server || exit 1

echo "Deployment successful"
# 部署到 VPS（自托管）

本项目是 Next.js 15 + Prisma + MySQL 应用。下面用 Docker Compose 一键把 **应用 + MySQL** 跑在你的 VPS 上。

## 前置条件
- 一台 VPS（Ubuntu/Debian 等），已开放 80/443（或你选用的端口）。
- 已安装 Docker 与 Docker Compose 插件。
  ```bash
  # Ubuntu/Debian 快速安装 Docker
  curl -fsSL https://get.docker.com | sh
  # 验证
  docker version && docker compose version
  ```

## 部署步骤
```bash
# 1. 拉取代码
git clone https://github.com/abutang-droid/tarot-mind.git
cd tarot-mind

# 2. 准备环境变量
cp .env.deploy.example .env
# 编辑 .env：务必修改 JWT_SECRET、MYSQL_PASSWORD、MYSQL_ROOT_PASSWORD，
# 并把 NEXT_PUBLIC_APP_URL 设为你的正式域名（如 https://your-domain.com）

# 3. 构建并启动（应用 + 数据库）
docker compose up -d --build

# 4. 查看状态 / 日志
docker compose ps
docker compose logs -f app

# 5. 验证（默认监听 3000 端口）
curl -I http://localhost:3000
```
容器启动时会自动执行 `prisma db push` 建表（幂等）。若想插入演示用户（`demo@tarot.app` / `123456`），在 `.env` 里设 `SEED_DB=true` 后重启一次即可。

## 更新上线（每次发新版本）
```bash
cd tarot-mind
git pull origin main
docker compose up -d --build      # 重新构建镜像并平滑重启
docker image prune -f             # 可选：清理旧镜像
```

## 反向代理 + HTTPS（推荐）
用 Nginx 把 80/443 反代到应用的 3000 端口：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```
然后用 Certbot 申请证书：
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 端口与外部数据库
- 修改对外端口：在 `.env` 里设 `APP_PORT=8080`（映射到容器内 3000）。
- 使用外部/托管 MySQL：删除或忽略 compose 里的 `db` 服务，并把 `app` 的 `DATABASE_URL` 指向你的数据库连接串即可。

## 不使用 Docker 的替代方案（PM2 + 系统 MySQL）
```bash
# Node 20+、MySQL 已就绪，且已在 shell 里 export 好 DATABASE_URL / JWT_SECRET
npm ci
npx prisma db push
npm run build
npm install -g pm2
pm2 start "npm run start" --name manto     # 生产服务器，监听 3000
pm2 save && pm2 startup                     # 开机自启
```

## 注意事项
- `prisma db push` 是「无迁移」模式：初次部署到空库无风险；后续若改了 schema 且库里已有数据，建议改用 `prisma migrate` 以避免丢数据（当前入口脚本带 `--accept-data-loss`，仅适合初始/无重要数据场景）。
- 生产环境请务必替换所有默认密码与 `JWT_SECRET`。

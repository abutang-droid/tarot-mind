# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router) + TypeScript + Prisma app (`tarot-app`, aka TarotMind/Manto). It requires a **MySQL-compatible database**; the cloud VM uses a locally-installed **MariaDB** server (Prisma's `mysql` provider is compatible).

### Services
- **Next.js dev server** (only long-running service): `npm run dev` → http://localhost:3000. Serves both the frontend pages and all `/api/*` routes.
- **MariaDB** (required dependency): installed via apt. It is **not** managed by systemd in this VM. Start it manually if it is not already running:
  ```bash
  sudo mkdir -p /var/run/mysqld && sudo chown mysql:mysql /var/run/mysqld
  sudo mariadbd-safe >/tmp/mariadb.log 2>&1 &
  sudo mysqladmin ping   # expect "mysqld is alive"
  ```

### Database / env setup (one-time per fresh VM; not in the auto-update script)
The `.env` file is git-ignored, so recreate it if missing. `DATABASE_URL` must point at the local `tarot` database:
```bash
sudo mysql -e "CREATE DATABASE IF NOT EXISTS tarot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'tarot'@'localhost' IDENTIFIED BY 'tarotpass'; GRANT ALL PRIVILEGES ON tarot.* TO 'tarot'@'localhost'; FLUSH PRIVILEGES;"
# .env:
#   DATABASE_URL="mysql://tarot:tarotpass@127.0.0.1:3306/tarot"
#   JWT_SECRET="<32+ char string>"
#   NEXT_PUBLIC_APP_URL="http://localhost:3000"
npx prisma db push   # create tables (no migrations dir; schema is push-based)
npx prisma db seed   # optional: creates demo user demo@tarot.app / 123456
```

### Non-obvious gotchas
- **Auth is auto-guest, not password login.** `POST /api/auth/login` is a stub returning `{"error":"not needed"}`. Instead, `GET /api/auth/me` auto-creates a persistent guest user and sets the `tarot_token` cookie. The seeded `demo@tarot.app` user is not used by a login form. To exercise API routes with curl, hit `/api/auth/me` first with a cookie jar (`-c cookies.txt`), then reuse it (`-b cookies.txt`).
- **`npm run lint` is broken in the repo** (pre-existing, unrelated to setup): the `lint` script is bare `eslint` but there is no `eslint.config.js`, so ESLint 9 errors out. Not an environment issue.
- **No test framework exists** — there is no `test` script and no test files. Verify changes manually via the running app or curl against `/api/*`.
- `postinstall` runs `prisma generate` automatically, so `npm install` regenerates the Prisma client. `prisma generate` also runs during `prisma db push`.
- Standard scripts live in `package.json` (`dev`, `build`, `start`, `db:push`, `db:seed`).

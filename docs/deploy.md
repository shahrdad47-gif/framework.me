Deploy the latest changes to frameworkme.earth.

Server: root@165.22.93.64 (password: ask me for the SSH password before doing anything else. Do not proceed, guess, or search for it anywhere; wait for my reply.)
App directory: /root/framework.me
Stack: docker compose (services: db = postgres:16-alpine, app = Next.js, nginx = TLS-terminating reverse proxy). Container names are frameworkme-db-1, frameworkme-app-1, frameworkme-nginx-1.

Do the following, in order:

1. SSH in and check `git status` in /root/framework.me — confirm no unexpected local changes (there are normally untracked `.env` and `nginx/certs/` files, that's expected).

2. Record the current commit before pulling: `git rev-parse HEAD` (call this OLD_HEAD). This is what you'll diff against to find out what changed in this deploy.

3. `git fetch origin` then `git pull origin master` (should fast-forward).

4. Check if a database migration is needed: run `git log --stat OLD_HEAD..HEAD -- scripts/ src/lib` (any file matching `*db*.ts` under src/lib, plus everything under scripts/). For every commit that touches those paths, `git show <hash>` and read the actual diff.
   - Schema changes usually show up in `scripts/setup-db.ts` as `ALTER TABLE ... ADD COLUMN IF NOT EXISTS ...` or `CREATE TABLE IF NOT EXISTS ...`.
   - Seed-data changes (e.g. new video category, new static list entries) show up as `INSERT ... ON CONFLICT (id) DO UPDATE` blocks fed by data in `src/data/*.ts`.
   - IMPORTANT: `scripts/setup-db.ts` is NOT wired into the deploy — there's no `db:setup` npm script, no `tsx`/`ts-node` dependency, and the Dockerfile's CMD is just `node server.js`. Nothing runs migrations automatically. If you find a relevant ADD COLUMN or seed INSERT, you must apply it manually against the live DB via `docker exec frameworkme-db-1 psql -U framework -d framework -c "..."`, matching the exact statement from the diff. Verify with `\d <table>` or a SELECT afterward.
   - If no commits touch those paths, no DB changes are needed — say so explicitly rather than skipping the check silently.

5. Build the new app image: `docker compose build app` (takes ~3-4 min, mostly `npm run build`).

6. Recreate the app container: `docker compose up -d app`.

7. Restart nginx: `docker compose restart nginx`. This step is NOT optional — nginx's `proxy_pass http://app:3000` only resolves the `app` hostname to a container IP once, at nginx startup. Since nginx stays running across app redeploys, recreating the app container gives it a new internal IP that nginx won't know about until nginx itself restarts. Skipping this causes a 502 Bad Gateway that looks unrelated to the deploy.

8. Verify: `curl -s -o /dev/null -w "%{http_code}" https://frameworkme.earth/` should return 200. Also check `docker logs --tail 30 frameworkme-app-1` for startup errors.

Report back: what commits were deployed, whether any DB migration was applied (and exactly what SQL you ran, if so), and the final health check result.

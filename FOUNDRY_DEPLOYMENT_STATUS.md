# Foundry Test v0.1 — Deployment Status

Updated: 2026-09-06 (KST)

## Verified

- Supabase project: `Foundry Test` (`weswxvpzyzdpgflbjizw`, Seoul `ap-northeast-2`)
- Supabase status: `ACTIVE_HEALTHY`
- Supabase Security Advisor: 0 findings
- Backend E2E: 32/32 PASS
- Compare → Decide E2E: 9/9 PASS
- Total live-backend checks: 41/41 PASS
- GitHub Actions: real `npm install` PASS
- Next.js 16.3.3 production `next build` PASS
- TypeScript build PASS
- `npm start` / port 3000 runtime smoke PASS
- Vercel production build/alias: PASS

## Current Vercel deployment

Project: `foundry-test-v01-live3`

Stable URL:
`https://foundry-test-v01-live3-jeawook.vercel.app`

Unique deployment URL:
`https://foundry-test-v01-live3-ji31p1egi-jeawook.vercel.app`

The stable alias changed from `DEPLOYMENT_NOT_FOUND` to Vercel Authentication after the production build completed, confirming that the deployment and alias were promoted successfully.

## Current blocker

Vercel Deployment Protection / Vercel Authentication (SSO) is enabled at the account/project level. Even a trivial static production deployment is redirected to Vercel SSO, so this is not a Foundry application issue.

Disable SSO for `foundry-test-v01-live3` before public testing.

CLI equivalent documented by Vercel:

```bash
vercel project protection disable foundry-test-v01-live3 --sso
```

API equivalent:

```json
{"ssoProtection": null}
```

The connected Vercel integration currently has deployment-write access but returns 403 for project/protection reads and cannot change this setting.

## Supabase Auth setting still required for Magic Link

Once the public deployment URL is accessible, allow the final Foundry URL in Supabase Authentication URL Configuration. At minimum:

- `http://localhost:3000/**`
- `https://foundry-test-v01-live3-jeawook.vercel.app/**`

Then perform the real browser E2E:

`Magic Link → Starter → Project 1/2 → Public Test → event/feedback → Compare → Decide → Admin`

## Safety

The temporary Supabase test Edge Functions are still deployed as function objects but their current code only returns HTTP 410 (`GONE` / `DISABLED`) and all require JWT verification. They do not expose the earlier test bootstrap/E2E behavior.

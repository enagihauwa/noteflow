# DEP-002 — Deploy to Vercel

**Area:** Deployment
**Depends on:** DEP-001
**Blocks:** DEP-003
**Size:** M
**Spec reference:** §15, §18 Phase 6

## Goal

`main` builds and deploys automatically, and the live URL serves the app.

## Context

`prisma generate` must run in the build, or the deployed bundle ships a stale client
and fails at the first query. Put it in the `build` script rather than relying on a
postinstall hook.

## Execution steps

1. Import the GitHub repository into Vercel and select the production branch.
2. Set the build command to `prisma generate && next build`.
3. Confirm the environment variables from DEP-001 are present for Production and Preview.
4. Set `AUTH_URL` to the real deployed URL.
5. Deploy, then read the build log for warnings, not just the success line.
6. Open a pull request and confirm a preview deployment builds with its own environment.

## Files touched

- `package.json`, Vercel project settings

## Acceptance criteria

- [ ] `main` deploys automatically on push.
- [ ] The build runs `prisma generate`.
- [ ] The live URL serves the landing page over HTTPS.
- [ ] Preview deployments build successfully.
- [ ] No secret appears in the build log.

## Out of scope

- Custom domain and CDN configuration.

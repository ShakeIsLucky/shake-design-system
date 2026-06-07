# Publishing Onda HTML pages

> **This is a public repo.** The concrete host (Vercel project name + production URL) is **not**
> stored here — it lives privately in the `shake-pages` repo and your local env. Keep it that way;
> the host is unlisted (share-by-link), so publishing its URL here would defeat the point.

**Default publish path for agents.** When asked to create an Onda HTML page (deck, explainer,
report, plan), finish by publishing it — don't just return the file locally.

## The model
- A **separate private repo** (`shake-pages`) holds the finished, self-contained HTML artifacts.
- It is connected to a **Vercel project** that auto-deploys `main` to an **unlisted** production URL
  (share-by-link; not indexed, not guessable). Treat the link as *distribution*, not access control.
- The design system (this repo) is the **look + authoring contract**; `shake-pages` is the **host**.
  They stay separate on purpose.

## Agent publish workflow (do this every time)
1. Build a **self-contained** `.html`. Now that this DS repo is public you may link the CDN
   (`https://cdn.jsdelivr.net/gh/ShakeIsLucky/shake-design-system@main/systems/racing-green/css/shake.css`);
   for hard-standalone/offline files, inline the DS CSS instead.
2. Drop it into the local `shake-pages` repo.
3. `git add`, commit, push to `main` — Vercel auto-deploys production.
4. **Return the live URL** to the user (base URL comes from your private `shake-pages` config).

Manual fallback (no git push): `vercel deploy --prod --yes` from that folder.

## Fonts
Freight (Adobe kit `lao8mse`) loads on any **http(s)** host where the kit embed is present — no
domain allowlist. It will **not** render on `file://`. After editing families in the kit at
[fonts.adobe.com](https://fonts.adobe.com) → Web Projects → `lao8mse`, **Publish**, then bump the
`?v=` cache-buster. See [`adobe-fonts.md`](./adobe-fonts.md) for the per-system family list.

# Sharing a live preview with Cloudflare Tunnel

Sometimes you want to show someone (your dad, a friend) what the site looks
like *before* it's deployed anywhere — without pushing to GitHub Pages or
setting up real hosting. A **Cloudflare Tunnel** gives you a temporary public
URL that points at the site running on your own Mac. This is exactly what we
used earlier in this project.

It takes about 2 minutes and doesn't require a Cloudflare account.

## How it works

Two pieces run side by side on your machine:

1. A **local web server** — serves the site's files (`index.html`, `css/`,
   `js/`, etc.) on `http://localhost:8000`.
2. A **tunnel** — `cloudflared`, a small Cloudflare program that opens a
   secure connection out to Cloudflare's network and gives you back a public
   URL (like `https://random-words-here.trycloudflare.com`). Anyone who
   opens that URL gets proxied straight through to your local server.

Both only work **while they keep running** and **while your Mac is on**. If
you close Terminal, put your Mac to sleep, or shut the lid, the link goes
dead. This is meant for quick, casual sharing — not for anything long-term
or sensitive (see [Caveats](#caveats) below).

## One-time setup

Install `cloudflared` via [Homebrew](https://brew.sh) (skip if you already
have Homebrew — check with `brew --version`):

```bash
# Only if you don't have Homebrew yet:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install cloudflared:
brew install cloudflared
```

That's it — nothing to configure, no account, no login.

## Every time you want to share a preview

Open Terminal and `cd` into the project folder:

```bash
cd ~/codebase/ms-finance-consulting
```

**Step 1 — Start the local server** (leave this running in its own terminal
tab/window):

```bash
python3 -m http.server 8000
```

**Step 2 — In a *second* terminal tab/window, start the tunnel:**

```bash
cloudflared tunnel --url http://localhost:8000
```

**Step 3 — Grab the URL.** Within a few seconds you'll see output like:

```
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
|  https://explain-electronics-lawyer-build.trycloudflare.com                                |
+--------------------------------------------------------------------------------------------+
```

That `https://....trycloudflare.com` link is what you share. Anyone with it
can open it in their browser — phone, laptop, doesn't matter — and see the
live site.

## Making changes while it's running

Since the tunnel just proxies to your local server, and the local server
reads files straight off disk, **any edit you save shows up immediately** —
just refresh the page. No restart needed for either the server or the
tunnel.

## Stopping it

Go to each terminal tab and press `Ctrl+C`. Do this for both the server and
the tunnel. The public URL stops working immediately once the tunnel process
ends.

## Getting a new link

Every time you start `cloudflared tunnel` fresh, it generates a **new random
URL** — you can't reuse the old one. If your Mac slept, Terminal closed, or
you just want to restart, run Step 2 again and copy the new link.

## Caveats

- **No uptime guarantee.** These are free, account-less "quick tunnels."
  Cloudflare explicitly does not guarantee they'll stay up, and they're
  meant for quick experiments, not anything serious.
- **Only while your Mac stays awake.** Sleep, lid-close, or losing wifi will
  drop the connection.
- **Not access-controlled.** Anyone with the link can view the site. Don't
  use this for anything containing real sensitive data.
- **Cloudflare rewrites visible email addresses.** As a bot-protection
  feature, any plain email address in the page's HTML (like the one in the
  footer) gets automatically obfuscated at Cloudflare's edge and restored via
  injected JavaScript. It should still work fine for real visitors, but if
  you ever compare the tunnel's HTML to your local files byte-for-byte,
  that's the one intentional difference you'll see — not a sign of stale
  content. This doesn't happen on GitHub Pages or normal hosting.
- **Browser caching.** If a page doesn't seem to reflect a recent change,
  hard-refresh first (Cmd+Shift+R, or open a private/incognito window)
  before assuming the server or tunnel is out of date.

## When you're ready for something permanent

This is only for temporary previews. Once the site is ready to actually go
live, use **GitHub Pages** instead (free, permanent, no dependency on your
Mac staying on) — see the **Deploying** section in `README.md`.

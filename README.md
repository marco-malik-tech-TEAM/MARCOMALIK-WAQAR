<div align="center">

<img src="assets/banner.jpg" alt="WAQAR XD MINI BOT" width="320"/>

# WAQAR XD MINI BOT

**Smart • Fast • Powerful** — a WhatsApp group assistant for classes and communities.

![Node](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)
![Baileys](https://img.shields.io/badge/Baileys-v7-7c3aed)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

</div>

---

## About

WAQAR XD MINI BOT is a lightweight multi-device WhatsApp bot built on
[Baileys](https://github.com/WhiskeySockets/Baileys). It keeps classes and
groups organised with moderation tools, auto replies and a simple menu system.

## Features

| Feature | Description |
|---|---|
| Welcome & Goodbye | Automatic messages when members join or leave |
| Anti-Link & Anti-Spam | Removes links and spam from groups |
| Admin Tools | Kick, ban and promote members |
| Auto Replies | Custom automatic responses |
| Menu System | Clean command menu (`.menu`) |
| Anti-Delete / Anti-Call | Recovers deleted messages, rejects calls |
| PDF Library | Course PDFs via `.pdfsettings`, `.pdfurl <name>`, `.pdflist [page]` |
| Lightweight | Fast startup, low memory use |

## Owners

| # | Name | Contact |
|---|------|---------|
| 1 | Waqar XD | [wa.me/923293245445](https://wa.me/923293245445) |
| 2 | Co-owner | set `OWNER_NUMBER_2` |

## Quick Start

```bash
git clone <your-repo-url>
cd mini-Mishu
npm install
cp .env.example .env     # then edit the values
npm start
```

Open the website at `http://localhost:8000` (or your Railway URL).

## Pairing your WhatsApp

1. Open the pairing website and enter your number **with country code**, no `+` (e.g. `923001234567`).
2. Press **Get Pair Code**.
3. On your phone: **WhatsApp → Settings → Linked Devices → Link a device → Link with phone number instead**.
4. Enter the 8-character code. Do it within ~1 minute.
5. The bot sends a confirmation message to your own chat once connected.

**If linking fails:** press **Force Pairing** (clears the old session), make sure only one
deployment is running, remove old entries in *Linked Devices*, and request a fresh code.

## Configuration

| Variable | Purpose |
|---|---|
| `PORT` | Server port (default `8000`) |
| `PREFIX` | Command prefix (default `.`) |
| `MODE` | `public` or `private` |
| `OWNER_NUMBER` | Owner numbers, comma separated |
| `OWNER_NUMBER_2` | Second owner number |
| `IMGBB_API_KEY` | Required by `.tourl` image upload command |
| `GITHUB_TOKEN` / `GITHUB_REPO` / `GITHUB_BRANCH` | Optional session backup |
| `APP_URL`, `CHANNEL_LINK`, `OWNER_KEY` | Optional links and admin key |

> Never commit `.env` or the `session/` folder.

## Deploy on Railway

1. Push the project to GitHub.
2. Railway → **New Project → Deploy from GitHub repo**.
3. Add the variables above, then open the generated domain.
4. Add a **Volume** mounted at `/app/session` so the session survives restarts (or configure the GitHub backup).

Railway uses `/health` as the service healthcheck. Set `IMGBB_API_KEY` only if you want the
`.tourl` image-upload command; it is intentionally not bundled in the repository.

## License

Released under the [MIT License](LICENSE).

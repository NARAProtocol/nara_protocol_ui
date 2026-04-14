# NARA Protocol

Competitive token issuance on Base.
Tokens are released only when ETH is committed.
If participation is zero, issuance is zero.

## Overview

NARA is an experimental protocol exploring competitive token distribution mechanics.

- **Docs:** [GitHub](https://github.com/NARAProtocol/nara_protocol)
- **X:** [@NARA_protocol](https://x.com/NARA_protocol)
- **Farcaster:** [@naraprotocol](https://warpcast.com/naraprotocol)

## Public Route Map

This repo owns the public `naraprotocol.io` domain and proxies app paths to the live app deployments.

Current external rewrites in `vercel.json`:
- `/lotto` -> `https://lotto-nara.vercel.app/lotto`
- `/arena` -> `https://arenaui-black.vercel.app/arena`
- `/mine` -> `https://nara-lockboard.pages.dev/`

Rule:
- point public rewrites only at stable public app aliases
- do not point `naraprotocol.io` rewrites at protected preview URLs like `*-naradevs-projects-*.vercel.app`, because they can return `401` outside the owner session

## Development

### Prerequisites

- Node.js >= 18

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

## Status

Experimental. No guarantees.

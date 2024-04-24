# yazio

A lightweight, zero-dependency JavaScript/TypeScript client for the undocumented YAZIO API. Easily track calories, log items, and integrate YAZIO into your projects.

## Motivation

Built to enable personal dashboards and calendar integrations for calorie tracking. Open-sourced for community benefit.

## Getting Started

### Installing

```bash
bun add yazio
```

```
npm install yazio
```

### Usage

Here's a quick example of how to use `yazio` in your project:

```ts
// Basic Usage

import { Yazio } from "yazio";

const yazio = new Yazio({
  credentials: {
    username: "juri@acme.co",
    password: "super-secure-password",
  },
});

const items = await getConsumedItems({ date: new Date(/* ... */) });
```

```ts
// Advanced Usage

import { Yazio } from "yazio";
import { kv } from "@vercel/kv";

const yazio = new Yazio({
  // Resolve cached tokens from KV. Tokens are stored and re-used from memory
  // as long as they are still valid.
  token: kv.get("tokens:juri@acme.co"),

  // If a fresh token was received, cache it.
  onRefresh: ({ token }) =>
    kv.set("tokens:juri@acme.co", JSON.stringify(token)),

  // If no token was fetched yet, exchange the credentials for a new token.
  credentials: {
    username: "juri@acme.co",
    password: "super-secure-password",
  },
});

const summary = await yazio.user.getSummary({ date: new Date(/* ... */) });
```

See source code docs in `src/index.ts` for detailed usage. Documentation following shortly.

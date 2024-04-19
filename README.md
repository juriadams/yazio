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
import { getTokenPair } from "yazio/auth";
import { getConsumedItems } from "yazio";

// Cache this token, especially in edge environments.
const token = await getTokenPair({ username, password });

const items = await getConsumedItems(items, { date: new Date() });
```

See source code docs in `src/lib` for detailed usage. Documentation following shortly.

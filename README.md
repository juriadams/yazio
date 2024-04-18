# yazio

```bash
bun add yazio
```

## Description

`yazio` is a JavaScript/TypeScript client for interacting with the undocumented YAZIO API, which is used by their mobile apps. This library allows you to easily track calories, log items, and integrate YAZIO functionality into your own projects.

Built using the latest web standards, `yazio` can be used on various edge runtimes and has zero dependencies, making it lightweight and efficient.

## Motivation

I developed `yazio` to build personal dashboard and calendar integrations that allow me to easily track my calories and log items from the web. After using this code across multiple projects and receiving numerous inquiries about YAZIO's API documentation, I decided to open-source it for the benefit of the community.

## Getting Started

### Installing

When using `bun`:

```bash
bun add yazio
```

When using `npm`:

```
npm install yazio
```

### Usage

Here's a quick example of how to use `yazio` in your project:

```ts
import { getToken } from "yazio/auth";
import { getDailySummary } from "yazio";

// This token is already being cached in memory internally. However, when using
// this library in an edge environment, it is adviced to cache this token in KV
// or similar.
const token = await getToken();

const dailySummary = await getDailySummary(token);

console.log(dailySummary);
```

For more detailed usage instructions and examples, please refer to the documentation in the source code. All functions are scoped to individual categories and can be found in `src/lib`.

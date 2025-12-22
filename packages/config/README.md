# @ghostery/config

Shared TypeScript types for Ghostery remote configuration.

## Installation

```bash
npm install @ghostery/config
```

## Usage

### In TypeScript/JavaScript projects:

```typescript
import type { Config, Platform, Action, Flag } from '@ghostery/config';
import { isPlatform, isAction, isFlag } from '@ghostery/config';

// Use the types
const config: Config = {
  domains: {
    "example.com": {
      issueUrl: "https://github.com/...",
      actions: ["disable-autoconsent"],
    }
  },
  flags: {
    "pause-assistant": [{
      percentage: 10
    }]
  }
};

// Use type guards
if (isPlatform("firefox")) {
  console.log("Valid platform");
}
```

## Available Types

- `Platform`: "firefox" | "safari" | "chromium"
- `Action`: "disable-autoconsent" | "disable-antitracking-modification" | "pause-assistant"
- `Flag`: Various feature flags
- `Config`: Main configuration interface

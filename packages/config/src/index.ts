// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export * from "./browsers.ts";
export * from "./platforms.ts";
export * from "./actions.ts";
export * from "./flags.ts";

import type { Browser } from "./browsers.ts";
import type { Platform } from "./platforms.ts";
import type { Action } from "./actions.ts";
import type { Flag } from "./flags.ts";

// type like "1.0.0", "2.3.4"
export type Version = `${number}.${number}.${number}`;

interface Filter {
  platform?: Platform[];
  browser?: Browser[];
  version?: Version;
}

export interface Config {
  domains: {
    [name: string]: {
      issueUrl: string;
      actions: Action[];
      filter?: Filter;
    };
  };
  flags: {
    [K in Flag]: {
      percentage: number;
      filter?: Filter;
    }[];
  };
}

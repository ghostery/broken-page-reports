// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export * from "./browsers.js";
export * from "./platforms.js";
export * from "./actions.js";
export * from "./flags.js";

import type { Browser } from "./browsers.js";
import type { Platform } from "./platforms.js";
import type { Action } from "./actions.js";
import type { Flag } from "./flags.js";

// type like "1.0.0", "2.3.4"
export type Version = `${number}.${number}.${number}`;

interface Filter {
  platform?: Platform[];
  browser?: Browser;
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

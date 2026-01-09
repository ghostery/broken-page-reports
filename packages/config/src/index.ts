// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export * from "./platforms.js";
export * from "./actions.js";
export * from "./flags.js";

import type { Platform } from "./platforms.js";
import type { Action } from "./actions.js";
import type { Flag } from "./flags.js";

interface Filter {
  platform?: Platform[];
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

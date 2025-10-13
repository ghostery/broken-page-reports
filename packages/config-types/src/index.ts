// Copyright 2025 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export const ACTIONS = [
  "disable-antitracking-modification",
  "disable-autoconsent",
  "pause-assistant",
] as const;

export const PLATFORMS = [
  "chromium",
  "firefox",
  "safari",
] as const;

export const FLAGS = [
  "chromium-inject-cosmetics-on-response-started",
  "dynamic-dnr-fixes",
  "extended-selectors",
  "firefox-content-script-scriptlets",
  "pause-assistant",
] as const;

export type Platform = typeof PLATFORMS[number];

export type Action = typeof ACTIONS[number];

export type Flag = typeof FLAGS[number];

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

export function isPlatform(platform: string): platform is Platform {
  return (PLATFORMS as readonly string[]).includes(platform);
}

export function isAction(action: string): action is Action {
  return (ACTIONS as readonly string[]).includes(action);
}

export function isFlag(flag: string): flag is Flag {
  return (FLAGS as readonly string[]).includes(flag);
}

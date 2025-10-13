export const actions = [
  "disable-autoconsent",
  "disable-antitracking-modification",
  "pause-assistant",
] as const;

export const platforms = [
  "firefox",
  "safari",
  "chromium",
] as const;

export const flags = [
  "firefox-content-script-scriptlets",
  "chromium-inject-cosmetics-on-response-started",
  "extended-selectors",
  "dynamic-dnr-fixes",
  "pause-assistant",
] as const;

export type Platform = typeof platforms[number];

export type Action = typeof actions[number];

export type Flag = typeof flags[number];

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
  return (platforms as readonly string[]).includes(platform);
}

export function isAction(action: string): action is Action {
  return (actions as readonly string[]).includes(action);
}

export function isFlag(flag: string): flag is Flag {
  return (flags as readonly string[]).includes(flag);
}

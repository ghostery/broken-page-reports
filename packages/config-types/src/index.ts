export const ACTIONS = [
  "disable-autoconsent",
  "disable-antitracking-modification",
  "pause-assistant",
] as const;

export const PLATFORMS = [
  "firefox",
  "safari",
  "chromium",
] as const;

export const FLAGS = [
  "firefox-content-script-scriptlets",
  "chromium-inject-cosmetics-on-response-started",
  "extended-selectors",
  "dynamic-dnr-fixes",
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

export type Platform = "firefox" | "chromium" | "safari";

export type Action = "disable-autoconsent" | "assist";

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
    [name: string]: {
      percentage: number;
      filter?: Filter;
    }[];
  };
}

export function isPlatform(platform: string): platform is Platform {
  return ["firefox", "safari", "chromium"].includes(platform);
}

export function isAction(action: string): action is Action {
  return ["disable-autoconsent", "assist"].includes(action);
}

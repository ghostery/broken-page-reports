import { Config } from "./types.ts";

const flags: Config["flags"] = {
  "firefox-content-script-scriptlets": [
    {
      percentage: 100,
      filter: {
        platform: ["firefox"],
      },
    },
  ],
  "chromium-inject-cosmetics-on-response-started": [
    {
      percentage: 50,
      filter: {
        platform: ["chromium"],
      },
    },
  ],
  "extended-selectors": [
    {
      percentage: 50,
    },
  ],
  "dynamic-dnr-fixes": [
    {
      percentage: 100,
    },
  ],
};

export default flags;

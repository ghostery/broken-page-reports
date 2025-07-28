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
      percentage: 10
    }
  ]
};

export default flags;

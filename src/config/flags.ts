import { Config } from "./types.ts";

const flags: Config["flags"] = {
  "firefox-content-script-scriptlets": [
    {
      percentage: 50,
      filter: {
        platform: ["firefox"],
      },
    },
  ],
  "chromium-inject-cosmetics-on-response-started": [
    {
      percentage: 10,
      filter: {
        platform: ["chromium"],
      },
    },
  ]
};

export default flags;

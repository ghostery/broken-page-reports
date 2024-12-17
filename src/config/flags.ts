import { Config } from "./types.ts";

const flags: Config["flags"] = {
  "firefox-content-script-scriptlets": [
    {
      percentage: 20,
      filter: {
        platform: ["firefox"],
      },
    },
  ],
};

export default flags;

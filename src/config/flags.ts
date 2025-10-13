import { Config } from "@ghostery/config-types";
import {
  FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS,
  FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED,
  FLAG_EXTENDED_SELECTORS,
  FLAG_DYNAMIC_DNR_FIXES,
  FLAG_PAUSE_ASSISTANT,
  PLATFORM_FIREFOX,
  PLATFORM_CHROMIUM,
} from "@ghostery/config-types";

const flags: Config["flags"] = {
  [FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS]: [
    {
      percentage: 100,
      filter: {
        platform: [PLATFORM_FIREFOX],
      },
    },
  ],
  [FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED]: [
    {
      percentage: 50,
      filter: {
        platform: [PLATFORM_CHROMIUM],
      },
    },
  ],
  [FLAG_EXTENDED_SELECTORS]: [
    {
      percentage: 100,
    },
  ],
  [FLAG_DYNAMIC_DNR_FIXES]: [
    {
      percentage: 100,
    },
  ],
  [FLAG_PAUSE_ASSISTANT]: [
    {
      percentage: 10,
    },
  ],
};

export default flags;

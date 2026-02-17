import {
  Config,
  FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED,
  FLAG_DYNAMIC_DNR_FIXES,
  FLAG_EXTENDED_SELECTORS,
  FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS,
  FLAG_INJECTION_TARGET_DOCUMENT_ID,
  FLAG_MODES,
  FLAG_NOTIFICATION_REVIEW,
  FLAG_ONBOARDING_SURVEY,
  FLAG_PAUSE_ASSISTANT,
  FLAG_REDIRECT_PROTECTION,
  FLAG_SUBFRAME_SCRIPTING,
  PLATFORM_FIREFOX,
} from "@ghostery/config";

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
      percentage: 100,
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
  [FLAG_INJECTION_TARGET_DOCUMENT_ID]: [
    {
      percentage: 100,
    },
  ],
  [FLAG_MODES]: [
    {
      percentage: 0,
    },
  ],
  [FLAG_PAUSE_ASSISTANT]: [
    {
      percentage: 0,
    },
  ],
  [FLAG_REDIRECT_PROTECTION]: [
    {
      percentage: 0,
    },
  ],
  [FLAG_ONBOARDING_SURVEY]: [
    {
      percentage: 20,
    },
  ],
  [FLAG_NOTIFICATION_REVIEW]: [
    {
      percentage: 50,
    },
  ],
  [FLAG_SUBFRAME_SCRIPTING]: [
    {
      percentage: 15,
    },
  ],
};

export default flags;

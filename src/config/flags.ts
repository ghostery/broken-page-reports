import {
  BROWSER_BRAVE,
  BROWSER_CHROME,
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

// ---- Active flags ----

const flags: Config["flags"] = {
  [FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED]: [
    { percentage: 100 },
  ],
  [FLAG_INJECTION_TARGET_DOCUMENT_ID]: [
    { percentage: 100 },
  ],
  [FLAG_MODES]: [
    { percentage: 10, filter: { browser: BROWSER_CHROME, version: "10.5.30" } },
    { percentage: 100, filter: { browser: BROWSER_BRAVE, version: "10.5.30" } },
  ],
  [FLAG_PAUSE_ASSISTANT]: [
    { percentage: 100 },
  ],
  [FLAG_REDIRECT_PROTECTION]: [
    { percentage: 0 },
  ],
  [FLAG_ONBOARDING_SURVEY]: [
    { percentage: 20 },
  ],
  [FLAG_NOTIFICATION_REVIEW]: [
    { percentage: 60 },
  ],
  [FLAG_SUBFRAME_SCRIPTING]: [
    { percentage: 50 },
  ],
};

// ---- Completed flags (removed from the codebase) ----

const completedFlags: Config["flags"] = {
  // https://github.com/ghostery/ghostery-extension/pull/3024
  [FLAG_EXTENDED_SELECTORS]: [
    { percentage: 100 },
  ],
  // https://github.com/ghostery/ghostery-extension/pull/3025
  [FLAG_DYNAMIC_DNR_FIXES]: [
    { percentage: 100 },
  ],
  // https://github.com/ghostery/ghostery-extension/pull/3051
  [FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS]: [
    { percentage: 100, filter: { platform: [PLATFORM_FIREFOX] } },
  ],
};

export default { ...flags, ...completedFlags };

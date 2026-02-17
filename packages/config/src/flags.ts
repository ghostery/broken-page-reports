// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.


// Active flags
export const FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED = "chromium-inject-cosmetics-on-response-started";
export const FLAG_INJECTION_TARGET_DOCUMENT_ID = "injection-target-document-id";
export const FLAG_MODES = "modes";
export const FLAG_PAUSE_ASSISTANT = "pause-assistant";
export const FLAG_REDIRECT_PROTECTION = "redirect-protection";
export const FLAG_ONBOARDING_SURVEY = "onboarding-survey";
export const FLAG_NOTIFICATION_REVIEW = "notification-review";
export const FLAG_SUBFRAME_SCRIPTING = "subframe-scripting";

// List of active flags
export const FLAGS = [
  FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED,
  FLAG_INJECTION_TARGET_DOCUMENT_ID,
  FLAG_MODES,
  FLAG_PAUSE_ASSISTANT,
  FLAG_REDIRECT_PROTECTION,
  FLAG_ONBOARDING_SURVEY,
  FLAG_NOTIFICATION_REVIEW,
  FLAG_SUBFRAME_SCRIPTING,
] as const;

// Completed flags
export const FLAG_DYNAMIC_DNR_FIXES = "dynamic-dnr-fixes";
export const FLAG_EXTENDED_SELECTORS = "extended-selectors";
export const FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS = "firefox-content-script-scriptlets";

const COMPLETED_FLAGS = [
  FLAG_DYNAMIC_DNR_FIXES,
  FLAG_EXTENDED_SELECTORS,
  FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS,
] as const;

export type Flag = typeof FLAGS[number] | typeof COMPLETED_FLAGS[number];

export function isFlag(flag: string): flag is Flag {
  return (FLAGS as readonly string[]).includes(flag) || (COMPLETED_FLAGS as readonly string[]).includes(flag);
}

// Copyright 2025 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export const FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED = "chromium-inject-cosmetics-on-response-started";
export const FLAG_DYNAMIC_DNR_FIXES = "dynamic-dnr-fixes";
export const FLAG_EXTENDED_SELECTORS = "extended-selectors";
export const FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS = "firefox-content-script-scriptlets";
export const FLAG_PAUSE_ASSISTANT = "pause-assistant";

export const FLAGS = [
  FLAG_CHROMIUM_INJECT_COSMETICS_ON_RESPONSE_STARTED,
  FLAG_DYNAMIC_DNR_FIXES,
  FLAG_EXTENDED_SELECTORS,
  FLAG_FIREFOX_CONTENT_SCRIPT_SCRIPTLETS,
  FLAG_PAUSE_ASSISTANT,
] as const;

export type Flag = typeof FLAGS[number];

export function isFlag(flag: string): flag is Flag {
  return (FLAGS as readonly string[]).includes(flag);
}

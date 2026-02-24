// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export const BROWSER_CHROME = "chrome";
export const BROWSER_EDGE = "edge";
export const BROWSER_OPERA = "opera";
export const BROWSER_BRAVE = "brave";
export const BROWSER_OCULUS = "oculus";
export const BROWSER_YANDEX = "yandex";
export const BROWSER_SAFARI = "safari";
export const BROWSER_FIREFOX = "firefox";

export const BROWSERS = [
  BROWSER_CHROME,
  BROWSER_EDGE,
  BROWSER_OPERA,
  BROWSER_BRAVE,
  BROWSER_OCULUS,
  BROWSER_YANDEX,
  BROWSER_SAFARI,
  BROWSER_FIREFOX,
] as const;

export type Browser = typeof BROWSERS[number];

export function isBrowser(browser: string): browser is Browser {
  return (BROWSERS as readonly string[]).includes(browser);
}

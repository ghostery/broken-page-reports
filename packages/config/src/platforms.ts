// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export const PLATFORM_CHROMIUM = "chromium";
export const PLATFORM_FIREFOX = "firefox";
export const PLATFORM_WEBKIT = "webkit";

export const PLATFORMS = [
  PLATFORM_CHROMIUM,
  PLATFORM_FIREFOX,
  PLATFORM_WEBKIT,
] as const;

export type Platform = typeof PLATFORMS[number];

export function isPlatform(platform: string): platform is Platform {
  return (PLATFORMS as readonly string[]).includes(platform);
}

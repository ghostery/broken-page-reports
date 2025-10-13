// Copyright 2025 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export const PLATFORM_CHROMIUM = "chromium";
export const PLATFORM_FIREFOX = "firefox";
export const PLATFORM_SAFARI = "safari";

export const PLATFORMS = [
  PLATFORM_CHROMIUM,
  PLATFORM_FIREFOX,
  PLATFORM_SAFARI,
] as const;

export type Platform = typeof PLATFORMS[number];

export function isPlatform(platform: string): platform is Platform {
  return (PLATFORMS as readonly string[]).includes(platform);
}

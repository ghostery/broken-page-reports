// Copyright 2025-2026 Ghostery GmbH
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

export const ACTION_DISABLE_ANTITRACKING_MODIFICATION = "disable-antitracking-modification";
export const ACTION_DISABLE_AUTOCONSENT = "disable-autoconsent";
export const ACTION_PAUSE_ASSISTANT = "pause-assistant";

export const ACTIONS = [
  ACTION_DISABLE_ANTITRACKING_MODIFICATION,
  ACTION_DISABLE_AUTOCONSENT,
  ACTION_PAUSE_ASSISTANT,
] as const;

export type Action = typeof ACTIONS[number];

export function isAction(action: string): action is Action {
  return (ACTIONS as readonly string[]).includes(action);
}

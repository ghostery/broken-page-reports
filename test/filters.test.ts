import { NetworkFilter, parseFilter, Request } from "npm:@ghostery/adblocker";
import { expect } from "jsr:@std/expect";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { parse } from "../src/assert.ts";

const cwd = process.cwd();

const doTest = (filePath: string) => {
  const content = readFileSync(path.join(cwd, filePath), "utf8");

  // Ends with new line
  expect(content.endsWith("\n")).toBe(true);

  for (const { filter, assertions } of parse(content)) {
    if (filter.startsWith("[") || filter.startsWith("!")) {
      continue;
    }

    Deno.test(filter, () => {
      const parsed = parseFilter(filter);

      // Is a valid filter
      if (
        parsed !== null &&
        parsed.isNetworkFilter() &&
        !(parsed instanceof NetworkFilter && parsed.isBadFilter())
      ) {
        expect(assertions.length).toBeGreaterThan(0);
      }

      expect(parsed).not.toBe(null);

      for (const { url, type, source, match } of assertions) {
        // Passes with network filter
        expect((NetworkFilter.parse(filter)!).match(
          Request.fromRawDetails({ url, type, sourceUrl: source }),
        )).toBe(match);
      }
    });
  }
};

doTest("filters/autoconsent-compatibility.txt");
doTest("filters/cookies.txt");
doTest("filters/fixes.txt");
doTest("filters/privacy.txt");
doTest("filters/annoyances.txt");

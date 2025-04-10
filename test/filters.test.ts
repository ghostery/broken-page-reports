import { NetworkFilter, parseFilter, Request } from "npm:@ghostery/adblocker";
import { expect } from "jsr:@std/expect";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import dns from "node:dns/promises";
import * as tldts from "npm:tldts";
import { parse } from "../src/assert.ts";

const VALIDATE_DNS = !!Deno.env.get('VALIDATE_DNS');
const cwd = process.cwd();

const hasDnsRecord = async (hostname: string) => {
  for (const rr of ['A', 'AAAA', 'CNAME']) {
    if (await dns.resolve(hostname, rr)) {
      return;
    }
  }
  throw new Error('RECORD_NOT_FOUND');
}

const doTest = (filePath: string) => {
  const content = readFileSync(path.join(cwd, filePath), "utf8");

  // Ends with new line
  expect(content.endsWith("\n")).toBe(true);

  for (const { filter, assertions } of parse(content)) {
    if (filter.startsWith("[") || filter.startsWith("!")) {
      continue;
    }

    Deno.test(filter, async () => {
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

        if (VALIDATE_DNS && url) {
          await expect(hasDnsRecord(tldts.parse(url)!.hostname!))
            .resolves.not.toThrow();
        }
      }
    });
  }
};

doTest("filters/autoconsent-compatibility.txt");
doTest("filters/cookies.txt");
doTest("filters/fixes.txt");
doTest("filters/privacy.txt");
doTest("filters/annoyances.txt");

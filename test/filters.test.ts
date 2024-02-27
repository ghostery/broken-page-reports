import { NetworkFilter, Request, parseFilter } from '@cliqz/adblocker';
import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from '../src/assert';

const cwd = process.cwd();

const doTest = (filePath: string) => {
	const content = readFileSync(path.join(cwd, filePath), 'utf8');

	// Ends with new line
	expect(content.endsWith('\n')).toBeTrue();

	for (const { filter, assertions } of parse(content)) {
		if (filter.startsWith('[') || filter.startsWith('!')) {
			continue;
		}

		test(filter, () => {
			const parsed = parseFilter(filter);

			// Is a valid filter
			if (
				parsed !== null
				&& parsed.isNetworkFilter()
				&& !(parsed instanceof NetworkFilter && parsed.isBadFilter())
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

doTest('filters/autoconsent-compatibility.txt');
doTest('filters/cookies.txt');
doTest('filters/fixes.txt');
doTest('filters/privacy.txt');
doTest('filters/annoyances.txt');

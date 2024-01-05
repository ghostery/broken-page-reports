import test from 'ava';
import {readFileSync} from 'fs';
import path from 'path';
import {parse} from '../src/modules/assert';
import {NetworkFilter, Request, parseFilter} from '@cliqz/adblocker';

const cwd = process.cwd();

const doTest = (location: string) => {
	for (const {filter, assertions} of parse(readFileSync(path.join(cwd, location), 'utf8'))) {
		if (filter.startsWith('[') || filter.startsWith('!')) {
			continue;
		}

		test(filter, t => {
			const parsed = parseFilter(filter);

			if (
				parsed !== null
        && parsed.isNetworkFilter()
        && !(parsed instanceof NetworkFilter && parsed.isBadFilter())
			) {
				t.true(assertions.length > 0, 'has at least one test');
			}

			t.not(parsed, null, 'can be parsed');

			for (const {url, type, source, match} of assertions) {
				t.is(
					(NetworkFilter.parse(filter)!).match(
						Request.fromRawDetails({url, type, sourceUrl: url}),
					),
					match,
					`type=${type} url=${url}, source=${source}`,
				);
			}
		});
	}
};

// We expect files are already created by $pnpm 'ci:compile'
doTest('dist/filters.txt');
doTest('dist/filters-extended.txt');

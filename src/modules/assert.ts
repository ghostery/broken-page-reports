import {
	type RequestType,
} from '@cliqz/adblocker';

export type Assertion = {
	match: boolean;
	source?: string;
	type?: RequestType;
	url?: string;
};

const enum Token {
	AssertionStart,
	AssertionContinue,
	Comment,
	Filter,
	Empty,
}

function * lex(content: string): IterableIterator<[Token, string]> {
	for (const line of content.split(/[\n\r]/g).map(l => l.trim())) {
		if (line.startsWith('! >>>')) {
			yield [Token.AssertionStart, line];
		} else if (line.startsWith('! ...')) {
			yield [Token.AssertionContinue, line];
		} else if (line.startsWith('!')) {
			yield [Token.Comment, line];
		} else if (line.length === 0) {
			yield [Token.Empty, line];
		} else {
			yield [Token.Filter, line];
		}
	}
}

const enum State {
	Init,
	Assertion,
}

/**
 * Given the content of a custom filters list, extract inline tests so that
 * they can be executed during the test-suite. These tests can be specified
 * using the following syntax:
 *
 * ! >>> url=https://example.com/filter source=https://example.com type=script
 * /filter$option
 *
 * Multi-line is also supported to make things more readable:
 * ! >>> url=https://example.com/filter
 * ! ... source=https://example.com
 * ! ... type=script
 * /filter$option
 *
 * You can specify multiple tests for the same filter:
 * ! >>> url=https://example.com/filter source=https://example.com type=script
 * ! >>> url=https://example.com/filter.js source=https://example.com type=script
 * /filter$option
 *
 * At the moment, each filter needs to have its own tests.
 */
export function * parse(content: string): IterableIterator<{
	filter: string;
	assertions: Assertion[];
}> {
	// Used to know if we are currently parsing an assertion
	let state: State = State.Init;

	// Current assertions (will be attached to next filter encountered)
	let assertions: Assertion[] = [];

	// Current assertion being parsed (needed because can span multiple lines)
	let match = true;
	let source: string | undefined;
	let type: RequestType | undefined;
	let url: string | undefined;

	// Flush current assertion (if any) into `assertions`
	const flush = () => {
		if (state === State.Assertion) {
			const assertion: Assertion = {
				match: match ?? true,
			};

			if (source !== undefined) {
				assertion.source = source;
			}

			if (url !== undefined) {
				assertion.url = url;
			}

			if (type !== undefined) {
				assertion.type = type;
			}

			assertions.push(assertion);

			// Reset state
			match = true;
			source = undefined;
			type = undefined;
			url = undefined;

			state = State.Init;
		}
	};

	// Start parsing
	for (const [token, line] of lex(content)) {
		if (token !== Token.AssertionContinue) {
			flush(); // Flush assertion if any
		}

		// If we have assertions followed by a normal comment or empty line, we
		// flush them anyways (probably a bug) so that they trigger some tests
		// (probably will fail).
		if (
			(token === Token.Empty || token === Token.Comment)
			&& assertions.length !== 0
		) {
			yield {
				filter: '',
				assertions,
			};
			assertions = [];
		}

		// If we have a filter, then flush it alongside accumulated assertions.
		if (token === Token.Filter) {
			yield {
				filter: line,
				assertions,
			};
			assertions = [];
		}

		// Update current assertion (new or continuing)
		if (token === Token.AssertionStart || token === Token.AssertionContinue) {
			state = State.Assertion;
			line
				.slice(5)
				.split(/\s+/g)
				// eslint-disable-next-line @typescript-eslint/no-loop-func
				.forEach(part => {
					if (part.startsWith('url=')) {
						url = part.slice(4);
					} else if (part.startsWith('source=')) {
						source = part.slice(7);
					} else if (part.startsWith('type=')) {
						type = part.slice(5) as RequestType;
					} else if (part.startsWith('match=')) {
						match = part.slice(6) === 'true';
					}
				});
		}
	}

	// Handle case where there are assertions at the end of the file, without a filter.
	flush();
	if (assertions.length !== 0) {
		yield {
			filter: '',
			assertions,
		};
	}
}

import path from 'node:path';
import {appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync} from 'node:fs';

const env = {
	sourceDir: process.env.SOURCEDIR ?? 'filters',
	outDir: process.env.OUTDIR ?? 'dist',
};

const now = Date.now();

const headerLines = `[Adblock Plus 2.0]
! Homepage: https://github.com/ghostery/broken-page-reports
! Title: {{title}}
! Expires: 1 day
! Version: ${now}
`;
const versionLine = '! Version: {{version}}';

/**
 * Extract filter header and body from filter file content
 * @param {string} filter
 */
const parseFilter = filter => {
	const versionLineStart = filter.indexOf(versionLine);

	if (versionLineStart < 0) {
		throw new Error('Failed to find the version line of the filter!');
	}

	const versionLineEnd = versionLineStart + versionLine.length;

	return {
		header: filter.slice(0, versionLineEnd),
		body: filter
			.slice(versionLineEnd)
			.replace(/^\n/gm, ''),
	};
};

/**
 * Create a dist directory unless exists
 * @param {string} location
 */
const createDirectory = location => {
	if (!existsSync(location) || !statSync(location).isDirectory()) {
		mkdirSync(location, {recursive: true});
	}
};

const main = () => {
	const cwd = process.cwd();

	// Create output directory and files
	createDirectory(env.outDir);
	createDirectory(path.join(env.outDir, 'filters'));

	const outFiles = {
		standard: path.join(env.outDir, 'filters.txt'),
		extended: path.join(env.outDir, 'filters-extended.txt'),
	};

	writeFileSync(outFiles.standard, headerLines.replace('{{title}}', '@Ghostery filters'), 'utf8');
	writeFileSync(outFiles.extended, headerLines.replace('{{title}}', '@Ghostery filters — extended'), 'utf8');

	copyFileSync(path.join(cwd, 'assets/index.html'), path.join(env.outDir, 'index.html'));

	// Read filters
	const root = path.join(cwd, env.sourceDir);
	const files = readdirSync(root);

	for (const file of files) {
		const {header, body} = parseFilter(readFileSync(path.join(root, file), 'utf8'));

		let outFile = outFiles.standard;

		if (file.includes('-extended')) {
			outFile = outFiles.extended;
		}

		appendFileSync(outFile, body, 'utf8');
		writeFileSync(path.join(env.outDir, 'filters', file), header.replace('{{version}}', now) + '\n' + body, 'utf8');
	}
};

main();

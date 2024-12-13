import path from "node:path";
import {
  appendFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import process from "node:process";

const cwd = process.cwd();
const now = Date.now();

const sourcesDir = path.join(cwd, "filters");
const outDir = path.join(cwd, "dist");

const headerLines = `[Adblock Plus 2.0]
! Homepage: https://github.com/ghostery/broken-page-reports
! Title: @Ghostery filters
! Expires: 1 day
! Version: ${now}
`;
const versionLine = "! Version: {{version}}";

/**
 * Extract filter header and body from filter file content
 * @param {string} filter
 */
const parseFilter = (filter) => {
  const versionLineStart = filter.indexOf(versionLine);

  if (versionLineStart < 0) {
    throw new Error("Failed to find the version line of the filter!");
  }

  const versionLineEnd = versionLineStart + versionLine.length;

  return {
    header: filter.slice(0, versionLineEnd),
    body: filter
      .slice(versionLineEnd)
      .replace(/^\n/gm, ""),
  };
};

/**
 * Create a dist directory unless exists
 * @param {string} location
 */
const createDirectory = (location) => {
  if (!existsSync(location) || !statSync(location).isDirectory()) {
    mkdirSync(location, { recursive: true });
  }
};

// Create directories
createDirectory(outDir);
createDirectory(path.join(outDir, "filters"));

// Copy main page
copyFileSync(
  path.join(cwd, "assets/index.html"),
  path.join(outDir, "index.html"),
);

// Create merged filter
const outFile = path.join(outDir, "filters.txt");

writeFileSync(outFile, headerLines, "utf8");

// Iterate over separate filters
for (const filename of readdirSync(sourcesDir)) {
  const { header, body } = parseFilter(
    readFileSync(path.join(sourcesDir, filename), "utf8"),
  );

  // Append merged filter
  appendFileSync(outFile, body, "utf8");

  // Compile separate filter
  writeFileSync(
    path.join(outDir, "filters", filename),
    `${header.replace("{{version}}", now)}
${body}`,
    "utf8",
  );
}

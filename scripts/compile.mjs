#!/bin/node
import path from 'node:path'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'

const env = {
  sourceDir: process.env.SOURCEDIR ?? 'filters',
  outDir: process.env.OUTDIR ?? 'dist'
}

const now = Date.now()

const headerLines = `[Adblock Plus 2.0]
! Homepage: https://github.com/ghostery/broken-page-reports
! Title: {{title}}
! Expires: 1 day
! Version: ${now}
`
const versionLine = '! Version: {{version}}'

/**
 * Extract filter header and body from filter file content
 * @param {string} filter 
 */
const parseFilter = async (filter) => {
  const versionLineStart = filter.indexOf(versionLine)

  if (versionLineStart < 0) {
    throw new Error('Failed to find the version line of the filter!')
  }

  const versionLineEnd = versionLineStart + versionLine.length

  return {
    header: filter.slice(0, versionLineEnd),
    body: filter
      .slice(versionLineEnd)
      .replace(/\n\n/g, '')
  }
}

/**
 * Create a dist directory unless exists
 * @param {string} location 
 */
const createDirectory = async (location) => {
  if (!existsSync(location) || !(await fs.stat(location)).isDirectory()) {
    await fs.mkdir(location, { recursive: true })
  }
}

const main = async () => {
  // Create output directory and files
  await createDirectory(env.outDir)
  await createDirectory(path.join(env.outDir, 'filters'))

  const outFiles = {
    standard: path.join(env.outDir, 'filters.txt'),
    extended: path.join(env.outDir, 'filters-extended.txt')
  }

  await fs.writeFile(outFiles.standard, headerLines.replace('{{title}}', '@Ghostery filters'), 'utf8')
  await fs.writeFile(outFiles.extended, headerLines.replace('{{title}}', '@Ghostery filters — extended'), 'utf8')

  await fs.copyFile(path.join(process.cwd(), 'scripts/index.html'), path.join(env.outDir, 'index.html'))

  // Read filters
  const root = path.join(process.cwd(), env.sourceDir)
  const files = await fs.readdir(root)

  for (const file of files) {
    const {header, body} = await parseFilter(await fs.readFile(path.join(root, file), 'utf8'))

    let outFile = outFiles.standard

    if (file.includes('-extended')) {
      outFile = outFiles.extended
    }

    await fs.appendFile(outFile, body, 'utf8')
    await fs.writeFile(path.join(env.outDir, 'filters', file), header.replace('{{version}}', now) + '\n' + body, 'utf8')
  }
}

void main()

# Contributing to Broken Page Reports

## Filters

We categorize filters by their purpose.

### `autoconsent-compatibility`, exclusion rules for `autoconsent` coverage

In Ghostery, we try to minimize the trackers you potentially load from the website.
One of our approaches to better privacy is to reject consents using `autoconsent` embedded in Never Consent and send your decision to block trackers to involved companies.
We need to unblock consent-related elements to make Never Consent work properly.
In this approach, we can have fewer website breakages and fewer pre-loaded tracker codes.

In this filter, we're excluding rules interrupting the Never Consent of Ghostery Browser Extension.

### `cookies`, hiding cookie popups and consents

In this list, we aim to remove cookie and consent popups without breaking the site.
As stated in `autoconsent-fixes`, we prioritize Never Consent over hiding consent elements.
However, it may take some time case by case and if we need time to fix the issue on Never Consent, we'll put the fix in this filter.
Therefore, all of this filter is planned to be moved to Never Consent coverage.

### `fixes`

Some filters may not categorized.
We fix general filter problems in Ghostery.

## Conventions

### SHOULD have a reference

Each filter should have a reference to related issues or info.
This helps future contributors to have a better understanding of the context.

```adblock
!! DO
! https://link/to/reference
domain.tld##filter

!! DO NOT
! domain.tld
domain.tld##filter
```

### SHOULD append the filter

Without special reasons for grouping filters, new filters should be appended to the end of the file.

```adblock
!! DO
! https://link/to/reference
domain.tld##filter$old
domain.tld##filter$new

!! DO NOT
! https://link/to/reference
domain.tld##filter$new
domain.tld##filter$old
```

### SHOULD avoid generic filters

Using generic filters or global filters may lead to performance problems.
In most cases, you should not use generic filters.

```adblock
!! DO
! https://link/to/reference
domain.tld##element

!! DO NOT
! https://link/to/reference
##element
```

### SHOULD prioritize Manifest V3 compatible filters

Some filters may not compatible with Manifest V3.
You should prioritize Manifest V3 compatible format over Manifest V2 only filter if available.

Also, see [Ghostery adblocker engine compatibility matrix](https://github.com/ghostery/adblocker/wiki/Compatibility-Matrix).

### SHOULD have tests for network filters

We enforce our contributors to write a test for network filters.

```adblock
!! One-liner
! https://link/to/reference
! >>> url=https://example.com/ad.js type=script source=https://domain.tld
||example.com/ad.js^

!! Multi-liner
! https://link/to/reference
! >>> url=https://example.com/ad.js
! ... type=script
! ... source=https://domain.tld
||example.com/ad.js^
```

Test definitions are basically embedded in the comments.
Start a line with `! >>>` to define a test, and append a line with `! ...` to use multiple lines.

You need to set three variables to the test.

- `url`: The URL of the request.
- `type`: The type of the request.
- `source`: The source URL of the request, this is often set to the frame URL sending the request.

In the above example, we can interpret the test as: `||example.com/ad.js` should match a request type of `script` having url of `https://example.com/ad.js` originated from the frame with url of `https://domain.tld`.

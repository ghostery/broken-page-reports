# Contributing to Broken Page Reports

## Filters

We categorize filters by their purpose.

### `autoconsent-fixes`, exclusion rules for `autoconsent` coverage

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

### `custom`

Some filters may not categorized.
We fix general filter problems in Ghostery.

# Oikos Swap SDK

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Actions Status](https://github.com/oikos-cash/swap-sdk/workflows/CI/badge.svg)](https://github.com/oikos-cash/swap-sdk)
[![npm version](https://img.shields.io/npm/v/@oikos/swap-sdk/latest.svg)](https://www.npmjs.com/package/@oikos/swap-sdk/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@oikos/swap-sdk/latest.svg)](https://bundlephobia.com/result?p=@oikos/swap-sdk@latest)

Port of Uniswap SDK for Tron.

In-depth documentation on this SDK is available at [uniswap.org](https://uniswap.org/docs/v2/SDK/getting-started/).

## Running tests

To run the tests, follow these steps. You must have at least node v10 installed.

First clone the repository:

```sh
git clone https://github.com/oikos-cash/swap-sdk.git
```

Move into the swap-sdk working directory

```sh
cd swap-sdk/
```

Install dependencies

```sh
npm install
```

Run tests

```sh
npm test
```

You should see output like the following:

```sh
$ tsdx test
 PASS  test/constants.test.ts
 PASS  test/pair.test.ts
 PASS  test/fraction.test.ts
 PASS  test/miscellaneous.test.ts
 PASS  test/entities.test.ts
 PASS  test/trade.test.ts

Test Suites: 1 skipped, 6 passed, 6 of 7 total
Tests:       3 skipped, 82 passed, 85 total
Snapshots:   0 total
Time:        5.091s
Ran all test suites.
✨  Done in 6.61s.
```

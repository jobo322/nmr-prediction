# nmr-prediction

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

The goal is to create a tool to predict NMR spectra for nmrshiftdb2 database.

Original data can be found at:

https://nmrshiftdb.nmr.uni-koeln.de/nmrshiftdb/media-type/html/user/anon/page/default.psml/js_pane/P-Help;jsessionid=6D9041ACAF227D0B0531D1EADFAF8E13

## Installation

`$ npm i nmr-prediction`

## Usage

You should split the big SDF that is zipped ind ata

node -r esm src/split.js

```js
import library from 'nmr-prediction';

const result = library(args);
// result is ...
```

## [API Documentation](https://cheminfo.github.io/nmr-prediction/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/nmr-prediction.svg
[npm-url]: https://www.npmjs.com/package/nmr-prediction
[ci-image]: https://github.com/zakodium/nmr-prediction/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/zakodium/nmr-prediction/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/zakodium/nmr-prediction.svg
[codecov-url]: https://codecov.io/gh/zakodium/nmr-prediction
[download-image]: https://img.shields.io/npm/dm/nmr-prediction.svg
[download-url]: https://www.npmjs.com/package/nmr-prediction

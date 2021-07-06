# nmr-prediction

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

The goal is to create a tool to predict NMR spectra for nmrshiftdb2 database.

Original data can be found at:

https://nmrshiftdb.nmr.uni-koeln.de/nmrshiftdb/media-type/html/user/anon/page/default.psml/js_pane/P-Help;jsessionid=6D9041ACAF227D0B0531D1EADFAF8E13

## Usage

The original data is in 'data'. After we calculate the hoses codes and chemical shifts, It is a process in parallel so you can choose the number of threads you want to use on it changing the maxThreads parameter directly in file. Finally we create databases for each nucleus, currently ignoring the solvent.

`node -r esm src/createDB/createDB.js`

This will create one file per nucleus in the `output` folder.

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

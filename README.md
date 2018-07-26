# sass-package-importer

[![npm version](https://img.shields.io/npm/v/sass-package-importer.svg)](https://www.npmjs.com/package/sass-package-importer)
[![Build Status](https://travis-ci.com/shinnn/sass-package-importer.svg?branch=master)](https://travis-ci.com/shinnn/sass-package-importer)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/sass-package-importer.svg)](https://coveralls.io/github/shinnn/sass-package-importer?branch=master)

A [node-sass](https://www.npmjs.com/package/node-sass) [importer](https://www.npmjs.com/package/node-sass#importer--v200---experimental) to resolve files from either [npm packages](https://docs.npmjs.com/getting-started/packages) or relative paths

```javascript
const {render} = require('node-sass');
const sassPackageImporter = require('sass-package-importer');

// ./relative.css: .title { color: green; }

const data = `
@import 'normalize.css';
@import 'relative';
`;

// `relative` is resolved but `normalize.css` is not resolved
render({data}, (err, {css}) => {
  css.toString();
  //=> '@import url(normalize.css);\n.title {\n  color: green ...'
});

// `normalize.css` is resolved and the rendered CSS includes contents of normalize.css
render({data, importer: sassPackageImporter}, (err, {css}) => {
  css.toString(); //=> '/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css ...'
});
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install sass-package-importer
```

## API

```javascript
const sassPackageImporter = require('sass-package-importer');
```

### sassPackageImporter

Type: `Function`

Once this function is passed to [`importer` option](https://github.com/sass/node-sass#importer--v200---experimental) of [node-sass](https://github.com/sass/node-sass)'s [`render` method](https://github.com/sass/node-sass#render-callback--v300), it checks if each [`@import`](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#import) target can be resolved with [`require.resolve()`](https://nodejs.org/api/modules.html#modules_require_resolve_request_options).

If a target is resolvable and is neither JavaScript nor JSON file, the `@import` will be inlined with the stylesheet in the resolved npm package. Otherwise `@import` is treated as usual.

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe

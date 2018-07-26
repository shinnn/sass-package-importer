'use strict';

const extname = require('path').extname;
const readFile = require('fs').readFile;

module.exports = function sassPackageImporter(path, prev, done) {
	try {
		const resolvedPath = require.resolve(path);
		const ext = extname(resolvedPath).slice(1).toLowerCase();

		if (ext === 'js' || ext === 'json' || ext === 'mjs') {
			done({file: path});
			return;
		}

		readFile(resolvedPath, 'utf8', (err, contents) => done(err || {
			file: resolvedPath,
			contents: contents // eslint-disable-line object-shorthand
		}));
	} catch (err) {
		done({file: path});
	}
};

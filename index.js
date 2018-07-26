'use strict';

const {extname} = require('path');
const {readFile} = require('fs');

module.exports = function sassPackageImporter(path, prev, done) {
	let resolvedPath;

	try {
		resolvedPath = require.resolve(path);
	} catch (err) {
		done({file: path});
		return;
	}

	const ext = extname(resolvedPath).slice(1).toLowerCase();

	if (ext === 'js' || ext === 'json' || ext === 'mjs') {
		done({file: path});
		return;
	}

	readFile(resolvedPath, 'utf8', (err, contents) => done(err || {file: resolvedPath, contents}));
};

'use strict';

const {join} = require('path');
const {promisify} = require('util');

const {render} = require('node-sass');
const sassPackageImporter = require('..');
const test = require('tape');

const promisifiedRender = promisify(render);

async function renderSass(data) {
	return (await promisifiedRender({
		data,
		file: join(__dirname, 'source.scss'),
		importer: sassPackageImporter
	})).css.toString();
}

test('sassPackageImporter()', async t => {
	t.ok(
		(await renderSass('@import "normalize.css";')).includes('background-color: transparent;'),
		'should import CSS form an npm package.'
	);

	t.equal(
		await renderSass('@import url(normalize.css);'),
		'@import url(normalize.css);\n',
		'should avoid inlining CSS in url().'
	);

	t.equal(
		await renderSass('@import "fixture";'),
		'.this-should-be-included {\n  color: red; }\n',
		'should import Sass in relative paths as usual.'
	);

	try {
		await renderSass('@import "node-sass";');
		t.fail('Unexpectedly succeeded.');
	} catch ({message}) {
		t.equal(
			message,
			'File to import not found or unreadable: node-sass.',
			'should avoid reading non-CSS files from npm packages.'
		);
	}

	t.end();
});

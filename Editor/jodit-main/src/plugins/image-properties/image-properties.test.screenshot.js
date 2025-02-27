/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

require('../../../test/screenshots/bootstrap.screenshot.js');
const expect = require('expect');

describe('Image properties screenshot testing', () => {
	describe('Open image properties', () => {
		it('works', async function () {
			await page.evaluate(async () => {
				editor.value =
					'<p><a target="_blank" href="https://xdsoft.net/jodit/files/th.jpg"><img alt="test image" title="test title" class="some-class" src="https://xdsoft.net/jodit/files/th.jpg"></a></p>';
				const img = editor.editor.querySelector('img');
				await img.decode();
				simulateEvent('dblclick', img);
			});

			await page.waitForSelector('[role="dialog"]');
			const element = await page.$(
				'[role="dialog"] .jodit-dialog__panel'
			);
			const screenshot = await element.screenshot();
			expect(screenshot).toMatchImageSnapshot(this);
		}).timeout(10000);
	});
});

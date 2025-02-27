/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

require('../../../test/screenshots/bootstrap.screenshot.js');
const expect = require('expect');

describe('Image editor screenshot testing', () => {
	describe('Open image editor', () => {
		it('works', async function () {
			await page.evaluate(() => {
				return editor
					.getInstance('ImageEditor')
					.open('https://xdsoft.net/jodit/files/artio.jpg');
			});

			await page.waitForSelector('[role="dialog"] .jodit-dialog__panel');
			const dialog = await page.$('[role="dialog"] .jodit-dialog__panel');
			const screenshot = await dialog.screenshot();
			expect(screenshot).toMatchImageSnapshot(this);
		}).timeout(10000);

		describe('Crop mode', () => {
			it('Crop mode', async function () {
				await page.evaluate(async () => {
					await editor
						.getInstance('ImageEditor')
						.open('https://xdsoft.net/jodit/files/artio.jpg');

					simulateEvent(
						'click',
						document.querySelector('[data-area="crop"]')
					);
				});

				await page.waitForSelector(
					'[role="dialog"] .jodit-dialog__panel'
				);
				const dialog = await page.$(
					'[role="dialog"] .jodit-dialog__panel'
				);
				const screenshot = await dialog.screenshot();
				expect(screenshot).toMatchImageSnapshot(this);
			}).timeout(10000);
		});
	});
});

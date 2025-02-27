/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

require('../../../test/screenshots/bootstrap.screenshot.js');
const expect = require('expect');

describe('AI Assistant screenshot testing', () => {
	describe('Open Assistant dialog', () => {
		it('works', async function () {
			await page.evaluate(() => {
				return clickButton('ai_assistant', editor);
			});

			await page.waitForSelector('[role="dialog"]');
			const element = await page.$(
				'[role="dialog"] .jodit-dialog__panel'
			);
			const screenshot = await element.screenshot();
			expect(screenshot).toMatchImageSnapshot(this);
		});
	});
});

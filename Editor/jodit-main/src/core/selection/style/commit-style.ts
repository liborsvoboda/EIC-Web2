/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

/**
 * @module selection
 */

import type {
	HTMLTagNames,
	ICommitStyle,
	IJodit,
	IStyleOptions
} from 'jodit/types';
import { IS_BLOCK, LIST_TAGS } from 'jodit/core/constants';
import { camelCase } from 'jodit/core/helpers/string/camel-case';

import { ApplyStyle } from './apply-style';

/** @internal */
export const WRAP = 'wrap';
/** @internal */
export const UNWRAP = 'unwrap';
/** @internal */
export const CHANGE = 'change';
/** @internal */
export const UNSET = 'unset';
/** @internal */
export const INITIAL = 'initial';
/** @internal */
export const REPLACE = 'replace';
/** @internal */
export const _PREFIX = 'commitStyle';

export class CommitStyle implements ICommitStyle {
	private __applyMap: WeakMap<HTMLElement, Record<string, boolean>> =
		new WeakMap();

	isApplied(elm: HTMLElement, key: string): boolean {
		const data = this.__applyMap.get(elm);
		if (!data) {
			return false;
		}

		return data[key];
	}

	setApplied(elm: HTMLElement, key: string): void {
		const data = this.__applyMap.get(elm) ?? {};
		data[key] = true;
		this.__applyMap.set(elm, data);
	}

	get elementIsList(): boolean {
		return Boolean(
			this.options.element && LIST_TAGS.has(this.options.element as 'ol')
		);
	}

	get element(): HTMLTagNames {
		return this.options.element || this.defaultTag;
	}

	/**
	 * New element is blocked
	 */
	get elementIsBlock(): boolean {
		return Boolean(
			this.options.element && IS_BLOCK.test(this.options.element)
		);
	}

	/**
	 * The commit applies the tag change
	 */
	get isElementCommit(): boolean {
		return Boolean(
			this.options.element &&
				this.options.element !== this.options.defaultTag
		);
	}

	get defaultTag(): HTMLTagNames {
		if (this.options.defaultTag) {
			return this.options.defaultTag;
		}

		return this.elementIsBlock ? 'p' : 'span';
	}

	get elementIsDefault(): Boolean {
		return this.element === this.defaultTag;
	}

	constructor(readonly options: IStyleOptions) {}

	apply(jodit: IJodit): void {
		const { hooks } = this.options;

		try {
			hooks &&
				Object.keys(hooks).forEach(key => {
					// @ts-ignore
					jodit.e.on(camelCase(_PREFIX + '_' + key), hooks[key]);
				});

			ApplyStyle(jodit, this);
		} finally {
			hooks &&
				Object.keys(hooks).forEach(key => {
					// @ts-ignore
					jodit.e.off(camelCase(_PREFIX + '_' + key), hooks[key]);
				});

			this.__applyMap = new WeakMap();
		}

		jodit.synchronizeValues();
		jodit.e.fire('afterCommitStyle', this);
	}
}

import { randomIntBetween } from './Utils';

/**
 * Wrapper around Map that adds support for fetching random map value.
 */
export default class KeyMap {

	constructor() {
		this.values = new Map();
		this.keys = [];
	}

	set(key, value) {
		if (!this.values.has(key)) {
			this.keys.push(key);
		}
		this.values.set(key, value);
		return this;
	}

	get(key) {
		return this.values.get(key);
	}

	isEmpty() {
		return this.keys.length == 0;
	}

	getRandomValue() {
		if (this.keys.length == 0) {
			return undefined;
		}
		const randomKey = this.keys[randomIntBetween(0, this.keys.length)];
		return this.values.get(randomKey);
	}
}
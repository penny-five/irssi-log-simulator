import { randomIntBetween } from './Utils';

/**
 * Wrapper around Map that adds support for fetching random map value.
 */
export default class KeyMap {

	constructor() {
		this.values = new Map();
		this.occurances = [];
	}

	set(key, value) {
		this.values.set(key, value);
		this.occurances.push(key);
		return this;
	}

	get(key) {
		return this.values.get(key);
	}

	isEmpty() {
		return this.occurances.length == 0;
	}

	getRandomValue() {
		if (this.occurances.length == 0) {
			return undefined;
		}
		const randomKey = this.occurances[randomIntBetween(0, this.occurances.length)];
		return this.values.get(randomKey);
	}
}
import { randomIntBetween } from './Utils';

/**
 * Wrapper around Map that adds support for fetching random map values.
 *
 * Tracks how many times each key is set. Probability for a value to be returned from
 * getRandomValue() increases each time it is added to the map.
 */
export default class CountingMap {

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
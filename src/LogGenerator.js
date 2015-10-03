import KeyMap from './KeyMap';
import State from './State';

/**
 * Matches Irssi log lines that are messages written by users.
 * @type {RegExp}
 */
const MATCH_MESSAGE = /\d{2}:\d{2} <.[^ ]*> /;

export default class LogGenerator {

	constructor() {
		this.states = new KeyMap();
		this.usernames = new KeyMap();
	}

	/**
	 * Feed Irssi log lines into LogGenerator. The more lines are fed, the more
	 * material the generator will have to build random messages upon.
	 * @param  {String} line
	 */
	feedLine(line) {
		const components = extractComponents(line);
		if (components != null) {
			this._processUsername(components.username);
			this._processWords(components.words);
		}
	}

	_processUsername(username) {
		this.usernames.set(username, username);
	}

	_processWords(words) {
		words.forEach((word, index) => {
			const state = this._getOrCreateState(words[index]);
			if (index + 1 < words.length) {
				const nextState = this._getOrCreateState(words[index + 1]);
				state.connectTo(nextState);
			}		
		});
	}

	_getOrCreateState(name) {
		let state = this.states.get(name);
		if (!state) {
			state = new State(name);
			this.states.set(name, state);
		}		
		return state;
	}

	/**
	 * Generate multiple messages, writing them to provided Writer.
	 * @param  {Object} writer 
	 * @param  {Number} count  number of messages to generate
	 */
	generateMany(writer, count) {
		let generatedMessages = 0;
		while (generatedMessages < count) {
			writer.write(this.generateMessage());
			generatedMessages++;
		}
	}
	
	/**
	 * Generate a random message using lines that were fed with feedline()
	 * @param  {Number} maxLength
	 * @return {Object} message
	 */
	generateMessage(maxLength=10) {
		const randomUser = this.usernames.getRandomValue();
		const randomMessageChain = constructChain(this.states.getRandomValue(), maxLength);
		return { username: randomUser, text: randomMessageChain };
	}
}

let constructChain = (startState, maxChainLength) => {
	let states = [startState];
	while (states.length < maxChainLength) {
		let nextState = states[states.length - 1].getRandomConnection();
		if (nextState != null) {
			states.push(nextState);
		} else break;
	}
	return states.reduce((chain, state, index) => chain + (index > 0 ? ' ': '') + state.name, '');
};

/**
 * Extract username and individual words from a log line.
 * @param  {String} line Log line
 * @return {Object}      Object containing username and words, or null if input wasn't a line written by a user.
 */
let extractComponents = line => {
	const matches = line.match(MATCH_MESSAGE);
	const isUserLine = matches != null;
	if (isUserLine) {
		const timestampAndUsername = matches[0];
		const username = timestampAndUsername.substring(8, timestampAndUsername.length - 2);
		const contents = line.substring(timestampAndUsername.length);
		const words = contents
			.split(' ')
			.map(word => word.trim().toLowerCase())
			.filter(word => isValidWord(word));
		return { username, words };
	}
	return null;
};

let isValidWord = word => {
	return word != null
		&& word.length > 0
		&& !word.startsWith('http:')
		&& !word.startsWith('https');
};
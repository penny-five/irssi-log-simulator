import CountingMap from './CountingMap';

/**
 * A state in state space.
 */
export default class State {

	constructor(name) {
		this.name = name;
		this.connectedStates = new CountingMap();
	}

	/**
	 * Connect to another state.
	 * @param  {State} state
	 */
	connectTo(state) {
		this.connectedStates.set(state.name, state);
	}

	/**
	 * Get random state from states that have been connected to this state with connectTo(state).
	 * @return {State} random state
	 */
	getRandomConnection() {
		return this.connectedStates.getRandomValue();
	}

	hasConnections() {
		return !this.connectedStates.isEmpty();
	}
}
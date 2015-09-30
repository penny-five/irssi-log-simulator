
export function randomIntBetween(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

export function extractChannelName(logfileName) {
	if (logfileName.startsWith('#') && logfileName.endsWith('.log')) {
		const channelName =  logfileName.substring(1, logfileName.lastIndexOf('.'));
		if (channelName) {
			return channelName;
		}
	}
	throw new Error('Cannot parse channel name from log file name: ' + logfileName);
}
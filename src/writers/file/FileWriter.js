import { createWriteStream } from 'fs';

/**
 * Writes messages into an output file in format "<@{username}> {message}".
 */
export default class FileWriter {

	constructor(outputFilename) {
		this.outputFilename = outputFilename;
	}

	open() {
		this.stream = createWriteStream(this.outputFilename);
	}

	write(message) {
		this.stream.write(`<@${message.username}> ${message.text}\n`);
	}

	close() {
		this.stream.end();
	}
}
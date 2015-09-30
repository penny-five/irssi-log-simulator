import path from 'path';
import { copySync, writeJsonSync } from 'fs-extra';

import SQLiteWriter from '../sqlite/SQLiteWriter';

/**
 * Writes messages into a SQLite database and generates a website.
 */
export default class WebsiteWriter {

	constructor(dest, channelName, port='8080') {
		this.dest = dest;
		this.dbwriter = new SQLiteWriter(path.join(dest, 'db.sqlite3'));
		this.channelName = channelName;
		this.port = port;
	}

	open() {
		this.dbwriter.open();
	}

	write(message) {
		this.dbwriter.write(message);
	}

	close() {
		this.dbwriter.close();
		copySync(path.join(__dirname, 'server'), path.join(this.dest));
		/* write dynamic properties into a configuration json file */
		writeJsonSync(path.join(this.dest, 'config.json'), { channelName: this.channelName, port: this.port });
	}
}
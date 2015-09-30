import { Database } from 'sqlite3';

/**
 * Writes messages into an SQLite database.
 */
export default class SQLiteWriter {

	constructor(databaseName) {
		this.databaseName = databaseName;
	}

	open() {
		this.db = new Database(this.databaseName);
		this.db.exec('CREATE TABLE messages(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, text TEXT)');
	}

	write(message) {
		this.db.run('INSERT INTO messages(username, text) VALUES($username, $text)', message.username, message.text);
	}

	close() {
		this.db.close();
	}
}
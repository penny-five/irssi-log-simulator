import yargs from 'yargs';
import { createReadStream, emptyDirSync } from 'fs-extra';
import { createInterface } from 'readline';

import LogGenerator from './src/LogGenerator';

import { writerFromArgv } from './src/writers';

let argv = yargs
	.usage('Usage: $0 [filename] [optional args]')
	.demand(1)
	.option('q', {
		alias: 'quiet',
		describe: 'don\'t output anything'
	})
	.option('d', {
		alias: 'dest',
		describe: 'destination folder',
		default: 'dist'
	})
	.option('l', {
		alias: 'lines',
		describe: 'number of log lines to generate',
		default: 100
	})
	.option('p', {
		alias: 'port',
		describe: 'server port. Only used if output type is "website"',
		default: 8080
	})
	.option('c', {
		alias: 'channel',
		describe: 'channel name. If not provided, will try to parse it from log file name'
	})
	.option('o', {
		alias: 'output',
		describe: 'type of output to generate',
		choices: ['file', 'sqlite', 'website'],
		default: 'file'
	})
	.argv;

const generator = new LogGenerator();
const writer = writerFromArgv(argv);

if (!argv.quiet) console.info('Parsing log...');

createInterface({
	input: createReadStream(argv._[0])
}).on('line', line => {
	generator.feedLine(line);
}).on('close', () => {
	if (!argv.quiet) console.info('Generating output...');

	emptyDirSync(argv.dest);

	writer.open();
	generator.generateMany(writer, argv.lines);
	writer.close();

	if (!argv.quiet) console.info('Done!');
});
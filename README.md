# irssi-log-simulator
Markov text generator that uses Irssi log files as a source.

## dependencies

Node.js >  0.12.6

## installation
```
npm install
```

## usage
```
node index.js [path to logfile] [optional arguments]
```
For example:
```
node index.js \#mychannel.log --output website --lines 1000 --port 8080
```
## command line options

### --output, -o
Output type. There are three different alternatives:
- `file`. Prints generated log lines into a .txt file. This is the default option.
- `sqlite`. Saves generated log lines into a sqlite3 database.
- `website`. Saves generated log lines into a sqlite3 database and generates a simple nodejs server that serves content from that database.

### --lines, -l
Number of log lines to generate. Defaults to `100`.

### --dest, -d
Destination folder for generated files. Defaults to `/dist`.

### --channel, -c
Irssi channel name. If not provided, will try to parse it from the log file name.

### --port, -p
Port that the generated server will use. Only used if output type is `website`. Defaults to `8080`.

### --quiet, -q
Don't output anything.

## server

To install dependencies and to run the server that is generated when output type is `website` use
```
npm install && npm start

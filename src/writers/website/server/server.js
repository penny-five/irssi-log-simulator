/**
 * Server for Irssi Log Simulator.
 */

var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs-extra');

var config = fs.readJsonSync('config.json');

var app = express();
app.engine('hbs', require('express-handlebars')({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

var db = new sqlite3.Database('db.sqlite3');

var messageCount = 0;
db.get('SELECT COUNT(*) as count FROM messages', function(err, result) {
	messageCount = result.count;
});


app.get('/', function(req, res) {
	res.redirect('/random');
});

app.get('/random', function(req, res) {
	res.redirect('/' + Math.ceil(Math.random() * messageCount));
});

app.get('/:id', function(req, res) {
	var id = parseInt(req.params.id);
	if (id && id > 0 && id <= messageCount) {
		db.each('SELECT * FROM messages WHERE id=$id', id, function(err, row) {
			res.render('index', {
				channelName: config.channelName,
				username: row.username,
				text: row.text
			});
		});	
	} else {
		res.status(400).send('Invalid id: ' + req.params.id);
	}
});

app.listen(config.port, function() {
	console.log('server listening to port ' + config.port);
});
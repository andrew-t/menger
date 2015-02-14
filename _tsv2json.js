var fs = require('fs');

var tsv = fs.readFileSync('sponges.tsv', 'utf8')
.toString()
.split('\n')
.map(function(line) { 
	line = line.split('\t');
	return {
		score: parseInt(line[0], 10),
		lat: parseInt(line[2], 10),
		lng: parseInt(line[4], 10),
		level: line[6] ? parseInt(line[6], 10) : 1,
		title: line[8],
		venue: line[10],
		date: line[14],
		person: line[18],
		email: line[16],
		image: line[24],
		info: line[21]
	};
}).filter(function(value) {
	return value.title;
});

fs.writeFileSync(
	'sponge-data.js',
	'var sponges = ' + JSON.stringify(tsv).replace(/[\u007f-\uffff]/g,
		function(c) { 
			return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
		}
	) + ';',
	{ encoding: 'utf8' });

fs.writeFileSync(
	'sponge-data.json',
	JSON.stringify(tsv),
	{ encoding: 'utf8' });
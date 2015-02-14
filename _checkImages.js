var fs = require('fs'),
	sponges = JSON.parse(fs.readFileSync('sponge-data.json')),
	done = 0;

sponges.forEach(function(sponge) {

	if (!sponge.image)
		return ifDone();

	// One of them was missing an extension so let's guess this:
	if (!~sponge.image.indexOf('.'))
		sponge.image += '.jpg';

	var fn = 'img/' + sponge.image;
	if (!fs.existsSync(fn) ||
		/<title>404 Not Found<\/title>/.test(fs.readFileSync(fn))) {

		if (fs.existsSync(fn)) {
			fs.unlink(fn, ifDone);
			delete sponge.image;
			console.log(fn + ' is 404.');
		} else {
			console.log(fn + ' is missing.');
			delete sponge.image;
			ifDone();
		}
	} else ifDone();
	
});

function ifDone() {
	if (++done == sponges.length) {
		fs.writeFileSync('sponge-data.json', JSON.stringify(sponges));
		fs.writeFileSync(
			'sponge-data.js',
			'var sponges = ' + JSON.stringify(sponges).replace(/[\u007f-\uffff]/g,
				function(c) { 
					return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
				}
			) + ';',
			{ encoding: 'utf8' });
		console.log('Done');
	}
}
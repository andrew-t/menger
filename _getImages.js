var fs = require('fs'),
	http = require('http'),
	sponges = JSON.parse(fs.readFileSync('sponge-data.json'));

sponges.forEach(function(sponge) {

	if (!sponge.image)
		return;

	// One of them was missing an extension so let's guess this:
	if (!~sponge.image.indexOf('.'))
		sponge.image += '.jpg';

	var req = http.request('http://megamenger.com/images/sponges/' + sponge.image, function(res) {
	  var file = fs.createWriteStream('img/' + sponge.image);
	  res.pipe(file);
	});
	req.on('error', function(e) {
	  console.log('error: ' + e.message);
	});
	req.end();

});
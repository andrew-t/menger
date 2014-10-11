var sponges = [
	{
		level: 1,
		title: 'Sponge ',
		text: 'It was the best of sponges, it was the worst of sponges',
		image: '1.jpg'
	}
];

// and then we'd add the rest of the data but for now...
(function() {
	var template = sponges.pop(),
		spongeNumber = 0;
	[5, 8, 18, 9].forEach(function(n, level) {
		for (var i = 0; i < n; ++i)
			sponges.push({
				level: level + 1,
				title: template.title + ++spongeNumber,
				text: template.text,
				image: ((sponges.length % 14) + 1) + '.jpg'
			});
	});
})();

sponges.sort(function(a, b) {
	return a.level - b.level;
});

// now populate the faces with them:
(function(){
	var faceOrder = [
		[7, 6, 4, 5, 2, 3, 1, 0], // left
		[2, 4, 1, 7, 0, 6, 3, 5], // top
		[5, 3, 6, 0, 7, 1, 4, 2] // right
	];
	function populate(level, face, square, front, sponge) {
		// this is kind of ghastly but only runs once
		var l = front ? 8 : 7,
			offset = face * l,
			f = front
				? faceOrder[face][square]
				: (faceOrder[face][square + 1] - (faceOrder[face][square + 1] > faceOrder[face][0] ? 1 : 0)),
			d = data.sponges[level - 1].faces[offset + f];
		d.info = sponge;
		d.img = sponge.image;
	};
	var face = 0,
		lastLevel = 0;
		square = 0,
		front = false;
	sponges.forEach(function(sponge) {
		if (sponge.level > lastLevel) {
			lastLevel = sponge.level;
			front = (sponge.level == data.sponges.length - 1);
			square = front ? 0 : 1;
			face = 0;
		}
		populate(sponge.level, face, square, front, sponge);
		face = (face + 1) % 3;
		if (!face) ++square;
		if (square > 8) throw 'too many level ' + level + 's';
	});
})();
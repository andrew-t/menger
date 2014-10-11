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
	[18, 12, 9, 5].forEach(function(n, level) {
		for (var i = 0; i < n; ++i)
			sponges.push({
				level: level + 1,
				title: template.title + ++spongeNumber,
				text: template.text,
				image: ((sponges.length % 14) + 1) + '.jpg'
			});
	});
})();

// reverse order of levels - high levels first
sponges.sort(function(a, b) {
	return b.level - a.level;
});

// now populate the faces with them:
(function(){
	var faceOrder = [
		[5, 3, 6, 0, 7, 1, 4, 2], // .right (on the left because i messed up)
		[0, 1, 3, 2, 6, 4, 5, 7], // .top (on the bottom because i messed up)
		[7, 6, 4, 5, 2, 3, 1, 0]  // .left (on the right because i messed up)
	];
	function populate(level, face, square, front, sponge) {
		// this is kind of ghastly but only runs once
		var l = front ? 8 : 7,
			offset = face * l,
			f = front
				? faceOrder[face][square]
				: (faceOrder[face][square + 1] - (faceOrder[face][square + 1] > faceOrder[face][0] ? 1 : 0)),
			d = data.sponges[level].faces[offset + f];
		d.info = sponge;
		d.img = sponge.image;
	};
	var face = 0,
		lastLevel = 0;
		square = 0,
		front = false;
	sponges.forEach(function(sponge, i) {
		if (sponge.level !== lastLevel) {
			lastLevel = sponge.level;
			front = (sponge.level == 1);
			square = 0;
			face = 0;
		}
		populate(4 - sponge.level, face, square, front, sponge);
		face = (face + 1) % 3;
		if (!face) ++square;
		if (square > (front ? 7 : 6)) throw 'too many level ' + sponge.level + 's';
	});
})();
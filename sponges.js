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
      d.label = sponge.title;
	};
	var face = 0,
		lastLevel = Infinity;
		square = 0,
		front = false;
	sponges.forEach(function(sponge, i) {
		if (sponge.level < lastLevel) {
			lastLevel = sponge.level;
			front = (sponge.level == 1);
			square = 0;
			face = 0;
		}
		populate(3 - lastLevel, face, square, front, sponge);
		face = (face + 1) % 3;
		if (!face) ++square;
		if (square > (front ? 7 : 6)) {
         console.log('too many level ' + sponge.level + 's; demoting some');
         lastLevel--;
         front = lastLevel == 1;
         square = 0;
         face = 0;
      }
	});
})();
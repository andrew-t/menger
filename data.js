var data = {
	sponges: []
};

(function(){
	function addSponge(transform, front, classes) {
		var sponge = {
			classes: classes,
			faces: [ 
				// outer faces:
				{
					classes: [ 'outer', 'left' ],
					transform: transform + ' translate3d(0, 0, 27em)',
					cells: [
						[ {}, {}, {} ],
						[ {}, { classes: ['hole'] }, {} ],
						[ { classes: ['front'] }, {}, {} ]
					]
				}, {
					classes: [ 'outer', 'top' ],
					transform: transform + ' rotateX(-90deg) translate3d(0, 0, 27em)',
					cells: [
						[ { classes: ['front'] }, {}, {} ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, {} ]
					]
				}, {
					classes: [ 'outer', 'right' ],
					transform: transform + ' rotateY(-90deg) translate3d(0, 0, 27em)',
					cells: [
						[ {}, {}, {} ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, { classes: ['front'] } ]
					]
				},
				// inner faces:
				{
					classes: [ 'inner', 'left' ],
					transform: transform + ' translate3d(0, 0, -9em)',
					cells: [
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, {} ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'inner', 'top' ],
					transform: transform + ' rotateX(-90deg) translate3d(0, 0, -9em)',
					cells: [
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, {} ],
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'inner', 'right' ],
					transform: transform + ' rotateY(-90deg) translate3d(0, 0, -9em)',
					cells: [
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ],
						[ {}, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'left' ],
					transform: transform + ' translate3d(0, 0, -9em)',
					cells: [
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ {}, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'top' ],
					transform: transform + ' rotateX(-90deg) translate3d(0, 0, -9em)',
					cells: [
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ],
						[ {}, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'right' ],
					transform: transform + ' rotateY(-90deg) translate3d(0, 0, -9em)',
					cells: [
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, {} ],
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ]
					]
				} ]
		};
		if (!front)
			sponge.classes.push('hide-front');
		data.sponges.push(sponge);
	}

	function spongeCascade(n) {
		addSponge('', false, ['sponge-0']);
		var move = 0,
			scale = 1,
			front = true,
			i = 0;
		do {
			console.log(move + ',' + scale);
			front = i >= n;
			addSponge('translate3d(-' + move + 'em, ' + move + 'em, ' + move + 'em) '+
					  'scale3d(' + scale + ', ' + scale + ', ' + scale + ')',
					  front,
					  ['sponge-' + i]);
			i++;
			scale /= 3;
			move += 54 * scale;
		} while (!front);
	}

	spongeCascade(3);
})();
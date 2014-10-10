var data = {
	sponges: []
};

(function(){
	function expandFaces(faceSets, front) {
		var faces = [];
		faceSets.forEach(function(faceSet) {
			faceSet.cells.forEach(function(row, y) {
				row.forEach(function(cell, x) {
					var face = angular.copy(faceSet);
					delete face.cells;
					if (cell.classes) {
						if ((~cell.classes.indexOf('hole')) &&
							(!front && ~cell.classes.indexOf('front')))
							return;
						face.classes = face.classes.concat(cell.classes);
					}
					face.transform += ' translate3d(' + (x * 18 - 18) + 'em, ' + (y * 18 - 18) + 'em, ' + face.offset + 'em)';
					delete face.offset;
					faces.push(face);
				});
			});
		});
		return faces;
	};

	function addSponge(transform, front, classes) {
		var sponge = {
			classes: classes,
			faces: expandFaces([ 
				// outer faces:
				{
					classes: [ 'outer', 'left' ],
					transform: transform + '',
					offset: 27,
					cells: [
						[ {}, {}, {} ],
						[ {}, { classes: ['hole'] }, {} ],
						[ { classes: ['front'] }, {}, {} ]
					]
				}, {
					classes: [ 'outer', 'top' ],
					transform: transform + ' rotateX(-90deg)',
					offset: 27,
					cells: [
						[ { classes: ['front'] }, {}, {} ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, {} ]
					]
				}, {
					classes: [ 'outer', 'right' ],
					transform: transform + ' rotateY(-90deg)',
					offset: 27,
					cells: [
						[ {}, {}, {} ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, { classes: ['front'] } ]
					]
				},
				// inner faces:
				{
					classes: [ 'inner', 'left' ],
					transform: transform + '',
					offset: -9,
					cells: [
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, {} ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'inner', 'top' ],
					transform: transform + ' rotateX(-90deg)',
					offset: -9,
					cells: [
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, {} ],
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'inner', 'right' ],
					transform: transform + ' rotateY(-90deg)',
					offset: -9,
					cells: [
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ],
						[ {}, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'left' ],
					transform: transform + '',
					offset: -9,
					cells: [
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ {}, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'top' ],
					transform: transform + ' rotateX(-90deg)',
					offset: -9,
					cells: [
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ],
						[ {}, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'right' ],
					transform: transform + ' rotateY(-90deg)',
					offset: -9,
					cells: [
						[ { classes: ['hole'] }, { classes: ['hole'] }, { classes: ['hole'] } ],
						[ { classes: ['hole'] }, { classes: ['hole'] }, {} ],
						[ { classes: ['hole'] }, {}, { classes: ['hole'] } ]
					]
				} ])
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
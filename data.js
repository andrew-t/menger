var data = {
	sponges: []
};

(function(){
	function expandFaces(faceSets, n) {
		var faces = [];
		faceSets.forEach(function(faceSet) {
			faceSet.cells.forEach(function(row, y) {
				row.forEach(function(cell, x) {
					var face = angular.copy(faceSet);
					delete face.cells;
					if (cell.hide)
						return;
					if (cell.classes)
						face.classes = face.classes.concat(cell.classes);
					face.transform += ' translate3d(' + (x * 18 - 18) + 'em, ' + (y * 18 - 18) + 'em, ' + face.offset + 'em)';
					delete face.offset;
					face.level = n;
					faces.push(face);
				});
			});
		});
		return faces;
	};

	function addSponge(transform, front, classes, n) {
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
						[ {}, { hide: true }, {} ],
						[ { hide: !front }, {}, {} ]
					]
				}, {
					classes: [ 'outer', 'top' ],
					transform: transform + ' rotateX(-90deg)',
					offset: 27,
					cells: [
						[ { hide: !front }, {}, {} ],
						[ {}, { hide: true }, {} ],
						[ {}, {}, {} ]
					]
				}, {
					classes: [ 'outer', 'right' ],
					transform: transform + ' rotateY(-90deg)',
					offset: 27,
					cells: [
						[ {}, {}, {} ],
						[ {}, { hide: true }, {} ],
						[ {}, {}, { hide: !front } ]
					]
				},
				// inner faces:
				{
					classes: [ 'inner', 'left' ],
					transform: transform + '',
					offset: -9,
					cells: [
						[ { hide: true }, {}, { hide: true } ],
						[ { hide: true }, { hide: true }, {} ],
						[ { hide: true }, { hide: true }, { hide: true } ]
					]
				}, {
					classes: [ 'inner', 'top' ],
					transform: transform + ' rotateX(-90deg)',
					offset: -9,
					cells: [
						[ { hide: true }, { hide: true }, { hide: true } ],
						[ { hide: true }, { hide: true }, {} ],
						[ { hide: true }, {}, { hide: true } ]
					]
				}, {
					classes: [ 'inner', 'right' ],
					transform: transform + ' rotateY(-90deg)',
					offset: -9,
					cells: [
						[ { hide: true }, {}, { hide: true } ],
						[ {}, { hide: true }, { hide: true } ],
						[ { hide: true }, { hide: true }, { hide: true } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'left' ],
					transform: transform + '',
					offset: -9,
					cells: [
						[ { hide: true }, { hide: true }, { hide: true } ],
						[ {}, { hide: true }, { hide: true } ],
						[ { hide: true }, {}, { hide: true } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'top' ],
					transform: transform + ' rotateX(-90deg)',
					offset: -9,
					cells: [
						[ { hide: true }, {}, { hide: true } ],
						[ {}, { hide: true }, { hide: true } ],
						[ { hide: true }, { hide: true }, { hide: true } ]
					]
				}, {
					classes: [ 'far-inner', 'inner', 'right' ],
					transform: transform + ' rotateY(-90deg)',
					offset: -9,
					cells: [
						[ { hide: true }, { hide: true }, { hide: true } ],
						[ { hide: true }, { hide: true }, {} ],
						[ { hide: true }, {}, { hide: true } ]
					]
				} ], n)
		};
		data.sponges.push(sponge);
	}

	function spongeCascade(n) {
		var move = 0,
			scale = 1,
			front = false,
			i = 0;
		do {
			front = i >= n;
			addSponge('translate3d(-' + move + 'em, ' + move + 'em, ' + move + 'em) '+
					  'scale3d(' + scale + ', ' + scale + ', ' + scale + ')',
					  front,
					  ['sponge-' + i],
					  i);
			i++;
			scale /= 3;
			move += 54 * scale;
		} while (!front);
	}

	spongeCascade(3);
})();
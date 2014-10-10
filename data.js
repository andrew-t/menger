var data = {
	sponges: []
};

(function(){
	function addSponge(transform, front) {
		data.sponges.push({
			faces: [ {
					transform: 'translate3d(0, 0, -27em) ' + transform,
					cells: [
						[ {}, {}, { classes: ['front'] } ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, {} ]
					]
				}, {
					transform: 'rotateX(90deg) translate3d(0, 0, 27em) ' + transform,
					cells: [
						[ {}, {}, { classes: ['front'] } ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, {} ]
					]
				}, {
					transform: 'rotateY(90deg) translate3d(0, 0, 27em) ' + transform,
					cells: [
						[ {}, {}, { classes: ['front'] } ],
						[ {}, { classes: ['hole'] }, {} ],
						[ {}, {}, {} ]
					]
				} ],
			front: front
		});
	}

	addSponge('', false)
})();
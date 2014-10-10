angular.module('mega', ['menger'])
.controller('mega', ['$scope', '$timeout', '$interval', function(scope, timeout, interval) {
	var x = Math.atan2(1, Math.sqrt(2)) * 180 / Math.PI;
	scope.zoom = 0;
	scope.$watch('zoom', function(zoom) {
			var power = Math.pow(3, zoom),
				scale = 0.8 * power,
				move = 18 * (power - 1);
			scope.scene = {
				// You got to move 'em, move 'em.
				transform:
					'rotateX(' + x + 'deg) rotateY(45deg) ' +
					'translate3d(' + move + 'em, ' + -move + 'em, ' + -move + 'em) ' +
					'scale3d(' + scale + ', ' + scale + ', ' + scale + ') ',
				sensitivity: 15,
				maxRotation: 45,
				fitSize: 100
			};
		});
	scope.data = data;
	var element = angular.element(document.getElementById('mega')),
		scene = angular.element(document.getElementById('scene')),
		lastFace;
	function resume(event) {
		if (lastFace) {
			var lf = lastFace;
			lastFace = undefined;
			scope.$apply(function() {
				lf.classes.pop();
			});
			timeout(function() {
				lf.classes.pop();
				scope.$apply(function() {
					scope.scene.pause = false;
				});
				element.off('click', resume);
			}, 400);
		}
	}
	function zoom(diff, frames, period) {
		var target = scope.zoom + diff,
			mspf = period / frames;
		diff /= frames;
		var ctrl = scene.controller('scene');
		function frame() {
			scope.$apply(function() {
				scope.zoom += diff;
				if (diff > 0 ? scope.zoom < target : (scope.zoom > target))
					timeout(frame, mspf);
				else scope.zoom = target;
			});
		}
		timeout(frame);
	}
	scope.faceClick = function(face, event) {
		if (scope.scene.pause)
			return;
		if (face.level === scope.zoom) {
			if (!~face.classes.indexOf('outer'))
				return;
			scope.scene.pause = true;
			face.classes.push('topmost');
			face.classes.push('focussed');
			lastFace = face;
			timeout(function() {
				element.on('click', resume);
			});
		} else if (face.level > scope.zoom)
			zoom(1, 20, 400);
		else zoom(-1, 20, 400);;
	};
}]);
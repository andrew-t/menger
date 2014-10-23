angular.module('mega', ['menger'])
.controller('mega', ['$scope', '$timeout', '$interval', function(scope, timeout, interval) {
	var x = Math.atan2(1, Math.sqrt(2)) * 180 / Math.PI;
	scope.zoom = 0;
	scope.$watch('zoom', function(zoom) {
			var wholeScale = 0.8,
				power = Math.pow(3, zoom),
				scale = wholeScale * power,
				move = (27 * wholeScale) * (power - 1);
			scope.scene = {
				// You got to move 'em, move 'em.
				transform:
					'rotateX(' + x + 'deg) rotateY(45deg) ' +
					'translate3d(' + move + 'em, ' + -move + 'em, ' + -move + 'em) ' +
					'scale3d(' + scale + ', ' + scale + ', ' + scale + ') ',
				sensitivity: 5,
				maxRotation: 45,
				fitSize: 80
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
				scope.showSelected = false;
			});
			timeout(function() {
				document.getElementsByTagName('body')[0].classList.remove('focussed');
				lf.classes.pop();
				scope.$apply(function() {
					scope.selected = undefined;
					scope.scene.pause = false;
				});
				element.off('click', resume);
			}, 400);
		}
	}
	var zooming = false;
	function zoom(diff, frames, period) {
		if (zooming) return;
		zooming = true;
		var target = scope.zoom + diff,
			mspf = period / frames;
		diff /= frames;
		var ctrl = scene.controller('scene');
		function frame() {
			scope.$apply(function() {
				scope.zoom += diff;
				if (diff > 0 ? scope.zoom < target : (scope.zoom > target))
					timeout(frame, mspf);
				else {
					scope.zoom = target;
					zooming = false;
				}
				if (scope.zoom > 0)
					document.getElementsByTagName('body')[0].classList.add('zoomed');
				else
					document.getElementsByTagName('body')[0].classList.remove('zoomed');
			});
		}
		timeout(frame);
	}
	scope.faceClick = function(face, event) {
		if (scope.scene.pause)
			return;
		if (face.level === scope.zoom) {
			if (!face.info)
				return;
			scope.scene.pause = true;
			face.classes.push('topmost');
			document.getElementsByTagName('body')[0].classList.add('focussed');
			face.classes.push('focussed');
			lastFace = face;
			scope.selected = face.info;
			scope.showSelected = false;
			timeout(function() {
				element.on('click', resume);
				scope.showSelected = true;
			});
		} else if (face.level > scope.zoom)
			zoom(1, 20, 400);
		else zoom(-1, 20, 400);
	};
}]).directive('html', function(){
	// Runs during compile
	return {
		scope: {
			html: '='
		}, 
		link: function(scope, element) {
			scope.$watch('html', function(html) {
				element.html(html);
			})
		}
	};
});
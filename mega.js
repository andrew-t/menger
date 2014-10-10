angular.module('mega', ['menger'])
.controller('mega', ['$scope', '$timeout', function(scope, timeout) {
	var x = Math.atan2(1, Math.sqrt(2)) * 180 / Math.PI;
	scope.scene = {
		transform: 'translate3d(0, 0, 54em) rotateX(' + x + 'deg) rotateY(45deg) scale3d(0.8, 0.8, 0.8)',
		sensitivity: 15,
		maxRotation: 45,
		fitSize: 100
	};
	scope.data = data;
	var scene = angular.element(document.getElementById('mega')),
		lastFace;
	function resume(event) {
		if (lastFace) {
			scope.$apply(function() {
				lastFace.classes.pop();
			});
			timeout(function() {
				scope.$apply(function() {
					scope.scene.pause = false;
				});
				scene.off('click', resume);
			}, 400);
			lastFace = undefined;
		}
	}
	scope.faceClick = function(face, event) {
		if (scope.scene.pause || !~face.classes.indexOf('outer'))
			return;
		scope.scene.pause = true;
		face.classes.push('focussed');
		lastFace = face;
		timeout(function() {
			scene.on('click', resume);
		});
	};
}]);
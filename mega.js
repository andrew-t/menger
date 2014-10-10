angular.module('mega', ['menger'])
.controller('mega', ['$scope', function(scope) {
	var x = Math.atan2(1, Math.sqrt(2)) * 180 / Math.PI;
	scope.scene = {
		transform: 'translate3d(0, 0, 54em) rotateX(' + x + 'deg) rotateY(45deg) scale3d(0.8, 0.8, 0.8)',
		sensitivity: 15,
		maxRotation: 45,
		fitSize: 100
	};
	scope.data = data;
}]);
angular.module('menger', [])
.controller('sceneController', ['$scope', function(scope) {
	var faces = [],
		self = this;
	this.register = function(element, transform) {
		faces.push({
			element: element,
			transform: transform
		});
	};
	this.unregister = function(element) {
		// todo
	};
	this.trigger = function(event) {
		if (!self.size) return;
		if (!event) event = {
			pageY: 0,
			pageX: 0
		};
		var sceneTransform = 
			'rotateX(' + 
				((event.pageY / self.size.height - 0.5) * 2 * scope.sensitivity) +
			'deg) rotateY(' +
				((event.pageX / self.size.width - 0.5) * 2 * scope.sensitivity) +
			'deg) ' + scope.transform;
		faces.forEach(function(face) {
			var faceTransform = sceneTransform + face.transform;
			console.log(faceTransform);
			face.element.css({
				'transform': faceTransform,
				'webkit-transform': faceTransform,
				'moz-transform': faceTransform,
				'ms-transform': faceTransform
			});
		});
	};
	angular.element(window).on('mousemove', self.trigger);
	scope.$on('$destroy', function() {
		angular.element(window).off('mousemove', self.trigger);
	});
}]).directive('scene', ['$timeout', function(timeout) {
	return {
		controller: 'sceneController',
		link: function(scope, element, attrs, ctrl) {
			var resize = function() {
				ctrl.size = {
					width: element.prop('offsetWidth'),
					height: element.prop('offsetHeight')
				};
				ctrl.trigger();
			}
			scope.transform = attrs.rotation + ' ';
			scope.sensitivity = parseFloat(attrs.sensitivity);
			scope.maxRotation = parseFloat(attrs.maxRotation);
			angular.element(window).on('resize', resize);
			scope.$on('$destroy', function() {
				angular.element(window).off('resize', resize);
			})
			timeout(resize);
		}
	};
}]).directive('face', function() {
	return {
		requires: [ '^scene' ],
		link: function(scope, element, attrs, scene) {
			if (!scene) scene = element.parent().controller('scene');
			scope.transform = attrs.face;
			scene.register(element, scope.transform);
			scope.$on('$destroy', function() {
				scene.unregister(element);
			})
		}
	};
})
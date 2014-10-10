angular.module('menger', [])
.controller('sceneController', ['$scope', function(scope) {
	var faces = [],
		self = this;
	scope.data = data;
	this.register = function(callback) {
		faces.push(callback);
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
				((event.pageX / self.size.width - 0.5) * -2 * scope.sensitivity) +
			'deg) ' + scope.transform;
		faces.forEach(function(face) {
			face(sceneTransform);
		});
	};
	angular.element(window).on('mousemove', self.trigger);
	scope.$on('$destroy', function() {
		angular.element(window).off('mousemove', self.trigger);
	});
	self.trigger();
}]).directive('scene', ['$timeout', function(timeout) {
	return {
		controller: 'sceneController',
		link: function(scope, element, attrs, ctrl) {
			var fitSize = parseFloat(attrs.fitSize),
				resize = function() {
					ctrl.size = {
						width: element.prop('offsetWidth'),
						height: element.prop('offsetHeight')
					};
					var m = Math.max(ctrl.size.width, ctrl.size.height);
					element.css('font-size', m / fitSize + 'px');
					ctrl.trigger();
				};
			scope.transform = attrs.rotation + ' ';
			scope.sensitivity = parseFloat(attrs.sensitivity);
			scope.maxRotation = parseFloat(attrs.maxRotation);
			angular.element(window).on('resize', resize);
			scope.$on('$destroy', function() {
				angular.element(window).off('resize', resize);
			});
			timeout(resize);
		}
	};
}]).directive('face', function() {
	return {
		scope: {
			config: '=face'
		},
		requires: [ '^scene' ],
		link: function(scope, element, attrs, scene) {
			if (!scene) scene = element.parent().controller('scene');
			function spin(transform) {
				transform += scope.config.transform;
				element.css({
					'transform': transform,
					'webkit-transform': transform,
					'moz-transform': transform,
					'ms-transform': transform
				});
			}
			scene.register(spin);
			scope.$on('$destroy', function() {
				scene.unregister(spin);
			})
		}
	};
});
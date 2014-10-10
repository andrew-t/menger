angular.module('menger', [])
.controller('sceneController', ['$scope', function(scope) {
	var faces = [],
		self = this;
	scope.$watch('transform', function(value) {
		 transform = value + ' ';
	});
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
				((event.pageY / self.size.height - 0.5) * 2 * scope.scene.sensitivity) +
			'deg) rotateY(' +
				((event.pageX / self.size.width - 0.5) * -2 * scope.scene.sensitivity) +
			'deg) ' + scope.scene.transform + ' ';
		faces.forEach(function(face) {
			face(sceneTransform);
		});
	};
	scope.$watch(self.trigger);
	angular.element(window).on('mousemove', self.trigger);
	scope.$on('$destroy', function() {
		angular.element(window).off('mousemove', self.trigger);
	});
}]).directive('scene', ['$timeout', function(timeout) {
	return {
		scope: {
			scene: '=scene'
		},
		controller: 'sceneController',
		link: function(scope, element, attrs, ctrl) {
			var resize = function() {
					ctrl.size = {
						width: element.prop('offsetWidth'),
						height: element.prop('offsetHeight')
					};
					var m = Math.max(ctrl.size.width, ctrl.size.height);
					element.css('font-size', m / scope.scene.fitSize + 'px');
					ctrl.trigger();
				};
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
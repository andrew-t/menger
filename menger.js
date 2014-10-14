angular.module('menger', [])
.controller('sceneController', ['$scope', '$timeout', function(scope, timeout) {
	var faces = [],
		self = this,
		lastEvent,
		timeoutObject,
		lastUpdate,
		debounce = 30,
		lastCoords = {};
	this.register = function(callback) {
		faces.push(callback);
	};
	this.unregister = function(element) {
		// todo
	};
	this.trigger = function(event) {
		if (!self.size || scope.scene.pause) return;
		if (!event || event.pageX === undefined)
			event = lastEvent || {
				pageY: 0,
				pageX: 0
			};
		lastEvent = event;
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
	function mousemove(event) {
		if (event.pageX == lastCoords.pageX && event.pageY == lastCoords.pageY)
			return;
		lastCoords = event;
		var now = new Date().getTime();
		if (lastUpdate + debounce > now) {
			if (!timeoutObject)
				timeoutObject = timeout(function() {
					mousemove(event);
				}, debounce);
		} else {
			self.trigger(event);
			lastUpdate = now;
			timeout.cancel(timeoutObject);
			timeoutObject = undefined;
		}
	}
	scope.$watch(self.trigger);
	angular.element(window).on('mousemove', mousemove);
	scope.$on('$destroy', function() {
		angular.element(window).off('mousemove', mousemove);
	});
}]).directive('scene', ['$timeout', function(timeout) {
	return {
		scope: {
			scene: '=scene'
		},
		controller: 'sceneController',
		link: function(scope, element, attrs, ctrl) {
			var resizeTimeout;
			function resize() {
				if (resizeTimeout) timeout.cancel(resizeTimeout);
				resizeTimeout = timeout(function(){
					ctrl.size = {
						width: element.prop('offsetWidth'),
						height: element.prop('offsetHeight')
					};
					var m = Math.min(ctrl.size.width, ctrl.size.height);
					element.css('font-size', m / scope.scene.fitSize + 'px');
					ctrl.trigger();
				}, 150);
			};
			angular.element(window).on('resize', resize);
			scope.$on('$destroy', function() {
				angular.element(window).off('resize', resize);
			});
			resize();
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
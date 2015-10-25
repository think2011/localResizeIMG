(function() {
  (function() {
    var app;
    app = angular.module('localResizeIMG', []);
    return app.directive('lRImg', function() {
      return {
        restrict: 'E',
        scope: {
          ngModel: '=',
          change: '=',
          success: '=',
          reset: '=',
          title: '@'
        },
        link: function(scope, element, attrs) {
          var UI, lr, quality, rWidth, readonly;
          rWidth = attrs.rwidth;
          quality = attrs.quality;
          readonly = attrs.readonly !== void 0;
          quality = attrs.quality;
          UI = attrs.ui || attrs.UI;
          lr = new LocalResize(element[0], {
            rWidth: rWidth,
            quality: quality,
            readonly: readonly,
            quality: quality,
            UI: UI
          });
          scope.$watch('title', function(newVal) {
            return lr.UI.setTitle(newVal);
          });
          lr.change(function(data) {
            if (typeof scope.change === 'function') {
              return scope.change(data);
            }
          }).success(function(setStop, data) {
            scope.$apply(function() {
              return scope.ngModel = data;
            });
            if (typeof scope.success === 'function') {
              return scope.success(setStop, data);
            }
          }).reset = function() {
            scope.$apply(function() {
              return scope.ngModel = {};
            });
            lr.UI.reset();
            if (typeof scope.reset === 'function') {
              scope.reset();
            }
            return lr;
          };
          return scope.$watch('ngModel', function(newVal) {
            if (newVal != null ? newVal.imgUrl : void 0) {
              if (readonly) {
                return lr.setImgOnly(newVal.imgUrl);
              } else {
                return lr.setImg(newVal.imgUrl);
              }
            }
          });
        }
      };
    });
  })();

}).call(this);

//# sourceMappingURL=localResize.angular.js.map
angular.module('app.directives', [])

.directive('detectGestures', function($ionicGesture) {
  return {
    restrict :  'A',

    link : function(scope, elem, attrs) {
      var gestureType = attrs.gestureType;

      switch(gestureType) {
        case 'swiperight':
        //TODO
        //  $ionicGesture.on('swiperight', scope.reportEvent, elem);
          break;
        case 'swipeleft':
          $ionicGesture.on('swipeleft', scope.reportEvent, elem);
          break;
      }

    }
  }
});
var mod = angular.module('app.directives', [])

.directive('detectGestures', function($ionicGesture, $parse) {
  return {
    restrict :  'A',
    link: function(scope, elem, attrs) {
      // Event map: callback attribute -> EventController event
      var eventMap = {
         'hold'           : 'hold',
         'tap'            : 'tap',
         'doubletap'      : 'doubleTap',
         'drag'           : 'drag',
         'dragstart'      : 'dragStart',
         'dragend'        : 'dragEnd',
         'dragup'         : 'dragUp',
         'dragdown'       : 'dragDown',
         'dragleft'       : 'dragLeft',
         'dragright'      : 'dragRight',
         'swipe'          : 'swipe',
         'swipeup'        : 'swipeUp',
         'swipedown'      : 'swipeDown',
         'swipeleft'      : 'swipeLeft',
         'swiperight'     : 'swipeRight',
         'transform'      : 'transform',
         'transformstart' : 'transformStart',
         'transformend'   : 'transformEnd',
         'rotate'         : 'rotate',
         'pinch'          : 'pinch',
         'pinchin'        : 'pinchIn',
         'pinchout'       : 'pinchOut',
         'touch'          : 'touch',
         'release'        : 'release',
      };

      // Hookup events
      angular.forEach(eventMap, function(evtAttr, evt) {
        var callback = attrs[evtAttr];
        if (callback) {
          $ionicGesture.on(evt, function() {
            scope.$eval(callback);
          }, elem);
        }
      });
    }
  }
})

;

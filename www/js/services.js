angular.module('app.services', [])

.factory('Trees', function($http, $q) {
  var self = this;

  // Lazy loader object, doesn't fire multiple requests
  var lazyLoader = {
    loading: false,
    listeners: [],
    load: function(cb) {
      var that = this;

      // Add new listener
      that.listeners.push(cb);

      // Start loading if not yet loading
      if (!that.loading) {
        that.loading = true;
        $http.get('/trees.json').success(function(trees) {
          // Set factory trees (no further load needed)
          self.trees = trees;

          // Fire listeners
          angular.forEach(that.listeners, function(listener) {
            if (listener) {
              listener(); 
            }
          });

          // Reset to initial state
          that.loading = false;
          that.listeners = [];
        });
      }
    }
  };
  // immediately load
  lazyLoader.load();

  self.getTrees = function() {
    var deferred = $q.defer();
    if (!self.trees) {
      lazyLoader.load(function() {
        deferred.resolve(self.trees);
      });
    } else {
      deferred.resolve(self.trees);
    }

    return deferred.promise;
  };

  return self;
})

;

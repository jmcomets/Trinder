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

.service('Matches', function($q) {
  //window.localStorage['post'] = JSON.stringify(post);
  var service = {};

  service.init = function() {
    this.matches = JSON.parse(window.localStorage['matches'] || '[]');
  };

  service.add = function(tree) {
    this.matches.push(tree);
    window.localStorage['matches'] = JSON.stringify(this.matches);
  };

  service.remove = function(index) {
    this.matches.splice(index, 1);
    window.localStorage['matches'] = JSON.stringify(this.matches);
  };

  return service;
})

;

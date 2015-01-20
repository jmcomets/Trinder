angular.module('app.services', [])

.factory('Trees', function(API, $q) {
  var self = this;

  // Lazy loader object, doesn't fire multiple requests to the API
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
        API.getTrees().then(function(trees) {
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

.service('API', function($http, $q) {
  var self = this;

  // Base API url
  //self.baseURI = 'https://rencontres-arbres.herokuapp.com/api';
  self.baseURI = 'http://localhost:8000/api';

  self.getTrees = function() {
    var deferred = $q.defer();

    var url = this.baseURI + '/trees';
    (function getTreesPage(url) {
      var innerDeferred = $q.defer();
      $http.get(url).then(function(response) {
        var trees = response.data.results;
        deferred.notify(trees);

        // Recurse for pagination
        if (response.data.next) {
          getTreesPage(response.data.next).then(function(newTrees) {
            trees.push.apply(trees, newTrees);
            innerDeferred.resolve(trees);
          }, function() { // recursive request error handling
            innerDeferred.resolve(trees);
          });
        } else {
          innerDeferred.resolve(trees);
        }
      }, function() { // base request error handling
        innerDeferred.reject();
      });

      return innerDeferred.promise;
    }) (this.baseURI + '/trees').then(function(trees) {
      deferred.resolve(trees);
    });

    return deferred.promise;
  };
})

// DB wrapper
.service('DB', function($q, DB_CONFIG) {
  var self = this;

  self.init = function() {
    // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
    self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

    angular.forEach(DB_CONFIG.tables, function(table) {
      var columns = [];

      angular.forEach(table.columns, function(column) {
        columns.push(column.name + ' ' + column.type);
      });

      self.query('CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')');
      console.log('Table ' + table.name + ' initialized');
    });
  };

  self.query = function(query, bindings) {
    bindings = typeof bindings !== 'undefined' ? bindings : [];
    var deferred = $q.defer();

    self.db.transaction(function(transaction) {
      transaction.executeSql(query, bindings, function(transaction, result) {
        deferred.resolve(result);
      }, function(transaction, error) {
        deferred.reject(error);
      });
    });

    return deferred.promise;
  };

  self.fetchAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }

    return output;
  };

  self.fetch = function(result) {
    return result.rows.item(0);
  };
})

;

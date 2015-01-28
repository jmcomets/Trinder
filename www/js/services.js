angular.module('app.services', ['ionic.utils'])

.service('Trees', function($http, $q, ASSET_URL) {
  var that = this;
  this.init = function() {
    var deferred = $q.defer();

    $http.get(ASSET_URL + 'res/trees.json').success(function(trees) {
      that.trees = trees;
      deferred.resolve();
    }).error(function() {
      deferred.reject();
    });

    return deferred.promise;
  };
})

.service('Matches', function($localStorage) {
  this.init = function() {
    this.matches = $localStorage.getObject('matches', []);
  };

  this.add = function(tree) {
    this.matches.push(tree);
    $localStorage.setObject('matches', this.matches);
  };

  this.remove = function(index) {
    this.matches.splice(index, 1);
    $localStorage.setObject('matches', this.matches);
  };
})

;

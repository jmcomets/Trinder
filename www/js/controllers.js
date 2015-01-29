angular.module('app.controllers', [])

.controller('SelectionCtrl', function($scope, $filter, $ionicLoading, Trees, Matches, ASSET_URL) {
  $scope.trees = Trees.trees;
  $scope.matches = Matches.matches;

  $scope.select = function() {
    // Build source array from `trees - matches`
    var source = $scope.trees.slice(0).filter(function(tree) {
      return $scope.matches.indexOf(tree) == -1;
    });

    if (!source.length) { return; }

    // Pick random tree for selection
    $scope.selected = (function random_choice(list) {
      return list[Math.floor(Math.random()*list.length)];
    }) (source);
  };
  // fire selection immediately
  $scope.select();

  $scope.image = function(tree) {
    if (!tree) { return; }
    return ASSET_URL + 'img/trees/' + tree.image;
  };

  $scope.matchTree = function() {
    Matches.add($scope.selected);

    $scope.$apply(function() {
      $scope.select();
    });
  };

  $scope.noMatchTree = function() {
    $scope.$apply(function() {
      $scope.select();
    });
  };
})

.controller('MatchingsCtrl', function($scope, Matches) {
  $scope.matchings = Matches.matches;

  $scope.remove = function(index) {
    Matches.remove(index);
  };
})

.controller('DiscoverCtrl', function($scope) {
})

.controller('ConversationCtrl', function($scope, $state, $stateParams) {
  $scope.state = $state.current;
  $scope.params = $stateParams;

  var locutor = $scope.params.locutor;
  console.log('locutor', locutor);
})

;

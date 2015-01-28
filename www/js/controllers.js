angular.module('app.controllers', [])

.controller('SelectionCtrl', function($scope, Trees, $ionicLoading, Matches) {
  $ionicLoading.show({ template: 'loading' });

  Trees.getTrees().then(function(trees) {
    $ionicLoading.hide();
    $scope.trees = trees;
    $scope.select();
  });

  $scope.select = function() {
    if (!$scope.trees.length) { return; }

    // Pick random tree for selection
    $scope.selected = (function random_choice(list) {
      return list[Math.floor(Math.random()*list.length)];
    }) ($scope.trees);
  };

  $scope.image = function(tree) {
    if (!tree) { return; }
    var urlComponents = tree.genre.split('/');
    if (tree.genre[tree.genre.length - 1] == '/') {
      urlComponents.splice(-1, 1); // remove last element (trailing slash)
    }
    return '/img/trees/' + urlComponents[urlComponents.length - 1] + '.jpg';
  };

  $scope.matchTree = function() {
    Matches.add($scope.selected);

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
  $scope.suggestions = [
    'Foobar',
    'Barboo',
    'Bazbaz',
  ];
})

.controller('ConversationCtrl', function($scopee, $state, $stateParams) {
  $scope.state = $state.current;
  $scope.params = $stateParams;

  var locutor = $scope.params.locutor;
  console.log('locutor', locutor);
})

;

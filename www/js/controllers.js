angular.module('app.controllers', [])

.controller('SelectionCtrl', function($scope, Trees, $ionicLoading) {
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

    console.log($scope.selected);
    $scope.selected.image = '100.jpg';
  };
})

.controller('MatchingsCtrl', function($scope) {
  $scope.matchings = [
    'Foobar',
    'Barboo',
    'Bazbaz',
  ];
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

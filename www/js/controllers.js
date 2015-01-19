angular.module('app.controllers', [])

.controller('SelectionCtrl', function($scope) {
	$scope.currentPicture = 'img/omgptp.jpg';
	$scope.pictures = [];
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

angular.module('app', ['ionic', 'app.controllers', 'app.services', 'app.directives'])

//.constant('ASSET_URL', 'file:///android_asset/www/')
.constant('ASSET_URL', '/')

.run(function($ionicPlatform, $ionicLoading, Matches, Trees) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Initalize matches database
    Matches.init();

    // Initialize tree database
    $ionicLoading.show({ template: 'loading trees' });
    Trees.init().finally(function() {
      $ionicLoading.hide();
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.selection', {
      url: '/selection',
      views: {
        'tab-selection': {
          templateUrl: 'templates/tab-selection.html',
          controller: 'SelectionCtrl'
        }
      }
    })

    .state('tab.matchings', {
      url: '/matchings',
      views: {
        'tab-matchings': {
          templateUrl: 'templates/tab-matchings.html',
          controller: 'MatchingsCtrl'
        }
      }
    })

    .state('tab.conversation', {
      url: '/conversation/:locutor',
      views: {
        'conversation': {
          templateUrl: 'templates/conversation.html',
          controller: 'ConversationCtrl'
        }
      }
    })

    .state('tab.discover', {
      url: '/discover',
      views: {
        'tab-discover': {
          templateUrl: 'templates/tab-discover.html',
          controller: 'DiscoverCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/selection');
})

;

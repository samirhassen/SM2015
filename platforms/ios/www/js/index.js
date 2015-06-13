angular.module('indexStarter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push'
  ])

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '473fd05a',
    // The public API key all services will use for this app
    api_key: '12f18ff9a727109f9062236a503b205f4eccdeb56aff77a9',
    // The GCM project number
    gcm_id: '667691090100'
	});
}])

.run(function($ionicPlatform, $rootScope ) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


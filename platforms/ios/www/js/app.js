angular.module('starter', [
  'ionic',
  'ajoslin.promise-tracker',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push'
//  'starter.controllers',
//  'starter.services'
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
.state('home', {
  url: '/home',
  templateUrl: 'menu.html',
  controller: 'pushCtrl'
})	
 .state("work", {
  url: "/work",
  templateUrl: "work.html"
})
 .state("translate", {
  url: "/translate",
  templateUrl: "translate.html"
})
 .state("aboutus", {
  url: "/aboutus",
  templateUrl: "aboutus.html"
})
 .state("contact", {
  url: "/contact",
  templateUrl: "contact.html"
})
 .state("care", {
  url: "/care",
  templateUrl: "care.html"
})
 .state("contest", {
  url: "/contest",
  templateUrl: "contest.html"
})
 .state("donate", {
  url: "/donate",
  templateUrl: "donate.html"
})
 .state("dawa", {
  url: "/dawa",
  templateUrl: "dawa.html"
})
 .state("dawanew", {
  url: "/dawanew",
  templateUrl: "dawanew.html",
  controller: "dawaCtrl"
})
 .state("dawanon", {
  url: "/dawanon",
  templateUrl: "dawanon.html",
  controller: "dawaCtrl"
})

$urlRouterProvider.otherwise("/home");

})


/************* CONTROLLERS **************/


.controller('pushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {

/*	
  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
//    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });	
*/  
  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
//    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'If we want to name each user'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user: (' + user.name + ')\n ID ' + user.user_id);
    });
  };
//  identifyUser();
  
  
  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
//    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        alert(notification);
        return true;
      }
    });
	alert('Ionic Push: Registering user');
  };
  
})

.controller('dawaCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {

	// Inititate the promise tracker to track form submissions.
	$scope.progress = promiseTracker();

    // Form submit handler.
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }
		
      	// Default values for the request.
     	var config = {
          'name' : $scope.name,
          'nat' : $scope.natList,
          'lang' : $scope.langList,
          'telDai' : $scope.telDai,
		  'nameKafil' : $scope.nameKafil,
		  'telKafil' : $scope.telKafil,
		  'db'	: $scope.db
      	};

      var $promise = 
	  	$http({
			method: 'POST',
			url: 'http://www.hafrjalyat.org/httpreq/ins.php',
			data: config,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .success(function(data, status, headers, config) {	
			window.plugins.toast.showLongCenter('تم الإرسال');
        
		    $scope.name = null;
            $scope.natList = null;
			$scope.langList = null;
			$scope.telDai = null;
			$scope.nameKafil = null;
			$scope.telKafil = null;

            $scope.submitted = false;
			$scope.message = null;
        })
        .error(function(data, status, headers, config) {
			window.plugins.toast.showLongCenter('Network error, try again later.')
          	$scope.progress = data;
          	//$scope.messages = 'There was a network error. Try again later.';
          	$log.error(data);
        })
        .finally(function() {
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user
      $scope.progress.addPromise($promise);
	};
})

.controller('contestCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {

    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

    // Form submit handler.
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }
		
      	// Default values for the request.
     	var config = {
          'name' : $scope.name,
		  'tel' : $scope.tel,
		  'whatstel' : $scope.whatstel,
		  'db'	: 'contest'
      	};

      var $promise = 
	  	$http({
			method: 'POST',
			url: 'http://www.hafrjalyat.org/httpreq/ins.php',
			data: config,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .success(function(data, status, headers, config) {	
			window.plugins.toast.showLongCenter('تم الإرسال');
        
		    $scope.name = null;
			$scope.tel = null;
			$scope.whatstel = null;
            $scope.messages = null;
            $scope.submitted = false;
        })
        .error(function(data, status, headers, config) {
			window.plugins.toast.showLongCenter('There was a network error. Try again later.')
          	$scope.progress = data;
          	//$scope.messages = 'There was a network error. Try again later.';
          	$log.error(data);
        })
        .finally(function() {
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user
      $scope.progress.addPromise($promise);
	};
});
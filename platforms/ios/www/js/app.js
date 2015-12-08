angular.module('starter', [
  'ionic','ionic.service.core',
  'ajoslin.promise-tracker',
  'ngCordova',
  
  'ionic.service.push',
  'ionic.service.analytics'
])

.config(['$ionicAppProvider', function($ionicAppProvider) {
  
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '1eac3796',
    // The public API key all services will use for this app
    api_key: 'f49984504ed0b945a250537c4a8bcadfa76aa068d34f32f6',
    // The GCM project number
    gcm_id: '667691090100'
	//dev_push: true
	});
}])

.run(function($ionicPlatform, $rootScope, $ionicAnalytics ) {
  $ionicPlatform.ready(function() {
	  
	$ionicAnalytics.register();
	
	var push = new Ionic.Push({
      "debug": true
    });
    push.register(function(token) {
      console.log("Device token:",token.token);
    });
		
	var deploy = new Ionic.Deploy();
	deploy.watch().then(
		function noop() {
		},
		function noop() {
		},
		function hasUpdate(hasUpdate) {
			console.log("Has Update ", hasUpdate);
			if (hasUpdate) {
				console.log("Calling ionicDeploy.update()");
				deploy.update().then(function (deployResult) {
					// deployResult will be true when successfull and
					// false otherwise
				}, function (deployUpdateError) {
					// fired if we're unable to check for updates or if any
					// errors have occured.
				console.log('Ionic Deploy: Update error! ', deployUpdateError);
				}, function (deployProgress) {
					// this is a progress callback, so it will be called a lot
					// deployProgress will be an Integer representing the current
					// completion percentage.
				console.log('Ionic Deploy: Progress... ', deployProgress);
				});
			}
		}
	);	
    
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	if(window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	if(typeof analytics !== undefined) {
		analytics.startTrackerWithId("UA-64084948-1");
	} else {
		console.log("Google Analytics Unavailable");
	}	
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
.state('home', {
  url: '/home',
  templateUrl: 'menu.html',
  controller: "indexCtrl"
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
  templateUrl: "aboutus.html",
  controller: "inAppBrowserCtrl"
})
 .state("contact", {
  url: "/contact",
  templateUrl: "contact.html",
  controller: "inAppBrowserCtrl"
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

.controller('indexCtrl', function($ionicPlatform, $scope, $rootScope, $timeout, $ionicUser, $ionicPush) {


/*************** Analytics *****************/	

	if(typeof analytics !== 'undefined') { analytics.trackView("Hafr Jalyat"); }
	
	$scope.initEvent = function() {
		if(typeof analytics !== 'undefined') { analytics.trackEvent("Category", "Action", "Label", 25); }
	}
	
})

.controller('inAppBrowserCtrl', function($scope){

	$scope.openURL = function($url) {
	
		if (ionic.Platform.isIOS())
			window.open($url, '_blank', 'location=no');
		else
			navigator.app.loadUrl($url, { openExternal: true });
		
		return false;
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
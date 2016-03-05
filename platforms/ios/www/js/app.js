angular.module('starter', [
  'ionic',
  'ionic.service.core',
  'ionic.service.analytics',
  'ngCordova',
  'ajoslin.promise-tracker'
])


.run(function($ionicPlatform, $rootScope, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
	  
	/*Ionic.io();  

//	$ionicAnalytics.register();
		
	var push = new Ionic.Push({
	  "debug": true,
	  "onNotification": function(notification) {
		var payload = notification.payload;
		console.log(notification, payload);
	  },
	  "onRegister": function(data) {
		console.log(data.token);
	  },
	  "pluginConfig": {
		"ios": {
		  "badge": true,
		  "sound": true
		 }
	  } 
	});
	var user = Ionic.User.current();

    push.register(function(token) {
      	console.log("Registered token:",token.token);
		user.addPushToken(token);
  		user.save();
    });*/

/*	
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
 */   
	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	if(window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
		initPushwoosh();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
.state('home', {
  url: '/home',
  templateUrl: 'menu.html'
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
  templateUrl: "contest.html",
  controller: "payPalCtrl"
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

.controller('inAppBrowserCtrl', function($scope){

	$scope.openURL = function($url) {
	
		if (ionic.Platform.isIOS())
			window.open($url, '_blank', 'location=no');
		else
			navigator.app.loadUrl($url, { openExternal: true });
		
		return false;
		};
})

.controller('payPalCtrl', function($scope, $window){

	var app = {
	 	 // Application Constructor
	  	initialize: function() {
		this.bindEvents();
	  },
	  // Bind Event Listeners
	  //
	  // Bind any events that are required on startup. Common events are:
	  // 'load', 'deviceready', 'offline', and 'online'.
	  bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	  },
	  // deviceready Event Handler
	  //
	  // The scope of 'this' is the event. In order to call the 'receivedEvent'
	  // function, we must explicity call 'app.receivedEvent(...);'
	  onDeviceReady: function() {
		app.receivedEvent('deviceready');
	  },
	  receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	
		// start to initialize PayPalMobile library
		//app.initPaymentUI();
	  },
	  initPaymentUI: function() {
		var clientIDs = {
		  "PayPalEnvironmentProduction": "YAVo-oGqt6j0hkRWWLM6xcLRSGbq561aoWs65cjhdWoX9iEG1WZykvWb5_KOCn6bNSo57BJBo5cwUzDTR",
		  "PayPalEnvironmentSandbox": "AX_d7HlKLcc6LZS0nxeEeEwUoeTJpaL0eRaze6WLnkkWKngiwShKSh0BI1mgrd00OEdV5NWJFVCSqxBI"
		};
		PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
	
	  },
	  onSuccesfulPayment: function(payment) {
		console.log("payment success: " + JSON.stringify(payment, null, 4));
	  },
	  onAuthorizationCallback: function(authorization) {
		console.log("authorization: " + JSON.stringify(authorization, null, 4));
	  },
	  createPayment: function() {
		// for simplicity use predefined amount
		var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
		var payment = new PayPalPayment("50.00", "USD", "HAFRJALYAT", "Donate",
		  paymentDetails);
		return payment;
	  },
	  configuration: function() {
		// for more options see `paypal-mobile-js-helper.js`
		var config = new PayPalConfiguration({
		  merchantName: "Hafrjalyat",
		  merchantPrivacyPolicyURL: "https://Hafrjalyat.org/policy",
		  merchantUserAgreementURL: "https://Hafrjalyat.org/agreement"
		});
		return config;
	  },
	  onPrepareRender: function() {
        // single payment
        PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
	  },
	  onPayPalMobileInit: function() {		
		// must be called
		// PayPalEnvironmentNoNetwork
        // Pay9ö+¨h np ÄoöcxPalEnvironmentSandbox
        // PayPalEnvironmentProduction
    PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", app.configuration(),
		  app.onPrepareRender);
	  },
	  onUserCanceled: function(result) {
		console.log(result);
	  }
	};
	
	app.initialize();
	$scope.donate = function() {
        // start to initialize PayPalMobile library
        app.initPaymentUI();
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
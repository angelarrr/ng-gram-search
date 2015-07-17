var app = angular.module('instaApp', ['ngAnimate'])

app.controller('instaController', ['$scope', '$timeout', '$q', '$http', function($scope, $http, $q, $timeout) {

	// create promise for 2 second message
	function wait() {
		var defer = $q.defer();
		// Simulating doing some asynchronous operation
		setTimeout(function() {
		defer.resolve();
		}, 2000);

		return defer.promise;
	};

	// searching instagram msg
	function instaSearch() {
		$scope.instaSearchMsg = "Searching Instagram for photos tagged with " + $scope.tag;
		wait().then(function() {
			$scope.instaSearchMsg = "";
		});
	};

	// submit function
	$scope.submit = function() {
		// if form is valid
		if($scope.instaForm.$valid) {
			// console.log("submit");
			instaSearch();
		}

		// query endpoint and parameters
		var url='https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent';
		var request = {
			callback: 'JSON_CALLBACK',
			client_id: '2b6dddcdb4124c76ad2b77fc4d8709da'
		};

		$http({
			method: 'JSONP',
			url: url,
			params: request
		})
		.success(function(result){
			console.log("success");
			$scope.results = result.data;
		})
		.error(function(){
			console.log("error");
		});
	};
}]);

// CLIENT ID	2b6dddcdb4124c76ad2b77fc4d8709da
// CLIENT SECRET	01287d8a6f9f4bbe856a88b4e5d1c0fa
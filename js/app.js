var app = angular.module('instaApp', ['ngAnimate'])

app.controller('instaController', ['$scope', '$timeout', '$q', '$http', function($scope, $http, $q, $timeout) {

	// submit function
	$scope.submit = function() {
		// if form is valid
		if($scope.instaForm.$valid) {
			console.log("submit");
			$scope.submitted="true";
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
		.success(function(){
			console.log("success");
		})
		.error(function(){
			console.log("error");
		});
	};
}]);

// CLIENT ID	2b6dddcdb4124c76ad2b77fc4d8709da
// CLIENT SECRET	01287d8a6f9f4bbe856a88b4e5d1c0fa
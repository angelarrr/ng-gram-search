var app = angular.module('instaApp', ['ngAnimate'])

app.controller('instaController', ['$scope', '$http', '$q', '$timeout', function($scope, $http, $q, $timeout) {

	$scope.results = [];
	$scope.show = false;

	// create promise for 2 second message
	function wait() {
		var defer = $q.defer();
		// Simulating doing some asynchronous operation
		setTimeout(function() {
			defer.resolve();
		}, 2000);

		return defer.promise;
	};

	function instaSearch() {
		$scope.instaSearchMsg = "Searching Instagram for photos tagged with " + $scope.tag + "...";
		return wait().then(function() {
			$scope.instaSearchMsg = "";
		});
	};

	// submit function
	$scope.submit = function() {
		// if form is valid after submit
		if($scope.instaForm.$valid) {
			console.log("submit");
			$scope.instaForm.$setPristine();
			$scope.instaForm.$setUntouched();
			$scope.show = true;

			// query endpoint and parameters
			var url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent';
			var request = {
				callback: 'JSON_CALLBACK',
				client_id: '2b6dddcdb4124c76ad2b77fc4d8709da'
			};

			$http({
				method: 'JSONP',
				url: url,
				params: request
			})
			.success(function(result) {
				instaSearch().then(function(){
					console.log('success');
					$scope.results = result.data;

					if ($scope.results.length===0) {
						$scope.instaSearchMsg = 'No images matching ' + $scope.tag +' were found.';
					} else {
						$scope.instaSearchMsg = 'We found ' + $scope.results.length + ' images for ' + $scope.tag + '.';
					}

				});
			})
			.error(function(result) {
				instaSearch().then(function(){
					console.log("error");
					$scope.instaSearchMsg = 'Something went wrong! Please try again!';
				});
			});
		} else {
			$scope.results = [];
			$scope.instaSearchMsg = "";
		}
	};
}]);

// CLIENT ID	2b6dddcdb4124c76ad2b77fc4d8709da
// CLIENT SECRET	01287d8a6f9f4bbe856a88b4e5d1c0fa
var app = angular.module('instaApp', [])

app.controller('instaController', function($scope) {
	$scope.submit = function() {
		console.log("submit");
	}
})
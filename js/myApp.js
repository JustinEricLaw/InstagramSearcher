angular.module('myApp', [])
  .controller('myController', ['$scope', function($scope){


  $scope.placeholder = 'Enter a Term';

  // On valid form submit:
  $scope.submit = function () {
    if($scope.myForm.$valid) {

      // Reset Form, Text input Cleared
      $scope.myForm.$setPristine();
      $scope.searchbox = '';
      $scope.placeholder = '';
    }
  };

  // Query made to Instagram API
  // "Searching Instagram" text appears


  // If Query success, display images
  // Show "Results" text
  // Images should link to Instagram


  // If no images found, show "No Images" text


  // If Query error, show "error" message

}]);

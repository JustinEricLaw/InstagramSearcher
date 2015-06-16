angular.module('myApp', [])
  .controller('myController', ['$scope', '$http', '$q', '$timeout',
  function($scope, $http, $q, $timeout){

  // Set Initial Placeholder Value  
  $scope.placeholder = 'Enter a Tag';


  // Create Promise to turn "Searching" Message on/off
  function wait() {
    var defer = $q.defer;
    $timeout(function(){
      defer.resolve();
    }, 2000);
    return defer.promise;
  }


  // "Searching Instagram" Text
  function searching() {
    $scope.showMessage = 'Searching Instagram for Photos Tagged with "' + $scope.tag + '"';
    wait().then(function(){
      $scope.showMessage = '';
    });
  }


  // On valid form submit:
  $scope.submit = function () {
    

    if($scope.myForm.$valid) {
      $scope.submitted = true;

      // Reset Form, Text input Cleared
      // $scope.myForm.$setPristine();
    }

    // Query made to Instagram API
    var url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent';
    var request = {
      callback: 'JSON_CALLBACK',
      client_id: '6d641e362e8d434191c78a2808af92cf',
    };

    $http({
      method: 'JSONP',
      url: url,
      params: request
    })
    .success(function(response) {
      console.log('Success');
      $scope.results = response.data;
    })
    .error(function() {
      console.log('Error');
    });


  }; // closes submit call



  // If Query success, display images
  // Show "Results" text:
  // We found {{results.length}} photos tagged with {{tagname}}
  
  // Images should link to Instagram
  // CLIENT ID: 6d641e362e8d434191c78a2808af92cf

  // If no images found, show "No Images" text
  // If Query error, show "error" message



}]); // closes module/controller




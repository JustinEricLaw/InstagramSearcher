angular.module('myApp', [])
  .controller('myController', ['$scope', '$http', '$q', '$timeout',
  function($scope, $http, $q, $timeout){


  // Create Promise to turn "Searching" Message on/off
  function wait() {
    var defer = $q.defer();
    $timeout(function(){
      defer.resolve();
    }, 2000);
    return defer.promise;
  }

  $scope.showMessage = '';

  // "Searching Instagram" Text
  function searching() {
    $scope.showMessage = 'Searching for Photos Tagged with "' + $scope.tag + '"';
    return wait().then(function(){
      $scope.showMessage = '';
    });
  }


  // On valid form submit:
  $scope.submit = function () {
    $scope.results = null;

    if($scope.myForm.$valid) {
      $scope.submitted = true;
      $scope.myForm.$setPristine();
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
    .success(function(result) {

      searching().then(function(){
        console.log('Success');
        $scope.results = result.data;
        $scope.showMessage = "We found " + $scope.results.length + " images matching " + $scope.tag;
      });
    })
    .error(function(result) {
      searching().then(function(){
        console.log('Error'); 
        $scope.showMessage = "Error Searching Instagram";       
      });
    });


  }; // closes submit call



  // Show "Results" text:
  // We found {{results.length}} photos tagged with {{tagname}}
  
  // Images should link to Instagram
  // CLIENT ID: 6d641e362e8d434191c78a2808af92cf

  // If no images found, show "No Images" text
  // If Query error, show "error" message



}]); // closes module/controller




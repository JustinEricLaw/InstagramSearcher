angular.module('myApp', ['angular-velocity'])
  .controller('myController', ['$scope', '$http', '$q', '$timeout',
  function($scope, $http, $q, $timeout){


  // Initialize values
  $scope.results = [];
  $scope.showMessage = '';
  $scope.submitted = false;
  $scope.placeholder = "Enter a Tag";  
  $scope.show = false;

  // Create Promise to turn "Searching" Message on/off
  function wait() {
    var defer = $q.defer();
    $timeout(function(){
      defer.resolve();
    }, 1200);
    return defer.promise;
  }


  // "Searching Instagram" Text
  function searching() {
    $scope.showMessage = 'Searching for Photos Tagged with "' + $scope.tag + '"';
    return wait().then(function(){
      $scope.showMessage = '';
    });
  }


  // On valid form submit:
  $scope.submit = function () {
    $scope.show = false;

    if ($scope.myForm.$invalid) {
      $scope.results = [];
      $scope.showMessage = '';
    } else if ($scope.myForm.$valid) {
      $scope.submitted = true;
      $scope.myForm.$setPristine();
    
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
          if ($scope.results.length < 1) {
            $scope.showMessage = 'No images found';
          } else {
            $scope.show = true;
            $scope.showMessage = 'The ' + $scope.results.length + ' most recent images matching "' + $scope.tag + '"';
          }
        });
      })
      .error(function(result) {
        searching().then(function(){
          console.log('Error'); 
          $scope.showMessage = "Error Searching Instagram";       
        });
      });
    }


  }; // closes submit call
}]); // closes module/controller



// CLIENT ID: 6d641e362e8d434191c78a2808af92cf


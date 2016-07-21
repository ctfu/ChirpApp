
var app = angular.module('chirpApp', ['ngRoute', 'ngCookies']).run(function($rootScope, $http, $cookies){
  //store client authetication session
  $rootScope.authenticated = $cookies.get('authenticated');
  $rootScope.current_user = $cookies.get('current_user');
//signout function in $rootScope
  $rootScope.logout = function(){
    $http.get('/auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $cookies.remove('authenticated');
    $cookies.remove('current_user');
  };
});

//config the ngroutes
app.config(function($routeProvider){
  $routeProvider
    .when('/',  {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

/* a custome directiv for user mentions in the text post form */
app.directive('mention', function($http){
  return{
    restrict: 'A',
    link: function(scope, element, attrs){
      $http.get('/api/users').success(function(data){
        scope.users = data;
        console.log(scope.users);
        element.mention({
          users: scope.users
        });
      });
    }
  }
});

//mainController
app.controller('mainController', function($scope, $rootScope, $http){
  /* get all the posts */
  $scope.refresh = function(){
    $http.get('/api/posts').success(function(data){
      console.log(data);
      $scope.posts = data;
    });
  }
  $scope.refresh();

  $scope.newPost = {created_by: '', text: '', created_at: ''};

  $scope.post = function(){
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_at = Date.now();
    $http.post('/api/posts', $scope.newPost).success(function(data){
      $scope.refresh();
    });
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  };

});

//authController
app.controller('authController', function($scope, $rootScope, $http, $location, $cookies){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

//login function
  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $cookies.put('authenticated', true);
        $rootScope.authenticated = $cookies.get('authenticated');
        $cookies.put('current_user', data.user.username);
        $rootScope.current_user = $cookies.get('current_user');
        $location.path('/');
      }else{
        $scope.error_message = data.message;
      }
    });
  };
//signup function
  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $cookies.put('authenticated', true);
        $rootScope.authenticated = $cookies.get('authenticated');
        $cookies.put('current_user', data.user.username);
        $rootScope.current_user = $cookies.get('current_user');
        $location.path('/');
      }else{
        $scope.error_message = data.message;
      }
    });
  };
});

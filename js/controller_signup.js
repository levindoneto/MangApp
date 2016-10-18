var app = angular.module('webapp', []);
app.controller('signUp', function($scope) {
console.log("Controller Signup Loaded...");
$scope.signup = function(user){

console.log(user);
if(user.password.length < 3)
console.log("Password invalid");



}
});



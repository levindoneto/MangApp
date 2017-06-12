
var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial','firebase']);

dashboard.factory('notification', function($firebaseArray, $firebaseObject) {

  return {

    send: function(message, user) {
      var ref = firebase.database().ref('users/'+user)
      var userDB = $firebaseObject(ref);
      userDB.$loaded().then(function(){
          userDB.haveNotification = true;
          userDB.$save().then(function(ref) {

          }, function(error) {
              console.log("Error:", error);
          });

      })


      var ref = firebase.database().ref('notifications/');

      var notificationsList = $firebaseArray(ref);
      notificationsList.$loaded().then(function(){
        var notificationAdd = {'user': user, 'message': message}
        notificationsList.$add(notificationAdd).then(function(ref) {

        });
      });
    }
  }

});

dashboard.config(["$stateProvider", function ($stateProvider) {


  $stateProvider.state('app.myaccount', {
    url: '/myaccount',
    templateUrl: 'app/modules/dashboard/views/myaccount.html',
    controller: 'myaccountController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Minha Conta'
    }
  });


  $stateProvider.state('app.mymangas', {
    url: '/mymangas',
    templateUrl: 'app/modules/dashboard/views/mymangas.html',
    controller: 'mymangasController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Meus Mangás'
    }
  });

  $stateProvider.state('app.addmanga', {
    url: '/addmanga',
    templateUrl: 'app/modules/dashboard/views/addmanga.html',
    controller: 'addmangaController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Adicionar Mangá'
    }
  });


  $stateProvider.state('app.admin', {
    url: '/admin',
    templateUrl: 'app/modules/dashboard/views/admin.html',
    controller: 'adminController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Administrator'
    }
  });

  $stateProvider.state('app.trades', {
    url: '/trades',
    templateUrl: 'app/modules/dashboard/views/trades.html',
    controller: 'tradesController',
    controllerAs: 'vm',
    data: {
      pageTitle: 'Trocas'
    }
  });



}]);

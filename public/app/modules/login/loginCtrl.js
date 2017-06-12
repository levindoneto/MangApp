

login.controller("loginCtrl", ['$rootScope', '$scope', '$state', '$location', 'loginService', 'Flash','apiService','$firebaseAuth','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, loginService, Flash, apiService, $firebaseAuth, $firebaseObject, $firebaseArray) {
    var vm = this;

    vm.getUser = {};
    vm.setUser = {};
    vm.signIn = true;
    var auth = $firebaseAuth();
    //access login
    vm.login = function (data) {
        console.log(data)
        auth.$signInWithEmailAndPassword(data.Email, data.Password).then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);

        }).catch(function(error) {
            Flash.create('danger', 'Falha na autenticação->' + error, 'large-text');

        });

    };

    //get registration details
    vm.register = function () {
        if (vm.setUser.confirmPassword == vm.setUser.Password){
            var refUsers = firebase.database().ref('users/');
            var userList = $firebaseArray(refUsers);
            var alreadyExist = false;
            console.log(refUsers);
            console.log(alreadyExist);
            console.log(userList);
            userList.$loaded().then(function(){
                angular.forEach(userList, function(user) {
                    console.log(user);
                    if(user.CPF == vm.setUser.CPF){
                        Flash.create('danger', 'CPF - Já registrado!', 'large-text');
                        alreadyExist = true;
                        
                    }
                })
                if(!alreadyExist)
                auth.$createUserWithEmailAndPassword(vm.setUser.Email, vm.setUser.Password)
                .then(function(firebaseUser) {

                    var ref = firebase.database().ref('users/'+firebaseUser.uid);
                    var obj = $firebaseObject(ref);

                    obj.$bindTo($rootScope, "user").then(function() {
                        console.log($rootScope.user); // { foo: "bar" }
                        $rootScope.user = vm.setUser;
                        //ref.set({ foo: "baz" });  // this would update the database and $scope.data
                    });



                }).catch(function(error) {
                    Flash.create('danger', 'Erro ao criar conta ->' + error, 'large-text');



                });
            });



        }
    };



    auth.$onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
            $state.go('app.myaccount');
            console.log("User " + firebaseUser.uid + " created successfully!");
        } else {
            console.log("Signed out");
        }
    });


}]);

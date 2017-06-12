

dashboard.controller("addmangaController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseObject','$firebaseArray','Upload','$timeout','notification',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseObject, $firebaseArray, Upload, $timeout, notification) {
    var vm = this;



    vm.addManga = function (manga, file) {

        Upload.base64DataUrl(file).then(function(base64Url) {
            manga.userUid = $rootScope.userDB.uid;

            var refImages = firebase.database().ref('images/');
            var imageList = $firebaseArray(refImages);
            imageList.$loaded().then(function(){
                imageList.$add(base64Url).then(function(imref) {
                    console.log("imref");
                    console.log(imref)
                     manga.imageFile = imref.key;


                    var ref = firebase.database().ref('mangas/');
                    var mangaList = $firebaseArray(ref);
                    mangaList.$loaded().then(function(){

                        mangaList.$add(manga).then(function(ref) {
                            swal({
                                title: "Mangá adicionado com sucesso!",
                                timer: 1700,
                                showConfirmButton: false });
                                //Now it needs to send notifications to all users in wishlist
                                var ref = firebase.database().ref('wishlist/');
                                var wishListLoad = $firebaseArray(ref);
                                wishListLoad.$loaded().then(function(){
                                    var arrayOfKeywords = manga.name.split(" ");
                                    angular.forEach(wishListLoad, function(wish) {
                                        angular.forEach(arrayOfKeywords, function(keyword) {
                                            if(keyword.toUpperCase() == wish.word.toUpperCase()){
                                                notification.send("Lista de Desejos: um Mangá que possui a palavra chave '"+ keyword+"' foi adicionado! Use a pesquisa para encontrá-lo", wish.user)
                                            }
                                        });
                                    });

                                });


                            });
                        });
                    });

                    });
                });
            }

        }]);

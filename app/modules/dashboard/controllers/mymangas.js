

dashboard.controller("mymangasController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$firebaseObject','$firebaseArray',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $firebaseObject, $firebaseArray) {
  var vm = this;


  var ref = firebase.database().ref('mangas/');
  var mangaList = $firebaseArray(ref);
  mangaList.$loaded().then(function(){
    console.log(mangaList)
    $scope.mangas = mangaList;
  });

  $scope.modal = function(manga) {

      var ref = firebase.database().ref('images/'+manga.imageFile);
      var imageObj = $firebaseObject(ref);
      imageObj.$loaded().then(function(){
          console.log("image");
          console.log(imageObj)
          $scope.imageManga = imageObj.$value;
          $scope.modalmanga = manga;
          console.log($scope.modalmanga);
      });
  }

  $scope.remove = function(manga) {
      console.log("deleting...");
      var mangaID = manga.$id;
      console.log(mangaID);
      var ref = firebase.database().ref('mangas/'+manga.$id);
      var mangaObject = $firebaseObject(ref);

      swal({
        title: "Você tem certeza que deseja deletar esse mangá?",
        text: "Essa ação não poderá ser revertida!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, tenho certeza!",
        cancelButtonText: "Não, cancele!",
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm){
        if (isConfirm) {
          mangaObject.$loaded().then(function(){
            mangaObject.$remove().then(function(){
              swal({
                title: "Mangá removido com sucesso!",
                timer: 1700,
                showConfirmButton: false });
            }, function(error) {
              console.log("Error:", error);
            });
          });
        } else {
          swal({
            title: "Seu mangá não foi deletado!",
            timer: 1700,
            showConfirmButton: false });
        }
      });
    }
}]);

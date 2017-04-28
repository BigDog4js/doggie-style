angular.module("dogProject").controller("breederController",function($scope, $http, dogService, userService, $mdSidenav, $mdToast, $mdDialog) {
    $scope.user = null;
    $scope.loggedIn = false;
    $scope.dogs = []
    $scope.dogFilter = ""
    $scope.categoryFilter = {breed: ""}
    
    userService.getUser()
    .then(response => {
        console.log(response)
        $scope.user = response.data;
        $scope.loggedIn = true;
    })
    
   $scope.getDogs = function() {
    console.log("scope.getDogs fired")
    dogService.getDogsByUser().then(function(response) {
        $scope.dogs = response.data;  
        console.log($scope.dogs)
         $scope.categories = [];
         for (var dog of $scope.dogs) {
            if ($scope.categories.indexOf(dog.breed) === -1) {
                $scope.categories.push(dog.breed)                                     
            }
         }
    })
   }
   $scope.getDogs()
   
   
   $scope.openSidebar = function() {
       $mdSidenav("left").open();
   }
   
   $scope.openNewDogForm = function() {
       $scope.newDog = {name: ""};
       $scope.openSidebar();
   }
   $scope.closeSidebar = function() {
       $mdSidenav("left").close();
   }
   
   $scope.showEditContact = function() {
       console.log("Firing")
       $mdSidenav("right").open()
   }
   $scope.closeRightSidebar = function() {
       $mdSidenav("right").close()
   }
   
   $scope.saveNewDog = function(newDog) {
      if(newDog){ console.log(newDog)
//       $scope.dogs.push(newDog);
      // Send new dog to service and then to back end 
      dogService.postDog(newDog).then(() => {
          $scope.getDogs()
           $scope.newDog = {};
           $scope.closeSidebar();
           $mdToast.show(
           $mdToast.simple()
               .content("Great! Your dog has been saved.")
               .position("top, right")
               .hideDelay(3000)
           )
          
      })
      // Once we do that, we want to get the new dogs
    
      }
   }
    
    $scope.deleteDog = function(event,dog) {
           console.log(event, dog)
       var confirm = $mdDialog.confirm()
           .title("Are you sure you want to delete?")
           .ok("Yes")
           .cancel("No")
           .targetEvent(event)
       $mdDialog.show(confirm)
           .then(function() {
                dogService.deleteDog(dog.id).then(response => {
                    console.log(response)
                    $scope.getDogs()
                })
//                   var index = $scope.dogs.indexOf(dog);
//                   $scope.dogs.splice(index,1);
               },
            function() {}
           );
    }

          
   
   
   $scope.editDog = function(dog) {
       $scope.editing = true;
       $scope.sidebarTitle = "Edit Dog";
       $scope.newDog = Object.assign({}, dog);
       $scope.editIndex = $scope.dogs.indexOf(dog)
       $scope.openSidebar()
   }
   
   $scope.saveEdit = function(newDog){
       $scope.editing = false;
//       $scope.dogs.splice($scope.editIndex, 1, newDog)
       dogService.updateDog(newDog).then(response => {
           console.log("Dog Updated: ", response)
           $scope.getDogs()
       })
       $mdSidenav("left").close();
       
   }
   
});
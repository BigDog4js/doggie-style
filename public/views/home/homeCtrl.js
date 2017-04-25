angular.module("dogProject").controller("homeController", function($scope, userService) {
    $scope.dataArray = [
      {
        src: "./dogImages/bestFriend.jpg"
      },
      {
        src: "./dogImages/boatRide.jpg"
      },
      {
        src: "./dogImages/iceCream.jpeg"
      },
      {
        src: "./dogImages/snowDay.jpg"
      },
      {
        src: "./dogImages/teacup.jpg"
      },
      {
        src: "./dogImages/sleepy.jpeg"
      },
      {
        src: "./dogImages/cuddleTime.jpeg"
      },
      {
        src:"./dogImages/lineup.jpg"
      }
    ];

})
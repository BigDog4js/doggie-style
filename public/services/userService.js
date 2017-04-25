angular.module("dogProject").service("userService",function($http){

    this.getUser = () => {
        return $http({
            method: "GET",
            url: "/user"
        })
    }
})

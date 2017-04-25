angular.module("dogProject").service("dogService",function($http){

    this.getDogs = function() {
        return $http({
            
            method: "GET",
            url: "/api/dogs"
            
        })
    }

    this.getDogsByUser = function() {
        return $http({
            
            method: "GET",
            url: "/api/dogs/user"
            
        })
    }

    this.postDog = function(newDog) {
        return $http({
            method: 'POST',
            url: "/api/dogs",
            data: newDog
        })
    }
    
    this.updateDog = function(newDog) {
        return $http({
            method: 'PUT',
            url: "/api/dogs/" + newDog.id,
            data: newDog
        })
    }
    
    this.deleteDog = function(dogId) {
        return $http({
            method: "DELETE",
            url: "/api/dogs/" + dogId
        })
    }
    
    
    
    
    
})
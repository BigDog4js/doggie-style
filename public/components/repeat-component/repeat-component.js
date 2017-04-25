angular.module("dogProject").component("repeatComponent", {
    templateUrl: './components/repeat-component/repeat-component.html',
    bindings: {
        dog: "=",
        showAdmin: "<",
        deleteDog: "&",
        editDog: "&"
    },
    controller: function() {
        setTimeout(() => {console.log(this.showAdmin)}, 1000)
    }
    
    
    
    
    
    
})
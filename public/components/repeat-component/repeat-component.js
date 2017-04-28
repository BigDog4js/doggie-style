angular.module("dogProject").component("repeatComponent", {
    templateUrl: './components/repeat-component/repeat-component.html',
    bindings: {
        dog: "=",
        showAdmin: "<",
        deleteDog: "&",
        editDog: "&",
        showEditContact: "&"
    },
    controller: function() {
        setTimeout(() => {
            console.log(this.showAdmin)
        }, 1000)
    }
    
    
    
    
    
    
})
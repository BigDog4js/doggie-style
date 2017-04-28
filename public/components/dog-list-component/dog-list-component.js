angular.module("dogProject").component("dogListComponent", {
        bindings: {
            dogs: '=dogs',
            showAdmin: '@',            
            categoryFilter: '<',            
            dogFilter: '<',
            deleteDog: '&',
            editDog: '&',
            showEditContact: "&"
        },
        controller: function() {
            this.showControls = false;
        },
        templateUrl: './components/dog-list-component/dog-list-component.html',
})

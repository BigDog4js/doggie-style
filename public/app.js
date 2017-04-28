angular.module("dogProject", ["ngMaterial", "ui.router", "jkAngularCarousel"]).config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('pink')
    
  
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './views/home/home.html',
            controller: 'homeController'
        })
        
        .state('search', {
            url: '/search',
            templateUrl: './views/search/search.html',
            controller: 'searchController'

        })

        .state('breeder', {
            url: '/breeder',
            templateUrl: './views/breeder/breeder.html',
            controller: 'breederController'
        })
    
    $urlRouterProvider.otherwise('/')
    
});
// app.js
var routerApp = angular.module('routerApp', ['ui.router','ui.bootstrap','ngStorage']);

routerApp.config(function($stateProvider, $urlRouterProvider,$provide) {
	 $provide.decorator('$state', function($delegate, $stateParams) {
	        $delegate.forceReload = function() {
	            return $delegate.go($delegate.current, $stateParams, {
	                reload: true,
	                inherit: false,
	                notify: true
	            });
	        };
	        return $delegate;
	    });
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('index',{
        	url:'/index',
        	templateUrl:'html/index-Test.html'
        })
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'html/partial-home.html'
        })
        // nested list with custom controller
    .state('home.list', {
        url: '/list',
        templateUrl: 'html/partial-home-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })

    // nested list with just some random string data
    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    
    .state('about', {
        url: '/about',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'html/partial-about.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@about': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@about': { 
                templateUrl: 'html/table-data.html',
                controller: 'scotchController'
            }
        }
        
    })
    
     .state('about.empList', {
        url: '/empList',
        templateUrl: 'html/partial-employeeList.html',
        controller: function($scope,$http,$state,$sessionStorage) {
        	//alert("hi");        	
        	$scope.empList=[];
        	 $http({
		         url: "http://localhost:8080/demo/v1/user/employeeList",
		         data: null,
		         method: 'GET',
		         transformRequest: false,
		         headers: {'Content-Type': undefined}

		     }).success(function (response) {
		    	 angular.forEach(response, function (value, key) {
			        	//alert($sessionStorage.successResponse);
			         angular.forEach(value,function(value1,key1){
			        	 console.log(value1);
			        	 $scope.empList.push(value1);
			        	 
			        	 $scope.successmsg =$sessionStorage.successResponse;
			        	
			         })
			         
		    	 })
		    	
		    	
		    	/* $state.transitionTo($state.current, $stateParams, {
		        	    reload: true,
		        	    inherit: false,
		        	    notify: true
		        	});*/
		    	 //$state.forceReload();
		     }).error(function(response){
		    	 console.log("error!something went wrong...");
		     })
		     $state.reload();
        }
    })
    
    .state('about.empAdd', {
        url: '/empAdd',
        templateUrl: 'html/addEmployee.html',
        controller: 'addCtrl'
    })
    .state('about.empList.editEmp', {
        url: '/editEmp?id',
        templateUrl: 'html/editEmployee.html',
        controller: 'editCtrl'        	
    })
   
    .state('about.empList.updateRes',{
    	url:'/updateRes',
    	template:'User has been updated successfully'
    })
    .state('about.empList.deleteEmp',{
    	url:'/deleteEmp?id',
    	template:'User has been deleted successfully',
    	controller:'deleteCtrl'	
    })
    .state('index.terms', {
        /**
         * Only the URL is required, you don't need a controller or a template for the state
         */
        url: '/terms',
        /**
         * Open the modal window when the onEnter event is fired
         */
        onEnter: function($modal){
          $modal.open({
            template: [
            '<div class="modal-content">',
              '<div class="modal-header">',
                '<h3 class="modal-title">Regulamin</h3>',
              '</div>',
              '<div class="modal-body">',
              '$1. Give us all your money!',
              '</div>',
              '<div class="modal-footer">',
                '<button class="btn btn-primary" ng-click="$dismiss()">OK</button>',
                '<button class="btn btn-danger" ng-click="$dismiss()">cancel</button>',
              '</div>',
            '</div>'
            ].join(''),
            controller: function($scope){
              // do whatever you need here.
            }
          });
          
        }
      })
    
}); // closes $routerApp.config()


// let's define the scotch controller that we call up in the about state
routerApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});


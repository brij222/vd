routerApp.controller('addCtrl',function($scope,$http){
	
	$scope.login = function (){
		$scope.successMsg= false;
		alert("login");
		console.log("after login")
		console.log($scope.firstName+" "+$scope.lastName+" "+$scope.email+" "+$scope.phone)
		var data = new FormData;
		data.append('firstName',$scope.firstName);
		data.append('lastName',$scope.lastName);
		data.append('email',$scope.email);
		data.append('phone',$scope.phone);
		$http({
	          url: "http://localhost:8080/demo/v1/user/addEmployee", 
	          method: "POST", 
	          data: data,
	          async: false,
		      transformRequest: false,
		      headers: {'Content-Type': undefined}
	      }).success(function(response, status) {
	        	console.log(response);
	        	$scope.showSuccessMsg = response;
	        	$scope.successMsg= true;
	        })
	        
	}
})

routerApp.controller('editCtrl',function($scope,$http,$stateParams,$state,$sessionStorage){
	//alert($stateParams.id);
	$http({
	          url: "http://localhost:8080/demo/v1/user/getEmployeeById?id="+$stateParams.id, 
	          method: "Get", 
	          data: null,
	          async: false,
		      transformRequest: false,
		      headers: {'Content-Type': undefined}
	      }).success(function(response, status) {
	        	console.log(response);
	        	$scope.editFirstName = response.firstName;
	        	$scope.editLastName = response.lastName;
	        	$scope.editEmail = response.email;
	        	$scope.editPhone = response.phone;
	        	//$sessionStorage.id = response.id;
	        })
	        
	        $scope.updateEmp = function(){
		var data = new FormData;
		data.append('firstName',$scope.editFirstName);
		data.append('lastName',$scope.editLastName);
		data.append('email',$scope.editEmail);
		data.append('phone',$scope.editPhone);
		$http({
	          url: "http://localhost:8080/demo/v1/user/updateEmployee?id="+$stateParams.id, 
	          method: "POST", 
	          data: data,
	          async: false,
		      transformRequest: false,
		      headers: {'Content-Type': undefined}
	      }).success(function(response, status) {
	        	console.log(response);	        	
	        	$sessionStorage.successResponse = response;
	        	$state.go('about.empList');
	        	/*$state.transitionTo($state.go('about.empList'), $stateParams, {
	        	    reload: true,
	        	    inherit: false,
	        	    notify: true
	        	});*/
	        })
	
		
	}
})

routerApp.controller('deleteCtrl',function($scope,$http,$sessionStorage,$stateParams,$state){
	
		$http({
	          url: "http://localhost:8082/cxfRestExample/v1/user/deleteEmployee?id="+$stateParams.id, 
	          method: "POST", 
	          data: null,
	          async: false,
		      transformRequest: false,
		      headers: {'Content-Type': undefined}
	      }).success(function(response, status) {
	        	console.log(response);	        	
	        	$sessionStorage.successResponse = response;
	        	$state.go('about.empList');
	        	/*$state.transitionTo($state.go('about.empList'), $stateParams, {
	        	    reload: true,
	        	    inherit: false,
	        	    notify: true
	        	});*/
	        })
	
})


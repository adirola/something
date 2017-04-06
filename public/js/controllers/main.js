angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos

		setInterval(function() {
			Todos.get()
			.success(function(data) {
				console.log(data);
				$scope.parking = data;
				$scope.loading = false;
			});
  // method to be executed;
		
		}, 10000);

		
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.reserveParking = function(id) {

			Todos.getByID(id)
				.success(function(data){
					var update = data;
					if(data.isReserved == false && data.isEmpty == true){
						update.isReserved = true ;
						$http.put('/api/parking/' +id, update)
						.success(function(data){
							console.log(data);
							});
						
					}
			
			});
			Todos.get()
			.success(function(data) {
				console.log(data);
				$scope.parking = data;
				$scope.loading = false;
			});

		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);
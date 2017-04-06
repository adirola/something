angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/parking');
			},
			create : function(todoData) {
				return $http.post('/api/parking', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/parking/' + id);
			},
			update : function(id) {
				return $http.put('/api/parking/' + id);
			},
			getByID : function(id) {
				return $http.get('/api/parking/' + id);
			}
		}
	}]);
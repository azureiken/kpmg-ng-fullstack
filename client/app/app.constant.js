(function(angular, undefined) {
  angular.module("ngfullstackApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);
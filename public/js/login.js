angular.module('myApp').controller('loginCtrl', function($scope,$http,$location,$rootScope,socket) {
    $scope.usrList = ["user1", "user2", "user3", "user4", "user5"]
    $scope.validateUsr = function(userName){
        return !userName ? 'Username Required' :  ($scope.usrList.indexOf(userName) < 0) ? 'Invalid Username' : true;
    }
    $scope.user = localStorage.getItem("username")    
    function init(){
         var usrStatus = $scope.validateUsr($scope.user);
        if(usrStatus == true){
            socket.emit('loginEvnt', $scope.user);
            $location.path("dashboard");
        }else{
            $location.path("login");
        }
    }init();

    var clients = [];
    $scope.login = function(){    	
    	var usrStatus = $scope.validateUsr($scope.username);
    	if(usrStatus == true){
    		localStorage.setItem("username", $scope.username);
            socket.emit('loginEvnt', $scope.username);
            socket.on('usrExist', function(usrVal) {
                if(usrVal){
                    $location.path("login");
                    $scope.error = true;
                    $scope.label = 'User Already Login';
                    $scope.errorLbl = "ClerrorLbl"
                    $scope.errorCls = "ClerrorCls"
                }else{
                    $location.path("dashboard");
                }
            });    		
    	}else{
    		$location.path("login");
            $scope.error = true;
            $scope.label = usrStatus;
            $scope.errorLbl = "ClerrorLbl"
            $scope.errorCls = "ClerrorCls"
    	}
    }
});

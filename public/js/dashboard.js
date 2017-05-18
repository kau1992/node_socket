angular.module('myApp').controller('dashboardCtrl', function($scope,$http,$location,$rootScope,socket,$window) {
    $scope.usrList = ["user1", "user2", "user3", "user4", "user5"]
    $scope.validateUsr = function(userName){
    	return !userName ? 'Username Required' :  ($scope.usrList.indexOf(userName) < 0) ? 'Invalid Username' : true;
    }

    $scope.user = localStorage.getItem("username")    
    function init(){
         var usrStatus = $scope.validateUsr($scope.user);
        if(usrStatus == true){
            $location.path("dashboard");
        }else{
            $location.path("login");
        }
    }init();
    
    $scope.onExit = function(event) {
        socket.emit('exitUsr', $scope.user);
        localStorage.clear();
        $location.path("logout");
    };
    $window.onbeforeunload =  $scope.onExit;
   
    socket.on('broadcast',function(data){
        $scope.activeUsr = data.description
        $scope.$apply()
    });
    $scope.logout = function(){
        socket.emit('logout', $scope.user);
    	localStorage.clear();
    	$location.path("logout");
    }
});

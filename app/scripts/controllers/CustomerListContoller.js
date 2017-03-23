'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('customerListCtrl', function ($scope, $http, $location, $rootScope) {

  
    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/customer")
        .then(function (response) {
            $scope.aa = response.data;
        });
    };
  
    refresh();
    $scope.showRemoveModeal = function (id) {
       
        $("#del_hid").val(id);
        $("#myModal").modal('show');
    }

    $scope.removeCust = function () {
        var custToid = $("#del_hid").val();
        //var data = { "id": $rootScope.projDel };
        var data = { "id": custToid ,};
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/customer/remove',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                $scope.messageShow = data.message;
                if (data.status === "success") {
                    $("#tr_" + custToid).remove();
                    
                    $("#myModal").modal('hide');
                }
                else {
                    alert(data.message);
                }
            });
    }

    $scope.editCust = function (id) {
        $location.path("dashboard/UpdateCustomer").search('pid', id);
    }

});
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('showProjCtrl', function ($scope, $http, $location, $rootScope) {

    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (response) {
            $scope.aa = response.data;
        });
    };

    refresh();
    //$rootScope.projDel = "";
    $scope.showRemoveModeal = function (id) {
        //$rootScope.projDel = id;
        $("#del_hid").val(id);
        $("#myModal").modal('show');
    }

    $scope.removeProj = function () {
        var projToid = $("#del_hid").val();
        //var data = { "id": $rootScope.projDel };
        var data = { "id": projToid };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/project/remove',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                $scope.messageShow = data.message;
                if (data.status === "success") {
                    $("#tr_" + projToid).remove();
                    //$("#tr_" + $rootScope.projDel).remove();
                    $("#myModal").modal('hide');
                }
                else {
                    alert(data.message);
                }
            });
    }

    $scope.editProj = function (id) {
        $location.path("dashboard/EditProject").search('pid', id);
    }
});
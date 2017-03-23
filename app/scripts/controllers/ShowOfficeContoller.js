'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('showOfficeCtrl', function ($scope, $http, $location, $rootScope) {
    var refresh = function () {

        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (projects) {
            $http.get("https://powerful-retreat-93422.herokuapp.com/projectmeta")
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var projId = response.data[i].ProjId[0];
                    
                    for (var j = 0; j < projects.data.length; j++) {
                        if (projId == projects.data[j]._id) {
                            response.data[i].ProjId.push(projects.data[j].name);
                        }
                    }
                }
                $scope.aa = response.data;
            });
        });
    };
    refresh();

    $scope.editProjMeta = function (id) {
        $location.path("dashboard/EditOffice").search('oid', id);
    }

    $scope.showRemoveModeal = function (id) {
        //$rootScope.projDel = id;
        $("#del_hid").val(id);
        $("#myModal").modal('show');
    }

    $scope.removeProjMeta = function () {
        var projmetaToid = $("#del_hid").val();
        //var data = { "id": $rootScope.projDel };
        var data = { "id": projmetaToid };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/projectmeta/remove',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                $scope.messageShow = data.message;
                if (data.status === "success") {
                    $("#tr_" + projmetaToid).remove();
                    //$("#tr_" + $rootScope.projDel).remove();
                    $("#myModal").modal('hide');
                }
                else {
                    alert(data.message);
                }
            });
    }
});
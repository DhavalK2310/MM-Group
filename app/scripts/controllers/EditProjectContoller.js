'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('editProjCtrl', function ($scope, $http, $location, $rootScope) {
    var projId = $location.search().pid;
    if (projId == undefined) { $location.path("dashboard/ShowProject"); }
    $("#hidProjId").val(projId);
    var refresh = function () {
        var data = { "id": projId };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/project/getbyid',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                
                if (data.status === "success") {
                    $scope.projName = data.project.name;
                    $scope.projCity = data.project.city;
                    $scope.projAddr = data.project.address;
                }
                else {
                    $location.path("dashboard/ShowProject");
                }
            });
    };
    refresh();

    $scope.cancelClick = function () {
        $location.path("dashboard/ShowProject");
    };

    $scope.editProj = function (projName, projAddr, projCity) {
        var proJEId = $("#hidProjId").val();
        var data = { "id": proJEId, "name": projName, "address": projAddr, "city": projCity };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/project/edit',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {

                $scope.messageShow = data.message;
                if (data.status === "success") {
                    $scope.successshow = true;
                    $scope.errorshow = false;
                }
                else {
                    $scope.successshow = false;
                    $scope.errorshow = true;
                }
            });
    };
});
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('editOfficeCtrl', function ($scope, $http, $location, $rootScope) {
    var officeId = $location.search().oid;
    if (officeId == undefined) { $location.path("dashboard/ShowOffice"); }
    $("#hid_office_id").val(officeId);

    var refresh = function () {
        var data = { "Id": officeId };
        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (ProjectList) {
            $scope.list_proj = ProjectList.data;

            $http.post(
            'https://powerful-retreat-93422.herokuapp.com/projectmeta/getbyid',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {

                if (data.status === "success") {
                    //$scope.drop_proj = data.office.ProjId[0];
                    $("#drop_proj").val(data.office.ProjId[0]);
                    $scope.block = data.office.Block;
                    $scope.size = data.office.Size;
                    $scope.area = data.office.Area;
                    //$scope.area_unit = data.office.AreaUnit;
                    $("#area_unit").val(data.office.AreaUnit);
                }
                else {
                    $location.path("dashboard/ShowProject");
                }
            });
        });
    }
    refresh();

    $scope.cancelClick = function () {
        $location.path("dashboard/ShowOffice");
    };

    $scope.editoffices = function (block, size, area) {
        var officeEditId = $("#hid_office_id").val();
        var projId = $("#drop_proj option:selected").val();
        var areaunit = $("#area_unit option:selected").val();
        var data = { "Id": officeEditId, "Block": block, "Size": size, "Area": area, "AreaUnit": areaunit, "ProjId": projId };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/projectmeta/edit',
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
    }
});
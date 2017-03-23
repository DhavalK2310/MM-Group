'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('addbookingCtrl', function ($scope, $http, $location, $rootScope) {

    $scope.successshow = false;
    $scope.errorshow = false;

    $scope.showNewCustomerModeal = function () {

        $("#myModalcustomer").modal('show');

    }
    $scope.showNewProjectModeal = function () {

        $("#myModalProject").modal('show');
    }
    $scope.showNewUnitModeal = function () {

        $("#myModalUnit").modal('show');
    }
    //$scope.closeNewCustomerModeal = function () {

    //    $location.path("dashboard/NewBooking");
    //}
    //$scope.closeNewProjectModeal = function () {

    //    $location.path("dashboard/NewBooking");
    //}
    //$scope.closeNewUnitModeal = function () {
    //    $location.path("dashboard/NewBooking");
    //}

    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/customer")
        .then(function (response) {
            $scope.list_cust = response.data;
        });
    }
    refresh();
    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (response) {
            $scope.list_proj = response.data;
        });
    }
    refresh();
    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/projectmeta")
        .then(function (response) {
            $scope.list_unit = response.data;
        });
    }
    refresh();

    $scope.addBooking = function (datepicker, drop_cust, drop_proj, drop_unit) {
        var bookRateRs = $("#bookrt").val();
        var bookArea = $("#bookarea").val();
        var bookBasicPrice = $("#bookbasprice").val();
        var token = $("#booktoken").val();
        var bookRs = $("#bookrs").val();
        var bookPendingAmt = $("#bookpenamt").val();
        var bookNoInstallment = $("#booknoifins").val();
        var bookMonthInstallment = $("#monthins").val();

        var data = { "bookingdate": datepicker, "custId": drop_cust, "projId": drop_proj, "unitId": drop_unit, "rate": bookRateRs, "area": bookArea, "basicprice": bookBasicPrice, "tokan": token, "rs": bookRs, "pendingamount": bookPendingAmt, "noinstallment": bookNoInstallment, "monthlyinstallment": bookMonthInstallment };

        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/booking',
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

    $scope.addCustomer = function (firstName, custEmail, custMobileno, custAddress) {

        var data = { "firstname": firstName, "email": custEmail, "mobileno": custMobileno, "address": custAddress };

        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/customer',
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
        $location.path('/');
    }

    $scope.addProj = function (projName, projAddr, projCity) {

        var data = { "name": projName, "address": projAddr, "city": projCity };

        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/project',
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
        $location.path('/');
    }

    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (response) {
            $scope.list_proj = response.data;
        });
    }
    refresh();

    $scope.addoffices = function () {
        var temp_data = "";
        var imax = $("#imax").val();
        var project_id = $("#drop_projselect option:selected").val();
        console.log(project_id);
        for (var i = 1; i <= imax; i++) {
            var chechd = $("#check_row_" + i).val();
            if (chechd == "yes") {
                var block = $("#block_" + i).val();
                var size = $("#size_" + i).val();
                var area = $("#area_" + i).val();
                var areaUnit = $("#area_unit_" + i).val();
                if (i == 1) {
                    temp_data = '{"Block":"' + block + '","Size":"' + size + '","Area":"' + area + '","AreaUnit":"' + areaUnit + '","ProjId":"' + project_id + '"}';
                }
                else {
                    temp_data += ',{"Block":"' + block + '","Size":"' + size + '","Area":"' + area + '","AreaUnit":"' + areaUnit + '","ProjId":"' + project_id + '"}';
                }
            }
        }

        var temp_data = "[" + temp_data + "]";

        var data = temp_data;
        console.log(data);
        data = JSON.parse(data);

        $http.post(
           'https://powerful-retreat-93422.herokuapp.com/projectmeta',
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
        $location.path('/');
    }
});
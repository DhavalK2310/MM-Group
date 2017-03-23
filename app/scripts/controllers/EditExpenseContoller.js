
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('editExpeCtrl', function ($scope, $http, $location, $rootScope) {
    var refresh = function () {
        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (response) {
            $scope.list_proj = response.data;
        });
    }
    refresh();

    var expeId = $location.search().pid;
    if (expeId == undefined) { $location.path("dashboard/ExpenseList"); }
    $("#expehdid").val(expeId);
    var refresh = function () {
        var data = { "id": expeId };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/expense/getbyid',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {

                if (data.status === "success") {
                    $scope.datepicker = data.Expense.date;
                    $scope.expProjid = data.Expense.project;
					$scope.expHead = data.Expense.head;
                   // $("#head").val(data.Expense.head);
                    $scope.expComment = data.Expense.comment;
                    $scope.expAmount = data.Expense.amount;
                    
                    
                   
                }
                else {
                    $location.path("dashboard/ExpenseList");
                }
            });
    };
    refresh();

    $scope.cancelClick = function () {
        $location.path("dashboard/ExpenseList");
    };


    //$scope.editExpe = function (datepicker, expAmount, expProjid, expPersonal, expHead, expComment) {
    //    var expeId = $("#expehdid").val();
    //    //var projId = $("#drop_proj option:selected").val();
    //    //var head = $("#head option:selected").val();
    //    var data = { "Id": expeId, "date": datepicker, "project": expProjid, "personal": expPersonal, "amount": expAmount, "comment": expComment, "head": expHead };
    //    $http.post(
    //        'http://localhost:3000/expense/edit',
    //            JSON.stringify(data),
    //            {
    //                headers: {
    //                    'Content-Type': 'application/json'
    //                }
    //            }
    //        ).success(function (data) {

    //            $scope.messageShow = data.message;
    //            if (data.status === "success") {
    //                $scope.successshow = true;
    //                $scope.errorshow = false;
    //            }
    //            else {
    //                $scope.successshow = false;
    //                $scope.errorshow = true;
    //            }
    //        });
    //};


  


    $scope.editExpe = function (datepicker, expProjid, expHead, expComment, expAmount) {
        var expeId = $("#expehdid").val();
        //var head = $("#head option:selected").val();
        var data = { "id": expeId, "date": datepicker, "project": expProjid, "head": expHead, "comment": expComment, "amount": expAmount };
        console.log(data);
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/expense/edit',
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
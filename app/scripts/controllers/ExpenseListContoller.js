'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
 
 

angular.module('sbAdminApp')
.controller('expenseListCtrl', function ($scope, $http, $location, $rootScope) {
   
	//Get the project name with foreign key get value
    var refresh = function () {
        //using for loop to get data on project name
        $http.get("https://powerful-retreat-93422.herokuapp.com/project")
        .then(function (projects) {
            $http.get("https://powerful-retreat-93422.herokuapp.com/expense")
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var projId = response.data[i].project[0];

                    for (var j = 0; j < projects.data.length; j++) {
                        if (projId == projects.data[j]._id) {
                            response.data[i].project.push(projects.data[j].name);
                        }
                    }
                }
                $scope.aa = response.data;
            });
        });
    };
    refresh();
    //Get all data api call
    //var refresh = function () {
    //    $http.get("http://localhost:3000/expense")
    //    .then(function (response) {
    //        $scope.aa = response.data;
          
    //    });
    //};

    //refresh();

    $scope.showRemoveModeal = function (id) {

        $("#del_hid").val(id);
        $("#myModal").modal('show');
    }

    $scope.removeExpe = function () {
        var expToid = $("#del_hid").val();
        //var data = { "id": $rootScope.projDel };
        var data = { "id": expToid, };
        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/expense/remove',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {
                $scope.messageShow = data.message;
                if (data.status === "success") {
                    $("#tr_" + expToid).remove();

                    $("#myModal").modal('hide');
                }
                else {
                    alert(data.message);
                }
            });
    }

    $scope.editExpe = function (id) {
        $location.path("dashboard/EditExpense").search('pid', id);
    }
});
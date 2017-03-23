'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('addexpenseCtrl',function ($scope, $http, $location, $rootScope) {
    $scope.list_proj = "";
    $scope.successshow = false;
    $scope.errorshow = false;
        var refresh = function () {
            $http.get("https://powerful-retreat-93422.herokuapp.com/project")
            .then(function (response) {
                $scope.list_proj = response.data;
            });
        }
        refresh();

    $scope.AddRow = function () {
        var imax = $("#imax").val();
        var row_num = parseInt(imax) + 1;
        var currentDate = new Date()
        var day = currentDate.getDate() 
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var proj_option = '';
        for (var c = 0; c < $scope.list_proj.length; c++) {
            proj_option += '<option value="' + $scope.list_proj[c]._id + '">' + $scope.list_proj[c].name + '</option>';
        }
        $("#dataTables-example").append('<tr id="tr_' + row_num + '"><td><input type="hidden" id="check_row_' + row_num + '" value="yes" /><a href="#" class="fa fa-times" onclick="removeRow(' + row_num + ')"></a></td><td><input type="text" class="form-control" id="dtid_' + row_num + '" required value="' + 0 + +month + "/" + day + "/" + year + '" required/> </td><td><select class="form-control" id="drop_proj_' + row_num + '" name="drop_proj_' + row_num + '">' + proj_option + '</select></td><td><select id="head_' + row_num + '" class="form-control"><option value="rati">Rati</option><option value="concrit">concrit</option></select></td><td><input type="text" class="form-control" id="comment_' + row_num + '" required /></td><td><input type="text" class="form-control" id="amount_' + row_num + '" required /></td></tr>');
        $("#imax").val(row_num);
        $('#dtid_' + row_num).datepicker();
        locale: {
            format: 'DD/MM/YYYY'

        }
    }

    $scope.addExpense = function () {
        var temp_data = "";
        var imax = $("#imax").val();

        for (var i = 1; i <= imax; i++) {
            var chechd = $("#check_row_" + i).val();
            if (chechd == "yes") {
                var date = $("#dtid_" + i).val();
                var amount = $("#amount_" + i).val();
                var comment = $("#comment_" + i).val();
                var head = $("#head_" + i).val();
                var project_id = $("#drop_proj_" + i + " option:selected").val();
                if (i == 1) {
                    temp_data = '{"date":"' + date + '","project":"' + project_id + '","head":"' + head + '","comment":"' + comment + '","amount":"' + amount + '"}';
                }
                else {
                    temp_data += ',{"date":"' + date + '","project":"' + project_id + '","head":"' + head + '","comment":"' + comment + '","amount":"' + amount + '"}';
                }
            }
        }

        var temp_data = "[" + temp_data + "]";

        var data = temp_data;
        data = JSON.parse(data);

        $http.post(
           'https://powerful-retreat-93422.herokuapp.com/expense',
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


//$scope.addExpense = function (datepicker, expAmount, expProjid, expTypes, expComment) {
//    var data = { "date": datepicker, "amount": expAmount, "project": expProjid, "extype": expTypes, "comment": expComment };

//    $http.post(
//        'http://localhost:3000/expense',
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
//}
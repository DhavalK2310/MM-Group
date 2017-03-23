'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('addOfficeCtrl', function ($scope, $http, $location, $rootScope) {
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
        $("#dataTables-example").append('<tr id="tr_' + row_num + '"><td><input type="hidden" id="check_row_' + row_num + '" value="yes" /><a href="#" class="fa fa-times" onclick="removeRow(' + row_num + ')"></a></td><td><input type="text" class="form-control" id="block_' + row_num + '" required /> </td><td><input type="text" class="form-control" id="size_' + row_num + '" required /></td><td><input type="text" class="form-control" id="area_' + row_num + '" required /></td><td><select id="area_unit_' + row_num + '" class="form-control"><option value="sq.Feet">sq.Feet</option><option value="sq.Yard">sq.Yard</option><option value="sq.Meters">sq.Meters</option></select></td></tr>');
        $("#imax").val(row_num);
    }
    
    $scope.addoffices = function () {
        var temp_data = "";
        var imax = $("#imax").val();
        var project_id = $("#drop_proj option:selected").val();
      
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
    }
});
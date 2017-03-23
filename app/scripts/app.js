'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
	
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });
	angular


    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
	
	//Register User
    .state('dashboard.Register',{
        templateUrl:'/app/views/Account/Register.html',
        url: '/Register'
    })
	//Change Password
    .state('dashboard.ChangePassword', {
        templateUrl: '/app/views/Account/ChangePassword.html',
        url: '/ChangePassword',
        controller: 'changePwdCtrl',
        resolve: {
           
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                      'bower_components/angular-chart.js/dist/angular-chart.min.js',
                      'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
					$ocLazyLoad.load({
					    name: 'sbAdminApp',
					    files: ['/app/scripts/controllers/ChangePwdContoller.js']
					})
            }
        }
    })
	  //Customer Add 
   .state('dashboard.AddCustomer', {
       templateUrl: '/app/views/Customer/AddCustomer.html',
       url: '/AddCustomer',
       controller: 'addcustomerCtrl',
       resolve: {
          loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'chart.js',
                  files: [
                  'bower_components/angular-chart.js/dist/angular-chart.min.js',
                  'bower_components/angular-chart.js/dist/angular-chart.css'
                  ]
              }),
                  $ocLazyLoad.load({
                      name: 'sbAdminApp',
                      files: ['/app/scripts/controllers/AddCustomer.js']
                  })
          }
      }
   })

//-----Customer Listing
    .state('dashboard.CustomerListing', {
		url: '/CustomerListing',
        templateUrl: '/app/views/Customer/CustomerListing.html',
        controller: 'customerListCtrl',
        resolve: {
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['app/scripts/controllers/CustomerListContoller.js']
                    })
            }
        }
    })
//------Edit Customer
    .state('dashboard.UpdateCustomer', {
        templateUrl: '/app/views/Customer/UpdateCustomer.html',
        url: '/UpdateCustomer',
        controller: 'editCustCtrl',
        resolve: {
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/EditCustomerContoller.js']
                    })
            }
        }
    })
	
	     //-------Add Project
    .state('dashboard.AddProject', {
        templateUrl: '/app/views/Project/AddProject.html',
        url: '/AddProject',
        controller: 'addProjCtrl',
        resolve: {
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/AddProjectContoller.js']
                    })
            }
        }
    })

    //-----Show Project
    .state('dashboard.ShowProject', {
        templateUrl: '/app/views/Project/ShowProject.html',
        url: '/ShowProject',
        controller: 'showProjCtrl',
        resolve: {
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/ShowProjectContoller.js']
                    })
            }
        }
    })

    //------Edit Project
    .state('dashboard.EditProject', {
        templateUrl: '/app/views/Project/EditProject.html',
        url: '/EditProject',
        controller: 'editProjCtrl',
        resolve: {
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/EditProjectContoller.js']
                    })
            }
        }
    })
	    //------Add Offices
    .state('dashboard.AddOffice', {
        templateUrl: '/app/views/Office/AddOffice.html',
        url: '/AddOffice',
        controller: 'addOfficeCtrl',
        resolve: {
            
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/AddOfficeContoller.js']
                    })
            }
        }
    })

    //-----Show Office
    .state('dashboard.ShowOffice', {
        templateUrl: '/app/views/Office/ShowOffice.html',
        url: '/ShowOffice',
        controller: 'showOfficeCtrl',
        resolve: {
           
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/ShowOfficeContoller.js']
                    })
            }
        }
    })

    //------Edit Office
    .state('dashboard.EditOffice', {
        templateUrl: '/app/views/Office/EditOffice.html',
        url: '/EditOffice',
        controller: 'editOfficeCtrl',
        resolve: {
           
            loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'chart.js',
                    files: [
                    'bower_components/angular-chart.js/dist/angular-chart.min.js',
                    'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['/app/scripts/controllers/EditOfficeContoller.js']
                    })
            }
        }
    })

    //Expense Add
    .state('dashboard.AddExpense', {
        templateUrl: '/app/views/Expense/AddExpense.html',
        url: '/AddExpense',
        controller: 'addexpenseCtrl',
        resolve: {
         
          loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'chart.js',
                  files: [
                  'bower_components/angular-chart.js/dist/angular-chart.min.js',
                  'bower_components/angular-chart.js/dist/angular-chart.css'
                  ]
              }),
                  $ocLazyLoad.load({
                      name: 'sbAdminApp',
                      files: ['/app/scripts/controllers/AddExpenceContoller.js']
                  })
          }
      }
    })
    //ExpenseList
          .state('dashboard.ExpenseList', {
              templateUrl: '/app/views/Expense/ExpenseList.html',
              url: '/ExpenseList',
              controller: 'expenseListCtrl',
              resolve: {
                 
                  loadMyFile: function ($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name: 'chart.js',
                          files: [
                          'bower_components/angular-chart.js/dist/angular-chart.min.js',
                          'bower_components/angular-chart.js/dist/angular-chart.css'
                          ]
                      }),
                          $ocLazyLoad.load({
                              name: 'sbAdminApp',
                              files: ['/app/scripts/controllers/ExpenseListContoller.js']
                          })
                  }
              }
          })
    // update expense
          .state('dashboard.EditExpense', {
              templateUrl: '/app/views/Expense/EditExpense.html',
              url: '/EditExpense',
              controller: 'editExpeCtrl',
              resolve: {
                 
                  loadMyFile: function ($ocLazyLoad) {
                      return $ocLazyLoad.load({
                          name: 'chart.js',
                          files: [
                          'bower_components/angular-chart.js/dist/angular-chart.min.js',
                          'bower_components/angular-chart.js/dist/angular-chart.css'
                          ]
                      }),
                          $ocLazyLoad.load({
                              name: 'sbAdminApp',
                              files: ['/app/scripts/controllers/EditExpenseContoller.js']
                          })
                  }
              }
          })
	//New Booking
    .state('dashboard.NewBooking', {
        templateUrl: '/app/views/Booking/NewBooking.html',
        url: '/NewBooking',
        controller: 'addbookingCtrl',
      resolve: {
          
          loadMyFile: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'chart.js',
                  files: [
                  'bower_components/angular-chart.js/dist/angular-chart.min.js',
                  'bower_components/angular-chart.js/dist/angular-chart.css'
                  ]
              }),
                  $ocLazyLoad.load({
                      name: 'sbAdminApp',
                      files: ['/app/scripts/controllers/BookingContoller.js']
                  })
          }
      }
    })
	
	
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'app/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'app/scripts/directives/header/header.js',
                    'app/scripts/directives/header/header-notification/header-notification.js',
                    'app/scripts/directives/sidebar/sidebar.js',
                    'app/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'app/views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'app/scripts/controllers/main.js',
              'app/scripts/directives/timeline/timeline.js',
              'app/scripts/directives/notifications/notifications.js',
              'app/scripts/directives/chat/chat.js',
              'app/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'app/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'app/views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'app/views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'app/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'app/views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'app/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'app/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'app/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'app/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'app/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'app/views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    

'use strict';

angular.module('ngfullstackApp.auth', ['ngfullstackApp.constants', 'ngfullstackApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

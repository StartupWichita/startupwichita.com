(function(angular) {
    'use strict';

    var IndexController = [
        '$scope', '$timeout', 'Global', '$http',
        function ($scope, $timeout, Global, $http) {
            $scope.global = Global;

            $scope.peopleReady = false;

            // This makes sure that the flag gets flipped on the
            // next iteration of the event loop, so that the DOM
            // has all the slides inserted before applying the
            // slider directive to it.

            $timeout(function() {
                $scope.peopleReady = true;
            }, 0);

            $http.get('/api/v1/users').then(function(users) {
                console.log(users);
            }, function(err) {
                console.log(err);
            });
            
            $scope.people = [
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                },
                {
                    fname: 'Seth2',
                    lname: 'Etter',
                    img: '/img/seth.jpg',
                    alt: 'Seth Etter, yo',
                    description: 'You know..',
                    title: 'JavaScript Dude'
                }
            ];
        }
    ];

    angular.module('startupwichita.controllers').controller('IndexController', IndexController);
})(window.angular);

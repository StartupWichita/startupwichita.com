(function(angular) {
    'use strict';

    var EventsController = [
        '$scope', '$stateParams', '$location', 'Global', 'Events',
        function ($scope, $stateParams, $location, Global, Events) {
            $scope.global = Global;

            $scope.create = function() {
                var event = new Events({
                    title: this.title,
                    content: this.content,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    address: this.address,
                    author: this.author,
                    tags: this.tags,
                    latlng: this.latlng
                });
                event.$save(function(response) {
                    $location.path('/api/v1/events/' + response._id);
                });

                this.title = '';
                this.content = '';
                this.startTime = '';
                this.endTime = '';
                this.address = '';
                this.author = '';
                this.tags = '';
                this.latlng = '';
            };

            $scope.remove = function(event) {
                if (event) {
                    event.$remove();

                    for (var i in $scope.events) {
                        if ($scope.events[i] === event) {
                            $scope.events.splice(i, 1);
                        }
                    }
                }
                else {
                    $scope.events.$remove();
                    $location.path('/api/v1/events');
                }
            };

            $scope.update = function() {
                var event = $scope.event;
                if (!event.updated) {
                    event.updated = [];
                }
                event.updated.push(new Date().getTime());

                event.$update(function() {
                    $location.path('/api/v1/events/' + event._id);
                });
            };

            $scope.find = function() {
                Events.query(function(events) {
                    $scope.events = events;
                });
            };

            $scope.findOne = function() {
                Events.get({
                    _id: $stateParams.eventId
                }, function(event) {
                    $scope.event = event;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('EventsController', EventsController);
})(window.angular);

(function(angular, Modernizr, $) {
    'use strict';

    // Get's the lat / long for a give address
    // Based on this gist https://gist.github.com/benmj/6380466
    var owlCarousel = [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                owlReady: '=',
                owlItems: '@'
            },
            template: '<div ng-transclude></div>',
            link: function(scope, element, attrs) {

                scope.$watch('owlReady', function(ready) {
                    if (ready) {
                        var options = {
                            dots: false,
                            loop: true,
                            nav: !Modernizr.touch,
                            navText: ['',''],
                            lazyLoad: true,
                            themeClass: ''
                        };

                        if (attrs.owlWidth) {
                            options.responsive = customOwlWidthSetup(attrs.owlWidth);
                        }

                        if (scope.owlItems) {
                            options.items = scope.owlItems;
                        }

                        $(element[0]).owlCarousel(options);
                    }
                });

                function customOwlWidthSetup(owlItemWidth){
                    var singleW = parseInt(owlItemWidth);
                    var itemCount = 0;
                    var itemsCustom = {};

                    while((singleW*itemCount)+1<2000){
                        var start = (singleW*itemCount) + 1;
                        var tempCount = itemCount + 1;
                        itemsCustom[start] = {
                            items: tempCount
                        };
                        itemCount++;
                    }
                    return itemsCustom;
                }
            }
        };
    }];

    angular.module('startupwichita.directives').directive('owlCarousel', owlCarousel);
})(window.angular, window.Modernizr, window.jQuery);

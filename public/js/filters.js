(function() {
    'use strict';

    // Partition Filter Credit: http://stackoverflow.com/users/1435655/m59
    // Source: http://stackoverflow.com/questions/21644493/how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap

    var PartitionFilter = function() {
        var cache = {};
        var filter = function(arr, size) {
            if (!arr) { return; }
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            var arrString = JSON.stringify(arr);
            var fromCache = cache[arrString+size];
            if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
                return fromCache;
            }
            cache[arrString+size] = newArr;
            return newArr;
        };
        return filter;
    };

    angular.module('startupwichita.filters').filter('partition', PartitionFilter);
})();

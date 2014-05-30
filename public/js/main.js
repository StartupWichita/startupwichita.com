(function(angular) {
    'use strict';

    angular.element(document).ready(function() {
        window.addEventListener('scroll', function() {
            var stickyEl  = document.getElementById('stickyBar'),
                topBuffer = document.getElementById('logoTop').offsetHeight;

            if (window.pageYOffset > topBuffer) {
                stickyEl.classList.add('navbar-fixed-top');
            } else {
                stickyEl.classList.remove('navbar-fixed-top');
            }
        });
    });
})(window.angular);

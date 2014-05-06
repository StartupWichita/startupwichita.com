(function(angular) {
    'use strict';

    angular.element(document).ready(function() {
        window.addEventListener('scroll', function() {
            'use strict';
            var stickyEl  = document.getElementById('stickyBar'),
                topBuffer = document.getElementById('logoTop').offsetHeight;

            window.pageYOffset > topBuffer ?
                stickyEl.classList.add('navbar-fixed-top') :
                stickyEl.classList.remove('navbar-fixed-top');
        });
    });
})(window.angular);

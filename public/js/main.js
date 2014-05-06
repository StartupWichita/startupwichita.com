var stickyEl= document.getElementById('stickyBar');
window.addEventListener('scroll', function() {
  'use strict';
  var topBuffer = document.getElementById('logoTop').offsetHeight; 

  window.pageYOffset > topBuffer ?
    stickyEl.classList.add('navbar-fixed-top') : 
    stickyEl.classList.remove('navbar-fixed-top');
});

var stickyEl= document.getElementById('stickyBar')
window.addEventListener('scroll', function() {
  var topBuffer = document.getElementById('logoTop').offsetHeight; 

  window.pageYOffset > topBuffer ?
    stickyEl.classList.add('navbar-fixed-top') : 
    stickyEl.classList.remove('navbar-fixed-top');
});

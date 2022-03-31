
  let header = document.getElementById('navBar');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
      navBar.classList.add('bg-dark', 'shadow');
    } else {
      navBar.classList.remove('bg-dark', 'shadow');
    }
  });

document.addEventListener("DOMContentLoaded", function() {
    var header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('fixed-header');
        } else {
            header.classList.remove('fixed-header');
        }
    });
});

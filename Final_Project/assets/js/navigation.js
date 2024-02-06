const nav = document.querySelector('.navigation');

const navOffsetTop = nav.offsetTop;

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= navOffsetTop) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

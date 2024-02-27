//Count number

document.addEventListener('DOMContentLoaded', function() {
    let count = 0;

    window.addEventListener('scroll', function() {
        if (count === 0) {
            let targetElement = document.getElementById('target');
            let targetPosition = targetElement.getBoundingClientRect().top;
            let viewHeight = window.innerHeight;

            if (targetPosition < viewHeight) {
                count = 1;
                for (let i = 1; i <= 23; i++) {
                    setTimeout(function() {
                        document.getElementById('number-23').innerHTML = i + "K";
                    }, i * (1000 / 23)); 
                }
                for (let i = 1; i <= 10; i++) {
                    setTimeout(function() {
                        document.getElementById('number-10').innerHTML = i + "M";
                    }, i * (1000 / 10)); 
                }
                for (let i = 1; i <= 9; i++) {
                    setTimeout(function() {
                        document.getElementById('number-9').innerHTML = i + "M";
                    }, i * (1000 / 9)); 
                }
                for (let i = 1; i <= 12; i++) {
                    setTimeout(function() {
                        document.getElementById('number-12').innerHTML = i + "K";
                    }, i * (1000 / 12)); 
                }
            }
        }
    });
    window.addEventListener('beforeunload', function() {
        count = 0;
    });
});

//Fixed navigation

window.addEventListener('scroll', function() {
    let targetElement = document.getElementById('nav');
    let scrollPosition = window.scrollY;
    if (scrollPosition >= 500) {
        targetElement.style.top = '0';
        targetElement.style.position = 'fixed';
        targetElement.style.zIndex = '2';
    }
    else
    {
        targetElement.style.top = '-20%';
    }
});


// Scroll to Top
    window.addEventListener('scroll', function() {
    var scrollToTopButton = document.getElementById('scrollToTop');
    
    if (window.scrollY > 500) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

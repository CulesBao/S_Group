document.addEventListener('DOMContentLoaded', function() {
    let count = 0;

    window.addEventListener('scroll', function() {
        if (count === 0) {
            let targetElement = document.getElementById('target');
            let targetPosition = targetElement.getBoundingClientRect().top;
            let viewHeight = window.innerHeight;

            if (targetPosition < viewHeight) {
                count = 1;

                // Hiển thị số i + "K" mỗi giây cho số 23
                for (let i = 1; i <= 23; i++) {
                    setTimeout(function() {
                        document.getElementById('number-23').innerHTML = i + "K";
                    }, i * (1000 / 23)); 
                }

                // Hiển thị số i + "M" mỗi giây cho số 10
                for (let i = 1; i <= 10; i++) {
                    setTimeout(function() {
                        document.getElementById('number-10').innerHTML = i + "M";
                    }, i * (1000 / 10)); 
                }

                // Hiển thị số i + "M" mỗi giây cho số 9
                for (let i = 1; i <= 9; i++) {
                    setTimeout(function() {
                        document.getElementById('number-9').innerHTML = i + "M";
                    }, i * (1000 / 9)); 
                }

                // Hiển thị số i + "K" mỗi giây cho số 12
                for (let i = 1; i <= 12; i++) {
                    setTimeout(function() {
                        document.getElementById('number-12').innerHTML = i + "K";
                    }, i * (1000 / 12)); 
                }
            }
        }
    });

    // Thiết lập biến count về lại 0 khi trang được làm mới
    window.addEventListener('beforeunload', function() {
        count = 0;
    });
});

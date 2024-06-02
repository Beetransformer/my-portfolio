document.addEventListener("DOMContentLoaded", function () {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    if (menuBar && sidebar) {
        menuBar.addEventListener('click', function () {
            sidebar.classList.toggle('hide');
        });
    }

    // Function for smooth scrolling
    function smoothScroll(target, duration) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        let additionalOffset = 0;

        
        if (target.id !== 'home') {
            additionalOffset = 50; 
        }

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - additionalOffset;
        const startPosition = window.pageYOffset;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('.nav-link').forEach(nav => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                smoothScroll(targetSection, 1000); 
            }
        });
    });

    
    window.addEventListener('hashchange', function () {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        window.scrollTo(window.scrollX, window.scrollY - navbarHeight);
    });

    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button');
    const searchForm = document.querySelector('#content nav form');

    if (searchButton && searchButtonIcon && searchForm) {
        searchButton.addEventListener('click', function (e) {
            if (window.innerWidth < 576) {
                e.preventDefault();
                searchForm.classList.toggle('show');

                if (searchForm.classList.contains('show')) {
                    searchButtonIcon.classList.replace('bx-search', 'bx-x');
                } else {
                    searchButtonIcon.classList.replace('bx-x', 'bx-search');
                }
            }
        });
    }

    if (window.innerWidth < 786) {
        if (sidebar) sidebar.classList.add('hide');
    } else if (window.innerWidth < 576) {
        if (searchButtonIcon) searchButtonIcon.classList.replace('bx-search', 'bx-x');
        if (searchForm) searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function (e) {
        if (this.innerWidth < 576) {
            if (searchButtonIcon) searchButtonIcon.classList.replace('bx-x', 'bx-search');
            if (searchForm) searchForm.classList.remove('show');
        }
    });
});

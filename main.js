$(document).ready(function () {
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70,
        }, 500, 'linear');
    });

    let lastScrollTop = 0;
    let header = $('header');

    $(window).scroll(function () {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScrollTop && currentScroll > 70) {
            header.slideUp(200);
        } else {
            header.slideDown(200);
        }

        lastScrollTop = currentScroll;
    });
});

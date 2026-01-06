
$(document).ready(function () {
    let currentIndex = 1;
    const slides = $('.slide');
    const dots = $('.dot');
    
    function updateSlider() {
        slides.removeClass('active');
        dots.removeClass('active');
        slides.eq(currentIndex).addClass('active');
        dots.eq(currentIndex).addClass('active');
        slides.eq(currentIndex - 1).css('opacity', '0.4');
        slides.eq(currentIndex + 1).css('opacity', '0.4');
    }
    updateSlider();
    setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 4000);
    dots.on('click', function() {
        currentIndex = $(this).index();
        updateSlider();
    });
    slides.on('click', function() {
        currentIndex = $(this).index();
        updateSlider();
    });
    
    /* ===== Smooth scroll ===== */
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    /* ===== Animation des cartes secrets ===== */
    $(window).scroll(function() {
        $('.secret-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('show');
            }
        });
    });
    
    $(window).scroll();
});





// Détection tactile
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

if (isTouchDevice) {

    $('.secret-card').off('hover');
    $('body').addClass('touch-device');
    
    $('.slide').on('touchstart', function() {
        $(this).addClass('touch-active');
    }).on('touchend', function() {
        $(this).removeClass('touch-active');
    });
}


let resizeTimer;
$(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (typeof updateSlider === 'function') {
            updateSlider();
        }
    }, 250);
});
$('.secrets-btn, .btn-primary, .slider-nav').on('touchstart', function(e) {
    e.preventDefault();
    $(this).addClass('active');
}).on('touchend', function() {
    $(this).removeClass('active');
});
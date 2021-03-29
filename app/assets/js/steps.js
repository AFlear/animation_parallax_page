import $ from "jquery";

export default function Steps() {
    // Slides
    let currentSlide, previousSlide, nextSlide;
    // Slides animation properties
    let opacity, left, scale;
    // Check if the slide animation is happening (BUG fix)
    let inTransition = false;
    // Bootstrap design
    /** Click functions **/
    // Previous button

    $('.steps__item').on('click', (e) => {
        const target = $(e.target);
        const current = $('.steps__list').find('.current');
        const prev = current.prev();
        const next = current.next();
        if (target.data('step') && current.data('step')) {
            if ((target.data('step') > current.data('step'))) {
                current.removeClass('current');
                setTimeout(function () {
                    current.addClass('success');
                }, 0);
                next.addClass('current');
                nextSlideFn()
            } else {
                if (target.data('step') !== current.data('step')) {
                    current.removeClass('current');
                    prev.removeClass('success');
                    prev.addClass('current');
                    prevSlideFn();
                }
            }
        }

    })

    function nextSlideFn() {
        inTransition = true;
        currentSlide = $('.current-slide');
        nextSlide = currentSlide.next();

        nextSlide.show();
        currentSlide.animate({opacity: 0}, {
            step: function (now, mix) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 100) + '%';
                opacity = 1 - now;
                currentSlide.css({
                    '-webkit-transform': 'scale(' + scale + ')',
                    '-ms-transform': 'scale(' + scale + ')',
                    'transform': 'scale(' + scale + ')'
                });
                nextSlide.css({
                    '-webkit-transform': 'translateX(' + left + ')',
                    '-ms-transform': 'translateX(' + left + ')',
                    'transform': 'translateX(' + left + ')',
                    'opacity': opacity
                });
            },
            duration: 250,
            complete: function () {
                currentSlide.hide();
                currentSlide.removeClass('current-slide');
                nextSlide.addClass('current-slide');
                nextSlide.css({'position': 'relative'});
                inTransition = false;
            },
            easing: 'linear'
        });
    }

    function prevSlideFn() {
        inTransition = true;
        currentSlide = $('.current-slide');
        previousSlide = currentSlide.prev();

        previousSlide.show();
        currentSlide.css({'position': 'absolute'});
        currentSlide.animate({opacity: 0}, {
            step: function (now, mix) {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1 - now) * 50) + '%';
                opacity = 1 - now;
                currentSlide.css({
                    '-webkit-transform': 'translateX(' + left + ')',
                    '-ms-transform': 'translateX(' + left + ')',
                    'transform': 'translateX(' + left + ')'
                });
                previousSlide.css({
                    '-webkit-transform': 'scale(' + scale + ')',
                    '-ms-transform': 'scale(' + scale + ')',
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 250,
            complete: function () {
                currentSlide.hide();
                currentSlide.removeClass('current-slide');
                previousSlide.addClass('current-slide');
                previousSlide.css({'position': 'relative'});
                inTransition = false;
            },
            easing: 'linear'
        });
    }
}

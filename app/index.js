import './assets/styles/theme.scss';
import Parallax from 'parallax-js';
import $ from 'jquery';
import Popper from 'popper.js';
import 'slick-carousel';
import Select2 from "./assets/js/select2";
import bootstrapMaterialDesign from 'material-kit'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

global.jQuery = $;
global.$ = $;

function Parallaxy() {
    return $('.js-parallax').map((id, background) => new Parallax(background));
}

if ($(window).width() > 1200) {
    Parallaxy();
}


Select2.init('.js-select2-flags', 'flags');
Select2.init('.js-select2-calculator ', 'calculator');
const calcInput = $('#calculator-input');

$('.js-init[data-slick]').each((i, sliderNode) => {
    let $slider = $(sliderNode);
    let presets = {
        // 'main': {
        //     dots: true,
        //     initialSlide: 2,
        //     fade: false,
        //     appendDots: '.main-slider__dots'
        // },
        'review': {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            fade: false,
            initialSlide: 1,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }

            }]
        }
    };
    let preset = presets[$slider.data('preset')] || {};
    $slider.slick($.extend({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    }, preset));
});

function Steps() {
    // Slides
    var currentSlide, previousSlide, nextSlide;
    // Slides animation properties
    var opacity, left, scale;
    // Check if the slide animation is happening (BUG fix)
    var inTransition = false;
    // Bootstrap design
    /** Click functions **/
    // Previous button
    $('#prev-button').click(function(e) {
        if (inTransition) { return; }

        // Current & previous step
        var current = $('.steps__list').find('.current');
        var prev = current.prev();
        // Refresh current step
        if(current && prev && prev.length > 0) {
            current.removeClass('current');
            prev.removeClass('success');
            prev.addClass('current');

            // Show prev slide
            prevSlideFn();
        }
    });
    // Next button
    $('#next-button').click(function(e) {
        if (inTransition) { return; }

        var current = $('.steps__list').find('.current');
        var next = current.next();

        // Current to success
        current.removeClass('current');
        // Timeout giving time to the animation to render
        setTimeout(function() { current.addClass('success'); }, 0);

        // Disabled to current
        if(next && next.length > 0) {
            next.addClass('current');
            // Show next slide
            nextSlideFn();
        }
    });

    function nextSlideFn() {
        inTransition = true;
        currentSlide = $('.current-slide');
        nextSlide = currentSlide.next();

        nextSlide.show();
        currentSlide.animate({opacity: 0}, {
            step: function(now, mix) {
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
                    'opacity': opacity});
            },
            duration: 250,
            complete: function() {
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
            step: function(now, mix) {
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
            complete: function() {
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

Steps();

function incDecNumber(element, input) {
    const oldValue = parseInt(input.val(), 10);
    const min = parseInt(input.attr('data-min'), 10);
    const max = parseInt(input.attr('data-max'), 10);
    const baseValue = parseInt(input.attr('data-default'), 10);
    let newVal = 0;

    if (parseInt(input.val(), 10)
        && parseInt(input.val(), 10) <= max
        && parseInt(input.val(), 10) >= min
    ) {
        if (element) {
            if (element.attr('id') === 'inc-number') {
                if (oldValue < max) {
                    newVal = oldValue + 1;
                } else {
                    newVal = max;
                }
            } else if (oldValue <= min) {
                newVal = min;
            } else {
                newVal = oldValue - 1;
            }
            input.val(newVal);
        }
    } else {
        if (parseInt(input.val(), 10) > max) {
            input.val(max);
        }
        if (parseInt(input.val(), 10) < min) {
            input.val(min);
        }
        if (!parseInt(input.val(), 10)) {
            input.val(baseValue);
        }
    }
}

$('#inc-number, #dec-number').on('click', function buttonHandler() {
    incDecNumber($(this), calcInput);
})

$('#calculator-procced').on('click', () => {
    console.log(`{
        Colors: ${$('#calculator-colors').val()};
        Size: ${$('#calculator-size').val()};
        NumberOf: ${calcInput.val()};
        Date: ${$('#calculator-calendar').val()};
        City: ${$('#calculator-city').val()};
        Delivery: ${$('#calculator-delivery').val()};
    }`);
})
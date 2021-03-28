import './assets/styles/theme.scss';
import Parallax from 'parallax-js';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'slick-carousel';
import Select2 from "./assets/js/select2";


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
        'main': {
            dots: true,
            initialSlide: 2,
            fade: false,
            customPaging: function (slider, i) {
                return '<div class="dots__item"><div class="dots__item--number">' + ($(slider.$slides[i]).data('slick-index') + 1) + '</div>' +
                    '<p class="p2">Step' + ($(slider.$slides[i]).data('slick-index') + 1) + '</p></div>';
            },
            appendDots: '.main-slider__dots'
        },
        'text-reviews': {
            asNavFor: '[data-slick][data-sync="video-reviews"]',
            initialSlide: 3,
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
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: true
    }, preset));
});
// $('#slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
//     slick.$slides.map((slide) => {
//         if (slick.$slides[slide] < currentSlide) {
//             $(slick.$slides[slide]).addClass('previous');
//         } else {
//             $(slick.$slides[slide]).removeClass('previous')
//         }
//     })
//     console.log(currentSlide, $('.main-slider__slide'));
// });

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
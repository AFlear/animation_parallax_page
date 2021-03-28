import './assets/styles/theme.scss';
import Parallax from 'parallax-js';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'slick-carousel';
import './assets/js/select2';
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

$('.js-init[data-slick]').each((i, sliderNode) => {
    let $slider = $(sliderNode);
    let presets = {
        'main': {
            dots: true,
            fade: false,
            customPaging: function(slider, i) {
                console.log(slider, i)
                return '<div class="dots__item"><div class="dots__item--number">' + ($(slider.$slides[i]).data('slick-index') + 1)  + '</div>' +
                    '<p class="p2">Step' + ($(slider.$slides[i]).data('slick-index') + 1) + '</p></div>';
            },
            appendDots: '.main-slider__dots'
        },
        'text-reviews': {
            asNavFor: '[data-slick][data-sync="video-reviews"]',
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
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: true
    }, preset));
});

console.log('Boilerplate is working!');
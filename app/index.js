import './assets/styles/theme.scss';
import Parallax from 'parallax-js';
import $ from 'jquery';
import bootstrap from 'bootstrap';
import 'slick-carousel';

global.jQuery = $;
global.$ = $;

function Parallaxy() {
    return $('.js-parallax').map((id, background) => new Parallax(background));
}

if ($(window).width() > 1200) {
    Parallaxy();
}
var tabEl = document.querySelector('button[data-bs-toggle="tab"]')
tabEl.addEventListener('shown.bs.tab', function (event) {
    event.target // newly activated tab
    event.relatedTarget // previous active tab
})

$('.js-init[data-slick]').each((i, sliderNode) => {
    let $slider = $(sliderNode);
    let presets = {
        'main': {
            dots: true,
            fade: true,
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
        mobileFirst: true
    }, preset));
});

console.log('Boilerplate is working!');
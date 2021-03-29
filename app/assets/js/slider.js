import $ from "jquery";
export default function Slider()  {
return $('.js-init[data-slick]').each((i, sliderNode) => {
    let $slider = $(sliderNode);
    let presets = {
        'review': {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            fade: false,
            initialSlide: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerMode: true,
                        variableWidth: true,
                        mobileFirst: true,
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                ]
        }
    };
    let preset = presets[$slider.data('preset')] || {};
    $slider.slick($.extend({
        arrows: false,
    }, preset));
});
}
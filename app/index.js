import './assets/styles/theme.scss';
import Parallax from 'parallax-js';
import $ from 'jquery';
import Popper from 'popper.js';
import 'slick-carousel';
import Select2 from "./assets/js/select2";
import bootstrapMaterialDesign from 'material-kit'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import Steps from './assets/js/steps';
import incDecNumber from './assets/js/incDecNumber';
import Slider from './assets/js/slider'
import moment from "moment";
global.jQuery = $;
global.$ = $;

const calcInput = $('#calculator-input');



if ($(window).width() > 1200) {
    $('.js-parallax').map((id, background) => new Parallax(background));
}

Select2.init('.js-select2-flags', 'flags');
Select2.init('.js-select2-calculator', 'calculator');
$('.js-select2-calculator').parent().find('.select2-container').addClass('calculator-select')



Steps();
Slider();

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

$(".input--date").on("change", function() {
    this.setAttribute(
        "data-date",
        moment(this.value, "YYYY-MM-DD")
            .format( this.getAttribute("data-date-format") )
    )
}).trigger("change")


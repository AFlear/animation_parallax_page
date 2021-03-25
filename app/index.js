import './assets/styles/theme.scss';
import Parallax from 'parallax-js';
import $ from 'jquery';

global.jQuery = $;
global.$ = $;

function Parallaxy() {
    return $('.js-parallax').map((id, background) => new Parallax(background));
}


Parallaxy();


console.log('Boilerplate is working!');
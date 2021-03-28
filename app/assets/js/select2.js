import 'select2/dist/js/select2.full.min';


const Select2 = (() => {
    function toggleSelect2(selector, type) {
        const $elem = $(selector);
        const customStyle = $elem.data('style');
        switch (type) {
            case 'flags':
                $elem.select2({
                    containerCssClass: `select2-flags-container ${customStyle} `,
                    dropdownCssClass: 'select2-flags-dropdown',
                });
                break;
            case 'calculator':
                $elem.select2({
                    containerCssClass: `select2-calculator-container ${customStyle} `,
                    dropdownCssClass: 'select2-calculator-dropdown',
                });
                break;
            default:
                break;

        }
    }

    return {
        init(selector, type) {
            $(selector).each((id, elem) => {
                toggleSelect2(elem, type);
            });
        },
    };
})();
export default Select2;

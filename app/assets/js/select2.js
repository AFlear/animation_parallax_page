import 'select2/dist/js/select2.full.min';


const formatFlagsState = (state) => {

  return $(
      `<span><span class="d-none">${state.text}</span></span>`,
  );
};

const Select2 = (() => {
  function toggleSelect2(selector, type) {
    const $elem = $(selector);
    const customStyle = $elem.data('style');
        $elem.select2({
          containerCssClass: `select2-flags-container ${customStyle} `,
          dropdownCssClass: 'select2-flags-dropdown',
        });
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

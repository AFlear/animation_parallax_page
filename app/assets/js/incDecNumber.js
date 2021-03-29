export default function incDecNumber(element, input) {
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

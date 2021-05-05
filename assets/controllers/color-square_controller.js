import {Controller} from 'stimulus';

export default class extends Controller {
    static targets  = ['colorSquare', 'select'];
    static values   = {
        colorId: Number
    };

    connect() {
        this.selectTarget.classList.add('d-none');
    }

    selectColor(event) {
        const clickedColor = event.currentTarget.dataset.colorId;

        this.colorIdValue = clickedColor == this.colorIdValue ? null : clickedColor
    }

    colorIdValueChanged() {
        // callback by _cart_add_controls.html.twig who change colorId value
        this.selectTarget.value = this.colorIdValue;

        this.colorSquareTargets.forEach((element) => {
            // "==" cause we compare string with number (colorIdValue)
            if (element.dataset.colorId == this.colorIdValue) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
        });
    }
}
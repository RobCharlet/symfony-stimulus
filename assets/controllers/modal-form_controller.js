import {Controller} from 'stimulus';
import {Modal}      from 'bootstrap';
import $            from 'jquery';
import {useDispatch} from 'stimulus-use';

export default class extends Controller {
    static targets = ['modal', 'modalBody'];
    static values  = {
        formUrl: String
    };
    modal = null;

    connect() {
        useDispatch(this, {debug: true});
    }

    async openModal(event) {
        this.modalBodyTarget.innerHTML = 'Loading...';

        this.modal = new Modal(this.modalTarget);
        this.modal.show();

        this.modalBodyTarget.innerHTML = await $.ajax({
                url : this.formUrlValue,
                data: {
                    ajax: 1
                }
            }
        );
    }

    async submitForm(event) {
        event.preventDefault();
        const $form = $(this.modalBodyTarget).find('form');

        try {
            await $.ajax({
                // aucune action n'est définie sur le formulaire
                // car on POST sur la même URL
                url   : this.formUrlValue,
                method: $form.prop('method'),
                data  : `ajax=1&${$form.serialize()}`
            });
            this.modal.hide();
            this.dispatch('success');
        }
        catch (e) {
            this.modalBodyTarget.innerHTML = e.responseText;
        }

    }

    modalHidden() {
        console.log("It was hidden");
    }
}
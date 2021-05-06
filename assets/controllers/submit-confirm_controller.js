import {Controller} from 'stimulus';
import Swal                       from 'sweetalert2';
import {useDispatch, UseDispatch} from 'stimulus-use/dist/use-dispatch/use-dispatch';

export default class extends Controller {
    static values = {
        title            : String,
        text             : String,
        icon             : String,
        confirmButtonText: String,
        submitAsync      : Boolean
    };

    connect() {
        useDispatch(this)
    }

    onSubmit(event) {
        event.preventDefault();
        Swal.fire({
            title              : this.titleValue || null,
            text               : this.textValue || null,
            icon               : this.iconValue || null,
            showCancelButton   : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor  : '#d33',
            confirmButtonText  : this.confirmButtonTextValue || null,
            showLoaderOnConfirm: true,
            preConfirm         : () => {
                //return for sweetalert to wait response
                // before closing
                return this.submitForm();
            }
        });
    }

    async submitForm() {
        if (!this.submitAsyncValue) {
            this.element.submit();
            return;
        }

        const response = await fetch(this.element.action, {
            method: this.element.method,
            body  : new URLSearchParams(new FormData(this.element))
        });

        this.dispatch('async:submitted', {
            response,
        })
    }
}
import {Controller} from 'stimulus';

export default class extends Controller {
    static values = {
        url: String
    };

    static targets = ['result'];

    async onSearchInput(event) {
        const params = new URLSearchParams({
            q      : event.currentTarget.value,
            preview: 1
        });
        console.log(params.toString());
        const response = await fetch(`${this.urlValue}?${params.toString()}`);
        this.resultTarget.innerHTML = await response.text();
    }
}

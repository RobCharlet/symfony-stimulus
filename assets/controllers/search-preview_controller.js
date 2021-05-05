import {Controller}      from 'stimulus';
import {useClickOutside} from 'stimulus-use';
import {useDebounce}     from 'stimulus-use';

export default class extends Controller {
    static values = {
        url: String
    };

    static targets = ['result'];

    static debounces = ['search']

    connect() {
        useClickOutside(this);
        useDebounce(this);
    }

    onSearchInput(event) {
        this.search(event.currentTarget.value)
    }

    // debounce only work with functions we call herself
    // browser call onSearchInput() and prevent debounce
    // from working simultaneously
    async search(query) {
        const params = new URLSearchParams({
            q      : query,
            preview: 1
        });
        const response              = await fetch(`${this.urlValue}?${params.toString()}`);
        this.resultTarget.innerHTML = await response.text();
    }

    clickOutside(event) {
        // example to close a modal
        this.resultTarget.innerHTML = '';
    }
}

import { Controller } from 'stimulus';

export default class extends Controller {
    count = 0;
    static targets = ['count'];


    connect() {
        this.count = 0;
    }

    increment() {
        this.count++;
        this.countTarget.innerHTML = this.count;
    }
}
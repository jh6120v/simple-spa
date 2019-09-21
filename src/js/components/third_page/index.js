import component from '../../core/component';
import { htmlToCanvas, inputTowWayBinding } from '../../helper/utils';

export default class Index extends component {
    constructor() {
        super();

        const self = this;

        self.setTemplate('third_page');
    }

    async beforeRender() {
        console.log('third before render.');
    }

    async afterRender() {
        console.log('third after render.');
        let message;

        if (window.localStorage) {
            message = localStorage.getItem('message-3') || '給我錢錢！！';
        } else {
            message = '給我錢錢！！';
        }

        inputTowWayBinding(document.querySelector('.dialog-input'), (value) => {
            let text;
            if (typeof value === 'undefined' || value === '') {
                text = '給我錢錢！！';
            } else {
                text = value;
            }

            if (window.localStorage) {
                localStorage.setItem('message-3', value);
            }

            document.querySelector('.dialog').innerText = text;
        }, message);

        htmlToCanvas(document.querySelector('.show-img-3'), 'BugCat');
    }
}

import component from '../../core/component';
import { htmlToCanvas, inputTowWayBinding } from '../../helper/utils';

export default class Index extends component {
    constructor() {
        super();

        const self = this;

        self.setTemplate('second_page');
    }

    async beforeRender() {
        console.log('second before render.');
    }

    async afterRender() {
        console.log('second after render.');
        let message;

        if (window.localStorage) {
            message = localStorage.getItem('message-2') || '可以幫幫我嗎？';
        } else {
            message = '可以幫幫我嗎？';
        }

        inputTowWayBinding(document.querySelector('.dialog-input'), (value) => {
            let text;
            if (typeof value === 'undefined' || value === '') {
                text = '可以幫幫我嗎？';
            } else {
                text = value;
            }

            if (window.localStorage) {
                localStorage.setItem('message-2', value);
            }

            document.querySelector('.dialog').innerText = text;
        }, message);

        htmlToCanvas(document.querySelector('.show-img-2'), 'BugCat');
    }
}

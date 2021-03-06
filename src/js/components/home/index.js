import component from '../../core/component';
import { htmlToCanvas, inputTowWayBinding } from '../../helper/utils';

export default class Index extends component {
    constructor() {
        super();

        const self = this;

        self.setTemplate('home');
    }

    async beforeRender() {
        console.log('home before render.');
    }

    async afterRender() {
        console.log('home after render.');
        let message;

        if (window.localStorage) {
            message = localStorage.getItem('message-1') || '真的好棒棒啊！';
        } else {
            message = '真的好棒棒啊！';
        }

        inputTowWayBinding(document.querySelector('.dialog-input'), (value) => {
            let text;
            if (typeof value === 'undefined' || value === '') {
                text = '真的好棒棒啊！';
            } else {
                text = value;
            }

            if (window.localStorage) {
                localStorage.setItem('message-1', value);
            }

            document.querySelector('.dialog').innerText = text;
        }, message);

        htmlToCanvas(document.querySelector('.show-img-1'), 'BugCat');
    }
}

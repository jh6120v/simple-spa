import component from '../../core/component';

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
    }
}
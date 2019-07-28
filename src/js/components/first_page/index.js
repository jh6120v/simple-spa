import component from '../../core/component';

export default class Index extends component {
    constructor() {
        super();

        const self = this;

        self.setTemplate('first_page');
    }

    async beforeRender() {
        console.log('first before render.');
    }

    async afterRender() {
        console.log('first after render.');
    }
}

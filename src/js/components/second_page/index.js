import component from '../../core/component';

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
    }
}

import component from "../../core/component";

export default class Home extends component {
    template = 'home/home';

    async beforeRender() {
        console.log('home before render.');
    }

    async afterRender() {
        console.log('home after render.');
    }
}
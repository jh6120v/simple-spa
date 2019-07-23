import Component from "../core/component";

export default class Container extends Component {
    template = 'container';

    async beforeRender() {
        console.log('before render.');
    }
}
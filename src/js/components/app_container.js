import Component from '../core/component';
import helper from '../helper/dom_helper';
import { navigate } from '../core/router';

export default class AppContainer extends Component {
    constructor() {
        super();

        this.setTemplate('app_container');
    }

    async afterRender() {
        const delegate = await import('delegate');

        await new delegate.default('#app', '.nav', 'click', ((e) => {
            e.preventDefault();

            const url = helper.getElement(e.delegateTarget).data('href');
            if (url) {
                navigate(url);
            } else {
                window.location.href = e.delegateTarget.href;
            }
        }));
    }
}

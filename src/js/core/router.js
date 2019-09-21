import { clearUrlSlashes, getUrlFragment } from '../helper/url_helper';
import routes from './router_config';
import { store } from '../store';
import helper from '../helper/dom_helper';

class Router {
    options = {
        routes: []
    };

    routes = new Map();

    scope = 'Router';

    referrerUrl = null;

    constructor(opt = {}) {
        const self = this;

        // merge option
        self.options = Object.assign({}, self.options, opt);

        for (const route of self.options.routes.values()) {
            self.routes.set(route.path, route);
        }

        return self;
    }

    add(route) {
        let routeSetting = {
            path: null,
            component: null
        };

        if (typeof route === 'object') {
            if (route.path !== null && typeof route.path !== 'string') {
                throw new Error('route path error.');
            }

            if (route.component !== null && typeof route.component !== 'string') {
                throw new Error('route component error.');
            }

            routeSetting = Object.assign({}, routeSetting, route);
        } else {
            throw new Error('route setting must be set.');
        }

        this.routes.set(routeSetting.path, routeSetting);

        return this;
    }

    remove(path) {
        this.routes.delete(path);

        return this;
    }

    flush() {
        this.routes = new Map();

        return this;
    }

    listen() {
        const self = this;

        function func(history) {
            const { pushState } = history;
            history.pushState = (...argv) => {
                if (typeof history.onpushstate === 'function') {
                    history.onpushstate({
                        referrer: window.location.pathname,
                        navigate: argv[2]
                    });
                }
                // whatever else you want to do
                // console.log(state);
                // maybe call onhashchange e.handler
                return pushState.apply(history, argv);
            };
        }

        func(window.history);

        window.history.onpushstate = (e) => {
            console.log(e.navigate, e.state);
            const path = getUrlFragment(e.state || e.navigate);
            if (self.routes.has(path)) {
                self.execute(path, e.referrer);
            }
        };

        window.onpopstate = window.history.onpushstate;

        this.navigateLinkSetting();

        // 第一次執行
        self.execute(getUrlFragment());
    }

    execute(path, referrer = null) {
        const self = this;

        if (typeof self.routes.get(path).navigate !== 'undefined') {
            navigate(self.routes.get(path).navigate);

            return;
        }

        import(`../components/${self.routes.get(path).component}`).then(async (Component) => {
            if (referrer !== null) {
                self.referrerUrl = referrer;
            }

            const App = await new Component.default();

            App.scope = self.scope;

            await App.process();

            store.first_render = await false;
        });
    }

    navigateLinkSetting() {
        import('delegate').then((Delegate) => {
            const d = new Delegate.default('#app', '.nav', 'click', ((e) => {
                e.preventDefault();

                const url = helper.getElement(e.delegateTarget)
                    .data('href');
                if (url) {
                    navigate(url);
                } else {
                    window.location.href = e.delegateTarget.href;
                }
            }));

            return d;
        });
    }
}

export function navigate(path) {
    window.history.pushState(path, null, clearUrlSlashes(path));
}

export const router = new Router({
    routes
});

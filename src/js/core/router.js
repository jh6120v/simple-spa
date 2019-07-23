import {clearUrlSlashes, getUrlFragment} from "../helper/url-helper";
import {routes} from "./router-config";
import {store} from "../store";

class Router {
    options = {
        routes: []
    };

    routes = new Map();
    scope = "Router";
    referrer_url = null;

    constructor(opt = {}) {
        let _this = this;

        // merge option
        _this.options = Object.assign({}, _this.options, opt);

        for (let route of _this.options.routes.values()) {
            _this.routes.set(route.path, route);
        }

        return _this;
    }

    add(route) {
        let _this = this;
        let routeSetting = {
            path: null,
            component: null
        };

        if (typeof route === "object") {
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

        _this.routes.set(routeSetting.path, routeSetting);

        return _this;
    }

    remove(path) {
        let _this = this;

        _this.routes.delete(path);

        return _this;
    }

    flush() {
        let _this = this;

        _this.routes = new Map();

        return _this;
    }

    listen() {
        let _this = this;

        (function (history) {
            let replaceState = history.replaceState;
            history.replaceState = function (state) {
                if (typeof history.onreplacestate === "function") {
                    history.onreplacestate({referrer: location.pathname, path: state});
                }
                // whatever else you want to do
                // console.log(state);
                // maybe call onhashchange e.handler
                return replaceState.apply(history, arguments);
            }
        })(window.history);

        window.onpopstate = history.onreplacestate = function (e) {
            let path = getUrlFragment(e.path);
            if (_this.routes.has(path) && path !== location.pathname) {
                _this.execute(path, e.referrer);
            }
        };

        // 第一次執行
        _this.execute(getUrlFragment());
    }

    execute(path, referrer = null) {
        let _this = this;
        console.log(_this.routes.get(path).component);

        import(`../component/${_this.routes.get(path).component}`).then(async component => {
            if (referrer !== null) {
                _this.referrer_url = referrer;
            }

            const App = await new component.default();

            App.scope = _this.scope;

            await App.process();

            store.first_render = await false;
        });
    }
}

export function navigate(path) {
    window.history.replaceState(path, null, clearUrlSlashes(path));
}

export const router = new Router({
    routes
});
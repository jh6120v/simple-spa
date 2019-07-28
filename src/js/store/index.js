// configure your custom store
export function configureStore(initialState = {}) {
    return Object.assign({}, {
        proxy: {}
    }, initialState);
}

// use proxy
export function createProxyState(state, callback) {
    return new Proxy(state, {
        get(target, property) {
            return target[property];
        },
        set(target, property, value) {
            target[property] = value; // default set behaviour

            callback();

            return true;
        }
    });
}

export const store = configureStore();

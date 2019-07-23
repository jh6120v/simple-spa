export function ConfigureStore(initialState = {}) {
    return Object.assign({}, {
        proxy: {}
    }, initialState);
}

export function createProxyState(state, callback) {
    return new Proxy(state, {
        get(target, property, value) {
            return target[property];
        },
        set(target, property, value) {
            target[property] = value; // default set behaviour

            callback();

            return true;
        }
    });
}

export const store = ConfigureStore({
    first_render: true
});
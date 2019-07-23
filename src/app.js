import "@babel/polyfill";
import {store} from './js/store';
import {router} from "./js/core/router";
import {SimpleSpa} from "./js/core/simple-spa";

try {
    new SimpleSpa(
        store,
        router,
        'container'
    ).$mount('#app');
} catch (e) {
    console.log(e);
}
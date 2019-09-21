import '@babel/polyfill';
import { store } from './js/store';
import { router } from './js/core/router';
import SimpleSpa from './js/core/simple_spa';
import './assets/sass/style.scss';

try {
    new SimpleSpa(
        store,
        router,
        'app_container'
    ).$mount('#app');
} catch (e) {
    console.log(e);
}

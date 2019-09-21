# Simple-spa
A simple native javascript spa framework

use eslint Airbnb config base to check code style

### Demo
https://simple-spa.dailyofjames.com/

### Installing
```
npm install
```

### Usage
Dev mode, use webpack-dev-server to run 
```
npm run dev
```
Production mode
```
npm run prod
```

### Example
configure custom store, path: ./src/store/index.js 
```
export const store = configureStore({
    mySetting: 'simple-spa',
    config: {
        a: 'a',
        b: 'b'
    }
});
```

configure route, path: ./src/core/router_config.js
```
const routes = [
    {
        path: '/',
        component: 'home'
    },
    {
        path: '/first',
        component: 'first_page'
    },
    {
        path: '/second',
        component: 'second_page'
    }
];
```

make a entry point file, eg. app.js
```
// import some file
import '@babel/polyfill';
import { store } from './js/store';
import { router } from './js/core/router';
import SimpleSpa from './js/core/simple_spa';

// wrapper in to try catch
try {
    new SimpleSpa(
        store,
        router,
        'app_container'
    ).$mount('#app');
} catch (e) {
    console.log(e);
}
```

### Dependency package
```
babel^7.1
delegate
ejs template
scss
```

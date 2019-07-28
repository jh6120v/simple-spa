import helper from '../helper/dom_helper';
import { store } from '../store';

export default class Component {
    // 模板
    template = '';

    // 作用區域
    scope;

    // 是否渲染畫面
    disableRender = false;

    // 是否自動渲染至選定的scope
    autoRender = true;

    // 欲渲染的資料
    data = {};

    // 即將輸出的 html
    output = '';

    async process() {
        const self = this;

        try {
            await self.beforeRender();
            await self.render();
            await self.afterRender();
        } catch (e) {
            console.log(e);
        }
    }

    async beforeRender() {
        console.log('before render.');
    }

    async render() {
        const self = this;

        console.log('render');

        if (self.disableRender === false) {
            // prop public store in to template
            self.data = Object.assign({}, self.data, {
                store
            });

            // process component template
            self.compiledTemplate = await import(`../templates/${self.template}.ejs`);
            self.output = await self.compiledTemplate.default(self.data);

            if (self.autoRender && self.scope) {
                await helper.getElement(self.scope).html(self.output);
            }
        }
    }

    async afterRender() {
        console.log('after render.');
    }

    setTemplate(template) {
        this.template = template;
    }
}

/**
 * 動態載入 主組件內所需的子組件，並以物件形式返回
 *
 * componentConfig 以物件形式存在，key為組件名稱，value為一物件(範例如下)或字串(組件位置)
 *
 * 若為物件則為組件位置(path)及欲傳入的值(props)，若無需設定傳入的值，可以以字串形式直接傳入組件位置
 * 例：{
     *     xxx: '/aaa/xxx',
     *     xxx: {
     *         path: '/aaa/xxx',
     *         props: {
     *             ccc: ddd
     *         }
     *     }
     * }
 */
export const partialComponent = async (componentConfig) => {
    const partial = {};

    for (const [key, value] of Object.entries(componentConfig)) {
        let newPath;
        let newProps;

        if (typeof value === 'string') {
            newPath = value;
            newProps = {};
        } else {
            if (typeof value.path === 'undefined' || typeof value.props === 'undefined') {
                throw new Error('path or props not set.');
            }

            newPath = value.path;

            // prop store in to template
            newProps = Object.assign({}, value.props, {
                store
            });
        }

        partial[key] = import(`../components/${newPath}`).default(newProps);
    }

    const result = await Promise.all(partial);

    return result;
};

/**
 * 動態載入 組件並依指定位置置入
 *
 * componentConfig 以物件形式存在，key為組件名稱，value為一物件(範例如下)
 *
 * 若為物件則為組件位置(path)，指ㄉㄧ欲傳入的值(props)，若無需設定傳入的值，可以以字串形式直接傳入組件位置
 * 例：{
     *     '#elem': {
     *         path: '/aaa/xxx',
     *         props: {
     *             ccc: ddd
     *         }
     *     }
     * }
 * @param componentConfig
 */
export const appendComponent = async (componentConfig) => {
    const result = [];
    const func = async (elem, path, props) => {
        if (helper.getElement(elem).get().length > 0) {
            // prop store in to template
            const newProps = Object.assign({}, props, {
                store
            });

            const compileHtml = await import(`../components/${path}`).default(newProps);
            await helper.getElement(elem).html(compileHtml);
        }
    };

    for (const [key, value] of Object.entries(componentConfig)) {
        if (typeof value.path === 'undefined' || typeof value.props === 'undefined') {
            throw new Error('path or props not set.');
        }

        result.push(func(key, value.path, value.props));
    }

    await Promise.all(result);
};

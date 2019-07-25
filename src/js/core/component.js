import helper from "../helper/dom-helper";
import {store} from "../store";

export default class Component {
    // 模板
    template = "";

    // 作用區域
    scope;

    // 是否渲染畫面
    disable_render = false;

    // 是否自動渲染至選定的scope
    auto_render = true;

    // 欲渲染的資料
    data = {};

    // 即將輸出的 html
    output = '';

    async process() {
        let _this = this;

        try {
            await _this.beforeRender();
            await _this.render();
            await _this.afterRender();
        } catch (e) {
            console.log(e);
        }
    }

    async beforeRender() {
        console.log('before render.');
    }

    async render() {
        let _this = this;

        console.log('render');

        if (_this.disable_render === false) {
            // prop public store in to template
            _this.data = Object.assign({}, _this.data, {
                store: store
            });

            // process component template
            _this.compiledTemplate = await import(`../templates/${_this.template}.ejs`);
            _this.output = await _this.compiledTemplate.default(_this.data);

            if (_this.auto_render && _this.scope) {
                await helper.getElement(_this.scope).html(_this.output);
            }
        }
    }

    async afterRender() {
        console.log('after render.');
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
    let partial = {};

    for (let [key, value] of Object.entries(componentConfig)) {
        let path, props;

        if (typeof value === 'string') {
            path = value;
            props = {};
        } else {
            if (typeof value.path === 'undefined' || typeof value.props === 'undefined') {
                throw new Error('path or props not set.');
            }

            path = value.path;
            props = value.props;

            // prop store in to template
            props = Object.assign({}, props, {
                store: store
            });
        }

        let tpl = await import(`../component/${path}`);

        partial[key] = await tpl.default(props);
    }

    return await partial;
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
    let array = [];

    for (let [key, value] of Object.entries(componentConfig)) {
        if (typeof value.path === 'undefined' || typeof value.props === 'undefined') {
            throw new Error('path or props not set.');
        }

        let func = async () => {
            if (helper.getElement(key).get().length > 0) {
                // prop store in to template
                value.props = Object.assign({}, value.props, {
                    store: store
                });

                let tpl = await import(`../components/${value.path}`);
                let compileHtml = await tpl.default(value.props);

                await helper.getElement(key).html(compileHtml);
            }
        };

        array.push(func());
    }

    await Promise.all(array);
};
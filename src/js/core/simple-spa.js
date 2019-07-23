import helper from "../helper/dom-helper";

export class SimpleSpa {
    // 目標元素
    $el;
    store;
    router;
    wrapper;

    constructor(store, router, wrapper) {
        let _this = this;

        // 共享狀態
        _this.store = store;

        // 路由
        _this.router = router;

        // 包裝組件
        _this.wrapper = wrapper;

        // 設定共用
        _this.setCommon();

        return _this;
    }

    checkRouteScope() {
        let _this = this;

        if (helper.getElement(_this.$el).find(_this.router.scope).get().length === 0) {
            throw new Error('can not find route scope.');
        }
    }

    $mount(el) {
        let _this = this;

        // 目標元素
        _this.$el = el;

        // 首次渲染
        _this.firstRender().then(async () => {
            await _this.checkRouteScope();
            await _this.router.listen();
            await _this.complete();
        }).catch((e) => {
            console.log('mount error.');
            console.log(e);

            _this.complete().then(() => {

            });
        });
    }

    async firstRender() {
        let _this = this;

        if (!_this.wrapper) {
            throw new Error('component not set.');
        }

        let component = await import(`../component/${_this.wrapper}`);
        const App = await new component.default();

        App.scope = await _this.$el;

        await App.process();
    }

    setCommon() {
        console.log('common setting.');
    }

    async complete() {
        console.log('complete.');
    }
}

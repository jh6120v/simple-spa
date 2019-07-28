import helper from '../helper/dom_helper';

export default class SimpleSpa {
    // 目標元素
    $el;

    store;

    router;

    wrapper;

    constructor(store, router, wrapper) {
        // 共享狀態
        this.store = store;

        // 路由
        this.router = router;

        // 包裝組件
        this.wrapper = wrapper;

        // 設定共用
        this.setCommon();

        return this;
    }

    checkRouteScope() {
        if (helper.getElement(this.$el).find(this.router.scope).get().length === 0) {
            throw new Error('can not find route scope.');
        }
    }

    $mount(el) {
        const self = this;

        // 目標元素
        self.$el = el;

        // 首次渲染
        self.firstRender().then(async () => {
            await self.checkRouteScope();
            await self.router.listen();
            await self.complete();
        }).catch((e) => {
            console.log('mount error.');
            console.log(e);

            self.complete().then(() => {

            });
        });
    }

    async firstRender() {
        if (!this.wrapper) {
            throw new Error('component not set.');
        }

        const component = await import(`../components/${this.wrapper}`);
        const App = await new component.default();

        App.scope = await this.$el;

        await App.process();
    }

    setCommon() {
        console.log('common setting.');
    }

    async complete() {
        console.log('complete.');
    }
}

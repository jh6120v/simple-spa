const DEFAULT_NULL = '_@@none';

export default class DomHelper {
    styleMap = {
        display: 'display',
        width: 'width',
        height: 'height',
        left: 'left',
        top: 'top',
        transition: 'transition',
        position: 'position',
        overflow: 'overflow',
        visibility: 'visibility',
        opacity: 'opacity',
        'padding-top': 'paddingTop',
        'padding-bottom': 'paddingBottom',
        'margin-top': 'marginTop',
        'margin-left': 'marginLeft',
        'max-height': 'maxHeight',
        'overflow-y': 'overflowY',
        'z-index': 'zIndex',
        'line-height': 'lineHeight',
        'border-top-width': 'borderTopWidth',
        'border-bottom-width': 'borderBottomWidth',
        'touch-action': 'touchAction'
    };

    static addElement(tagName) {
        return new DomHelper().createElement(tagName);
    }

    static getElement(selector) {
        return new DomHelper().selectElement(selector);
    }

    /**
     * DOM 操作相關
     */

    /**
     * 建立空白元素
     *
     * @param tagName
     * @returns {DomHelper}
     */
    createElement(tagName) {
        const self = this;

        if (tagName === null) {
            throw new Error('tag name can not be null.');
        }

        self.selector = Array.of(document.createElement(tagName));

        return self;
    }

    /**
     * 獲取現有元素
     *
     * @param selector
     * @returns {DomHelper}
     */
    selectElement(selector) {
        const self = this;

        if (typeof selector === 'string') {
            if (selector === 'window') {
                self.selector = [window];
            } else {
                self.selector = [...document.querySelectorAll(selector)];
            }
        } else if (Array.isArray(selector)) {
            self.selector = selector;
        } else {
            self.selector = Array.of(selector);
        }

        return self;
    }

    /**
     * 找尋元素，返回一個集合
     *
     * @param selector
     * @returns {DomHelper}
     */
    find(selector) {
        const self = this;
        let elements = Array.of();

        for (const index of self.selector.keys()) {
            elements = [...elements, ...[...self.selector[index].querySelectorAll(selector)]];
        }

        self.selector = elements;

        return self;
    }

    /**
     * 找尋上層父元素，直到找到為止(IE 不支援)
     *
     * @param element
     * @returns {DomHelper}
     */
    closest(element) {
        const self = this;
        let closest = Array.of();

        for (const index of self.selector.keys()) {
            closest = [...closest, ...[self.selector[index].closest(element)]];
        }

        self.selector = closest;

        return self;
    }

    /**
     * 找尋元素的父元素
     *
     * @returns {DomHelper}
     */
    parent() {
        const self = this;
        let parent = Array.of();

        for (const index of self.selector.keys()) {
            parent = [...parent, ...Array.of(self.selector[index].parentNode)];
        }

        self.selector = parent;

        return self;
    }

    /**
     * 找尋元素下的第一個子元素
     *
     * @returns {DomHelper}
     */
    children() {
        const self = this;
        let children = Array.of();

        for (const index of self.selector.keys()) {
            children = [...children, ...[...self.selector[index].children]];
        }

        self.selector = children;

        return self;
    }

    /**
     * 上一個元素
     *
     * @returns {*}
     */
    prev() {
        const self = this;
        const prev = self.selector[0].previousElementSibling;

        if (prev === null) {
            return prev;
        }
        self.selector = Array.of(prev);

        return self;
    }

    /**
     * 下一個元素
     *
     * @returns {*}
     */
    next() {
        const self = this;
        const next = self.selector[0].nextElementSibling;

        if (next === null) {
            return next;
        }
        self.selector = Array.of(next);

        return self;
    }

    /**
     * 將元素放置於某元素中的最後
     *
     * @param wrap
     * @returns {DomHelper}
     */
    appendTo(wrap) {
        const self = this;
        let newWrap;

        if (typeof wrap === 'string') {
            newWrap = [...document.querySelectorAll(wrap)];
        } else {
            newWrap = (Array.isArray(wrap)) ? Array.of(wrap[0]) : Array.of(wrap);
        }

        for (const index of self.selector.keys()) {
            for (const idx of newWrap.keys()) {
                newWrap[idx].appendChild(self.selector[index]);
            }
        }

        return self;
    }

    /**
     * 將元素放置於某元素中的前面
     *
     * @param wrap
     * @returns {DomHelper}
     */
    prependTo(wrap) {
        const self = this;
        let newWrap;

        if (typeof wrap === 'string') {
            newWrap = [...document.querySelectorAll(wrap)];
        } else {
            newWrap = (Array.isArray(wrap)) ? Array.of(wrap[0]) : Array.of(wrap);
        }

        for (const index of self.selector.keys()) {
            for (const idx of newWrap.keys()) {
                newWrap[idx].insertBefore(self.selector[index], newWrap[idx].firstChild);
            }
        }

        return self;
    }

    /**
     * 將元素置於某元素之前
     *
     * @param element
     * @returns {DomHelper}
     */
    before(element) {
        const self = this;
        let newElement;

        if (typeof element === 'string') {
            newElement = document.querySelector(element);
        } else {
            newElement = element;
        }

        newElement.parentNode.insertBefore(self.selector[0], newElement);

        return self;
    }

    /**
     * 將元素置於某元素之後
     *
     * @param element
     * @returns {DomHelper}
     */
    after(element) {
        const self = this;
        let newElement;

        if (typeof element === 'string') {
            newElement = document.querySelector(element);
        } else {
            newElement = element;
        }

        newElement.parentNode.insertBefore(self.selector[0], newElement.nextSibling);

        return self;
    }

    /**
     * 返回第幾個元素
     *
     * @param index
     * @returns {DomHelper}
     */
    eq(index) {
        const self = this;

        if (typeof self.selector[index] !== 'undefined') {
            self.selector = Array.of(self.selector[index]);
        }

        return self;
    }

    last() {
        const self = this;

        self.selector = Array.of(self.selector.pop());

        return self;
    }

    /**
     * 複製元素
     *
     * @returns {DomHelper}
     */
    clone() {
        const self = this;
        const cloneArr = Array.of();

        for (const [index, elem] of self.selector.entries()) {
            cloneArr[index] = elem.cloneNode(true);
        }

        self.selector = cloneArr;

        return self;
    }

    /**
     * 移除元素
     */
    remove() {
        const self = this;

        for (const index of self.selector.keys()) {
            // 避免併發執行時出錯
            try {
                self.selector[index].parentNode.removeChild(self.selector[index]);
            } catch (e) {
                console.log(e);
            }
        }
    }

    /**
     * Element 操作相關
     */

    /**
     * 設定ID
     *
     * @param idName
     * @returns {DomHelper}
     */
    id(idName = DEFAULT_NULL) {
        const self = this;

        if (idName === DEFAULT_NULL) {
            return self.selector[0].id;
        }
        self.selector[0].id = idName;

        return self;
    }

    /**
     * 增加樣式(以空格分開)
     *
     * @param className
     * @returns {DomHelper}
     */
    addClass(className) {
        const self = this;
        const classArray = className.split(' ');

        for (const index of self.selector.keys()) {
            for (const name of classArray.values()) {
                self.selector[index].classList.add(name);
            }
        }

        return self;
    }

    /**
     * 獲取元素 樣式
     *
     * 或賦予元素 inline style，需以物件形式帶入
     * @param name
     * @param value
     */
    css(name, value = DEFAULT_NULL) {
        const self = this;

        switch (typeof name) {
            case 'object':
                for (const index of self.selector.keys()) {
                    for (const [key, val] of Object.entries(name)) {
                        self.selector[index].style[self.styleMap[key]] = val;
                    }
                }

                break;
            case 'string':
                if (value === DEFAULT_NULL) {
                    return getComputedStyle(self.selector[0])[name];
                }

                for (const index of self.selector.keys()) {
                    self.selector[index].style[self.styleMap[name]] = value;
                }

                break;
            default:
                break;
        }

        if (typeof name === 'object') {
            return self;
        }

        return self;
    }

    /**
     * 移除樣式(以空格分開)
     *
     * @param className
     * @returns {DomHelper}
     */
    removeClass(className) {
        const self = this;
        const classArray = className.split(' ');

        for (const index of self.selector.keys()) {
            for (const name of classArray.values()) {
                self.selector[index].classList.remove(name);
            }
        }

        return self;
    }

    /**
     * 判斷某元素樣式是否存在
     *
     * @param className
     * @returns {boolean}
     */
    hasClass(className) {
        const self = this;

        return self.selector[0].classList ? self.selector[0].classList.contains(className) : !!self.selector[0].className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
    }

    /**
     * 獲取元素 html 內容或賦予元素 html 內容
     *
     * @param content
     * @returns {*}
     */
    html(content = DEFAULT_NULL) {
        const self = this;

        if (content === DEFAULT_NULL) {
            return self.selector[0].innerHTML;
        }
        for (const index of self.selector.keys()) {
            self.selector[index].innerHTML = content;
        }

        return self;
    }

    /**
     * 獲取元素 text 文字或賦予元素 text 文字(不使用 innerText 改用 textContent => IE9+)
     *
     * @param content
     * @returns {*}
     */
    text(content = DEFAULT_NULL) {
        const self = this;

        if (content === DEFAULT_NULL) {
            return self.selector[0].textContent;
        }
        for (const index of self.selector.keys()) {
            self.selector[index].textContent = content;
        }

        return self;
    }

    /**
     * 獲取 input value 或賦予 input value
     *
     * @param value
     * @returns {*}
     */
    val(value = DEFAULT_NULL) {
        const self = this;

        if (value === DEFAULT_NULL) {
            return self.selector[0].value;
        }
        for (const index of self.selector.keys()) {
            self.selector[index].value = value;
        }

        return self;
    }

    /**
     * 獲取元素屬性或賦予元素屬性
     *
     * @param name
     * @param value
     * @returns {*}
     */
    attr(name, value = DEFAULT_NULL) {
        const self = this;

        switch (typeof name) {
            case 'object':
                for (const index of self.selector.keys()) {
                    for (const [key, val] of Object.entries(name)) {
                        self.selector[index].setAttribute(key, val);
                    }
                }

                break;
            case 'string':
                if (value === DEFAULT_NULL) {
                    return self.selector[0].getAttribute(name);
                }
                for (const index of self.selector.keys()) {
                    self.selector[index].setAttribute(name, value);
                }

                break;
            default:
                throw new Error('can not operate attribute.');
        }

        return self;
    }

    /**
     * 設定元素屬性，常用於 設定為 boolean 的值
     *
     * @param name
     * @param value
     * @returns {*}
     */
    prop(name, value = DEFAULT_NULL) {
        const self = this;

        switch (typeof name) {
            case 'object':
                for (const index of self.selector.keys()) {
                    for (const [key, val] of Object.entries(name)) {
                        self.selector[index][key] = val;
                    }
                }

                break;
            case 'string':
                if (value === DEFAULT_NULL) {
                    return self.selector[0][name];
                }
                for (const index of self.selector.keys()) {
                    self.selector[index][name] = value;
                }

                break;
            default:
                throw new Error('can not operate property.');
        }

        return self;
    }

    /**
     * 設定 元素 [data-*]屬性
     *
     * @param name
     * @param value
     * @returns {*}
     */
    data(name, value = DEFAULT_NULL) {
        const self = this;

        switch (typeof name) {
            case 'object':
                for (const index of self.selector.keys()) {
                    for (const [key, val] of Object.entries(name)) {
                        self.selector[index].setAttribute(`data-${key}`, val);
                    }
                }

                break;
            case 'string':
                if (value === DEFAULT_NULL) {
                    return self.selector[0].getAttribute(`data-${name}`);
                }
                for (const index of self.selector.keys()) {
                    self.selector[index].setAttribute(`data-${name}`, value);
                }

                break;
            default:
                throw new Error('can not operate [data-*] attribute.');
        }

        return self;
    }

    /**
     * 獲取元素的實際寬和高
     *
     * @returns {{}}
     */
    outerWidthAndHeight() {
        const self = this;
        let $output = {};

        if (self.selector[0].style.display !== 'none') {
            $output = {
                width: self.selector[0].offsetWidth,
                height: self.selector[0].offsetHeight
            };
        } else {
            const $cloneWrap = self.selector[0].cloneNode(true);
            $cloneWrap.style.visibility = 'hidden';
            $cloneWrap.style.display = 'block';
            document.body.appendChild($cloneWrap);

            $output = {
                width: $cloneWrap.offsetWidth,
                height: $cloneWrap.offsetHeight
            };

            $cloneWrap.parentNode.removeChild($cloneWrap);
        }

        return $output;
    }

    /**
     * 清除單一元素的內容
     *
     * @returns {DomHelper}
     */
    empty() {
        const self = this;

        for (const index of self.selector.keys()) {
            self.selector[index].innerHTML = '';
            self.selector[index].innerText = '';
            self.selector[index].value = '';
        }

        return self;
    }

    /**
     * Animate 操作相關
     */

    /**
     * 將單一元素顯示
     *
     * @returns {DomHelper}
     */
    show(style = 'block') {
        const self = this;

        for (const index of self.selector.keys()) {
            self.selector[index].style.display = style;
        }

        return self;
    }

    /**
     * 將單一元素隱藏
     *
     * @returns {DomHelper}
     */
    hide() {
        const self = this;

        for (const index of self.selector.keys()) {
            self.selector[index].style.display = 'none';
        }

        return self;
    }

    /**
     * 將單一元素淡入
     *
     * @param fps
     * @param callback
     * @param showStyle
     * @returns {Promise.<DomHelper>}
     */
    async fadeIn(fps = 50, callback = DEFAULT_NULL, showStyle = 'block') {
        const self = this;
        const begin = (index) => {
            const fadeId = `${self.selector[index].className}_fade`;
            if (typeof window[fadeId] !== 'undefined') {
                cancelAnimationFrame(window[fadeId]);
            }

            const finalVal = parseFloat(getComputedStyle(self.selector[index]).getPropertyValue('opacity'));

            self.selector[index].style.opacity = 0;
            self.selector[index].style.display = showStyle;

            (function fade() {
                const val = parseFloat(self.selector[index].style.opacity) + 1;
                if (!((val / fps) > finalVal)) {
                    self.selector[index].style.opacity = val;
                    window[fadeId] = requestAnimationFrame(fade);
                }
            }());
        };

        const results = [];
        for (const index of self.selector.keys()) {
            results.push(begin(index));

            if (callback !== DEFAULT_NULL) {
                results.push(callback());
            }
        }

        await Promise.all(results);

        return self;
    }

    /**
     * 將單一元素淡出
     *
     * @param fps
     * @param callback
     * @returns {Promise.<DomHelper>}
     */
    async fadeOut(fps = 50, callback = DEFAULT_NULL) {
        const self = this;
        const begin = (index) => {
            const fadeId = `${self.selector[index].className}_fade`;
            if (typeof window[fadeId] !== 'undefined') {
                cancelAnimationFrame(window[fadeId]);
            }

            const currentVal = parseFloat(getComputedStyle(self.selector[index]).getPropertyValue('opacity'));

            (function fade() {
                const val = currentVal - 1;
                if ((val / fps) < 0) {
                    self.selector[index].style.display = 'none';
                    self.selector[index].style.opacity = '';
                    if (callback !== DEFAULT_NULL) {
                        callback();
                    }
                } else {
                    self.selector[index].style.opacity = currentVal;
                    window[fadeId] = requestAnimationFrame(fade);
                }
            }());
        };

        const results = [];
        for (const index of self.selector.keys()) {
            results.push(begin(index));
        }

        await Promise.all(results);

        return self;
    }

    /**
     * 賦予元素 css 動畫
     *
     * @param animationName
     * @param remove
     * @param callback
     * @returns {Promise.<DomHelper>}
     */
    async animateCss(animationName, remove = false, callback = DEFAULT_NULL) {
        const self = this;
        const animationEnd = 'animationend';
        const motionQuery = window.matchMedia('(prefers-reduced-motion)');

        if (motionQuery.matches) {
            if (animationName.indexOf('Out') !== -1) {
                await setTimeout(() => {
                    self.hide();
                }, 500);
            } else if (animationName.indexOf('In') !== -1) {
                await setTimeout(() => {
                    self.show();
                }, 500);
            }

            if (remove) {
                await self.remove();
            }

            if (callback !== DEFAULT_NULL) {
                await callback();
            }
        } else {
            await self.one(animationEnd, async () => {
                await self.removeClass(`animated ${animationName}`);

                if (remove) {
                    await self.remove();
                }

                if (callback !== DEFAULT_NULL) {
                    await callback();
                }
            });

            await self.addClass(`animated ${animationName}`);
        }

        return self;
    }

    /**
     * Event 操作相關
     */

    /**
     * 綁定元素的 events
     *
     * @param trigger
     * @param callBack
     * @param options
     * @returns {DomHelper}
     */
    on(trigger, callBack, options = {}) {
        const self = this;
        const triggerArray = trigger.split(' ');

        for (const index of self.selector.keys()) {
            for (const triggerMethod of triggerArray.values()) {
                self.selector[index].addEventListener(triggerMethod, callBack, options);
            }
        }

        return self;
    }

    /**
     * 解除綁定元素的 events
     *
     * @param trigger
     * @param callback
     * @param options
     * @returns {DomHelper}
     */
    off(trigger = DEFAULT_NULL, callback = DEFAULT_NULL, options = {}) {
        const self = this;

        if (trigger === DEFAULT_NULL && callback === DEFAULT_NULL) {
            for (const index of self.selector.keys()) {
                const elClone = self.selector[index].cloneNode(true);

                self.selector[index].parentNode.replaceChild(elClone, self.selector[index]);
            }
        } else {
            const triggerArray = trigger.split(' ');

            for (const index of self.selector.keys()) {
                for (const triggerMethod of triggerArray.values()) {
                    self.selector[index].removeEventListener(triggerMethod, callback, options);
                }
            }
        }

        return self;
    }

    /**
     * 綁定一次性的 event，暫時無法使用 once 的方式，IE無法支援
     *
     * @param trigger
     * @param callback
     * @param options
     * @returns {DomHelper}
     */
    one(trigger, callback, options = {}) {
        const self = this;
        const triggerArray = trigger.split(' ');

        function once(target, type, listener, opts) {
            function handler(...args) {
                listener.apply(this, args);
                self.off(type, handler);
            }

            target.addEventListener(type, handler, opts);
        }

        for (const index of self.selector.keys()) {
            for (const triggerMethod of triggerArray.values()) {
                once(self.selector[index], triggerMethod, callback, options);
            }
        }

        return self;
    }

    /**
     * 觸發已綁定的 events
     *
     * @param trigger
     * @returns {DomHelper}
     */
    trigger(trigger) {
        const self = this;
        const triggerArray = trigger.split(' ');

        for (const index of self.selector.keys()) {
            for (const triggerMethod of triggerArray.values()) {
                const event = new CustomEvent(triggerMethod);
                self.selector[index].dispatchEvent(event);
            }
        }

        return self;
    }

    /**
     * 其他
     */

    /**
     * 送出表單
     */
    submit() {
        const self = this;

        self.selector[0].submit();
    }

    /**
     * 獲取操作的元素Node
     *
     * @returns {Element|*}
     */
    get() {
        const self = this;

        return self.selector;
    }

    /**
     * 設定元素
     *
     * @param $elem
     * @returns {DomHelper}
     */
    set($elem) {
        const self = this;

        self.selector = [...$elem];

        return self;
    }
}

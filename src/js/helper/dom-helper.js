export default class DomHelper {
    static defaultNull = '_@@none';

    styleMap = {
        "display": "display",
        "width": "width",
        "height": "height",
        "padding-top": "paddingTop",
        "padding-bottom": "paddingBottom",
        "margin-top": "marginTop",
        "margin-left": "marginLeft",
        "max-height": "maxHeight",
        "overflow-y": "overflowY",
        "z-index": "zIndex",
        "line-height": "lineHeight",
        "border-top-width": "borderTopWidth",
        "border-bottom-width": "borderBottomWidth",
        "left": "left",
        "top": "top",
        "transition": "transition",
        "position": "position",
        "overflow": "overflow",
        "visibility": "visibility",
        "touch-action": "touchAction",
        'opacity': 'opacity'
    };

    static addElement(tagName) {
        return new DomHelper().createElement(tagName);
    }

    static getElement(selector) {
        return new DomHelper().selectElement(selector);
    }

    constructor() {
        let _this = this;
        _this.defaultNull = DomHelper.defaultNull;
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
        let _this = this;

        if (tagName === null) {
            throw new Error('tag name can not be null.');
        }

        _this._selector = Array.of(document.createElement(tagName));

        return _this;
    }

    /**
     * 獲取現有元素
     *
     * @param selector
     * @returns {DomHelper}
     */
    selectElement(selector) {
        let _this = this;

        if (typeof selector === 'string') {
            if (selector === 'window') {
                _this._selector = [window];
            } else {
                _this._selector = [...document.querySelectorAll(selector)];
            }
        } else {
            if (Array.isArray(selector)) {
                _this._selector = selector;
            } else {
                _this._selector = Array.of(selector);
            }
        }

        return _this;
    }

    /**
     * 找尋元素，返回一個集合
     *
     * @param selector
     * @returns {DomHelper}
     */
    find(selector) {
        let _this = this;
        let elements = Array.of();

        for (let index of _this._selector.keys()) {
            elements = [...elements, ...[..._this._selector[index].querySelectorAll(selector)]];
        }

        _this._selector = elements;

        return _this;
    }

    /**
     * 找尋上層父元素，直到找到為止(IE 不支援)
     *
     * @param element
     * @returns {DomHelper}
     */
    closest(element) {
        let _this = this;
        let closest = Array.of();

        for (let index of _this._selector.keys()) {
            closest = [...closest, ...[_this._selector[index].closest(element)]];
        }

        _this._selector = closest;

        return _this;
    }

    /**
     * 找尋元素的父元素
     *
     * @returns {DomHelper}
     */
    parent() {
        let _this = this;
        let parent = Array.of();

        for (let index of _this._selector.keys()) {
            parent = [...parent, ...Array.of(_this._selector[index].parentNode)];
        }

        _this._selector = parent;

        return _this;
    }

    /**
     * 找尋元素下的第一個子元素
     *
     * @returns {DomHelper}
     */
    children() {
        let _this = this;
        let children = Array.of();

        for (let index of _this._selector.keys()) {
            children = [...children, ...[..._this._selector[index].children]];
        }

        _this._selector = children;

        return _this;
    }

    /**
     * 上一個元素
     *
     * @returns {*}
     */
    prev() {
        let _this = this;
        let prev = _this._selector[0].previousElementSibling;

        if (prev === null) {
            return prev;
        } else {
            _this._selector = Array.of(prev);

            return _this;
        }
    }

    /**
     * 下一個元素
     *
     * @returns {*}
     */
    next() {
        let _this = this;
        let next = _this._selector[0].nextElementSibling;

        if (next === null) {
            return next;
        } else {
            _this._selector = Array.of(next);

            return _this;
        }
    }

    /**
     * 將元素放置於某元素中的最後
     *
     * @param wrap
     * @returns {DomHelper}
     */
    appendTo(wrap) {
        let _this = this;

        if (typeof wrap === 'string') {
            wrap = [...document.querySelectorAll(wrap)];
        } else {
            wrap = (Array.isArray(wrap)) ? Array.of(wrap[0]) : Array.of(wrap);
        }

        for (let index of _this._selector.keys()) {
            for (let idx of wrap.keys()) {
                wrap[idx].appendChild(_this._selector[index]);
            }
        }

        return _this;
    }

    /**
     * 將元素放置於某元素中的前面
     *
     * @param wrap
     * @returns {DomHelper}
     */
    prependTo(wrap) {
        let _this = this;

        if (typeof wrap === 'string') {
            wrap = [...document.querySelectorAll(wrap)];
        } else {
            wrap = (Array.isArray(wrap)) ? Array.of(wrap[0]) : Array.of(wrap);
        }

        for (let index of _this._selector.keys()) {
            for (let idx of wrap.keys()) {
                wrap[idx].insertBefore(_this._selector[index], wrap[idx].firstChild);
            }
        }

        return _this;
    }

    /**
     * 將元素置於某元素之前
     *
     * @param element
     * @returns {DomHelper}
     */
    before(element) {
        let _this = this;

        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        element.parentNode.insertBefore(_this._selector[0], element);

        return _this;
    }

    /**
     * 將元素置於某元素之後
     *
     * @param element
     * @returns {DomHelper}
     */
    after(element) {
        let _this = this;

        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        element.parentNode.insertBefore(_this._selector[0], element.nextSibling);

        return _this;
    }

    /**
     * 返回第幾個元素
     *
     * @param index
     * @returns {DomHelper}
     */
    eq(index) {
        let _this = this;

        if (_this._selector.hasOwnProperty(index)) {
            _this._selector = Array.of(_this._selector[index]);
        }

        return _this;
    }

    last() {
        let _this = this;

        _this._selector = Array.of(_this._selector.pop());

        return _this;
    }

    /**
     * 複製元素
     *
     * @returns {DomHelper}
     */
    clone() {
        let _this = this;
        let cloneArr = Array.of();

        for (let [index, elem] of _this._selector.entries()) {
            cloneArr[index] = elem.cloneNode(true);
        }

        _this._selector = cloneArr;

        return _this;
    }

    /**
     * 移除元素
     */
    remove() {
        let _this = this;

        for (let index of _this._selector.keys()) {
            // 避免併發執行時出錯
            try {
                _this._selector[index].parentNode.removeChild(_this._selector[index]);
            } catch (e) {

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
    id(idName = DomHelper.defaultNull) {
        let _this = this;

        if (idName === _this.defaultNull) {
            return _this._selector[0].id;
        } else {
            _this._selector[0].id = idName;

            return _this;
        }
    }

    /**
     * 增加樣式(以空格分開)
     *
     * @param className
     * @returns {DomHelper}
     */
    addClass(className) {
        let _this = this;
        let classArray = className.split(" ");

        for (let index of _this._selector.keys()) {
            for (let className of classArray.values()) {
                _this._selector[index].classList.add(className);
            }
        }

        return _this;
    }

    /**
     * 移除樣式(以空格分開)
     *
     * @param className
     * @returns {DomHelper}
     */
    removeClass(className) {
        let _this = this;
        let classArray = className.split(" ");

        for (let index of _this._selector.keys()) {
            for (let className of classArray.values()) {
                _this._selector[index].classList.remove(className);
            }
        }

        return _this;
    }

    /**
     * 獲取元素 樣式
     *
     * 或賦予元素 inline style，需以物件形式帶入
     * @param name
     * @param value
     */
    css(name, value = DomHelper.defaultNull) {
        let _this = this;

        if (typeof name === "object") {
            for (let index of _this._selector.keys()) {
                for (let [key, value] of Object.entries(name)) {
                    _this._selector[index].style[_this.styleMap[key]] = value;
                }
            }

            return _this;
        } else if (typeof name === "string") {
            if (value === _this.defaultNull) {
                return getComputedStyle(_this._selector[0])[name];
            } else {
                for (let index of _this._selector.keys()) {
                    _this._selector[index].style[_this.styleMap[name]] = value;
                }

                return _this;
            }
        } else {
            throw new Error('can not operate attribute.');
        }
    }

    /**
     * 判斷某元素樣式是否存在
     *
     * @param className
     * @returns {boolean}
     */
    hasClass(className) {
        let _this = this;

        return _this._selector[0].classList ? _this._selector[0].classList.contains(className) : !!_this._selector[0].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    /**
     * 獲取元素 html 內容或賦予元素 html 內容
     *
     * @param content
     * @returns {*}
     */
    html(content = DomHelper.defaultNull) {
        let _this = this;

        if (content === _this.defaultNull) {
            return _this._selector[0].innerHTML;
        } else {
            for (let index of _this._selector.keys()) {
                _this._selector[index].innerHTML = content;
            }

            return _this;
        }
    }

    /**
     * 獲取元素 text 文字或賦予元素 text 文字(不使用 innerText 改用 textContent => IE9+)
     *
     * @param content
     * @returns {*}
     */
    text(content = DomHelper.defaultNull) {
        let _this = this;

        if (content === _this.defaultNull) {
            return _this._selector[0].textContent;
        } else {
            for (let index of _this._selector.keys()) {
                _this._selector[index].textContent = content;
            }

            return _this;
        }
    }

    /**
     * 獲取 input value 或賦予 input value
     *
     * @param value
     * @returns {*}
     */
    val(value = DomHelper.defaultNull) {
        let _this = this;

        if (value === _this.defaultNull) {
            return _this._selector[0].value;
        } else {
            for (let index of _this._selector.keys()) {
                _this._selector[index].value = value;
            }

            return _this;
        }
    }

    /**
     * 取得 input value 的字元長度
     *
     * @returns {Number}
     */
    len() {
        let _this = this;
        let value = _this.val();

        return value.replace(/[^\x00-\xff]/g, "rr").length;
    }

    /**
     * 獲取元素屬性或賦予元素屬性
     *
     * @param name
     * @param value
     * @returns {*}
     */
    attr(name, value = DomHelper.defaultNull) {
        let _this = this;

        if (typeof name === "object") {
            for (let index of _this._selector.keys()) {
                for (let [key, value] of Object.entries(name)) {
                    _this._selector[index].setAttribute(key, value);
                }
            }

            return _this;
        } else if (typeof name === "string") {
            if (value === _this.defaultNull) {
                return _this._selector[0].getAttribute(name);
            } else {
                for (let index of _this._selector.keys()) {
                    _this._selector[index].setAttribute(name, value);
                }

                return _this;
            }
        } else {
            throw new Error('can not operate attribute.');
        }
    }

    /**
     * 設定元素屬性，常用於 設定為 boolean 的值
     *
     * @param name
     * @param value
     * @returns {*}
     */
    prop(name, value = DomHelper.defaultNull) {
        let _this = this;

        if (typeof name === "object") {
            for (let index of _this._selector.keys()) {
                for (let [key, value] of Object.entries(name)) {
                    _this._selector[index][key] = value;
                }
            }

            return _this;
        } else if (typeof name === "string") {
            if (value === _this.defaultNull) {
                return _this._selector[0][name];
            } else {
                for (let index of _this._selector.keys()) {
                    _this._selector[index][name] = value;
                }

                return _this;
            }
        } else {
            throw new Error('can not operate property.');
        }
    }

    /**
     * 設定 元素 [data-*]屬性
     *
     * @param name
     * @param value
     * @returns {*}
     */
    data(name, value = DomHelper.defaultNull) {
        let _this = this;

        if (typeof name === "object") {
            for (let index of _this._selector.keys()) {
                for (let [key, value] of Object.entries(name)) {
                    _this._selector[index].setAttribute("data-" + key, value);
                }
            }

            return _this;
        } else if (typeof name === "string") {
            if (value === _this.defaultNull) {
                return _this._selector[0].getAttribute("data-" + name);
            } else {
                for (let index of _this._selector.keys()) {
                    _this._selector[index].setAttribute("data-" + name, value);
                }

                return _this;
            }
        } else {
            throw new Error('can not operate [data-*] attribute.');
        }
    }

    /**
     * 獲取元素的實際寬和高
     *
     * @returns {{}}
     */
    outerWidthAndHeight() {
        let _this = this;
        let $output = {};

        if (_this._selector[0].style.display !== 'none') {
            $output = {
                'width': _this._selector[0].offsetWidth,
                'height': _this._selector[0].offsetHeight
            };
        } else {
            let $cloneWrap = _this._selector[0].cloneNode(true);
            $cloneWrap.style.visibility = 'hidden';
            $cloneWrap.style.display = 'block';
            document.body.appendChild($cloneWrap);

            $output = {
                'width': $cloneWrap.offsetWidth,
                'height': $cloneWrap.offsetHeight
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
        let _this = this;

        for (let index of _this._selector.keys()) {
            _this._selector[index].innerHTML = "";
            _this._selector[index].innerText = "";
            _this._selector[index].value = "";
        }

        return _this;
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
        let _this = this;

        for (let index of _this._selector.keys()) {
            _this._selector[index].style.display = style;
        }

        return _this;
    }

    /**
     * 將單一元素隱藏
     *
     * @returns {DomHelper}
     */
    hide() {
        let _this = this;

        for (let index of _this._selector.keys()) {
            _this._selector[index].style.display = 'none';
        }

        return _this;
    }

    /**
     * 將單一元素淡入
     *
     * @param fps
     * @param callback
     * @param showStyle
     * @returns {Promise.<DomHelper>}
     */
    async fadeIn(fps = 50, callback = DomHelper.defaultNull, showStyle = 'block') {
        let _this = this;
        let begin = index => {
            let fadeId = `${_this._selector[index].className}_fade`;
            if (typeof window[fadeId] !== 'undefined') {
                cancelAnimationFrame(window[fadeId]);
            }

            let finalVal = parseFloat(getComputedStyle(_this._selector[index]).getPropertyValue("opacity"));

            _this._selector[index].style.opacity = 0;
            _this._selector[index].style.display = showStyle;

            (function fade() {
                let val = parseFloat(_this._selector[index].style.opacity);

                if (!((val += 1 / fps) > finalVal)) {
                    _this._selector[index].style.opacity = val;
                    window[fadeId] = requestAnimationFrame(fade);
                }
            })();
        };

        for (let index of _this._selector.keys()) {
            await begin(index);
            if (callback !== _this.defaultNull) {
                await callback();
            }
        }

        return _this;
    }

    /**
     * 將單一元素淡出
     *
     * @param fps
     * @param callback
     * @returns {Promise.<DomHelper>}
     */
    async fadeOut(fps = 50, callback = DomHelper.defaultNull) {
        let _this = this;
        let begin = index => {
            let fadeId = _this._selector[index].className + '_fade';
            if (typeof window[fadeId] !== 'undefined') {
                cancelAnimationFrame(window[fadeId]);
            }

            let currentVal = parseFloat(getComputedStyle(_this._selector[index]).getPropertyValue("opacity"));

            (function fade() {
                if ((currentVal -= 1 / fps) < 0) {
                    _this._selector[index].style.display = "none";
                    _this._selector[index].style.opacity = "";
                    if (callback !== _this.defaultNull) {
                        callback();
                    }
                } else {
                    _this._selector[index].style.opacity = currentVal;
                    window[fadeId] = requestAnimationFrame(fade);
                }
            })();
        };

        for (let index of _this._selector.keys()) {
            await begin(index);
        }

        return _this;
    }

    /**
     * 賦予元素 css 動畫
     *
     * @param animationName
     * @param remove
     * @param callback
     * @returns {Promise.<DomHelper>}
     */
    async animateCss(animationName, remove = false, callback = DomHelper.defaultNull) {
        let _this = this;
        let animationEnd = 'animationend';
        let motionQuery = window.matchMedia('(prefers-reduced-motion)');

        if (motionQuery.matches) {
            if (animationName.indexOf('Out') !== -1) {
                await setTimeout(function () {
                    _this.hide();
                }, 500);
            } else if (animationName.indexOf('In') !== -1) {
                await setTimeout(function () {
                    _this.show();
                }, 500);
            }

            if (remove) {
                await _this.remove();
            }

            if (callback !== _this.defaultNull) {
                await callback();
            }
        } else {
            await _this.one(animationEnd, async function () {
                await _this.removeClass('animated ' + animationName);

                if (remove) {
                    await _this.remove();
                }

                if (callback !== _this.defaultNull) {
                    await callback();
                }
            });

            await _this.addClass('animated ' + animationName);
        }

        return _this;
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
        let _this = this;
        let triggerArray = trigger.split(" ");

        for (let index of _this._selector.keys()) {
            for (let trigger of triggerArray.values()) {
                _this._selector[index].addEventListener(trigger, callBack, options);
            }
        }

        return _this;
    }

    /**
     * 解除綁定元素的 events
     *
     * @param trigger
     * @param callback
     * @param options
     * @returns {DomHelper}
     */
    off(trigger = DomHelper.defaultNull, callback = DomHelper.defaultNull, options = {}) {
        let _this = this;

        if (trigger === _this.defaultNull && callback === _this.defaultNull) {
            for (let index of _this._selector.keys()) {
                let elClone = _this._selector[index].cloneNode(true);

                _this._selector[index].parentNode.replaceChild(elClone, _this._selector[index]);
            }

        } else {
            let triggerArray = trigger.split(" ");

            for (let index of _this._selector.keys()) {
                for (let trigger of triggerArray.values()) {
                    _this._selector[index].removeEventListener(trigger, callback, options);
                }
            }
        }

        return _this;
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
        let _this = this;
        let triggerArray = trigger.split(" ");

        function once(target, type, listener, options) {
            target.addEventListener(type, handler, options);

            function handler() {
                listener.apply(this, arguments);
                _this.off(type, handler);
            }
        }

        for (let index of _this._selector.keys()) {
            for (let trigger of triggerArray.values()) {
                once(_this._selector[index], trigger, callback, options);
            }
        }

        return _this;
    }

    /**
     * 觸發已綁定的 events
     *
     * @param trigger
     * @returns {DomHelper}
     */
    trigger(trigger) {
        let _this = this;
        let triggerArray = trigger.split(" ");

        for (let index of _this._selector.keys()) {
            for (let trigger of triggerArray.values()) {
                let event = new CustomEvent(trigger);
                _this._selector[index].dispatchEvent(event);
            }
        }

        return _this;
    }

    /**
     * 其他
     */

    /**
     * 送出表單
     */
    submit() {
        let _this = this;

        _this._selector[0].submit();
    }

    /**
     * 獲取操作的元素Node
     *
     * @returns {Element|*}
     */
    get() {
        let _this = this;

        return _this._selector;
    }

    /**
     * 設定元素
     *
     * @param $elem
     * @returns {DomHelper}
     */
    set($elem) {
        let _this = this;

        _this._selector = [...$elem];

        return _this;
    }
}
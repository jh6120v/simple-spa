(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{127:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return c});var r=n(319);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var c=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=u(this,a(t).call(this))).setTemplate("app_container"),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(t,r["a"]),t}()},319:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n(49),o=n(48);function u(e,t,n,r,o,u,a){try{var i=e[u](a),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,o)}function a(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e){u(a,r,o,i,c,"next",e)}function c(e){u(a,r,o,i,c,"throw",e)}i(void 0)})}}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.template="",this.scope=void 0,this.disableRender=!1,this.autoRender=!0,this.data={},this.output=""}var t,u,c;return t=e,(u=[{key:"process",value:function(){var e=a(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.prev=1,e.next=4,t.beforeRender();case 4:return e.next=6,t.render();case 6:return e.next=8,t.afterRender();case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1);case 13:case"end":return e.stop()}},e,this,[[1,10]])}));return function(){return e.apply(this,arguments)}}()},{key:"beforeRender",value:function(){var e=a(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=a(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!1!==(t=this).disableRender){e.next=13;break}return t.data=Object.assign({},t.data,{store:o.a}),e.next=6,n(320)("./".concat(t.template,".ejs"));case 6:return t.compiledTemplate=e.sent,e.next=9,t.compiledTemplate.default(t.data);case 9:if(t.output=e.sent,!t.autoRender||!t.scope){e.next=13;break}return e.next=13,r.a.getElement(t.scope).html(t.output);case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"afterRender",value:function(){var e=a(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"setTemplate",value:function(e){this.template=e}}])&&i(t.prototype,u),c&&i(t,c),e}()},320:function(e,t,n){var r={"./app_container.ejs":[322,7],"./home.ejs":[323,8],"./second_page.ejs":[324,9],"./third_page.ejs":[325,10]};function o(e){if(!n.o(r,e))return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=r[e],o=t[0];return n.e(t[1]).then(function(){return n.t(o,7)})}o.keys=function(){return Object.keys(r)},o.id=320,e.exports=o}}]);
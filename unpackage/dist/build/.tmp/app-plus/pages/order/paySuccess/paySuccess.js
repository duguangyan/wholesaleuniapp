(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/paySuccess/paySuccess"],{"1d66":function(n,t,o){"use strict";(function(n){o("b440"),o("921b");e(o("66fd"));var t=e(o("9503"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,o("6e42")["createPage"])},"3a56":function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement,e=(n._self._c,o("fd64"));n.$mp.data=Object.assign({},{$root:{m0:e}})},r=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return r})},"486f":function(n,t,o){},"5ae3":function(n,t,o){"use strict";o.r(t);var e=o("da19"),r=o.n(e);for(var a in e)"default"!==a&&function(n){o.d(t,n,function(){return e[n]})}(a);t["default"]=r.a},9503:function(n,t,o){"use strict";o.r(t);var e=o("3a56"),r=o("5ae3");for(var a in r)"default"!==a&&function(n){o.d(t,n,function(){return r[n]})}(a);o("a4d1");var i=o("2877"),u=Object(i["a"])(r["default"],e["a"],e["b"],!1,null,"2e41a827",null);t["default"]=u.exports},a4d1:function(n,t,o){"use strict";var e=o("486f"),r=o.n(e);r.a},da19:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){return Promise.all([o.e("common/vendor"),o.e("components/common/StrictlyGoods")]).then(o.bind(null,"61d0"))},r=function(){return Promise.all([o.e("common/vendor"),o.e("components/common/AdvertisingPosition")]).then(o.bind(null,"0d04"))},a={data:function(){return{orderSn:""}},components:{StrictlyGoods:e,AdvertisingPosition:r},onLoad:function(n){this.orderSn=n.orderSn},onShow:function(){},methods:{goPath:function(n){n&&(location.href=n)},checkOrderDetal:function(){n.navigateTo({url:"/pages/order/goodsDetail/goodsDetail?orderId="+this.orderSn})},goHome:function(){n.switchTab({url:"/pages/main/main"})}}};t.default=a}).call(this,o("6e42")["default"])}},[["1d66","common/runtime","common/vendor"]]]);
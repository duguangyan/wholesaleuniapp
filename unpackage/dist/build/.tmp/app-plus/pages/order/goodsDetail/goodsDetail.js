(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/goodsDetail/goodsDetail"],{6247:function(t,o,e){"use strict";var s=function(){var t=this,o=t.$createElement,s=(t._self._c,e("c2d5")),i=e("6938"),a=t.__map(t.good.goodsDetailSpecList,function(o,e){var s=t.__map(o.goodsDetailSpecValueList,function(o,e){var s=t.getStatus(o.value),i=t.getStatus(o.value);return{$orig:t.__get_orig(o),m2:s,m3:i}});return{$orig:t.__get_orig(o),l0:s}});t._isMounted||(t.e0=function(o){t.isShare=!0},t.e1=function(o){t.isStandard=!0},t.e2=function(o){return t.$router.push("/")},t.e3=function(o){t.isSure=!1},t.e4=function(o){t.isSure=!1},t.e5=function(o){t.isShare=!1},t.e6=function(o){t.isStandard=!1},t.e7=function(o){t.isPlayer=!1}),t.$mp.data=Object.assign({},{$root:{m0:s,m1:i,l1:a}})},i=[];e.d(o,"a",function(){return s}),e.d(o,"b",function(){return i})},"8ba2":function(t,o,e){"use strict";var s=e("debd"),i=e.n(s);i.a},cc9d:function(t,o,e){"use strict";e.r(o);var s=e("cd2d"),i=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(o,t,function(){return s[t]})}(a);o["default"]=i.a},cd2d:function(t,o,e){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var s=u(e("12ec")),i=u(e("5ff4")),a=e("c87f"),n=u(e("e0d7")),r=u(e("122c"));function u(t){return t&&t.__esModule?t:{default:t}}function d(t){return h(t)||l(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function h(t){if(Array.isArray(t)){for(var o=0,e=new Array(t.length);o<t.length;o++)e[o]=t[o];return e}}var f=function(){return Promise.all([e.e("common/vendor"),e.e("components/good/Share")]).then(e.bind(null,"4923"))},g=function(){return e.e("components/common/Player").then(e.bind(null,"e988"))},m=function(){return e.e("components/good/Standard").then(e.bind(null,"491d"))},p={data:function(){return{indicatorDots:!1,autoplay:!0,interval:3e3,duration:500,shopId:"",goodsId:"",curDisable:!1,nums:1,startNum:1,curs:[],totalPrice:0,stock:0,deep:1,list:[],isPlayer:!1,videoUrl:"",imageList:[],videoObj:{},postType:0,isStandard:!1,good:{hasColletion:!1,rules:[],goods:{},goodsSkuList:[],standardList:[]},cur:0,total:0,icon:{ColSta:s.default,ColAct:i.default},counter:0,isSure:!1,isShare:!1,nav:""}},components:{Share:f,Standard:m,Player:g},computed:{payPrice:function(){return r.default.formatMoney(100*this.totalPrice*this.nums/100,2)}},onLoad:function(t){this.shopId=t.shopId,this.goodsId=t.goodsId},onShow:function(){var o=this;t.getStorageSync("access_token")&&(0,a.getGoodNums)({status:""}).then(function(t){o.counter=t.data.itemNum}),(0,a.getDetail)({shopId:this.shopId,goodsId:this.goodsId}).then(function(t){var e=t.data.goodsDetail;e.hasColletion=t.data.hasColletion,e.standardList=[],e.goods.minPrice=r.default.formatMoney(e.goods.minPrice,2),e.goods.maxPrice=r.default.formatMoney(e.goods.maxPrice,2);var s=[];e.goodsImgVOList.forEach(function(t){2!=t.type?s.push(t):o.videoObj[t.sort]=t.imgUrl}),o.imageList=s,o.total=s.length,null==e.goods.unitName&&(e.goods.unitName=e.goodsDetailSpecList[0].name);var i,u=function(t,o){return t[o]={},t[o]},d={},c=[d];e.goodsDetailSpecList.forEach(function(t){c.forEach(function(o){var e=[];t.goodsDetailSpecValueList.forEach(function(t,s){e[s]=u(o,t.value)}),c=e})});var l=1==e.goods.showStyle&&e.goodsSkuList.length>1;i=e.goodsDetailSpecList[0].valueSuffix||"";var h=JSON.parse(e.goodsSkuList[0].priceExp);2==e.goods.showStyle&&(e.goodsSkuList[0].price=h[0].price,e.goodsSkuList[0].startNum=h[0].startQuantity);var f=!0;if(e.goodsSkuList.forEach(function(t,o){var s=d,a=t.attrValueList.length;e.standardList[o]=[],t.attrValueList.forEach(function(n,r){s=s[n.value],a-1==r&&(s.disabled=!!(t.stock<t.startNum),s.price=t.price,s.stock=t.stock,s.id=t.id,s.startNum=t.startNum),l?(e.standardList[o].push("".concat(n.value).concat(e.goods.unitName,"起批")),e.standardList[o].push("".concat(n.value).concat(i,"/").concat(e.goods.unitName))):e.standardList[o].push(n.value),f=f&&s.disabled}),e.standardList[o].push("￥".concat(t.price,"/").concat(e.goods.unitName))}),e.tree=d,e.isInvalid=f,3!=e.goods.status&&n.default.tips("商品已下架啦,看下其它的吧"),2==e.goods.showStyle){var g=e.goodsSkuList[0].attrValueList[0];e.goodsList=[],h.forEach(function(t,o){e.goodsList.push({startNum:t.startQuantity,price:t.price,unit:g.name,id:g.skuId})})}e.sufName=i,o.good=e||{},o.deep=o.good.goodsDetailSpecList.length,o.good.goodsDetailSpecList.forEach(function(t){o.curs.push({key:t.goodsDetailSpecValueList[0].value,disabled:void 0})}),o.calcPrice(),(0,a.getPostItem)({id:e.goods.postSettingId}).then(function(t){o.postType=t.data.type})})},methods:{doIncrease:function(){this.nums<this.stock&&++this.nums,this.calcPrice(1)},doDecrease:function(){+this.nums>this.startNum&&(--this.nums,this.curDisable||(this.nums=this.startNum)),this.calcPrice(1)},checkNum:function(t){var o=+t.target.value;o>this.stock?(n.default.tips("超出库存"+this.stock+"啦"),this.nums=this.stock):o<this.startNum&&(this.curDisable||(n.default.tips("起批量不能低于"+this.startNum),this.nums=this.startNum)),this.calcPrice(1)},getStatus:function(t){for(var o=this.good.tree,e=0;e<this.deep;e++){if(e===this.deep-1)return o=o[t],!!o&&o.disabled;o=o[this.curs[e]["key"]]}},calcPrice:function(t){var o=this,e=this.good.tree;if(2!=this.good.goods.showStyle)this.curs.forEach(function(s,i){e=e[s["key"]],i===o.curs.length-1&&(o.totalPrice=r.default.formatMoney(parseFloat(e.price||0),2),o.stock=e.stock,!t&&(o.nums=e.disabled?0:e.startNum),o.startNum=e.startNum||0,s.disabled=e.disabled,o.curDisable=e.disabled)});else{this.curs.forEach(function(s,i){e=e[s["key"]],i==o.curs.length-1&&(o.stock=e.stock,!t&&(o.nums=e.disabled?0:e.startNum),s.disabled=e.disabled)});var s=d(this.good.goodsList),i=s[0],a=s[s.length-1];s.push({startNum:Math.pow(2,25),price:a.price}),s.unshift({startNum:i.startNum,price:i.price}),this.startNum=i.startNum;for(var n=1,u=s.length-1;n<u;n++)this.nums>=s[n].startNum&&this.nums<s[n+1].startNum&&(this.totalPrice=r.default.formatMoney(s[n].price,2))}},selOption:function(t,o){this.getStatus();var e=d(this.curs);e[o]["key"]=t,this.curs=e,this.calcPrice()},navigate:function(){for(var o=this,e=!1,s=this.good.tree,i=0;i<this.deep;i++)s=s[this.curs[i]["key"]],i===this.deep-1&&(e=s.disabled);if(e)return n.default.tips("请选择所有的项");if(this.nav.match(/cart/))(0,a.addToCart)({skuId:s.id,num:this.nums}).then(function(t){o.isSure=!1,o.getUpdate()});else if(this.nav.match(/submit/i)){var r=JSON.stringify({addressId:"",goodsCount:this.nums,goodsId:this.goodId,shopId:this.shopId,skuId:s.id});t.navigateTo({url:"/pages/order/submit/submit?submitData="+r+"&isBuyNow=1"})}else t.navigateTo({url:"/pages/order/order"})},goCart:function(){t.switchTab({url:"/pages/order/order"})},goPostSetting:function(o){t.navigateTo({url:"/pages/order/prompt/prompt?id="+o})},getUpdate:function(){var o=this;t.getStorageSync("access_token")&&(0,a.getGoodNums)({status:""}).then(function(t){o.counter=t.data.itemNum,o.isSure=!1,n.default.tips(o.good.goods.name+"已成功加入进货单")})},play:function(t){3==t.type&&(this.videoUrl=this.videoObj[t.sort],this.isPlayer=!0)},triShare:function(){},changeBanner:function(t){this.cur=t},showConfirm:function(t){this.nav=t,this.isSure=!0},changeCollect:function(){this.good.hasColletion=!this.good.hasColletion,this.good.hasColletion?(0,a.setCollect)({goodsId:this.good.goods.id}):(0,a.removeCollect)({goodsId:this.good.goods.id})}}};o.default=p}).call(this,e("6e42")["default"])},debd:function(t,o,e){},e908:function(t,o,e){"use strict";e.r(o);var s=e("6247"),i=e("cc9d");for(var a in i)"default"!==a&&function(t){e.d(o,t,function(){return i[t]})}(a);e("8ba2");var n=e("2877"),r=Object(n["a"])(i["default"],s["a"],s["b"],!1,null,"0beac957",null);o["default"]=r.exports},f299:function(t,o,e){"use strict";(function(t){e("b440"),e("921b");s(e("66fd"));var o=s(e("e908"));function s(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,e("6e42")["createPage"])}},[["f299","common/runtime","common/vendor"]]]);
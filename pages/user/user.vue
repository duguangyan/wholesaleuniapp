<template>
	<view class="mine">
		<view class="top">
			<view class="img">
				<image src="/static/img/bg-mine.png" mode=""></image>
			</view>
			<!-- <view class="setting" @click="goSettingPage">
				<image src="/static/img/icon-setting.png" mode=""></image>
			</view> -->
			<!-- 我的状态 -->
			<view class="status">
				<view class="img">
					<image :src="headimageUrl || '/static/img/shop-avatar.png'" @click="goInfo"></image>
				</view>

				<view class="content">
					<view v-if="isLogin" @click="goInfo">
						<view class="uid fs34">{{nickName || '正鼎农品'}}</view>
						<view class="role" v-if="roleId == '20001'">货主</view>
						<view class="role" v-if="roleId == '20004'">企业</view>
						<view class="role" v-if="roleId == '20002'">代办</view>
					</view>
					<view class="fs30 mgl-10" v-if="!isLogin" @click="goLogin">点击登录</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="order">
			<view class="title cf" @click="goOrderList('')" :class="{'Android1': platform == 1}">
				<view class="p1 fll fs36">我的订单</view>
				<view class="img flr" :class="{platformOPPO: platform == 1}">
					<image src="/static/img/tag-go.png" />
				</view>
				<view :class="['p2','text-999','fs24','flr',platform==1?'nmt':'']">全部订单</view>
			</view>
			<view class="tags">
				<view class="li" v-for="(item,index) in titles" :key="index" @click="goOrderList(index)">
					<view class="img" :class="{'Android4': platform == 1}">
						<image :src="item.u"></image>
					</view>
					<view class="tip" v-if="item.tip!=''">{{item.tip}}</view>
					<view class="fs24 mgt-10" :class="{'Android3': platform == 1}">{{item.t}}</view>
				</view>
				<view class="li" @click="navToRefund">
					<view class="img" :class="{'Android4': platform == 1}">
						<image src="/static/imgs/icon-refund.png"></image>
					</view>
					<view class="fs24 mgt-10" :class="{'Android3': platform == 1}">退款</view>

				</view>
			</view>
		</view>

		<!--  -->
		<view class="gray-line"></view>
		<view class="single-item fir-item" @click="navToAd">
			<text>我的地址</text>
			<image src="/static/img/tag-go.png" />
		</view>

		<!-- <view class="single-item fir-item" @click="navPurchase">
			<text>我的采购</text>
			<image src="/static/img/tag-go.png" />
		</view>

		<view class="single-item fir-item" @click="navCustomer">
			<text>客服</text>
			<image src="/static/img/tag-go.png" />
		</view>  -->

		<view class="single-item fir-item" @click="navToSys">
			<text>设置</text>
			<image src="/static/img/tag-go.png" />
		</view>
		<!-- <view class="single-item fir-item" @click="goChatList">
			<text>消息</text>
			<image src="/static/img/tag-go.png" />
		</view> -->
		<!-- <view class="single-item" @click="goQQ">
	  <text>QQ客服</text>
	  <image src="/static/img/tag-go.png"/>
	</view> -->
	</view>
</template>

<script>
	import TabBar from '@/components/common/TabBar.vue'
	import {
		getOrderStat,
		getUserRealInfoAll,
		getImToken
	} from '@/api/userApi.js'
	import T from '@/utils/tips.js'
	export default {
		data() {
			return {
				v: '',
				checkIndex: 2,
				titles: [{
						t: '待确认',
						u: '/static/imgs/icon-1008.png',
						tip: ''
					},
					{
						t: '待支付',
						u: '/static/imgs/icon-1005.png',
						tip: ''
					},
					{
						t: '待发货',
						u: '/static/imgs/icon-1006.png',
						tip: ''
					},
					{
						t: '待收货',
						u: '/static/imgs/icon-1007.png',
						tip: ''
					},
				],
				isLogin: false,
				uid: '',
				phone: '',
				headimageUrl: '/static/imgs/shop-avatar.png',
				nickName: '',
				platform: 0,
				roleId: ''
			}
		},
		components: {
			TabBar
		},
		onLoad() {

		},
		onShow() {

			// 设备样式兼容
			this.platform = uni.getStorageSync('platform');
			// 获取phone 和 uid
			this.phone = uni.getStorageSync('phone')
			this.uid = uni.getStorageSync('uid')
			this.nickName = uni.getStorageSync('nickName')
			let imageUrl = uni.getStorageSync('headImgUrl')
			this.headimageUrl = imageUrl && imageUrl !== 'null' ? imageUrl : '/static/imgs/shop-avatar.png'
			// 判断是否登录
			this.isLogin = this.uid != ''
			this.roleId = uni.getStorageSync('roleId') || ''

			// 统计订单状态条数
			if (uni.getStorageSync('access_token')) {

				this.getUserInfoDates()
			}
			// 上一页返回
			this.$eventHub.$on('goBlack', (data) => {
				this.titles = [{
						t: '待确认',
						u: '/static/imgs/icon-1008.png',
						tip: ''
					},
					{
						t: '待支付',
						u: '/static/imgs/icon-1005.png',
						tip: ''
					},
					{
						t: '待发货',
						u: '/static/imgs/icon-1006.png',
						tip: ''
					},
					{
						t: '待收货',
						u: '/static/imgs/icon-1007.png',
						tip: ''
					}
				]
				this.$eventHub.$off('goBlack');
			})
		},
		computed: {
			dPhone() {
				return `${this.phone.substr(0, 3)}****${this.phone.substr(7)}`
			}
		},
		methods: {
			// 去采购
			navPurchase() {

			},
			// 联系客服
			navCustomer() {
				uni.makePhoneCall({
					phoneNumber: '19866060601'
				});
			},
			// 去消息
			navToRefund() {
				uni.navigateTo({
					url: '/pages/refund/refund?businessType=2'
				})
			},
			goChatList() {
				let token = uni.getStorageSync('access_token')
				if (token) {
					getImToken().then(res => {
						if (res.code == '1000') {
							let uid = uni.getStorageSync('uid')
							let url = encodeURIComponent('http://im.qinlvny.com/#/session?id=' + uid + '&tk=' + res.data)
							//let url = encodeURIComponent('http://duu-u.imwork.net:20123/webdemo/h5/index.html#/chat/p2p-duguangyan1?account=qinlv1&password=123456')
							//let url = encodeURIComponent('http://duu-u.imwork.net:20123/webdemo/h5/index.html#/session?account='+account+'&password='+password+'&nickname='+nickname)
							console.log('url', url)
							uni.navigateTo({
								url: "/pages/user/chatList/chatList?url=" + url
							})
						} else {
							T.tips("请求IM数据失败")
						}
					})
				} else {
					T.tips("请先登录")
				}

			},
			// 去QQ客服
			goQQ() {
				uni.navigateTo({
					url: '/pages/common/webview/webview?url=http://wsm.qinlvny.com/static/qq.html'
				})
			},
			navToAd() {
				let token = uni.getStorageSync('access_token')
				if (token) {
					uni.navigateTo({
						url: '/pages/user/addlist/addlist'
					})
				} else {
					T.tips("请先登录")
				}

			},
			navToSys() {
				uni.navigateTo({
					url: '/pages/user/sys/sys'
				})
			},
			// 获取用户信息
			getUserInfoDates() {
				if (this.roleId) {
					// 设置底部tab样式
					if (this.roleId == '20002') {
						uni.setTabBarItem({
							index: 1,
							text: '代办',
							iconPath: 'static/img/2.1.png',
							selectedIconPath: 'static/img/2.2.png'
						})
					}
					if (this.roleId == '20003') {
						uni.setTabBarItem({
							index: 1,
							text: '入驻',
							iconPath: 'static/img/2.1.png',
							selectedIconPath: 'static/img/2.2.png'
						})
					} else if (this.roleId == '20001' || this.roleId == '20004') {
						uni.setTabBarItem({
							index: 1,
							text: '发布',
							iconPath: 'static/img/4.1.png',
							selectedIconPath: 'static/img/4.2.png'
						})
					}
				}
				getUserRealInfoAll().then((res) => {
					if (res.code === '1000') {
						let roleId = res.data.userRole.roleId || ''

						this.getOrderStat()
						uni.setStorageSync('nickName', res.data.user.realName || (res.data.userRealInfo ? res.data.userRealInfo.realName :
							'') || res.data.apply.realName)
						uni.setStorageSync('headImgUrl', res.data.user.headImgUrl)
						uni.setStorageSync('roleId', roleId)
						uni.setStorageSync('userRealInfo', res.data.userRealInfo ? JSON.stringify(res.data.userRealInfo) : '')
						uni.setStorageSync('userApply', res.data.apply.id ? JSON.stringify(res.data.apply) : '')

						this.nickName = res.data.apply.enterpriseName || uni.getStorageSync('nickName')
						let imageUrl = uni.getStorageSync('headImgUrl')
						this.headimageUrl = imageUrl && imageUrl !== 'null' ? imageUrl : '/static/imgs/shop-avatar.png'
						this.roleId = uni.getStorageSync('roleId') || ''

					}
				})
			},
			// 统计订单状态条数
			getOrderStat() {
				let data = {
					businessType: 2 // 1销售订单  2我的订单
				}
				getOrderStat(data).then(res => {
					//状态 -1 已取消 0 待支付 1 已支付   2 未发货  3 已发货  4已完成  5 已关闭 6 待审核"
					if (res.code == '1000') {
						let list = res.data
						list.forEach((item, index) => {
							let roleId = uni.getStorageSync('roleId')
							// if(roleId == '20001') {
							// 	if(item.status == 6) this.titles[0].tip = item.num	
							// }
							// if(roleId == '20002'){
							// 	if(item.status == 2) this.titles[2].tip = item.num
							// }
							if (item.status == 0) this.titles[1].tip = item.num
							if (item.status == 3) this.titles[3].tip = item.num
						})
						
						this.$nextTick(function() {
							this.titles = this.titles
						})
						
					}
				})
			},
			// 去收藏页面
			goCollection() {
				uni.navigateTo({
					url: '/pages/user/collection/collection'
				})
			},
			// 去设置页面
			goSettingPage() {
				if (uni.getStorageSync('access_token')) {
					uni.navigateTo({
						url: '/pages/user/setting/setting'
					})
				} else {
					T.tips('请先登录')
				}

			},
			// 去订单页面
			goOrderList(index) {
				if (uni.getStorageSync('access_token')) {
					if (index == 4) { // 去退款页面
						uni.navigateTo({
							url: '/pages/refund/refund?businessType=2'
						})
					} else {
						let i = index === '' ? '' : index + 1
						if (index == 4) i = ''
						uni.setStorageSync('orderNavIndex', i)
						uni.navigateTo({
							url: '/pages/user/order/list?from=user&businessType=2'
						})
					}


				} else {
					T.tips('请先登录')
				}

			},
			goInfo() {
				if (this.isLogin) {
					this.goSettingPage()
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			// 去登录
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gray-line {
		height: 20upx;
		width: 100%;
		background: #f5f5f5;
	}

	.fir-item {
		margin-top: 60upx;
		border-bottom: 1px solid #f5f5f5;
	}

	.single-item {
		line-height: 100upx;
		color: #333;
		font-size: 30upx;
		display: flex;
		justify-content: flex-start;
		margin: 0 30upx;
		align-items: center;

		image {
			width: 20upx;
			height: 20upx;
		}

		&>text {
			flex-grow: 1;
		}
	}

	.Android1 {
		position: relative;
		top: 24upx !important;
	}

	.Android2 {
		position: relative;
		top: 2upx !important;
	}

	.Android3 {
		position: relative;
		top: 10upx !important;
	}

	.Android4 {
		position: relative;
		top: -6upx !important;
	}

	.nmt {
		margin-top: -6upx;
	}

	.fg1 {
		flex-grow: 1;
	}

	.mine {

		// padding-bottom: 100upx;
		.bb1 {
			position: fixed;
			height: 0.5upx;
			bottom: 0upx;
			background: #f0f0f0;
			width: 100%;
		}

		.collection {
			border-bottom: 0.5upx solid #f0f0f0;
			margin-left: 30upx;
		}

		position: relative;
		height: 100vh;
		background: #fff;

		/* #ifdef APP-PLUS || H5 */
		.top {
			width: 100%;
			height: 260upx;

			.img {
				width: 100%;
				height: 260upx;
				// overflow: hidden;
				position: absolute;
				top: 0;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			.setting {
				width: 48upx;
				height: 48upx;
				position: absolute;
				right: 30upx;
				top: 100upx;
				z-index: 999999;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			.status {
				padding: 0upx 20upx 33upx 30upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;
				top: 120upx;

				.role {
					margin-top: 10upx;
					transform: scale(0.8);
					width: 66upx;
					// height:34upx;
					// line-height: 34upx;
					text-align: center;
					background: rgba(255, 219, 176, 1);
					border-radius: 20upx;
					font-size: 24upx;
					padding: 6upx 0;
					color: rgba(254, 59, 11, 1);
					// position: absolute;
					// bottom: -14upx;
					// left: 50%;
					// transform: translateX(-50%);
					z-index: 999999;
				}

				.img {
					width: 90upx;
					height: 90upx;
					position: relative;
					z-index: 999999;

					>image {
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}
			}

			/* #endif */
			/* #ifdef MP-WEIXIN */
			.top {
				width: 100%;
				height: 260upx;

				.img {
					width: 100%;
					height: 260upx;
					// overflow: hidden;
					position: absolute;
					top: 0;

					>image {
						width: 100%;
						height: 100%;
					}
				}

				.setting {
					width: 48upx;
					height: 48upx;
					position: absolute;
					right: 30upx;
					top: 130upx;
					z-index: 999999;

					>image {
						width: 100%;
						height: 100%;
					}
				}

				.status {
					padding: 0upx 20upx 33upx 40upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					position: relative;
					top: 120upx;

					.role {
						width: 54upx;
						height: 24upx;
						line-height: 24upx;
						text-align: center;
						background: rgba(255, 219, 176, 1);
						border-radius: 12upx;
						font-size: 20upx;
						color: rgba(254, 59, 11, 1);
						position: absolute;
						bottom: 28upx;
						left: 56upx;
						z-index: 999999;
					}

					.img {
						width: 90upx;
						height: 90upx;
						position: relative;
						z-index: 999999;

						>image {
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
					}
				}

				/* #endif */



				.content {
					margin-left: 20upx;
					color: #fff;
				}

				.uid {}

				.phone {
					margin-top: 2upx;
				}
			}

			.order {
				padding: 8upx 30upx 20upx 20upx;

				// border-bottom: 20upx solid #f0f0f0;
				.title {
					border-bottom: 1upx solid #f0f0f0;
					padding-bottom: 30upx;
					/*  #ifdef MP-WEIXIN  */
					padding-bottom: 20upx;
					/*  #endif  */
					/*  #ifdef H5  */
					padding-bottom: 20upx;
					/*  #endif  */
					// height: 60upx;
					position: relative;
					top: 14upx;

					.mt10 {
						top: 30upx;
					}

					.img {
						width: 20upx;
						height: 20upx;
						position: relative;
						top: 20upx;
						/* #ifdef MP-WEIXIN */
						top: 10upx;
						/* #endif */

						>image {
							width: 100%;
							height: 100%;
						}

					}

					.platformOPPO {
						top: 10upx !important;
					}

					&>.p2 {
						color: #999;
						margin-right: 4upx;
						position: relative;
						top: 14upx;
					}

					&>.p1 {
						color: #333;
						font-weight: blod;
						position: relative;
						top: 4upx;
						left: 10upx;
					}

					&>image {
						margin-left: 4upx;
					}
				}

				.tags {
					display: flex;
					padding: 20upx 30upx;
					justify-content: space-between;
					align-items: center;
					text-align: center;
					padding-top: 45upx;

					.li {
						list-style: none;
						font-size: 12upx;
						color: #010101;
						position: relative;

						.tip {
							width: 32upx;
							height: 32upx;
							background: rgba(254, 59, 11, 1);
							border: 2upx solid rgba(255, 255, 255, 1);
							border-radius: 50%;
							font-size: 16upx;
							color: #fff;
							text-align: center;
							line-height: 32upx;
							position: absolute;
							right: -10upx;
							top: -12upx;
						}

						.img {
							width: 48upx;
							height: 48upx;
							margin: 0 auto;

							>image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}

			.collection {

				.body {
					padding: 0 30upx 0upx 0upx;
					color: #333;
					line-height: 100upx;

					.img {
						width: 20upx;
						height: 20upx;

						>image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
</style>

<template>
	<view style="background: #f2f2f2;height: 100vh;">
		<view class="my_title" :style="{height:height+50+'px'}">
			<view :style="{paddingTop:top+'rpx'}" style="z-index: 999;padding-left: 15rpx;">
				<van-button color="#EDEDED" class="my_title_but my_title_but1" @click="setUp">
					<img class="my_title_but_img" src="../../static/image/icon_setUp.png" />
				</van-button>
			</view>
			我的
		</view>
		<view class="amount">
			<button round type="default" class="amount_but" @click="topUap">充值</button>
			<img class="amount_img" src="../../static/image/icon_my.png" />
			<view class="amount_top">配送余额￥</view>
			<view class="amount_bottom">{{ money / 100 }}</view>
		</view>
		<view class="my_bottom">
			<view class="my_bottom_list">
				<van-icon style="width: 32rpx;vertical-align: middle;margin-right: 10rpx;" class="my_bottom_list_img"
					color="#626EEE" name="manager-o" />
				<span>注册人</span>
				<view class="my_bottom_right">
					{{ shopname }}
				</view>
			</view>
			<view class="my_bottom_list">
				<img class="my_bottom_list_img" src="../../static/image/merchants_id.png" />
				<span>商户ID</span>
				<view class="my_bottom_right">
					{{ id }}
				</view>
			</view>
			<view class="my_bottom_list" @click="businessCenter()">
				<img class="my_bottom_list_img" src="../../static/image/merchants_center.png" />
				<span>商家中心</span>
				<view class="my_bottom_right">
					<van-icon class="my_bottom_right_img" name="arrow" />
				</view>
			</view>

			<view class="my_bottom_list" @click="record()">
				<img class="my_bottom_list_img" src="../../static/image/icon_feedback.png" />
				<span>配送账单</span>
				<view class="my_bottom_right">
					<van-icon class="my_bottom_right_img" name="arrow" />
				</view>
			</view>
			<view class="my_bottom_list" @click="recharge()">
				<img class="my_bottom_list_img" src="../../static/image/icon_receipts.png" />
				<span>充值记录</span>
				<view class="my_bottom_right">
					<van-icon class="my_bottom_right_img" name="arrow" />
				</view>
			</view>
			<view class="my_bottom_list" @click="binding()">
				<img class="my_bottom_list_img" src="../../static/image/icon_receipts.png" />
				<span>绑定账号</span>
				<view class="my_bottom_right">
					<van-icon class="my_bottom_right_img" name="arrow" />
				</view>
			</view>
		</view>
		<view class="manual">
			<view class="my_bottom_list" @click="manual()">
				<img class="my_bottom_list_img" src="../../static/image/icon_manual.png" />
				<span>手动发单</span>
				<view class="my_bottom_right">
					<van-icon class="my_bottom_right_img" name="arrow" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				height: '',
				showBack: true,
				top: 0,
				show: false,
				id: "",
				token: "",
				shopname: "",
				money: 0,
				newsEditor: false,
				forbidClick: true,
				userName: "",
				signature: "",
				isDisabledSubmitBtn: true, //按钮是否禁用
				radio: "1",
				payType: false,
				current: ""
			}
		},
		onLoad() {
			//#ifdef MP
			this.top = 80
			//#endif
			console.log(wx.openLocation)
			var _this = this;
			// 获取手机状态栏高度
			uni.getSystemInfo({
				success: function(data) {
					// 将其赋值给this
					_this.height = data.statusBarHeight;
				}
			})
		},
		mounted() {
			if (this.show == false) {
				this.detection();
			}
		},
		methods: {
			manual() {
				uni.navigateTo({
					url: '../manual/manual'
				})
			},
			detection() {
				var that = this;
				that.id = JSON.parse(uni.getStorageSync("id"));
				that.token = JSON.parse(uni.getStorageSync("token"));
				console.log(that.token)
				that.shopname = JSON.parse(uni.getStorageSync("my")).shopBoos;
				that.into();
				var that = this;
				if (uni.getStorageSync("orderId")) {
					that.payType = true;
				} else {
					that.payType = false;
				}
			},
			into() {
				var that = this;
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[15].interface,
						data: {
							shopId: that.id
						},
						transformRequest: [
							function(data) {
								let ret = "";
								ret = that.$qs.stringify(data);
								return ret;
							}
						],
						header: {
							Authorization: that.token,
							"Content-Type": "application/x-www-form-urlencoded"
						}
					})
					.then(function(res) {
						var e = that.interactionDetection(res[1]);
						if (e.data.status == 0) {
							that.money = e.data.data;
							that.forbidClick = false;
						} else {
							that.$toast(res.data.msg);
						}
					});
			},
			businessCenter() {
				uni.navigateTo({
					url: "../businessCenter/businessCenter"
				})
			},
			setUp() {
				uni.navigateTo({
					url: "../setUp/setUp"
				})
			},
			record() {
				uni.navigateTo({
					url: '../record/record'
				})
			},
			topUap() {
			      var that = this;
			      uni.navigateTo({
			      	url: '../payList/payList'
			      })
			    },
			recharge() {
			      uni.navigateTo({
			      	url:"../recharge/recharge"
			      })
			    },
			interactionDetection(res) {
				var that = this;
				console.log(res)
				if (res.data.status == 200 || res.data.status == 0) {
					return res;
				} else if (res.data.status == 7001 || res.data.status == 8001) {
					that.$toast(res.data.msg);
					window.localStorage.setItem("status", true);
					setTimeout(() => {
						that.$router.push({
							path: "/logo"
						});
					}, 500);
				} else {
					that.$toast(res.data.msg);
					return res;
				}
			}
		}
	}
</script>

<style>
	.manual {
		width: 694rpx;
		background-color: #fff;
		margin: 20rpx auto 0;
		box-shadow: 0px 0px 18rpx 0px rgba(92, 88, 88, 0.13);
		border-radius: 20rpx;
	}

	.manual>view:nth-child(1) {
		border: 0;
	}

	/* ///////////////////// */
	.my_bottom_list {
		padding: 0;
		width: 663rpx;
		height: 84rpx;
		line-height: 84rpx;
		font-size: 32rpx;
		margin: auto;
	}

	.my_bottom_list:nth-child(1) {
		border-bottom: 1rpx solid #989898;
	}

	.my_bottom_list>img {
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.my_bottom_list>view {
		float: right;
		height: 84rpx;
		line-height: 84rpx;
	}

	.my_bottom {
		width: 694rpx;
		background: #ffffff;
		box-shadow: 0px 0px 18rpx 0px rgba(92, 88, 88, 0.13);
		border-radius: 20rpx;
		margin: auto;
	}

	/* ///////////////////////// */
	.amount_img {
		position: absolute;
		top: 10rpx;
		width: 122rpx;
		height: 134rpx;
		left: 36%;
	}

	.amount_top {
		font-size: 32rpx;
		line-height: 20rpx;
		margin-top: 28rpx;
		margin-left: 50rpx;
	}

	.amount_bottom {
		margin-left: 50rpx;
		font-size: 48rpx;
		line-height: 48rpx;
		margin-top: 36rpx;
	}

	.amount_bottom>span {
		font-size: 26rpx;
		line-height: 40rpx;
		vertical-align: middle;
	}

	.amount_but {
		background-color: #fff;
		color: #5563ed;
		border-color: #fff;
		float: right;
		padding: 0;
		font-size: 34rpx;
		line-height: 44rpx;
		width: 120rpx;
		height: 44rpx;
		margin: 24rpx 30rpx 0 0;
	}

	.amount {
		width: 92%;
		height: 154rpx;
		background: linear-gradient(270deg, #8a93ed, #424dba);
		border-radius: 30rpx;
		margin: 26rpx auto 50rpx;
		overflow: hidden;
		position: relative;
		color: #fff;
	}

	/* 调整状态栏标题的位置 */
	.status_bar1 {
		position: absolute;
		margin: auto;
		bottom: 10px;
		left: 0;
		right: 0;
		color: #fff;
		text-align: center;
	}

	.my_title_but {
		width: 95rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.my_title_but1 {
		position: absolute;
		left: 0;
	}
</style>

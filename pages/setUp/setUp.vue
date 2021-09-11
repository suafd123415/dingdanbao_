<template>
	<view class="setUp" :style="{top:top+'rpx'}" style="height: 100vh;background: #f2f2f2;">
		<!-- <view class="my_title">
      设置
      <van-button
        color="#EDEDED"
        type="primary"
        class="my_title_but my_title_but2"
        @click="back()"
      >
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button>
    </view> -->
		<view class="mar_bot">
			<van-cell class="setUpList" title="账号与安全" is-link @click="accountSecurity()" />
		</view>
		<view class="mar_bot">
			<van-cell class="setUpList" title="通用" is-link />
		</view>
		<view class="mar_bot">
			<van-cell class="setUpList" title="关于订单宝" is-link @click="about()" />
		</view>
		<van-button color="#5563ED" class="exit" type="primary" block @click="out()">退出登录</van-button>
	</view>
</template>

<script>
	// import axiosw from "../../request.json";
	export default {
		name: "setUp",
		data() {
			return {
				top: 92,
				account: "",
				storePhone: "",
				storeAddress2: "",
				shopTime: "",
				show: false,
				show1: false,
				sms: "",
				message: "",
				id: "",
				token: ""
			};
		},
		mounted() {
			var that = this;
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("token"));
		},
		onLoad() {
			//#ifdef MP
			this.top = 0
			//#endif
		},
		methods: {
			back() {
				this.$router.push({
					path: "/"
				});
			},
			accountSecurity() {
				uni.navigateTo({
					url: "../accountSecurity/accountSecurity"
				})
			},
			about() {
				uni.navigateTo({
					url: "../about/about"
				})
			},
			out() {
				uni.reLaunch({
					url: "../login/login"
				})
			}
		}
	};
</script>

<style scoped>
	.mar_bot {
		margin-bottom: 20rpx;
	}

	.setUp {
		position: fixed;
		left: 0;
		padding-top: 20rpx;
		margin: auto;
		width: 100%;
		height: 100%;
		background-color: #f3f5f7;
		overflow: hidden;
	}

	.my_title_but {
		width: 0.74rem;
		height: 0.74rem;
		line-height: 0.74rem;
		text-align: center;
	}

	.my_title_but2 {
		position: absolute;
		left: 0;
		top: 0;
	}

	.setUpList {
		margin-top: 0.2rem;
		font-size: 0.28rem;
		color: #595959;
	}

	.exit {
		width: 6.94rem;
		height: 0.72rem;
		position: fixed;
		bottom: 10%;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 100;
		border-radius: 0;
	}
</style>

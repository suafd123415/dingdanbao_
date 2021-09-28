<template>
	<view class="app">
		<view class="logo logo1">
			<!-- <view class="forget_title">
        <van-icon
          class="forget_title_icon"
          name="arrow-left"
          @click="returnLogin()"
        />
        忘记密码
      </view> -->

			<view class="logo_div logo_div1" style="margin-top:60rpx">
				<view class="logo_div_title">
					<view class="color_orange">手机号</view>
					<view class="logo_div1">
						<input class="logo_div_input" maxlength="11" placeholder="请输入手机号" v-model="val.userPhone" />
						<i class="progressBar"></i>
					</view>
				</view>
				<view class="logo_div_title">
					<view>短信验证码</view>
					<view class="logo_div1" style='display: flex;
    justify-content: space-around;'>
						<input class="logo_div_input" placeholder="请输入短信验证码" v-model="val.verCode" />
						<button size='small' color="#5563ED" @click="codeClick()" class="code" type="default">{{ code }}
						</button>
						<i class="progressBar"></i>
					</view>
				</view>
				<view class="logo_div_title">
					<view class="logo_div1 forget_height">
						<input class="logo_div_input" maxlength="15" placeholder="请输入修改密码" v-model="val.passWord" />
						<i class="progressBar"></i>
					</view>
				</view>

				<view style='width: 80%;margin: 50rpx auto;' class="">
					<van-button color="#5563ED" class="login" block type="primary" @click="but()">提交</van-button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "app",
		data() {
			return {
				type: false,
				val: {
					userPhone: "",
					verCode: "",
					passWord: ""
				},
				code: "获取验证码",
				btnDisabled: false
			};
		},
		methods: {
			sendMessage() {
				var that = this;
				if (that.sms.length != 11 || !/^1[3456789]\d{9}$/.test(that.sms)) {
					that.$notify({
						type: "danger",
						message: "电话不对"
					});
				} else {
					if (that.btnDisabled) {
						return;
					}
					that.getSecond(60);
					var phonetype;
					if (that.type == 1) {
						phonetype = "REGISTER";
					} else {
						phonetype = "FORGET";
					}
					uni.request({
							method: 'post',
							url: that.$axiosw.interface + that.$axiosw.data[1].interface,
							data: {
								userPhone: that.sms,
								source: phonetype
							},
							transformRequest: [
								function(data) {
									let ret = "";
									ret = that.$qs.stringify(data);
									return ret;
								}
							],
							header: {
								Authorization: JSON.parse(uni.getStorageSync("token")),
								"Content-Type": "application/x-www-form-urlencoded"
							}
						}).then(function(res) {
							if (res.data.status == 0) {

								uni.showToast({
									icon: "success",
									title: res[1].data.data,
									duration: 3000,
									position: 'top'
								})
							} else {
								uni.showToast({
									icon: "none",
									title:'验证码发送失败',
									duration: 3000,
									position: 'top'
								})
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},
			codeClick() {
				//发送验证码
				var that = this;
				if (
					that.btnDisabled ||
					that.val.userPhone.length != 11 ||
					!/^1[3456789]\d{9}$/.test(that.val.userPhone)
				) {
					uni.showToast({
						icon: "none",
						title: '请输入正确的手机号',
						duration: 3000,
						position: 'top'
					})
					return;
				} else {
					if (that.val.userPhone != "") {
						uni.request({
								method: "post",
								url: that.$axiosw.interface + that.$axiosw.data[36].interface,
								data: {
									userPhone: that.val.userPhone,
									source: 204
								},
								transformRequest: [
									function(data) {
										let ret = "";
										ret = that.$qs.stringify(data);
										return ret;
									}
								],
								header: {
									Authorization: JSON.parse(uni.getStorageSync("token")),
									"Content-Type": "application/x-www-form-urlencoded"
								}
							})
							.then(function(e) {
								if (e[1].data.status == 0) {
									that.getSecond(60);
								} else {
									uni.showToast({
										icon: "none",
										title: res[1].data.msg,
										duration: 3000,
										position: 'top'
									})
								}
							})
							.catch(error => {
								console.log(error);
							});
					}
				}
			},
			getSecond(wait) {
				let that = this;
				let waita = wait;
				if (wait == 0) {
					that.btnDisabled = false;
					that.code = "重新获取";
					wait = waita;
				} else {
					that.btnDisabled = true;
					that.code = "重新发送验证码(" + wait + ")";
					wait--;
					setTimeout(function() {
						that.getSecond(wait);
					}, 1000);
				}
			},
			but() {
				var that = this;
				var reg = new RegExp("^[A-Za-z0-9]+$");
				if (
					that.val.userPhone.length != 11 ||
					!/^1[3456789]\d{9}$/.test(that.val.userPhone)
				) {
					uni.showToast({
						icon: "none",
						title:'电话不对',
						duration: 3000,
						position: 'top'
					})
				} else if (that.val.verCode.length == 0) {
					uni.showToast({
						icon: "none",
						title:'验证码未输入',
						duration: 3000,
						position: 'top'
					})
				} 
				// else if (that.val.passWord.length > 6) {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title:'密码数量不对',
				// 		duration: 3000,
				// 		position: 'top'
				// 	})
				// }
				 else if (!reg.test(that.val.passWord)) {
					uni.showToast({
						icon: "none",
						title:'密码只能输入英文和数字',
						duration: 3000,
						position: 'top'
					})
				} else {
					uni.request({
							method: "post",
							url: that.$axiosw.interface + that.$axiosw.data[3].interface,
							data: {
								userPhone: that.val.userPhone,
								verCode: that.val.verCode,
								userPassword: that.val.passWord
							},
							transformRequest: [
								function(data) {
									let ret = "";
									ret = that.$qs.stringify(data);
									return ret;
								}
							],
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							}
						})
						.then(function(res) {
							if (res[1].data.status == 0) {
								var my = {
									shop_name: res[1].data.data.shop_name,
									shop_phone: res[1].data.data.shop_phone,
									customer_Phone: res[1].data.data.customer_Phone,
									version: res[1].data.data.version,
									signature: res[1].data.data.signature
								};
								uni.setStorageSync("my", JSON.stringify(my));
								uni.setStorageSync(
									"id",
									JSON.stringify(res[1].data.data.shop_id)
								);
								uni.setStorageSync(
									"token",
									JSON.stringify(res[1].data.data.token)
								);
								uni.showToast({
									icon: "success",
									title: '修改成功',
									duration: 3000,
									position: 'top'
								})
								setTimeout(() => {
									uni.navigateTo({
										url: '../login/login'
									})
								}, 1000);
							} else {
								uni.showToast({
									icon: "none",
									title: res[1].data.msg,
									duration: 3000,
									position: 'top'
								})
							}
						});
				}
			},
		}
	};
</script>

<style>
	.logo {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background-color: #5563ED; */
		background: #acb4ff;
		z-index: 10;
	}

	.logo_phone_but {
		float: right;
		font-size: 28rpx;
		padding: 0 28rpx;
		border: 0;
		background-color: transparent;
	}

	.logo_img {
		display: block;
		width: 128rpx;
		height: 128rpx;
		margin: 70rpx auto 40rpx;
	}

	.logo_div {
		/* width: 7.18rpx; */
		width: 100%;
		/* height: 70%; */
		height: 100%;
		background-color: #fff;
		margin: auto;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.logo_div_title {
		width: 630rpx;
		margin: 0 auto 0;
		font-size: 28rpx;
		color: #989898;
	}

	.logo_div_title:nth-child(1) {
		margin-top: 60rpx;
	}

	.logo_div_title:nth-child(1)>.logo_div1 {
		margin-bottom: 30rpx;
	}

	.color_orange {
		color: #000;
	}

	.logo_div1 {
		position: relative;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #d8d8d8;
	}

	.logo_div_input {
		font-size: 30rpx;
		line-height: 64rpx;
		color: #333333;
		background-color: transparent;
		width: 50%;
	}

	.progressBar {
		position: absolute;
		display: block;
		bottom: -2rpx;
		left: 0;
		width: 0%;
		height: 1rpx;
		background-color: #5563ed;
		z-index: 100;
		transition: width 0.34s;
	}

	.logo_div1:hover>.progressBar {
		width: 100%;
	}

	.forget {
		margin-right: 30rpx;
	}

	.login {
		width: 580rpx;
		height: 80rpx;
		font-size: 36rpx;
		margin: 120rpx auto 0;
		border-radius: 80rpx;
	}

	.code {
		float: right;
		padding: 0 20rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		height: 48rpx;
		border-radius: 48rpx;
	}

	.logo1 {
		background-color: rgb(240, 242, 245) !important;
	}

	.forget_title {
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		position: relative;
		font-size: 34rpx;
		background-color: #ededed;
	}

	.forget_title_icon {
		position: absolute;
		top: 0;
		left: 0;
		font-size: 34rpx;
		line-height: 72rpx;
		width: 96rpx;
	}

	.forget_height {
		margin-top: 40rpx !important;
		line-height: 60rpx !important;
	}

	.logo_div1 {
		background-color: transparent !important;
	}
</style>

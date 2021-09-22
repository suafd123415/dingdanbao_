<template>
	<view>
		<!-- <view class="my_title">
      {{ name }}
      <van-button
        color="#EDEDED"
        type="primary"
        class="my_title_but my_title_but2"
        @click="back()"
      >
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button>
    </view> -->
		<view class="password" v-if="type == 1">
			<view class="password_list">
				<span>
					原始密码
				</span>
				<input v-if="type1==false" type="password" maxlength="15" class="password_list_input"
					placeholder="请输入原始密码" v-model="value" />
				<input v-if="type1==true" maxlength="15" class="password_list_input" placeholder="请输入原始密码"
					v-model="value" />
				<van-button color="#fff" type="default" size='small' class="password_list_but" @click="sWitch1">
					<img v-if="type1 == false" class="password_list_but_img" src="../../static/image/eyes1.png" />
					<img v-else="type1 == true" class="password_list_but_img" src="../../static/image/eyes2.png" />
				</van-button>
			</view>

			<view class="password_list" v-for="(item, i) in val" :key="i">
				<span>{{ item.name }}</span>
				<input v-if="item.type == false" maxlength="15" type="password" class="password_list_input"
					placeholder="请输入密码" v-model="item.value" />
				<input v-else="item.type == true" maxlength="15" class="password_list_input" placeholder="请输入密码"
					v-model="item.value" />
				<van-button color="#fff" type="default" size='small' class="password_list_but" @click="sWitch(i)">
					<img v-if="item.type == false" class="password_list_but_img" src="../../static/image/eyes1.png" />
					<img v-else="item.type == true" class="password_list_but_img" src="../../static/image/eyes2.png" />
				</van-button>

			</view>

			<van-button color="#5563ED" class="exit" block @click="changePassword()">确定</van-button>
		</view>
		<view class="logo_view logo_view1" style="border-bottom: none;" v-else="type == 2">
			<view class="logo_view_title">
				<view class="color_orange">手机号</view>
				<view class="logo_view1">
					<input class="logo_view_input" maxlength="11" placeholder="请输入手机号" v-model="phoneval.userPhone" />
					<i class="progressBar"></i>
				</view>
			</view>
			<view class="logo_view_title">
				<view>短信验证码</view>
				<view class="logo_view1">
					<input style="display: inline-block;" class="logo_view_input" placeholder="请输入短信验证码"
						v-model="phoneval.verCode" />
					<button color="#989898" @click="codeClick()" class="code" type="default">{{ code }}</button>
					<i class="progressBar"></i>
				</view>
			</view>

			<van-button color="#5563ED" class="login" block  @click="but()">提交</van-button>
		</view>
	</view>
</template>
<script>
	export default {
		name: "setUp",
		data() {
			return {
				id: "",
				token: "",
				name: "",
				value: '', //原始密码
				type: 1,
				val: [{
						value: "",
						type: false,
						name: "密码"
					},
					{
						value: "",
						type: false,
						name: "确认密码"
					}
				],
				phonetype: false,
				phoneval: {
					userPhone: "",
					verCode: ""
				},
				code: "获取验证码",
				btnDisabled: false,
				type1: false
			};
		},
		onLoad(option) {
			let that = this
			console.log(option)
			that.name = option.title
			that.type = option.type
			uni.setNavigationBarTitle({
				title: that.name
			});
		},
		mounted() {
			var that = this;
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("token"));

		},
		methods: {
			back() {
				this.$router.go(-1); //返回上一层
			},
			sWitch(i) {
				this.val[i].type = !this.val[i].type;
			},
			sWitch1() {
				this.type1 = !this.type1;
			},
			codeClick() {
				if (this.btnDisabled) {
					return;
				} else {
					var that = this;
					if (that.phoneval.userPhone != "") {
						uni.request({
								method: "post",
								url: that.$axiosw.interface + that.$axiosw.data[36].interface,
								data: {
									userPhone: that.phoneval.userPhone,
									source: 205
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
									that.getSecond(60);
								}
							})
							.catch(error => {
								console.log(error);
							});
					} else {
						that.$toast("手机号为空");
					}
				}
			},
			getSecond(wait) {
				//发送验证码
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
			changePassword() {
				var that = this;
				if (that.value == '') {
					uni.showToast({
						icon: "none",
						title: '旧密码不能为空',
						duration: 3000,
						position: 'top'
					})
				} else if (that.val[0].value.length == "") {
					uni.showToast({
						icon: "none",
						title: '新密码不能为空',
						duration: 3000,
						position: 'top'
					})
				} else if (that.val[1].value.length == "") {
					uni.showToast({
						icon: "none",
						title: '确认密码不能为空',
						duration: 3000,
						position: 'top'
					})
				} else if (that.val[0].value != that.val[1].value) {
					uni.showToast({
						icon: "none",
						title: '两次输入的密码不一致',
						duration: 3000,
						position: 'top'
					})
				}else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(that.val[0].value)){
					uni.showToast({
						icon: "none",
						title: '新密码太简单，请设置数字和字母组合密码',
						duration: 3000,
						position: 'top'
					})
				} else {
					that.changePasswordin();
				}
			},
			changePasswordin() {
				var that = this;
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[41].interface,
						data: {
							shopId: that.id,
							formerPassword: that.value,
							newPassword: that.val[0].value,
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
						console.log(e.data.status)
						if (e.data.status == 0) {
							uni.showToast({
								icon: "success",
								title: '修改成功',
								duration: 3000,
								position: 'top'
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 500);
						} else {
							uni.showToast({
								icon: "none",
								title: '修改失败，请检查原始密码',
								duration: 3000,
								position: 'top'
							})
						}
					});
			},
			but() {
				var that = this;
				if (
					that.phoneval.userPhone.length != 11 &&
					!/^1[3456789]\d{9}$/.test(that.phoneval.userPhone)
				) {
					uni.showToast({
						icon: "none",
						title: '输入的手机号不正确',
						duration: 3000,
						position: 'top'
					})
				} else if (that.phoneval.verCode.length == 0) {
					uni.showToast({
						icon: "none",
						title: '未输入验证码',
						duration: 3000,
						position: 'top'
					})
				} else {
					uni.request({
							method: "post",
							url: that.$axiosw.interface + that.$axiosw.data[40].interface,
							data: {
								shopId: that.id,
								telePhone: that.phoneval.userPhone,
								code: that.phoneval.verCode
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
								uni.showToast({
									icon: "success",
									title: '修改成功',
									duration: 3000,
									position: 'top'
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 500);
							} else {
								uni.showToast({
									icon: "none",
									title: e.data.msg,
									duration: 3000,
									position: 'top'
								})
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
			},
			interactionDetection(res) {
				var that = this;
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
					uni.showToast({
						icon: "none",
						title: res.data.msg,
						duration: 3000,
						position: 'top'
					})
					return res;
				}
			}
		}
	};
</script>

<style scoped>
	.setUp {
		position: fixed;
		top: 0;
		left: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background-color: #f3f5f7;
		overflow: hidden;
	}

	.my_title_but {
		width: 74rpx;
		height: 74rpx;
		line-height: 74rpx;
		text-align: center;
	}

	.my_title_but2 {
		position: absolute;
		left: 0;
		top: 0;
	}

	.password_list {
		display: flex;
		padding: 0 24rpx;
		border-bottom: 2rpx solid #e5e5e5;
		height: 84rpx;
		line-height: 84rpx;
		font-size: 28rpx;
		color: #595959;
		margin: auto;
		background-color: #fff;
	}

	.password_list:nth-child(2) {
		border: 0;
	}

	.password_list_but {
		float: right;
	}

	.password_list_but_img {
		width: 36rpx;
		height: 20rpx;
	}

	.password_list>span {
		display: inline-block;
		vertical-align: top;
		width: 350rpx;
	}

	.password_list_input {
		height: 100%;
		line-height: 84rpx;
		display: inline-block;
	}

	.exit {
		width: 694rpx;
		height: 72rpx;
		position: fixed;
		bottom: 10%;
		left: 0;
		right: 0;
		margin: 20% auto 0;
		z-index: 100;
		border-radius: 0;
	}

	.logo_view1 {
		background-color: transparent !important;
	}

	.logo_view {
		width: 718rpx;
		height: 70%;
		background-color: #fff;
		margin: auto;
		border-radius: 8rpx;
		overflow: hidden;
	}

	.logo_view_title {
		width: 600rpx;
		margin: 0 auto 0;
		font-size: 32rpx;
		color: #989898;
	}

	.logo_view_title:nth-child(1) {
		margin-top: 60rpx;
	}

	.logo_view_title:nth-child(1)>.logo_view1 {
		margin-bottom: 10rpx;
	}

	.color_orange {
		color: #000;
	}

	.logo_view1 {
		position: relative;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
		border-bottom: 2rpx solid #d8d8d8;
	}

	.logo_view_input {
		font-size: 36rpx;
		line-height: 54rpx;
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
		height: 2rpx;
		background-color: #fa6400;
		z-index: 100;
		transition: width 0.34s;
	}

	.logo_view1:hover>.progressBar {
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
		font-size: 30rpx;
		line-height: 48rpx;
		height: 48rpx;
		border-radius: 48rpx;
	}
</style>

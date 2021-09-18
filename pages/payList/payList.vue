<template>
	<div class="payList">
		<!-- <div class="payList_title">
      <img src="../../static/image/icon_payList1.png" @click="butdel()" />
      充值
    </div> -->
		<div class="payList_list">
			<div v-for="(item, i) in list" class="payList_list_num" :class="{ payList_list_num1: item.state }"
				@click="but(item, i)" :key='i'>
				<img v-if="item.state == true" src="../../static/image/icon_payList2.png" />
				<div class="payList_list_num_top" :class="{ 'but-no': item.state == false }">
					{{ item.msg }}
				</div>
				<div class="payList_list_num_button but-no">无赠送</div>
				<!-- <div class="payList_list_num_button" v-else>{{item.donateMsg}}</div> -->
			</div>
		</div>
		<div class="payList_but">
			<button class="payList_but_in" @click="butadd()">去支付</button>
			<button class="payList_but_in" @click="butdel()">取消</button>
		</div>
		<a id="a-upload" href="javascript:window.opener=null;window.open('','_self');window.close();"></a>
	</div>
</template>

<script>
	export default {
		name: "app",
		data() {
			return {
				list: [],
				type: false,
				id: "",
				token: "",
				stateNum: 0,
				activeNames: ["1"]
			};
		},
		methods: {
			into() {
				var that = this;
				that.id = JSON.parse(uni.getStorageSync("id"));
				that.token = JSON.parse(uni.getStorageSync("token"));
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[33].interface,
						data: {},
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
							var num = [];
							for (var i = 0; i < e.data.data.length; i++) {
								e.data.data[i].state = false;
								num.push(e.data.data[i]);
							}
							num[0].state = true;
							that.stateNum = num[0].type;
							that.list = num;
						}
					});
			},
			but(e, i) {
				for (var a = 0; a < this.list.length; a++) {
					if (a == i) {
						this.list[a].state = true;
					} else {
						this.list[a].state = false;
					}
				}
				this.stateNum = this.list[i].type;
			},
			butadd() {
				var that = this;
				if (that.type == false) {
					that.type = true;
					uni.request({
							method: "post",
							url: that.$axiosw.interface + that.$axiosw.data[56].interface,
							data: {
								shopId: that.id,
								type:that.stateNum,
								openId: uni.getStorageSync("open_id")
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
							console.log(res[1].data)
							var e = that.interactionDetection(res[1]);
							if (e.data.status == 0) {
								that.type = false;
								let redirect_url = e.data.data.clientSkipUrl;
								console.log(redirect_url)
								uni.setStorageSync("orderId", e.data.data.orderId);
								console.log(e.data.data)
								var eq = e.data.data
								wx.requestPayment({
									timeStamp: eq.timeStamp,
									nonceStr: eq.nonceStr,
									package: eq.package,
									signType: 'MD5',
									paySign: eq.paySign,
									success(res) {
										console.log(res, '成功')
										setTimeout(()=>{
										uni.showToast({
											icon: "success",
											title: '支付成功',
											duration: 3000,
											position: 'top'
										})
											
										},200)
										setTimeout(() => {
											uni.switchTab({
												url: '../my/my'
											})
										}, 1000);
									},
									fail(res) {
										console.log(res, '失败')
										setTimeout(()=>{
											
										uni.showToast({
											icon: "none",
											title: '支付失败',
											duration: 3000,
											position: 'top'
										})
										},200)
									}
								})
								// location.href=e.data.data.mweb_url +"&redirect_url=" +encodeURIComponent(redirect_url),"_search"

								// setTimeout(()=>{
								//   var link = document.getElementById('a-upload');
								//   link.click();
								//   // window.opener = window;
								//   //  var win = window.open("","_self");
								//   //  win.close();
								//   //  //frame的时候
								//   //  top.close();
								// },30)
							}
						});
				}
			},
			butdel() {
				uni.setStorageSync("index", 3);
				uni.switchTab({
					url:'../my/my'
				})
			},
			interactionDetection(res) {
				var that = this;
				if (res.data.status == 200 || res.data.status == 0) {
					return res;
				} else if (res.data.status == 7001 || res.data.status == 8001) {
					that.$toast(res.data.msg);
					uni.setStorageSync("status", true);
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
		},
		mounted() {
			this.into();
		}
	};
</script>

<style>
	.payList {
		/* position: fixed; */
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #f6f6f6;
		overflow: hidden;
	}

	.payList_list {
		width: 700rpx;
		margin: 28rpx auto 700rpx;
		overflow: hidden;
	}

	.payList_title {
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 34rpx;
		color: #000000;
		position: relative;
	}

	.payList_title>img {
		position: absolute;
		top: 0;
		left: 0;
		width: 96rpx;
		height: 96rpx;
	}

	.payList_list_num {
		width: 200rpx;
		height: 304rpx;
		border-radius: 2rpx;
		border: 2rpx solid #757575;
		margin-right: 40rpx;
		margin-bottom: 28rpx;
		float: left;
		position: relative;
	}

	.payList_list_num1 {
		border-color: #5563ed;
	}

	.payList_list_num:nth-child(3n) {
		margin-right: 0;
	}

	.payList_list_num>img {
		position: absolute;
		right: 0;
		top: 0;
		width: 44rpx;
		height: 44rpx;
	}

	.payList_list_num_top {
		height: 250rpx;
		line-height: 250rpx;
		text-align: center;
		font-size: 32rpx;
		color: #c67ae7;
		border-bottom: 0.01rpx solid #c6c6c6;
	}

	.payList_list_num_button {
		text-align: center;
		font-size: 24rpx;
		line-height: 52rpx;
		height: 52rpx;
		color: #c67ae7;
	}

	.but-no {
		color: #131313;
	}

	.payList_but {
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		overflow: hidden;
		bottom: 75rpx;
		width: 704rpx;
	}

	.payList_but_in {
		width: 704rpx;
		height: 80rpx;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #626eee;
		background: #fff;
	}

	.payList_but_in:nth-child(1) {
		color: #fff;
		background: #626eee;
		margin-bottom: 20rpx;
	}
</style>

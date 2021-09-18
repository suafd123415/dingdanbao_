<template>
	<view :style="{top:top+'rpx' }" class="manual_in" id="apply">
		<!-- <view class="my_title">
      手动发单
      <van-button
        color="#EDEDED"
        type="primary"
        class="my_title_but my_title_but2"
        @click="back()"
      >
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button>
    </view> -->
		<view class="manual_in_view">
			<view class="manual_in_view_left">
				<view>寄</view>
				<i></i>
				<view class="manual_in_view_left_view">收</view>
			</view>
			<view class="manual_in_view_right">
				<view class="manual_in_view_right_personal manual_in_view_right_border">
					<view>
						<view class="manual_in_view_right_personal_view">
							{{ my.shop_name }}
						</view>
						{{ my.shop_phone }}
					</view>
					<view>
						<view>{{ my.shopBoos }}</view>
					</view>
				</view>
				<view class="manual_in_view_right_information">
					<view class="manual_in_view_right_border">
						<input class="manual_in_view_right_information_view_input" placeholder="姓名"
							v-model="information.name" />
					</view>
				</view>
				<view class="manual_in_view_right_information">
					<view class="manual_in_view_right_border manual_in_left">
						<input class="manual_in_view_right_information_view_input" type="number" placeholder="电话"
							v-model="information.phone" />
					</view>
					<view class="manual_in_view_right_border manual_in_right">
						<input class="manual_in_view_right_information_view_input" type="number" placeholder="分机号(选填)"
							v-model="information.extension" />
					</view>
				</view>
				<view class="manual_in_view_right_information manual_in_view_right_border">
					<view>
						<view @click="choose" class="manual_in_view_right_city">
							<input readonly="readonly" class="manual_in_view_right_information_view_input" disabled
								placeholder="城市/区域" v-model="information.city.city + information.city.area" />
						</view>
					</view>
				</view>
				<view class="manual_in_view_right_information">
					<view class="manual_in_view_right_city" @click="detailedAddress">
						<input style="padding: 0 0 20rpx 0;" class="manual_in_view_right_information_view_input"
							v-model="address_value" center clearable placeholder="详细地址（例如：**街**号**）" type="serch" />
						<template>
							<button @click="into()" size="small" type="primary">确定</button>
						</template>
					</view>
				</view>
			</view>
		</view>
		<!-- <camera device-position="back" flash="off" style="width: 100%; height: 300px;"></camera> -->
		<!-- <button type="primary" @click="takePhoto()">拍照</button> -->
		<view class="manual_in_view">
			<view class="manual_in_view_way">
				重量(kg):
				<input type="number" placeholder="请输入重量" v-model="information.weigh" />
			</view>
		</view>
		<!-- //底部 -->
		<view class="manual_in_bottom" v-if="showbottom == true">
			<view class="manual_in_bottom_title manual_in_view_right_border">
				配送方式（可多选）
			</view>
			<view class="manual_in_bottom_distribution">
				<van-checkbox-group @change='onChanges' v-model="result" v-for="(item, index) in riderList"
					v-if="item.price > -1" :key="index">
					<van-cell-group>
						<van-cell clickable :title="
                `${
                  item.plat == 'SF'
                    ? `顺丰配送`
                    : item.plat == 'FN'
                    ? '蜂鸟配送'
                    : item.plat == 'MT'
                    ? '美团配送'
                    : item.plat == 'DADA'
                    ? '达达配送'
                    : '闪送'
                }`
              " @click="toggle(index)">
							<view class="manual_in_bottom_distribution_brand_view">
								约
								<span class="manual_in_bottom_distribution_brand_view_span">{{
                  item.price / 100
                }}</span>元
							</view>
							<template #right-icon>
								<van-checkbox :name="item.plat" ref="checkboxes" />
							</template>
						</van-cell>
					</van-cell-group>
				</van-checkbox-group>
			</view>
			<van-button class="placeOrder" @click="placeOrder()" type="primary" color="#BF73DE" block round>下单
			</van-button>
		</view>
		<van-popup :show="showPicker" position="bottom">
			<!-- <van-picker
        show-toolbar
        :area-list="arealist"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      /> -->
			<van-area :area-list="areaList" :columns-num="2" ref="myArea" :value="cityCode" @change="onChange"
				@confirm="onConfirm" @cancel="onCancel" />
		</van-popup>
	</view>
</template>

<script>
	import areaList from "../../areaList.js";
	export default {
		data() {
			return {
				top: 88,
				result: [],
				show: false,
				message: "",
				activeNames: [""],
				capture: ["camera"],
				id: "",
				token: "",
				my: {},
				cityCode: "",
				information: {
					name: "",
					phone: "",
					city: {
						city: "",
						area: "",
						userLat: "",
						userLng: ""
					},
					value: "",
					weigh: "5",
					extension: ""
				},
				address_value: "",
				orderId: "",
				riderList: [],
				riderListSelected: {},
				docmHeight: "0", //默认屏幕高度
				ffHeight: "0", //默认屏幕高度
				isResize: false, //默认屏幕高度是否已获取
				showPicker: false,
				showbottom: false,
				obtainRider: false,
				areaList,
				// columns: [
				//   // 第一列
				//   {
				//     values: ['北京'],
				//     defaultIndex: 1,
				//   },
				//   {
				//     values: [
				//       '东城区',
				//       '西城区',
				//       '朝阳区',
				//       '丰台区',
				//       '石景山区',
				//       '海淀区',
				//       '门头沟区',
				//       '房山区',
				//       '通州区',
				//       '顺义区',
				//       '昌平区',
				//       '大兴区',
				//       '怀柔区',
				//       '平谷区',
				//       '密云区',
				//       '延庆区'],
				//     defaultIndex: 2,
				//   }
				// ],
				line: [],
				present: "",
				lngs: "",
				lats: "",
				access: "",
				coordinate: "",
				file: ""
			}
		},
		onLoad() {
			let that = this
			//#ifdef MP
			this.top = 0
			//#endif
			// this.amapPlugin = new amap.AMapWX({
			// 	key: this.key
			// });

		},
		beforeRouteUpdate() {
			let that = this
		},
		mounted() {
			let that = this
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("token"));
			that.my = JSON.parse(uni.getStorageSync("my"));
			that.cityCode = JSON.parse(uni.getStorageSync("cityCode"));
			console.log(that.areaList)
		},
		methods: {
			takePhoto() {
				const ctx = wx.createCameraContext()
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						console.log(res)
						this.setData({
							src: res.tempImagePath
						})
					}
				})
			},
			error(e) {
				console.log(e.detail)
			},
			placeOrder() { //选择了配送方式，下单
				var that = this;
				if (that.obtainRider == false) {
					if (that.result.length != 0) {
						that.$utile.throttle(
							function() {
								that.placeOrder1();
							},
							1000,
							1000,
							"manual_placeOrder"
						);
					} else {
						uni.showToast({
							icon: "none",
							title: '请先选择配送方式',
							duration: 3000,
							position: 'top'
						})
					}
				}
			},
			placeOrder1() {
				var that = this;
				var q = [];
				console.log(that.result);
				for (var i = 0; i < that.result.length; i++) {
					q.push(that.result[i]);
				}
				console.log(q); //循环出配送平台
				var plat = q.toString();
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[47].interface,
						data: {
							shopId: that.id,
							orderId: that.orderId,
							userName: that.information.name,
							userPhone: that.information.phone,
							extension: that.information.extension,
							userAddress: that.information.city.city +
								"" +
								that.information.city.area +
								"" +
								that.information.value,
							userLat: that.information.city.userLat,
							userLng: that.information.city.userLng,
							plat: plat
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
								icon: "none",
								title: '配送成功',
								duration: 3000,
								position: 'top'
							})
							that.result = [];
							setTimeout(() => {
								uni.switchTab({
									url: '../my/my'
								})
							}, 800);
						}
					});
			},
			onChanges(event) {
				let that = this
				that.result = event.detail
				console.log(event)
				console.log(that.result);
			},
			newArr(arr) {
				return Array.from(new Set(arr));
			},
			toggle(index) {
				console.log(index);
			},
			getreverseGeocode() {
				let that = this
				// let address = this.info.province + this.info.city + this.info.area + this.info.address
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/geo?parameters',
					method: 'GET',
					data: {
						key: '2b06531677921e2d1ada9d2f2610cde2',
						address: that.information.city.city +
							that.information.city.area +
							that.address_value,
					},
					success: (res) => {
						console.log('高德res', res)
						that.lngs = parseFloat(res.data.geocodes[0].location.split(',')[0])
						that.lats = parseFloat(res.data.geocodes[0].location.split(',')[1])
					}
				})
			},
			into() {
				var that = this;
				if (!this.information.city.city) {
					uni.showToast({
						icon: "none",
						title: '请先选择城市',
						duration: 3000,
						position: 'top'
					})
					return false
				}else if(that.address_value==''){
					uni.showToast({
						icon: "none",
						title: '请输入详细地址',
						duration: 3000,
						position: 'top'
					})
					return false
				}
				that.$utile.throttle(
					function() {
						if (that.obtainRider == false) {
							that.into1();
						}
					},
					1000,
					500,
					"manual_into"
				);
				that.getreverseGeocode()
			},
			into1() {
				var that = this;
				console.log(that.lngs);
				console.log(that.lats);
				setTimeout(() => {
					uni.request({
							method: "post",
							url: that.$axiosw.interface + that.$axiosw.data[46].interface,
							data: {
								shopId: that.id,
								userAddress: that.information.city.city +
									"" +
									that.information.city.area +
									"" +
									that.address_value,
								userPhone: that.information.phone,
								extension: that.information.extension,
								userLat: that.lats,
								userLng: that.lngs,
								userName: that.information.name
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
							console.log(res)
							var e = that.interactionDetection(res[1]);
							that.obtainRider = false;
							console.log(res);
							if (e.data.status == 0) {
								uni.showToast({
									icon: "none",
									title: '加载中……',
									duration: 3000,
									success: function() {
										setTimeout(() => {
											that.information.city.userLat = e
												.data
												.data
												.userLat;
											that.information.city.userLng = e
												.data
												.data
												.userLng;
											that.rider(e.data.data.orderId);
										}, 3000);
									}
								});
							} else {
								uni.showToast({
									icon: "none",
									title: res.data.msg,
									duration: 3000,
									position: 'top'
								})
							}
						});
				}, 500);
			},
			rider(orderId) {
				var that = this;
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[37].interface,
						data: {
							shopId: that.id,
							orderId: orderId
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
							that.orderId = orderId;
							that.showbottom = true;
							that.riderList = e.data.data.platPriceList;
							console.log(that.riderList, 401)
							var list = res[1].data.data.platPriceList;
							console.log(list);
							var newArr = list.filter(item => item.price != "-1");
							console.log(newArr);
							let a = Math.min.apply(
								Math,
								newArr.map((item, index) => {
									return item.price;
								})
							);
							console.log(a);
							var b = newArr.filter(item => item.price == a);
							console.log(b);
							that.result.push(b[0].plat);
							that.result = that.newArr(that.result);
							console.log(that.result);
						}
					});
			},
			detailedAddress(val) {
				if (!this.information.city.city) {
					uni.showToast({
						icon: "none",
						title: '请先选择城市',
						duration: 3000,
						position: 'top'
					})
					// this.information.value = ''
				}
			},
			//确定选择城市
			onConfirm(val) {
				console.log(val.target.values[0].name + ',' + val.target.values[1].name);
				// console.log(val[0].name + "," + val[1].name);
				this.showPicker = false; //关闭弹框
				this.information.city = {
					city: val.target.values[0].name,
					area: val.target.values[1].name
				};
			},
			//取消选中城市
			onCancel() {
				this.showPicker = false;
				this.$refs.myArea.reset(); // 重置城市列表
			},
			afterRead(file) {
				// console.log(file.content)
				// console.log(this.getCropData)
				var that = this;
				that.file = file.content;
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
			},
			choose() {
				let that = this;
				console.log(that.information);
				if (that.information.name == "") {
					uni.showToast({
						icon: "none",
						title: '请输入姓名',
						duration: 3000,
						position: 'top'
					})
				} else if (that.information.phone == "") {
					uni.showToast({
						icon: "none",
						title: '请输入手机号',
						duration: 3000,
						position: 'top'
					})
				} else if (!/^[0-9]*$/.test(that.information.phone)) {
					uni.showToast({
						icon: "none",
						title: '请输入正确的手机号',
						duration: 3000,
						position: 'top'
					})
				} else {
					that.showPicker = true;
				}
			},

		}
	}
</script>

<style lang="less" scoped>
	.manual_in_view_right_city {
		/deep/ .van-cell {
			padding: 20rpx 0;
		}
	}
</style>
<style>
	.shn_button_cancel {
		background: #0aa1ed;
		margin: 10px 0px;
		z-index: 9999;
		position: fixed;
		top: 0px;
		font-size: 50rpx;
		right: 570rpx;
		border-radius: 3px;
		width: 150rpx;
		text-align: center;
		color: #fff;
	}

	.shn_button {
		background: #0aa1ed;
		margin: 10px 0px;
		z-index: 9999;
		position: fixed;
		top: 0px;
		font-size: 50rpx;
		left: 570rpx;
		border-radius: 3px;
		width: 150rpx;
		text-align: center;
		color: #fff;
	}

	.manual_flex {
		display: flex;
		justify-content: space-between;
		margin: 12rpx auto;
		width: 720rpx;
	}

	.van_field_button_emp {
		top: 300rpx;
		position: fixed;
		text-align: center;
		border-radius: 4px;
		width: 120rpx;
		left: 450rpx;
		font-size: 40rpx;
	}

	.van_field_button {
		top: 360rpx;
		position: fixed;
		text-align: center;
		background: #0aa1ed;
		border-radius: 4px;
		width: 550rpx;
		left: 25rpx;
	}

	.manual_in_view_collapse .van-popup--center {
		width: 600rpx;
		height: 450rpx;
		border-radius: 4px;
	}

	.manual_in_view_collapse .van-cell--clickable {
		height: 90rpx;
		background: #0aa1ed;
	}

	.manual_in_view_collapse .van-icon-arrow {
		display: none;
	}

	.manual_in_view_collapse .van-cell--clickable .van-cell__value--alone {
		text-align: center;
		color: #fff;
		font-size: 50rpx;
	}

	.manual_in_view_collapse .van-field__control {
		height: 100px !important;
		border: 1px solid #fffff9;
	}

	.manual_in_view_collapse .van-field__body {
		margin-top: 50rpx;
	}

	.view_collapse {
		height: 90rpx;
		line-height: 90rpx;
	}

	.van_collapse_button {
		margin-left: 550rpx;
		margin-top: 20rpx;
		width: 100rpx;
		height: 60rpx;
		border-radius: 4px;
		background: #0aa1ed;
		color: #fff;
	}

	.upload-btn-wrapper {
		position: relative;
	}

	.manual_in_view_collapse {
		width: 360rpx;
		overflow: hidden;
		font-size: 50rpx;
		text-align: center;
		background: #0aa1ed;
		color: #fff;
		margin-left: 6rpx;
	}

	.manual_in_view_button {
		width: 360rpx;
		overflow: hidden;
		font-size: 50rpx;
		text-align: center;
		background: #0aa1ed;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		margin-right: 6rpx;
	}

	.focusState {
		position: absolute;
	}

	.manual_in {
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
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

	.manual_in_view {
		width: 720rpx;
		overflow: hidden;
		margin: 0 auto 16rpx;
		background-color: #fff;
	}

	.manual_in_view_color {
		color: #989898;
	}

	.manual_in_view_left {
		float: left;
		width: 58rpx;
		height: 230rpx;
		margin-top: 32rpx;
		margin-left: 10rpx;
	}

	.manual_in_view_left>view {
		width: 52rpx;
		height: 52rpx;
		border-radius: 50%;
		font-size: 28rpx;
		text-align: center;
		line-height: 52rpx;
		margin: 4rpx auto;
		background-color: #fff;
		color: #000;
	}

	.manual_in_view_left>i {
		display: block;
		width: 2rpx;
		height: 90rpx;
		background-color: #ededed;
		margin: auto;
	}

	.manual_in_view_left>.manual_in_view_left_view {
		background-color: #626eee;
		color: #fff;
	}

	.manual_in_view_right {
		float: right;
		width: 638rpx;
		margin-right: 14rpx;
		padding-bottom: 14rpx;
	}

	.manual_in_view_right_personal {
		overflow: hidden;
		padding-bottom: 30rpx;
	}

	.manual_in_view_right_border {
		border-bottom: 2rpx solid #d7d7d7;
	}

	.manual_in_view_right_personal>view {
		width: 594rpx;
		margin: auto;
		font-size: 24rpx;
		color: #010101;
		margin-top: 24rpx;
		text-align: right;
	}

	.manual_in_view_right_personal>view>view {
		float: left;
	}

	.manual_in_view_right_personal>view>.manual_in_view_right_personal_view {
		width: 400rpx;
		text-align: left;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	.manual_in_view_right_information {
		float: right;
		width: 614rpx;
		overflow: hidden;
		font-size: 0;
	}

	.manual_in_view_right_information_view_input {
		font-size: 30rpx;
		line-height: 60rpx;
		margin-top: 40rpx;
		background-color: transparent;
		width: 100%;
		padding: 0;
	}

	.manual_in_left {
		display: inline-block;
		vertical-align: top;
		width: 50%;
	}

	.manual_in_right {
		float: right;
		width: 40%;
	}

	.manual_in_view_right_city {
		width: 100%;
	}

	.manual_in_view_way {
		width: 690rpx;
		margin: auto;
		height: 78rpx;
		line-height: 78rpx;
		color: #212121;
		font-size: 30rpx;
	}

	.manual_in_view_way>input {
		float: right;
		text-align: right;
	}

	.manual_in_bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 720rpx;
		height: 688rpx;
		background: #ffffff;
		z-index: 20;
		margin: 0 12rpx 0 12rpx;
	}

	.manual_in_bottom_title {
		padding-left: 20rpx;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 24rpx;
		color: #212121;
	}

	.manual_in_bottom_distribution {
		width: 100%;
		overflow-x: scroll;
		white-space: nowrap;
		height: 505rpx;
		font-size: 0;
		overflow-y: hidden;
	}

	.manual_in_bottom_distribution::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
	}

	.manual_in_bottom_distribution_brand {
		text-align: center;
		width: 100%;
		height: 18%;
		line-height: 70rpx;
		position: relative;
		font-size: 24rpx;
		list-style: none;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.manual_in_bottom_distribution_brand_view {
		font-size: 28rpx;
		margin-top: 14rpx;
		display: inline-block;
		width: 100rpx;
		margin-right: 100rpx;
	}

	.manual_in_bottom_distribution_brand_view>span {
		font-size: 38rpx;
	}

	.manual_in_bottom_distribution_brand_hook {
		position: absolute;
		right: 12rpx;
		bottom: 34rpx;
		z-index: 10;
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 6rpx;
	}

	.manual_in_bottom_distribution_brand_hook_but {
		background-color: #d7d7d7;
	}

	.manual_in_bottom_distribution_brand_hook>img {
		display: inline-block;
		width: 22rpx;
		height: 18rpx;
		vertical-align: middle;
	}

	.placeOrder {
		margin-bottom: 40rpx;
		font-size: 30rpx;
	}

	.manual_in_bottom_distribution1 {
		border-color: #bf73de;
		color: #bf73de;
	}

	.manual_in_bottom_distribution1_back {
		background-color: #bf73de;
	}
</style>

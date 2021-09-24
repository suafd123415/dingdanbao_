<template>
	<div class="recharge" style="background:#f6f6f6">
		<!-- <div class="recharge_title">
      <img
        src="../../../static/images/icon_payList1.png"
        @click="return_page()"
      />
      <div>查看账号</div>
    </div> -->
		<div style="display:flex;margin-top:20px">
			<div style="width:30%">
				<van-dropdown-menu>
					<van-dropdown-item @change='bianhua' v-model="value1" :options="option1" />
				</van-dropdown-menu>
			</div>
			<div v-if="value1 == 0" style="width: 70%;display: flex;
    align-items: center;
    background: #fff;">
				<uni-easyinput v-model="telephone" placeholder="请输入内容"  >
				</uni-easyinput>
				<van-button class='van_but' slot="button" size="small" type="primary" @click="sousuo">搜索</van-button>
			</div>
			<div v-if="value1 == 1" style="width:70%;display: flex;
    align-items: center;
    background: #fff;">
				<uni-easyinput v-model="names" placeholder="请输入内容"  >
				</uni-easyinput>
				<van-button class='van_but' slot="button" size="small" type="primary" @click="sousuo">搜索</van-button>
			</div>
			<div v-if="value1 == 2" style="width:70%;display: flex;
    align-items: center;
    background: #fff;">
				<uni-easyinput v-model="shopId" placeholder="请输入内容"  >
				</uni-easyinput>
				<van-button class='van_but' slot="button" size="small" type="primary" @click="sousuo">搜索</van-button>
			</div>
			<div v-if="value1 == 3" style="width:70%;display: flex;
    align-items: center;
    background: #fff;">
				<uni-easyinput v-model="shopBoss" placeholder="请输入内容"  >
				</uni-easyinput>
				<van-button class='van_but' slot="button" size="small" type="primary" @click="sousuo">搜索</van-button>
			</div>
		</div>

		<div id="list-content" class="appproject">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback"
				:down="downOption" :up="upOption">
				<div v-for="(item, index) in dataList" :key="index">
					<div class="record_title_div">
						<div>
							<div class="record_div">
								<span>商户ID：{{ item.id }}</span>
								<span class="record_title_span">{{ item.name }}</span>
							</div>
							<div class="record_div">
								<span>手机号：{{ item.telephone }}</span>
								<span>密码：{{ item.passWord }}</span>
							</div>
							<div class="record_div">
								<span>老板姓名：{{ item.shopBoss }}</span>
								<van-button type="primary" size="small" @click="denlu(item.telephone, item.passWord)">切换
								</van-button>
							</div>
						</div>
					</div>
				</div>
			</mescroll-body>
		</div>
	</div>
</template>
<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				id: "",
				page: 0,
				num: 10,
				shopId: "",
				names: "",
				telephone: "",
				shopBoss: "",
				token: "",
				shopPhone: "",
				initial: false,
				loading: false,
				finished: false,
				list: [],
				dataList: [],
				value1: 0,
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				downOption: {
					use: false
				},
				upOption: {
					page: {
						size: 10,
						num: 0
					},
					textNoMore: '没有更多了',
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				option1: [{
						text: "手机号",
						value: 0
					},
					{
						text: "店铺名",
						value: 1
					},
					{
						text: "店铺ID",
						value: 2
					},
					{
						text: "老板姓名",
						value: 3
					}
				]
			};
		},
		onLoad() {
			let that = this;
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("token"));
			that.shopPhone = JSON.parse(uni.getStorageSync("shopPhone"));
			// that.load_more();
		},
		mounted() {
		},
		methods: {
			bianhua(value) {
				let that = this
				console.log(value)
				that.names = "";
				that.telephone = "";
				that.shopBoss = "";
				that.shopId = "";
				that.value1 = value.detail
			},
			return_page() {
				this.$router.push({
					path: "/"
				});
			},
			sousuo() {
				let that = this;
				console.log(that.telephone);
				console.log(that.value1)
				that.dataList=[]
				that.mescroll.resetUpScroll()
			},
			denlu(userPhone, passWord) {
				var that = this;
				uni.request({
					method: "post",
					url: that.$axiosw.interface + that.$axiosw.data[0].interface,
					data: {
						userPhone: userPhone,
						passWord: passWord,
						code: ''
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
					},
					// })
					success: (res) => {
						if (res.data.status == 0) {
							var my = {
								shop_name: res.data.data.shopName,
								shop_phone: res.data.data.shopPhone,
								customer_Phone: res.data.data.customerPhone,
								version: res.data.data.version,
								signature: res.data.data.signature,
								shopBoos: res.data.data.shopBoos
							};
							var loginAccount = {
								userPhone:userPhone,
								passWord: passWord
							};
							uni.setStorageSync("my", JSON.stringify(my));
							uni.setStorageSync(
								"loginAccount",
								JSON.stringify(loginAccount)
							);
							uni.setStorageSync(
								"id",
								JSON.stringify(res.data.data.shopId)
							);
							uni.setStorageSync(
								"token",
								JSON.stringify(res.data.data.token)
							);
							uni.setStorageSync("index", 0);
							uni.setStorageSync(
								"cityCode",
								JSON.stringify(res.data.data.cityCode)
							);
							uni.showToast({
								icon: "success",
								title: '切换成功',
								duration: 3000,
								position: 'top'
							})
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								})
							}, 1000);
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.msg,
								duration: 3000,
								position: 'top'
							})
						}
					}
				});
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有3种处理方式:*/
			downCallback() {
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
			},
			upCallback(page) {
				let that = this;
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				uni.request({
					method: "post",
					url: that.$axiosw.interface + that.$axiosw.data[57].interface,
					data: {
						page: pageNum,
						size: pageSize,
						id: that.shopId,
						name: that.names,
						telephone: that.telephone,
						shopBoss: that.shopBoss,
						theTotalAccount: that.shopPhone
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
					},
					success: (res) => {
						if(res.data.status==0){
							console.log(res.data);
						let curPageData = res.data
						let curPageLen = curPageData.data.shopList.length;
						let totalSize = curPageData.data.num;
						if (page.num == 0) this.dataList = [];
						this.dataList = this.dataList.concat(res.data.data.shopList); //追加新数据
						this.mescroll.endBySize(curPageLen, totalSize);
						setTimeout(() => {
							this.mescroll.endSuccess(curPageLen)
						}, 20)
						}else{
							this.mescroll.endErr()
							uni.showToast({
								icon: "none",
								title: res.data.msg,
								duration: 3000,
								position: 'top'
							})
						}
						
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})
			}
		}
	};
</script>
<style>
	.van-dropdown-menu__bar {
		height: 50px !important;
	}
</style>
<style scoped>
	.van_but{
		margin-left: 45rpx;
	}
	.appproject {
		margin-top: 8rpx;
		overflow-x: hidden;
		overflow-y: auto;
		min-height: 300rpx;
		/* background-color: #F6F6F6; */
	}

	.record_div {
		display: flex;
		justify-content: space-between;
	}

	.record_title_span {
		font-size: 30rpx;
	}

	.record_title_div {
		/* width: 7.34rpx; */
		height: 155rpx;
		border-radius: 4rpx;
		margin: 20rpx auto 0 auto;
		font-size: 30rpx;
		background-color: #fff;
		padding: 20rpx;
		line-height: 50rpx;
	}

	.bind_flex {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
	}

	.bind_flex div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 20rpx 20rpx 20rpx;
	}

	.bind_flex div span {
		font-size: 40rpx;
	}

	/* .recharge {
  background: #f6f6f6;
} */
	.recharge_title {
		height: 74rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 34rpx;
		color: #000000;
		/* position: relative; */
		/* position: fixed; */
		top: 0;
	}

	.recharge_title>img {
		position: fixed;
		top: 0;
		left: 0;
		width: 96rpx;
		height: 96rpx;
		z-index: 99;
	}

	.recharge_title>div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #f6f6f6;
		height: 96rpx;
	}
</style>

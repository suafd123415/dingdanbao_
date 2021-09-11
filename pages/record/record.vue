<template>
	<view  class="record">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback" :down="downOption"
			:up="upOption">
			<view v-for="item in dataList">
				<div class="record_title_div">
					<div>
						<div class="record_div">
							<span class="record_title_span">{{ item.createDate }}</span>
							<div class="record_title_span_div" v-if="item.plat == 'MT'">
								<img class="selectRider_img" src="../../static/image/meituan.png" /><span
									v-if="item.plat == 'MT'">美团配送</span>
							</div>
							<div class="record_title_span_div" v-if="item.plat == 'FN'">
								<img class="selectRider_img" src="../../static/image/hummingbird.png" /><span
									v-if="item.plat == 'FN'">蜂鸟配送</span>
							</div>
							<div class="record_title_span_div" v-if="item.plat == 'SHANSONG'">
								<img class="selectRider_img" src="../../static/image/shansong.png" /><span
									v-if="item.plat == 'SHANSONG'">闪送</span>
							</div>
							<div class="record_title_span_div" v-if="item.plat == 'DADA'">
								<img class="selectRider_img" src="../../static/image/dada.png" /><span
									v-if="item.plat == 'DADA'">达达配送</span>
							</div>
							<div class="record_title_span_div" v-if="item.plat == 'SF'">
								<img class="selectRider_img" src="../../static/image/suitableAbundant.png" /><span
									v-if="item.plat == 'SF'">顺丰配送</span>
							</div>
						</div>
						<div class="record_div">
							<span>订单号：{{ item.orderId }}</span>
							<span v-if="item.bookType == 'CHARGE'"
								style="color: red;">支出金额：-{{ item.totalPayMoney / 100 }}</span>
							<span v-if="item.bookType == 'SEND_BACK'"
								style="color: green;">退回金额：+{{ item.totalPayMoney / 100 }}</span>
						</div>
						<div class="record_div">
							<div class="record_title_span_div" v-if="item.orderType == '1'">
								<span>平台：</span>
								<img class="selectRider_img dis_none" src="../../static/image/meituan.png" /><span
									v-if="item.orderType == '1'">美团</span>
							</div>
							<div class="record_title_span_div" v-if="item.orderType == '2'">
								<span>平台：</span>
								<img class="selectRider_img dis_none"
									src="../../static/image/icon_hungryBest.png" /><span
									v-if="item.orderType == '2'">饿百</span>
							</div>
							<div class="record_title_span_div" v-if="item.orderType == '99'">
								<span>平台：</span>
								<img class="selectRider_img dis_none"
									src="../../static/image/icon_freshCounty.png" /><span
									v-if="item.orderType == '99'">手动呼叫订单</span>
							</div>
						</div>
					</div>
				</div>
			</view>
		</mescroll-body>
		<view></view>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				downOption: {
					use: false
				},
				upOption: {
					page: {
						size: 10,
						num: -1
					},
					textNoMore: '没有更多了',
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				list: [],
				id: "",
				token: "",
				loading: false, //加载状态
				finished: false, //是否加载
				page: 0, //页码
				num: 10, //条数
				count: "",
				initial: false,
				// 列表数据
				dataList: []
			}
		},
		
		mounted() {
			var that = this;
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("token"));
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有3种处理方式:*/
			downCallback() {
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log(page)
				let that = this
				let pageNum = page.size; // 页码, 默认从1开始
				let pageSize = page.num; // 页长, 默认每页10条
				uni.request({
					method: "post",
					url: that.$axiosw.interface + that.$axiosw.data[53].interface,
					data: {
						shopId: that.id,
						num: pageNum,
						page: pageSize,
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
					success: (data) => {
						console.log(data.data)
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data;
						// // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.data.accountBooks.length;
						// // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = curPageData.data.num;
						// // 接口返回的是否有下一页 (true/false)
						// let hasNext = data.xxx;

						//设置列表数据
						if (page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
						this.dataList = this.dataList.concat(data.data.data.accountBooks); //追加新数据
						console.log(this.dataList)
						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						this.mescroll.endBySize(curPageLen, totalSize);
						setTimeout(() => {
							this.mescroll.endSuccess(curPageLen)
						}, 20)
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})

			}
		}
	}
</script>
<style>
	.dis_none {
		display: none;
	}

	.appproject {
		margin-top: 8rpx;
		overflow-x: hidden;
		overflow-y: auto;
		min-height: 200rpx;
		/* background-color: #F6F6F6; */
	}

	.record_title_span_div span {
		/* vertical-align: middle; */
	}

	.selectRider_img {
		vertical-align: middle;
		width: 32rpx;
		height: 32rpx;
		margin-right: 0rpx;
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
		height: 170rpx;
		border-radius: 4rpx;
		margin: 20rpx auto 0 auto;
		font-size: 30rpx;
		background-color: #fff;
		padding: 20rpx;
		line-height: 60rpx;
	}

	.record_span {
		color: #333;
		font-size: 35rpx;
		line-height: 100rpx;
		text-align: center;
		display: block;
	}

	.record {
		background: #f6f6f6;
	}

	.record_title {
		height: 74rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 34rpx;
		color: #000000;
		/* position: relative; */
		/* position: fixed; */
		top: 0;
	}

	.record_title>img {
		position: fixed;
		top: 0;
		left: 0;
		width: 96rpx;
		height: 96rpx;
		z-index: 99;
	}

	.record_title>div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #f6f6f6;
		height: 96rpx;
	}
</style>

<template>
	<view class="appmy1">
		<view class="time_list1">

			<van-tabs style="width:92%" :active="active" line-width="0px" @click="onClick">
				<van-tab :class="item.type==true?'time_list_calendar_view':''" v-for="(item, index) in time"
					:key="index" :title="item.date" class="time_list_calendar">
					<template #title>
						<view style="z-index: 9999;" class="time_list_calendar_view1"
							:class="item.type==true?'time_list_calendar_view':''">{{ item.date }}</view>
					</template>
				</van-tab>
			</van-tabs>
			<view class="calendar" @click="open">
				<img class="calendar_icon" src="../../static/image/icon_financial_calendar.png" />
			</view>
		</view>
		<view class="todayFinancial">
			<view>
				<img class="todayFinancial_img" fit="contain" src="../../static/image/icon_totalRevenue.png" />
			</view>
			<view>
				<view class="todayFinancial_view">实时结算</view>
				<view class="todayFinancial_view">
					共{{ listType.shopAccountCount }}单
				</view>
			</view>
			<view>
				<text class="todayFinancial_tit">平台预计结算￥</text>
				<view class="todayFinancial_money" v-if="listType.shopFee != '0'">
					{{ listType.shopFee / 100 }}
				</view>
				<view class="todayFinancial_money" v-if="listType.shopFee == '0'">
					{{ listType.shopFee / 100 }}
				</view>
			</view>
			<view v-if="listType.checkOwn">
				<text class="todayFinancial_tit">商家预计收入￥</text>
				<view class="todayFinancial_money" v-if="listType.clearingFee != 0">
					{{ listType.clearingFee / 100 }}
				</view>
				<view class="todayFinancial_money" v-if="listType.clearingFee == '0'">
					0
				</view>
			</view>
		</view>
		<view class="brandType">
			<view @click="brand(item, index)" v-for="(item, index) in brandType" :key="index"
				:class="item.type==true?'brandType_view':''">{{ item.name }} </view>
		</view>
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
		</view>
		<view class="">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback"
				:down="downOption" :up="upOption">
				<view v-if="brandType[list2].num==item.orderType||brandType[list2].num==10000" class="order_list" v-for="(item, index) in dataList" :key="index" @click="order(item)">
					<view>
						<text class="order_list_title">#{{ item.dayCode }}</text>
					</view>
					<view>
						<view class="order_list_time">{{ (new Date(item.clearingTime.replace(/-/g, "/")).getHours())+(':')+(new Date(item.clearingTime.replace(/-/g, "/")).getMinutes() < 10
                  ? "0" +
                    new Date(item.clearingTime.replace(/-/g, "/")).getMinutes()
                  : new Date(item.clearingTime.replace(/-/g, "/")).getMinutes())}}</view>
						<img v-if="item.orderType == 10" class="order_list_middle_img" fit="scale-down"
							src="../../static/image/icon_freshCounty.png" />
						<img v-else-if="item.orderType == 2" class="order_list_middle_img" fit="scale-down"
							src="../../static/image/icon_hungryBest.png" />
						<img v-else="item.orderType == 1" class="order_list_middle_img" fit="scale-down"
							src="../../static/image/icon_meituan.png" />
					</view>
					<view></view>
					<view>
						<view class="order_list_money">
							平台预计结算￥<text>{{ item.shopFee / 100 }}</text>
						</view>
						<view v-if="listType.checkOwn" class="order_list_money">
							商家预计收入￥<text class="order_list_money1">{{
				                item.clearingFee / 100
				              }}</text>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
	</view>

</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		name: "app",
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
						size: 15,
						num: -1
					},
					textNoMore: '没有更多了',
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				dataList: [],
				time: '',
				Time: '',
				id: "",
				token: "",
				brandType: [{
						name: "全部",
						type: true,
						num: 10000
					},
					{
						name: "天鲜郡",
						type: false,
						num: 10
					},
					{
						name: "美团",
						type: false,
						num: 1
					},
					{
						name: "饿了么",
						type: false,
						num: 2
					},
					{
						name: "京东到家",
						type: false,
						num: 3
					}
				],
				orderType: "all",
				listType: {
					shopFee: "0",
					clearingFee: "0",
					shopAccountCount: "0",
					checkOwn: ""
				},
				list: [],
				list1: 0,
				list2: 0,
				orderCount: 0,
				active: "",
				show: false,
				minDate: new Date(2018, 0, 1),
				loading: false,
				finished: false,
				page: 0,
				day1: 0,
				day2: 0,
				calendarListItem: 0
			};
		},
		mounted() {},
		beforeMount() {
			this.beforeDestroy();
		},
		methods: {
			/*上拉加载的回调*/
			upCallback(page) {
				console.log(page)
				let that = this
				let pageNum = page.size; // 页码, 默认从1开始
				let pageSize = page.num; // 页长, 默认每页10条
				uni.request({
					method: "post",
					url: that.$axiosw.interface + that.$axiosw.data[38].interface,
					data: {
						shopId: that.id,
						time: that.Time,
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
						var e = that.interactionDetection(data);
						// 接口返回的当前页数据列表 (数组)
						that.listType = {
							shopFee: e.data.data.shopFee,
							shopAccountCount: e.data.data.shopAccountCount,
							clearingFee: e.data.data.clearingFee,
							checkOwn: e.data.data.checkOwn
						};
						let curPageData = data.data;
						// // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.data.shopAccountBeans.length;
						// // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = curPageData.data.orderCount;
						// // 接口返回的是否有下一页 (true/false)
						// let hasNext = data.xxx;

						//设置列表数据
						if (page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
						this.dataList = this.dataList.concat(data.data.data.shopAccountBeans); //追加新数据

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

			},
			/*下拉刷新的回调, 有3种处理方式:*/
			downCallback() {
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				this.mescroll.endSuccess()
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// ///////////////////////////////////
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				let that = this
				that.day2 = new Date(e.fulldate);
				console.log(that.day2);
				var month = parseInt(this.day2.getMonth()) + 1;
				var monthnum = that.mGetDate(that.day2) + 1;
				console.log(e);
				if (month < 10) {
					if (that.day2.getDate() < 10) {
						var timeStamp =
							that.day2.getFullYear() +
							"-" +
							"0" +
							month +
							"-" +
							"0" +
							that.day2.getDate();
					} else {
						var timeStamp =
							that.day2.getFullYear() +
							"-" +
							"0" +
							month +
							"-" +
							that.day2.getDate();
					}
				} else {
					if (that.day2.getDate() < 10) {
						var timeStamp =
							that.day2.getFullYear() +
							"-" +
							month +
							"-" +
							"0" +
							that.day2.getDate();
					} else {
						var timeStamp =
							that.day2.getFullYear() + "-" + month + "-" + that.day2.getDate();
					}
				}
				that.dataTime(
					monthnum,
					that.day2.getDate(),
					that.day2.getFullYear(),
					that.day2.getMonth() + 1
				);
				that.into(e.fulldate);
			},
			dataTime(monthnum, date, year, month) {
				var arr = [];
				this.active = date - 1;
				for (var i = 1; i < monthnum; i++) {
					var p = {
						date: i,
						type: false,
						year: year,
						month: month
					};
					if (i == date) {
						p.type = true;
					}
					arr.push(p);
				}
				this.time = arr;
				console.log(this.time)
				console.log(arr)
			},
			mGetDate(date) {
				//获取本月天数
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var d = new Date(year, month, 0);
				return d.getDate();
			},
			onselect(date) {
				var that = this;
				that.day2 = new Date(date);
				var month = parseInt(this.day2.getMonth()) + 1;
				var monthnum = that.mGetDate(that.day2) + 1;
				that.page = 0;
				that.list = [];
				if (month < 10) {
					if (that.day2.getDate() < 10) {
						var timeStamp =
							that.day2.getFullYear() +
							"-" +
							"0" +
							month +
							"-" +
							"0" +
							that.day2.getDate();
					} else {
						var timeStamp =
							that.day2.getFullYear() +
							"-" +
							"0" +
							month +
							"-" +
							that.day2.getDate();
					}
				} else {
					if (that.day2.getDate() < 10) {
						var timeStamp =
							that.day2.getFullYear() +
							"-" +
							month +
							"-" +
							"0" +
							that.day2.getDate();
					} else {
						var timeStamp =
							that.day2.getFullYear() + "-" + month + "-" + that.day2.getDate();
					}
				}
				that.page = 0;
				that.list = [];
				that.list1 = [];
				that.dataTime(
					monthnum,
					that.day2.getDate(),
					that.day2.getFullYear(),
					that.day2.getMonth() + 1
				);
				that.into(timeStamp);
				that.show = false;
			},
			onClick(items) {
				var that = this;
				console.log(item)
				let item = items.detail.title - 1
				if (that.calendarListItem != item) {
					for (var i = 0; i < that.time.length; i++) {
						if (i == item) {
							that.time[item].type = true;
						} else {
							that.time[i].type = false;
						}
					}
					console.log(that.time)
					that.active = that.time[item].date - 1;
					if (that.time[item].month < 10) {
						if (that.time[item].date < 10) {
							var date =
								that.time[item].year +
								"-" +
								"0" +
								that.time[item].month +
								"-" +
								"0" +
								that.time[item].date;
						} else {
							var date =
								that.time[item].year +
								"-" +
								"0" +
								that.time[item].month +
								"-" +
								that.time[item].date;
						}
					} else {
						if (that.time[item].date < 10) {
							var date =
								that.time[item].year +
								"-" +
								that.time[item].month +
								"-" +
								"0" +
								that.time[item].date;
						} else {
							var date =
								that.time[item].year +
								"-" +
								that.time[item].month +
								"-" +
								that.time[item].date;
						}
					}

					for (var q = 0; q < that.brandType.length; q++) {
						that.brandType[q].type = false;
					}
					that.day2 = new Date(date);
					that.page = 0;
					that.list = [];
					that.list1 = [];
					that.calendarListItem = item;
					for (var a = 0; a < that.brandType.length; a++) {
						if (a == 0) {
							that.brandType[0].type = true;
						} else {
							that.brandType[a].type = false;
						}
					}
					that.into(date);
				}
			},
			into(time) {
				var that = this;
				that.Time = time
				setTimeout(() => {
					this.mescroll.resetUpScroll()
				}, 500)
			},
			beforeDestroy() {
				var that = this;
				that.id = JSON.parse(uni.getStorageSync("id"));
				that.token = JSON.parse(uni.getStorageSync("token"));
				let pages = getCurrentPages();
				let currPage = null;
				// console.log(pages) 的到一个数组
				if (pages.length) {
					// 获取当前页面的对象（上边所获得的数组中最后一项就是当前页面的对象）
					currPage = pages[pages.length - 1];
				}
				// 获取当前页面的路由
				let route = currPage.route
				console.log(route)
				// if (typeof that.$route.query.selectedTime == "string") {
				// 	that.day2 = new Date(that.$route.query.selectedTime);
				// 	that.$route.query.selectedTime = {};
				// } else {
				that.day2 = new Date();
				console.log(111)
				// }
				that.dataTime(
					that.mGetDate(that.day2) + 1,
					that.day2.getDate(),
					that.day2.getFullYear(),
					Number(that.day2.getMonth() + 1)
				);
				if (Number(that.day2.getMonth() + 1) < 10) {
					if (that.day2.getDate() < 10) {
						that.day1 =
							that.day2.getFullYear() +
							"-" +
							"0" +
							Number(that.day2.getMonth() + 1) +
							"-" +
							"0" +
							that.day2.getDate();
						that.into(
							that.day2.getFullYear() +
							"-" +
							"0" +
							Number(that.day2.getMonth() + 1) +
							"-0" +
							that.day2.getDate()
						);
					} else {
						that.day1 =
							that.day2.getFullYear() +
							"-" +
							"0" +
							Number(that.day2.getMonth() + 1) +
							"-" +
							that.day2.getDate();
						that.into(
							that.day2.getFullYear() +
							"-" +
							"0" +
							Number(that.day2.getMonth() + 1) +
							"-" +
							that.day2.getDate()
						);
					}
				} else {
					if (that.day2.getDate() < 10) {
						that.day1 =
							that.day2.getFullYear() +
							"-" +
							Number(that.day2.getMonth() + 1) +
							"-" +
							"0" +
							that.day2.getDate();
						that.into(
							that.day2.getFullYear() +
							"-" +
							Number(that.day2.getMonth() + 1) +
							"-0" +
							that.day2.getDate()
						);
					} else {
						that.day1 =
							that.day2.getFullYear() +
							"-" +
							Number(that.day2.getMonth() + 1) +
							"-" +
							that.day2.getDate();
						that.into(
							that.day2.getFullYear() +
							"-" +
							Number(that.day2.getMonth() + 1) +
							"-" +
							that.day2.getDate()
						);
					}
				}
			},
			order(item) {
				var that = this;
				if (that.day2.getDate() < 10) {
					var dataTime =
						that.day2.getFullYear() +
						"-" +
						Number(that.day2.getMonth() + 1) +
						"-" +
						"0" +
						that.day2.getDate();
				} else {
					var dataTime =
						that.day2.getFullYear() +
						"-" +
						Number(that.day2.getMonth() + 1) +
						"-" +
						that.day2.getDate();
				}
				uni.navigateTo({
					url:`../financialDetails/financialDetails?orderId=${item.orderId}&time=${dataTime}`
				})
			},
			brand(t, i) {
				console.log(t, i)
				this.list2=i
				for (var a = 0; a < this.brandType.length; a++) {
					if (a == i) {
						this.brandType[i].type = true;
					} else {
						this.brandType[a].type = false;
					}
				}
				// this.shopTypeSwitch(this.brandType[i]);
			},
			shopTypeSwitch(obj) {
				var arr = [];
				console.log(this.list1)
				for (var w = 0; w < this.list1.length; w++) {
					if (obj.type == true && obj.num != 10000) {
						if (this.list1[w].orderType == obj.num) {
							arr.push(this.list1[w]);
						}
					} else {
						arr.push(this.list1[w]);
					}
				}
				console.log(arr)
				this.dataList = arr;
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
			},
			formatter(day) {
				const month = day.date.getMonth() + 1;
				const date = day.date.getDate();
				var Today = new Date();
				if (month === Today.getMonth() + 1) {
					if (date === Today.getDate()) {
						day.text = "今天";
					}
				}
				return day;
			}
		}
	};
</script>
<style lang="less" scoped>
	.time_list1 {
		/deep/.van-tab--active {
			background-color: #5563ed !important;
			color: #fff !important;
		}
	}
</style>
<style>
	.time_list_calendar_div {
		background-color: #5563ed;
		color: #fff;
	}

	.appmy1 {
		height: 100vh;
		background-color: #f5f5f5;
		margin-bottom: 100rpx;
	}

	.order_list1 {
		overflow: scroll;
	}

	.my_title {
		width: 100%;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 36rpx;
		text-align: center;
		position: relative;
		background-color: #ededed;
	}

	.time_list1 {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		position: relative;
	}

	.time_list {
		width: calc(100% - 80rpx);
		height: 80rpx;
		line-height: 80rpx;
		overflow-x: scroll;
		overflow-y: hidden;
		list-style-type: none;
		display: flex;
		align-items: center;
	}

	.time_list::-webkit-scrollbar {
		display: none;
	}

	.time_list_calendar {
		padding: 0;
		width: 80rpx;
		height: 80rpx;
		margin: 0 20rpx;
	}

	.time_list_calendar_view1 {
		width: 56rpx;
		height: 56rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 56rpx;
		color: #000000;
		font-size: 30rpx;
	}

	.time_list_calendar_view {
		background-color: #5563ed !important;
		color: #fff !important;
	}

	.calendar {
		position: absolute;
		top: 0;
		right: 0;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		z-index: 10;
		background-color: #fff;
	}

	.calendar_icon {
		vertical-align: middle;
		font-size: 44rpx;
		width: 30rpx;
		height: 30rpx;
		margin-top: -14rpx;
	}

	.todayFinancial {
		margin-top: 12rpx;
		height: 120rpx;
		font-size: 0;
		background-color: #fff;
	}

	.todayFinancial>view {
		display: inline-block;
		/* vertical-align: revert; */
		vertical-align: middle;
		overflow: hidden;
	}

	.todayFinancial_img {
		width: 74rpx;
		height: 80rpx;
		vertical-align: middle;
		margin-left: 44rpx;
		vertical-align: middle;
	}

	.todayFinancial>view:nth-child(2) {
		width: 22%;
		line-height: initial;
		text-align: center;
		/* margin-top: 0.1rpx; */
		margin-right: 30rpx;
		margin-bottom: 10rpx;
	}

	.todayFinancial_view {
		font-size: 26rpx;
		line-height: 40rpx;
		color: #898989;
		display: inline-block;
		width: 100%;
		vertical-align: middle;
	}

	.todayFinancial_tit {
		font-size: 24rpx;
	}

	.todayFinancial_money {
		font-size: 40rpx;
	}

	.todayFinancial>view:nth-child(3) {
		margin-top: 14rpx;
	}

	.todayFinancial>view:nth-child(4) {
		margin-right: 50rpx;
		float: right;
		margin-top: 14rpx;
	}

	.brandType {
		overflow: hidden;
		position: relative;
		display: flex;
		justify-content: space-between;
	}

	.brandType>view {
		float: left;
		width: 142rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: #ffffff;
		margin: 12rpx 10rpx 12rpx 0;
		font-size: 28rpx;
		color: #595959;
		text-align: center;
	}

	.brandType>view:nth-child(5n) {
		margin-right: 0;
	}

	.brandType>.brandType_view {
		background-color: #5563ed;
		color: #fff;
	}

	.order_list {
		height: 94rpx;
		font-size: 0;
		border-bottom: 8rpx solid #f5f5f5;
		background-color: #fff;
	}

	.order_list>view {
		display: inline-block;
		vertical-align: top;
		overflow: hidden;
		width: 10%;
		height: 100%;
		background-color: ;
	}

	.order_list>view:nth-child(1) {
		width: 15%;
		font-size: 32rpx;
		line-height: 94rpx;
	}

	.order_list_title {
		vertical-align: middle;
		margin-left: 30rpx;
	}

	.order_list>view:nth-child(2) {
		width: 15%;
		text-align: left;
	}

	.order_list_time {
		font-size: 26rpx;
		color: #595959;
		line-height: 32rpx;
		margin-top: 14rpx;
	}

	.order_list_middle_img {
		width: 26rpx;
		height: 26rpx;
		margin-top: 6rpx;
	}

	.order_list>view:nth-child(3) {
		width: 28%;
		text-align: right;
		margin-right: 5%;
	}

	.order_list_num {
		font-size: 20rpx;
		color: #595959;
		margin-top: 20rpx;
	}

	.order_list>view:nth-child(4) {
		width: 37%;
		text-align: left;
	}

	.order_list_money {
		font-size: 26rpx;
		color: #595959;
		line-height: 38rpx;
	}

	.order_list_money1 {
		color: #000000;
	}

	.order_list_money:nth-child(1) {
		margin-top: 10rpx;
	}
</style>

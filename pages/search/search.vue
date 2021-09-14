<template>
	<div id="list-content">
		<!-- <div class="titleTop">
      <div class="title">
        <van-nav-bar title="搜索" left-arrow @click-left="onClickLeft" />
      </div>
    </div> -->
		<div class="search">
			<div class="search_tit">
				<div class="inline">
					<img src="../../static/image/icon_seaver.png" />
				</div>
				<input v-model='value' style="display: inline-block;" @keyup.13="searchclick" type="number" class="search_tit_input" placeholder="订单号流水号" />
				<div class="inline" v-if="value.length > 0" @click="value = ''">
					<van-icon name="cross" />
				</div>
				<div class="search_tit_tight" @click="into">搜索</div>
			</div>
			<div class="search_text" v-if="dataList.length == 0">
				<div>支持搜索词说明</div>
				支持订单流水号
			</div>
	  </div>
	  <block v-if="sua">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback" :down="downOption" :up="upOption">
				<block v-for="(item, index) in dataList" :key='index'>
					<div class="orderList_title">
						<div class="orderList_title_top">
							<div class="orderList_title_top_text orderList_title_top_text1" :class="{
	  		                orderList_title_top_text_appointment: item.sendImmediately == 2
	  		              }">
								<span v-if="item.orderType == 1">美团</span>
								<span v-else-if="item.orderType == 2">饿百</span>
								<span v-else-if="item.orderType == 3">京东</span>
								<span v-else-if="item.orderType == 10">天鲜郡</span>
								<span v-else-if="item.orderType == 1001">未知</span>
								<span v-else="item.orderType == 99">自定义配送</span>#{{
	  		                item.dayCode
	  		              }}

								<span v-if="item.sendImmediately == 2"> 预约单</span>
							</div>
							<span v-if="item.status == 1">待发起配送</span>
							<span v-else-if="item.status == 2">待骑手接单</span>
							<span v-else-if="item.status == 3">待骑手取货</span>
							<span
								v-else-if="item.status == 4 && item.riderInfo.status != 101">骑手配送中（预计{{ item.userSendTime }}送达）</span>
							<span v-else-if="item.status == 101">订单已送达</span>
							<span v-else-if="item.status == 4 && item.riderInfo.status == 101">骑手配送完成</span>
							<span v-else="item.status == 102">订单已取消</span>
						</div>
						<div class="orderList_title_top">
							<span v-if="item.sendImmediately == 1">立即送达</span>
							<span v-else="item.sendImmediately == 2">预约单</span>
							（{{ item.userSendTime }}前须送达）
						</div>
					</div>
					<!-- /***********       展示配送状态       ****************/ -->
					<div class="orderList_height" v-if="item.status == 1">
						<div class="orderList_rider_left">
							<div>待发起配送</div>
						</div>
						<div class="orderList_rider_right">
							<van-button @click="callButton(item, index)" color="#626EEE" round size='small'
								class="orderList_rider_right_button" type="primary">发起配送</van-button>
						</div>
					</div>
					<div class="orderList_height" v-if="item.status == 2">
						<div class="orderList_rider_left">
							<div>待骑手接单</div>
						</div>
						<div class="orderList_rider_right">
							<van-button @click="cancelCall(item.orderId, index)" color="#626EEE" size='small' round
								class="orderList_rider_right_button" plain hairline type="primary">取消呼叫
							</van-button>
							<van-button color="#626EEE" hairline round plain @click="callButtons(item, index)"
								size='small' class="orderList_rider_right_button cartoon">追加配送</van-button>
						</div>
					</div>
					<div class="orderList_height" v-if="(item.orderType != 10 && item.status == 3) || item.status == 4">
						<div class="orderList_rider_left" v-if="item.riderInfo != ''">
							<div>骑手{{ item.riderInfo.riderName }}</div>
							<div>
								运费实付{{ item.riderInfo.riderFreight / 100 }}元
								<van-icon size="0.2rpx" class="orderList_rider_left_icon" name="arrow" />
							</div>
						</div>
						<div class="orderList_rider_right" v-if="
	  		              item.riderInfo != '' &&
	  		                item.status == 4 &&
	  		                item.riderInfo.status == 4
	  		            ">
							<van-button @click="callRider(item)" color="#626EEE" round size='small'
								class="orderList_rider_right_button" hairline type="primary">
								<img class="orderList_rider_right_button_icon"
									src="../../static/image/icon_contactWithRider.png" />联系骑手
							</van-button>
						</div>
						<div class="orderList_rider_right" v-if="
	  		              item.riderInfo != '' &&
	  		                item.status == 4 &&
	  		                item.riderInfo.status == 101
	  		            ">
							<van-button @click="callRider(item)" color="#626EEE" round size='small'
								class="orderList_rider_right_button" plain hairline type="primary">
								<img class="orderList_rider_right_button_icon"
									src="../../static/image/icon_contactWithRider.png" />联系骑手
							</van-button>
						</div>
						<div class="orderList_rider_right" style="margin-right: 0.16rpx;"
							v-if="item.status == 3 && item.riderInfo != ''">
							<van-button @click="cancelCall(item.orderId, index)" color="#626EEE" round
								class="orderList_rider_right_button" plain hairline type="primary">取消配送</van-button>
						</div>
					</div>
					<div class="orderList_height" v-if="item.orderType == 10 && item.status > 2 && item.status < 100">
						<div class="orderList_rider_left">
							<div>正在配送</div>
						</div>
						<div class="orderList_rider_right">
							<van-button @click="manualConfirmation(item.orderId, index)" color="#626EEE" round
								class="orderList_rider_right_button" plain hairline type="primary">确认配送</van-button>
						</div>
					</div>
					<div class="orderList_height" v-if="item.status == 101">
						<div class="orderList_rider_left">
							<div>订单已完成</div>
							<div v-if="item.riderInfo != ''">
								运费实付{{ item.riderInfo.riderFreight / 100 }}元
								<van-icon size="0.2rpx" class="orderList_rider_left_icon" name="arrow" />
							</div>
						</div>
						<div v-if="item.riderInfo != ''" class="orderList_rider_right">
							<van-button @click="callRider(item)" color="#626EEE" round size='small'
								class="orderList_rider_right_button" plain hairline type="primary">
								<img class="orderList_rider_right_button_icon"
									src="../../static/image/icon_contactWithRider.png" />联系骑手
							</van-button>
						</div>
					</div>
					<div class="orderList_height" v-if="item.status == 102">
						<div class="orderList_rider_left">
							<div>订单已取消</div>
							<div v-if="item.riderInfo != ''">
								运费实付{{ item.riderInfo.riderFreight / 100 }}元
								<van-icon size="0.2rpx" class="orderList_rider_left_icon" name="arrow" />
							</div>
						</div>
						<div v-if="item.riderInfo != ''" class="orderList_rider_right">
							<van-button @click="callRider(item)" color="#626EEE" round size='small'
								class="orderList_rider_right_button" plain hairline type="primary">
								<img class="orderList_rider_right_button_icon"
									src="../../static/image/icon_contactWithRider.png" />联系骑手
							</van-button>
						</div>
					</div>
					<div class="orderList_height" v-if="item.orderType == 102">
						<div class="orderList_rider_left">
							<div>已取消</div>
						</div>
					</div>
					<!-- /***********              ****************/ -->
					<div class="orderList_height orderList_customer">
						<span>{{ item.name }}</span>
						<span>手机尾号{{
	  		              item.tailNumber != "" ? item.tailNumber : item.privacyPhone
	  		            }}</span>
						<div class="orderList_rider_right">
							<a :href="'tel:' + item.phone">
								<van-button color="#626EEE" round class="orderList_rider_right_button" size='small'
									plain hairline type="primary">
									<img class="orderList_rider_right_button_icon"
										src="../../static/image/icon_contactWithRider.png" />联系顾客
								</van-button>
							</a>
						</div>
					</div>
					<div class="orderList_address">
						<div class="orderList_address_left">
							{{ item.distance / 1000 }}km |
						</div>
						<div class="orderList_address_right orderList_address_left">
							{{ item.address }}
							<div class="orderList_address_right_div">
								顾客下单时间<span class="orderList_address_right_div_span">{{
	  		                item.createTime
	  		              }}</span>
							</div>
						</div>
					</div>
					<div class="orderList_invoice orderList_note" v-if="item.taxpayerId != ''">
						<span class="display_inline-block">发票：</span>
						<div class="display_inline-block orderList_title_top_text">
							<div>{{ item.invoiceTitle }}</div>
							<div>{{ item.taxpayerId }}</div>
						</div>
						<van-button class="orderList_copy" color="#333333" @click="copy(item.taxpayerId)" plain
							type="primary">复制</van-button>
					</div>
					<div class="orderList_note">
						<span class="display_inline-block">备注：</span>
						<div class="display_inline-block orderList_title_top_text">
							{{ item.remark }}
						</div>
						<van-button class="orderList_copy orderList_note_copy order-id" color="#333333" size="mini"
							@click="copy(item.remark)" :data-clipboard-text="item.remark" plain type="primary">复制
						</van-button>
					</div>
					<div class="orderList_num">
						{{ item.goodsList.length }}件商品 预计收入{{ item.shopFee / 100 }}元
					</div>
					<van-collapse :value="activeName" @change="onChange">
						<van-collapse-item :title="item.shopName" :name='index+1'>
							<div style="margin-top: 0.4rem;">
								<div class="goodsList">
									<div class="goodsList1" v-for="(t, i) in item.goodsList" :key="i">
										<div>{{ t.goodsName }}</div>
										<div>￥{{ t.goodsPrice / 100 }}</div>
										<div>×{{ t.goodsNum }}</div>
										<div>￥{{ t.goodsFee / 100 }}</div>
									</div>
								</div>
								<div class="orderDetails">
									<div>包装费</div>
									￥{{ item.packageFee / 100 }}
								</div>
								<div v-if="item.platActivityInfoList.length > 0">
									<div v-for="(v, idx) in item.platActivityInfoList" :key="idx">
										<div class="orderDetails" v-if="idx == 0">
											<div>活动详情</div>
											{{ v.desc }}
										</div>
										<div class="orderDetails" v-else="idx > 0">
											{{ v.desc }}
										</div>
									</div>
								</div>
								<div class="orderDetails">
									<div>配送费</div>
									￥{{ item.freight / 100 }}
								</div>
								<div class="orderDetails">
									<div>商家活动支出</div>
									￥{{ item.activityPrice / 100 }}
								</div>
								<div class="orderDetails orderDetails1">
									<div>本单预计收入</div>
									￥{{ item.shopFee / 100 }}
								</div>
								<div class="orderDetails orderDetails1">
									<div>
										本单顾客实际支付：￥{{ item.userFee / 100
	  			                 }}<span>（已支付）</span>
									</div>
								</div>
								<div style="overflow: hidden;">
									<div class="orderList_rider_right">
										<van-button @click="receipts(item)" color="#626EEE" round
											class="orderList_rider_right_button" plain hairline size='small'
											type="primary">
											<img class="orderList_rider_right_button_icon"
												src="../../static/image/icon_receipts.png" />补打小票
										</van-button>
									</div>
								</div>

								<div class="slide">
									<van-icon class="slide_icon" name="arrow-up" />
								</div>
							</div>
						</van-collapse-item>
					</van-collapse>
				</block>
			</mescroll-body>
	</block>
	</div>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				sua: false,
				activeName: ['1'],
				searchType1: 2,
				value: "",
				id: JSON.parse(uni.getStorageSync("id")),
				token: JSON.parse(uni.getStorageSync("token")),
				dataList: [], //订单列表
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				downOption: {
					use: false
				},
				upOption: {
					page: {
						size: 5,
						num: -1
					},
					textNoMore: '没有更多了',
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
			};
		},
		mounted() {
			var that = this;
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
			into() {
				//请求数据
				var that = this;
				that.sua = true
				console.log(that.value,326)
				// setTimeout(() => {
				// 	that.mescroll.resetUpScroll()
				// }, 1500)
			},
			onKeyInput(event){
				console.log(event)
			this.value = event.target.value	
			},
			upCallback(page) {
				console.log(page)
				let that = this
				let pageNum = page.size; // 页码, 默认从1开始
				let pageSize = page.num; // 页长, 默认每页10条
				uni.request({
					method: "post",
					url: that.$axiosw.interface + that.$axiosw.data[50].interface,
					data: {
						shopId: that.id,
						num: pageNum,
						page: pageSize,
						dayCode: that.value

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
						let curPageLen = curPageData.data.order_list.length;

						// // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = curPageData.data.count;
						console.log(totalSize)
						// // 接口返回的是否有下一页 (true/false)
						// let hasNext = data.xxx;

						//设置列表数据
						if (page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
						console.log(data.data.data.order_list)
						this.dataList = this.dataList.concat(data.data.data.order_list.reverse()); //追加新数据
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
		},
	};
</script>

<style>
	.appproject1 {
		width: 750rpx;
		position: relative;
		top: -96rpx;
		left: 0;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #f6f6f6;
	}

	.title {
		background-color: #ededed;
		color: #fff;
		overflow: hidden;
		text-align: center;
		height: 74rpx;
		line-height: 74rpx;
		position: relative;
	}

	.search_tit_tight {
		/* float: right; */
		font-size: 30rpx;
		margin-left: 20rpx;
		position: absolute;
		top: 0rpx;
		right: 15rpx;
	}

	.search_text {
		width: 95%;
		font-size: 26rpx;
		margin: 30rpx auto;
	}

	.search_text>div {
		color: #777777;
		font-size: 30rpx;
		line-height: 60rpx;
	}

	.title>.shoptitlediv {
		font-size: 34rpx;
		color: #000000;
		display: inline-block;
		vertical-align: top;
		width: auto;
		font-weight: 500;
	}

	.search {
		width: 700rpx;
		background-color: #fff;
		overflow: hidden;
		padding: 0 14rpx;
		margin: auto;
		padding-top: 10rpx;
		margin-top: 0rpx;
	}

	.inline {
		display: inline-block;
		vertical-align: top;
		width: 56rpx;
		text-align: center;
	}

	.inline>img {
		width: 28rpx;
		height: 30rpx;
	}

	.search_tit {
		font-size: 32rpx;
		height: 60rpx;
		line-height: 60rpx;
		position: relative;
		border-bottom: 1rpx solid #353535;
	}

	.search_tit_input {
		width: 70%;
	}

	.search_tit1 {
		margin-top: 30rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 0rpx;
	}

	.search_tit1>div {
		width: 50%;
		display: inline-block;
		vertical-align: top;
		text-align: center;
	}

	.search_tit1>div>button {
		font-size: 30rpx;
		width: 200rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #919191;
		border-radius: 20rpx;
		vertical-align: middle;
		background-color: transparent;
	}

	.search_tit1>div>.search_tit1_button {
		color: #fff;
		background-color: #5563ed;
	}

	.van-pull-refresh {
		height: auto;
	}

	.orderList {
		width: 734rpx;
		margin: 0 auto 20rpx;
		background: #ffffff;
		border-radius: 4rpx;
	}

	.orderList_title {
		width: 734rpx;
		height: 94rpx;
		/* background: #ebddf8; */
		background: #dbddf3;
		border-radius: 4rpx;
		margin: auto;
	}

	.orderList_title_top {
		width: 704rpx;
		margin: auto;
		overflow: hidden;
		font-size: 28rpx;
		color: #353535;
	}

	.orderList_title_top>span {
		vertical-align: top;
		margin-top: 14rpx;
	}

	.orderList_title_top_text1 {
		font-size: 28rpx;
		float: left;
		color: #050505;
		line-height: 40rpx;
		margin-top: 10rpx;
	}

	.orderList_title_top_text {
		/* color: #b620e0; */
		color: #626eee;
	}

	.orderList_title_top>span:nth-child(2) {
		float: right;
		font-size: 24rpx;
		font-weight: 400;
		color: #353535;
	}

	.orderList_height {
		width: 698rpx;
		height: 90rpx;
		margin: auto;
		overflow: hidden;
	}

	.orderList_rider {
		border-bottom: 4rpx dashed #979797;
	}

	.orderList_rider_left>div:nth-child(1) {
		font-size: 28rpx;
		color: #353535;
		line-height: 28rpx;
		margin-top: 16rpx;
	}

	.orderList_rider_left>div:nth-child(2) {
		font-size: 20rpx;
		color: #353535;
		line-height: 20rpx;
		margin-top: 12rpx;
	}

	.orderList_rider_left_icon {
		vertical-align: text-top;
	}

	.orderList_rider_left {
		float: left;
		width: 300rpx;
	}

	.orderList_rider_right {
		float: right;
		height: 100%;
		line-height: 92rpx;
		margin-right: 6rpx;
	}

	.orderList_rider_right_button {
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #bf73de;
		padding: 6rpx 24rpx;
		vertical-align: middle;
	}

	.orderList_rider_right_button_icon {
		/* width: 0.56rpx;
		  height: 0.56rpx; */
		width: 20rpx;
		height: 20rpx;
		/* vertical-align: middle; */
	}

	.orderList_customer {
		line-height: 98rpx;
	}

	.orderList_customer>span {
		font-size: 28rpx;
		color: #353535;
		vertical-align: middle;
	}

	.orderList_customer>span:nth-child(1) {
		margin-right: 16rpx;
	}

	.orderList_customer>img {
		width: 56rpx;
		height: 56rpx;
		float: right;
		margin-top: 22rpx;
		padding-right: 12rpx;
	}

	.orderList_address {
		width: 692rpx;
		margin: 0 auto 10rpx;
		overflow: hidden;
	}

	.orderList_address_left {
		font-size: 28rpx;
		color: #333333;
		line-height: 34rpx;
		float: left;
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

	.orderList_address_left>i {
		display: inline-block;
		width: 20rpx;
		height: 24rpx;
		vertical-align: middle;
		background-color: #333333;
		margin: -4rpx 1rpx 0;
	}

	.orderList_address_right {
		width: 560rpx;
	}

	.orderList_address_right_div {
		line-height: 50rpx;
	}

	.orderList_address_right_div>span {
		margin-left: 30rpx;
	}

	.orderList_note {
		padding: 8rpx 18rpx;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #353535;
		line-height: 32rpx;
		min-height: 40rpx;
	}

	.display_inline-block {
		display: inline-block;
		vertical-align: top;
	}

	.orderList_note>div {
		width: 500rpx;
	}

	.orderList_num {
		width: 698rpx;
		height: 106rpx;
		line-height: 106rpx;
		font-size: 28rpx;
		color: #353535;
		margin: auto;
	}

	.orderList_store {
		width: 698rpx;
		margin: auto;
		height: 58rpx;
		line-height: 64rpx;
		font-size: 30rpx;
		color: #353535;
		overflow: hidden;
		transition: height 0.3s;
	}

	.orderList_store>div {
		float: right;
	}

	.orderList_store_icon {
		vertical-align: text-top;
		transform: rotate(90deg);
	}

	.orderList_store_icon1 {
		vertical-align: middle;
	}

	.orderList_copy {
		width: 60rpx;
		height: 42rpx;
		border-radius: 4rpx;
		font-size: 15rpx;
		padding: 0;
		margin-right: 35rpx;
		float: right;
	}

	.orderList_invoice {
		margin-bottom: 14rpx;
	}

	.orderList_note_copy {
		margin-top: 0;
	}

	.orderList_time {
		text-align: center;
		font-size: 24rpx;
		line-height: 72rpx;
		height: 72rpx;
		color: #b620e0;
	}

	.goodsList {
		width: 694rpx;
		border-bottom: 1rpx solid #989898;
		margin: auto;
		overflow: hidden;
	}

	.goodsList1 {
		color: #353535;
		font-size: 0rpx;
	}

	.goodsList1>div {
		display: inline-block;
		vertical-align: top;
		font-size: 30rpx;
		line-height: 40rpx;
		width: 17%;
	}

	.goodsList1>div:nth-child(1) {
		width: 48%;
		margin-right: 4%;
		text-overflow: ellipsis;
		/* white-space: nowrap; */
		overflow: hidden;
	}

	.goodsList1>div:nth-child(2) {
		margin-right: 3%;
	}

	.goodsList1>div:nth-child(3) {
		width: 10%;
		text-align: right;
	}

	.goodsList1>div:nth-child(4) {
		float: right;
		text-align: right;
	}

	.orderDetails {
		font-size: 32rpx;
		line-height: 60rpx;
		color: #989898;
		text-align: right;
		float: none;
		height: 60rpx;
		overflow: hidden;
		width: 100%;
	}

	.orderDetails1 {
		color: #000000;
	}

	.orderDetails>div {
		float: left;
	}

	.orderDetails>div>span {
		color: #0bc318;
		vertical-align: top;
	}

	.orderList_store>div>.slide {
		float: none;
		text-align: center;
	}

	.slide_icon {
		font-size: 24rpx;
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.selectRider {
		width: 616rpx;
		/* height: 5.14rpx; */
		height: auto;
		background: #ffffff;
	}

	.selectRider_title {
		font-size: 32rpx;
		width: 545rpx;
		line-height: 32rpx;
		margin: 38rpx auto;
	}

	.selectRider_title>span {
		vertical-align: middle;
	}

	.selectRider_title_right {
		font-size: 40rpx;
		float: right !important;
		vertical-align: middle;
	}

	.selectRider_img {
		vertical-align: middle;
		width: 32rpx;
		height: 32rpx;
		margin-right: 18rpx;
	}

	.selectRider_span {
		font-size: 28rpx;
	}

	.selectClick {
		width: 356rpx;
		height: 68rpx;
		font-size: 32rpx;
		margin: 20rpx auto 20rpx;
		display: block;
	}

	.orderList_title_top_text_appointment {
		color: #fa6400;
	}

	.callRiderPhone {
		width: 560rpx;
		height: 430rpx;
		background: #ffffff;
	}

	.callRiderPhone_title {
		height: 86rpx;
		line-height: 80rpx;
		text-align: center;
		position: relative;
		font-size: 32rpx;
	}

	.title {
		background-color: #ededed;
		color: #000;
		overflow: hidden;
		text-align: center;
		height: 74rpx;
		line-height: 74rpx;
		position: relative;
		display: flex;
		padding: 0 10rpx;
		justify-content: space-between;
	}

	.title>.shoptitlediv {
		font-size: 34rpx;
		color: #000000;
		display: inline-block;
		vertical-align: top;
		font-weight: 500;
		width: 16rpx !important;
		height: 18rpx !important;
	}

	.shoptitlediv_icon {
		width: 32rpx;
		height: 36rpx;
		margin: 18rpx 0;
	}

	.callRiderPhone_title_right {
		padding-right: 16rpx;
		font-size: 30rpx;
		vertical-align: middle;
		position: absolute;
		right: 0;
		line-height: 80rpx;
		height: 100%;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.callRiderPhonesize {
		font-size: 30rpx;
		color: #353535;
		padding: 0;
		line-height: 60rpx;
		width: 90%;
		margin: auto;
	}

	.callRiderPhone_but {
		display: block;
		height: 60rpx;
		width: 90%;
		background: #bf73de;
		border-radius: 60rpx;
		font-size: 26rpx;
		line-height: 60rpx;
		margin: 20rpx auto 0;
		color: #fff;
		padding: 0 20rpx;
	}

	.callRiderPhone_but>img {
		width: 18rpx;
	}
</style>

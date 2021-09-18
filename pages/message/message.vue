<template>
	<div>
		<div v-if="shop.length != 0" :style="{top:top+'rpx'}" class="classification">
			<div class="classification_left">
				<van-collapse :value="activeName" @change="onChange" accordion>
					<van-collapse-item :name='index+1' :title=item.name v-for="(item, index) in shop" :key="index">
						<template>
							<i :class="index+1==detail? 'classification_left_div1_i' : ''"></i>
							<!-- <div
                @click="onshopClick(item, index)"
                :class="
                  item.type
                    ? 'classification_left_div1'
                    : 'classification_left_div'
                "
              >
                {{ item.name }}
              </div> -->
							<!-- <! <van-icon v-if="false" /> -->
						</template>
						<div v-if="item.secondCategory!=''" class="classification_left_bottom">
							<div v-for="(ite, inde) in item.secondCategory" :key="inde" :class="ite.type ? 'classification_left_bottomcolor' : ''" @click="secondaryClassification(ite.id, index, inde)">
								{{ ite.name }}
							</div>
						</div>
					</van-collapse-item>

				</van-collapse>
			</div>

			<div class="classification_right" id="testPaper">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback" :down="downOption" :up="upOption">
					<div class="classification_right_list" id="testPaperin">
						<div v-for="(item, index) in dataList" :key="index">
							<div class="classification_right_list_tit">
								{{ item.categoryName }}
							</div>
							<div class="classification_right_list_div" v-for="(itm, idx) in item.goodsList" :key="idx">
								<div class="classification_right_list_div_img">
									<img class="classification_right_list_div_img1" fit="contain" :src="itm.goodsImg"
										lazy-load />
									<div :class="
                      itm.status == 1
                        ? 'classification_right_list_div_img_div'
                        : 'classification_right_list_div_img_div1'
                    ">
										已下架
									</div>
								</div>
								<div class="classification_right_list_div_right" :class="
                    itm.status == 1
                      ? 'classification_right_list_div_right1'
                      : ''
                  ">
									<div class="classification_right_list_div_right_titile">
										{{ itm.goodsName }}
									</div>
									<div class="classification_right_list_div_right_money" v-if="itm.price > 0">
										<span v-if="itm.activityPrice > 0">特价¥{{ itm.activityPrice / 100 }}</span>
										<span :class="
                        itm.activityPrice == 0
                          ? ''
                          : 'classification_right_list_div_right_money_span1'
                      " v-if="itm.price > 0">¥{{ itm.price / 100 }}</span>
									</div>
									<div class="classification_right_list_div_but">
										<van-button size='small' @click="changePrice(index, idx, itm)">改价</van-button>
										<van-button size='small' v-if="itm.status == 0" class="classification_right_list_div_but1"
											@click="
                        goodsDismounting(index, idx, itm.status, itm.goodsId)
                      ">
											下架
										</van-button>
										<van-button size='small' v-if="itm.status == 1"
											class="classification_right_list_div_but1 classification_right_list_div_but2"
											@click="
                        goodsDismounting(index, idx, itm.status, itm.goodsId)
                      ">
											上架
										</van-button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</mescroll-body>
			</div>
			<van-overlay :show="show">
				<div class="moneyNum">
					<div class="moneyNum_title">
						<span>{{ goods.goodsName }}</span>
					</div>
					<div class="moneyNum_input">
						<span>定价</span>
						<input v-model="goods.price" type="number" @input="oninput" alt="0" />
					</div>
					<div class="moneyNum_type">
						<div class="moneyNum_type_but">
							<van-button style='margin-right: 10rpx;' plain color='#cc81ef' size='small' @click="priceChange(0, false, 50)">- 0.5</van-button>
							<van-button plain  color='#cc81ef' size='small' @click="priceChange(0, false, 100)">- 1.0</van-button>
							<van-button style='margin-right: 10rpx;margin-top: 10rpx;' plain color='#cc81ef' size='small' @click="priceChange(0, true, 50)">+ 0.5</van-button>
							<van-button plain style='margin-top: 10rpx;' color='#cc81ef' size='small' @click="priceChange(0, true, 100)">+ 1.0</van-button>
						</div>
						<span>原定价：{{ goodsNum/100 }}¥</span>
					</div>
					<div class="moneyNum_input">
						<span>特价</span>
						<input v-model="goods.activityPrice" type="number" @input="oninput" alt="1" />
					</div>
					<div class="moneyNum_type">
						<div class="moneyNum_type_but" v-if="goods.price != 0">
							<van-button style='margin-right: 10rpx;' plain color='#cc81ef' size='small' @click="priceChange(1, false, 50)">- 0.5</van-button>
							<van-button plain color='#cc81ef' size='small' @click="priceChange(1, false, 100)">- 1.0</van-button>
							<van-button style='margin-right: 10rpx;margin-top: 10rpx;' plain color='#cc81ef' size='small' @click="priceChange(1, true, 50)">+ 0.5</van-button>
							<van-button  style='margin-top: 10rpx;' plain color='#cc81ef' size='small' @click="priceChange(1, true, 100)">+ 1.0</van-button>
						</div>
						<span>原特价：{{ goodsNums/100 }}¥</span>
					</div>
					<div class="moneyNum_text">
						若不填写特价则不设置特价，原特价会取消
					</div>
					<div class="moneyNum_but">
						<van-button color='#cc81ef' size='small' @click="show = false">取消</van-button>
						<van-button color='#cc81ef'  size='small' @click="changePriceClick()">保存</van-button>
					</div>
				</div>
			</van-overlay>
		</div>
		<div v-if="shop.length == 0" class="classificationin">
			<div class="classificationin_block">
				<div>暂无商品</div>
				<div>联系运营人员开通小程序</div>
			</div>
		</div>
	</div>
</template>
<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				upOption: {
					page: {
						size: 30,
						num: -1
					},
					textNoMore: '没有更多了',
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				top: 0,
				id: 0,
				ida:0,
				token: 0,
				shop: [{}], //分类列表
				goodsList: [], //商品列表
				oneTypeindex: 0, //分类下标
				twoshopList: [], //二级分类列表
				categoryId: 0, //二级id
				pageNumber: 0, //分页页码
				activeName: ["1"], //分类列表选中
				rolling: false, //监测加载更多商品
				rollingType: false, //监测加载更多商品
				//修改价格
				show: false, //弹框快关
				goods: {}, //选中商品
				goodsNum: 0, //选中原价
				goodsNums: 0, //选中特价
				goodsids: {
					//下标
					index: 0,
					idx: 0
				},
				selected: 0, //选中分类id
				count: [], //商品数量
				detail: 1,
				// /////////////////////////
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				downOption: {
					use: false
				},
				
				dataList: [],
			};
		},
		onLoad() {
			let that=this
			//#ifdef MP
			this.top = 0
			//#endif
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("id"));
		},
		onShow() {
			this.into();
			
		},
		methods: {
			onChange(event) {
				let that=this
				console.log(event)
				if (event.detail != '') {
					this.detail = event.detail
					that.ida=that.shop[event.detail-1].id
					that.mescroll.resetUpScroll()
				}
				this.activeName = event.detail
			},
			into() {
				var that = this;
				that.id = JSON.parse(uni.getStorageSync("id"));
				that.token = JSON.parse(uni.getStorageSync("token"));
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[25].interface,
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
							that.shop = e.data.data.categoryOneDtos;
							e.data.data.categoryOneDtos[that.oneTypeindex].type = true;
							console.log(that.shop.length,240)
							that.ida=e.data.data.categoryOneDtos[that.oneTypeindex].id
							
							
						}
					});
			},
			onshopClick(e, d) {
				var that = this;
				console.log(e, d)
				var shop = that.shop;
				for (var i = 0; i < shop.length; i++) {
					if (i == d) {
						shop[d].type = true;
					} else {
						shop[i].type = false;
					}
				}
				that.pageNumber = 0;
				if (that.shop[d].id != that.selected) {
					that.selected = that.shop[d].id;
					that.goodsListRequest(that.shop[d].id);
				}
			},
			goodsListRequest(id, selectedType) {
			},
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
				let that = this
				console.log(that.mescroll.optUp)
				console.log(page)
				setTimeout(()=>{
					let pageNum = page.size; // 页码, 默认从1开始
				let pageSize = page.num; // 页长, 默认每页10条
				uni.request({
					method: "post",
					url: that.$axiosw.interface + that.$axiosw.data[26].interface,
					data: {
						shopId: that.id,
						num: pageNum,
						pageNumber: pageSize,
						categoryId: that.ida

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
						if(data.data.status==0){
							
						// 接口返回的当前页数据列表 (数组)
						let curPageData = data.data;
						// // 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						var cou = 0
						for (var i = 0; i < curPageData.data.goodsList.length; i++) {
							cou += curPageData.data.goodsList[i].categoryNum
						}
						console.log(cou)
						let curPageLen = cou.toString()
						// // 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
						let totalSize = curPageData.data.count;
						//设置列表数据
						if (page.num == 0) this.dataList = []; //如果是第一页需手动置空列表
						console.log(data.data.data.goodsList)
						this.dataList = this.dataList.concat(data.data.data.goodsList); //追加新数据
						console.log(this.dataList)
						//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
						this.mescroll.endBySize(curPageLen, totalSize);
						setTimeout(() => {
							this.mescroll.endSuccess(curPageLen)
						}, 20)
						}
					},
					fail: () => {
						//  请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				})

				},100)
				
			},
			goodsDismounting(idx, num, status, goodsId) {
				var that = this;
				
				if (status == 0) {
					var status = 1;
				} else {
					var status = 0;
				}
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[28].interface,
						data: {
							shopId: that.id,
							goodsId: goodsId,
							status: status
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
						var e = that.interactionDetection(res);
						if (e.data.status == 0) {
							that.show = false;
							if (status == 0) {
								that.goodsList[idx].goodsList[num].status = 0;
								that.$toast.success("上架成功");
							} else {
								that.goodsList[idx].goodsList[num].status = 1;
								that.$toast.success("下架成功");
							}
						} else {
							that.$toast.success(e.data.msg);
						}
					});
			},
			changePrice(e, d, itm) {
				var that = this;
				that.show = true;
				uni.setStorageSync("goods", JSON.stringify(itm));
				that.goods = JSON.parse(uni.getStorageSync("goods"));
				that.goodsNums = that.goods.activityPrice;
				that.goodsNum = that.goods.price;
				that.goods.price = (that.goods.price) / 100;
				that.goods.activityPrice = (that.goods.activityPrice) / 100;
				that.goodsids = {
					index: e,
					idx: d
				};
			},
			changePriceClick() {
				var that = this;
				if (that.goods.price == "") {
					that.goods.price = 0;
				}
				if (that.goods.activityPrice == "") {
					that.goods.activityPrice = 0;
				}
				that.price = Number(that.goods.price) * 100;
				that.activityPrice = Number(that.goods.activityPrice) * 100;
				uni.request({
						method: "post",
						url: that.$axiosw.interface + that.$axiosw.data[29].interface,
						data: {
							shopId: that.id,
							goodsId: that.goods.goodsId,
							price: that.price,
							activityPrice: that.activityPrice
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
						that.show = false;
						if (e.data.status == 0) {
							uni.showToast({
								icon: "success",
								title: '修改成功',
								duration: 3000,
								position: 'top'
							})
							that.goods.price = Number(that.goods.price) * 100;
							that.goods.activityPrice = Number(that.goods.activityPrice) * 100;
							that.goodsList[that.goodsids.index].goodsList[that.goodsids.idx] =
								that.goods;
						} else {
							uni.showToast({
								icon: "none",
								title: '修改失败',
								duration: 3000,
								position: 'top'
							})
						}
					});
			},
			priceChange(type, addAndSubtract, num) {
				if (type == 0) {
					var n = Number(this.goods.price) * 100;
					if (addAndSubtract == true) {
						this.goods.price = (n + num) / 100;
					} else {
						if ((n - num) / 100 <= 0) {
							this.goods.price = 0;
						} else {
							this.goods.price = (n - num) / 100;
						}
					}
				} else {
					var n = Number(this.goods.activityPrice) * 100;
					if (addAndSubtract == true) {
						this.goods.activityPrice = (n + num) / 100;
					} else {
						if ((n - num) / 100 <= 0) {
							this.goods.activityPrice = 0;
						} else {
							this.goods.activityPrice = (n - num) / 100;
						}
					}
				}
			},
			paperScroll() {
				//改变元素#searchBar的top值
				var that = this;
				if (that.rollingType == false) {
					that.pageNumber++;
					that.goodsListRequest(that.categoryId);
				}
			},
			secondaryClassification(id, index, idx) {
				let that=this
				for (var i = 0; i < this.shop[index].secondCategory.length; i++) {
					if (i == idx) {
						this.shop[index].secondCategory[i].type = true;
					} else {
						this.shop[index].secondCategory[i].type = false;
					}
				}
				this.pageNumber = 0;
				that.ida=id
				that.mescroll.resetUpScroll()
			},
			oninput(e) {
				// 通过正则过滤小数点后两位
				if (e.target.alt == 0) {
					this.goods.price = e.target.value.replace(
						/([0-9]+\.[0-9]{2})[0-9]*/,
						"$1"
					);
				} else {
					this.goods.activityPrice = e.target.value.replace(
						/([0-9]+\.[0-9]{2})[0-9]*/,
						"$1"
					);
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
		},
		mounted() {
			let that=this
			that.id = JSON.parse(uni.getStorageSync("id"));
			that.token = JSON.parse(uni.getStorageSync("id"));
			this.into();
		}
	};
</script>
<style lang="less" scoped>
	.classification_left {
		::v-deep .van-collapse-item__title .van-cell__right-icon {
			display: none;
		}
	}
</style>
<style>
	.classification {
		overflow: hidden;
		width: 100%;
		background: #f7f8f9;
		position: relative;
		/* height: calc(100% - 120rpx); */
		height: auto;
		top: 88rpx;
		left: 0;
		font-size: 0;
	}

	.classification_left {
		height: 100%;
		width: 32%;
		position: fixed;
		display: inline-block;
		vertical-align: top;
		overflow-y: auto;
	}

	.classification_left_div {
		width: 100%;
		padding-left: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 28rpx;
		color: #777777;
	}

	.classification_left_div1 {
		width: 100%;
		color: #5563ed;
		padding-left: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 28rpx;
	}

	.classification_left_div1_i {
		position: absolute;
		top: 34rpx;
		left: 14rpx;
		width: 4rpx;
		height: 19rpx;
		background-color: #5563ed;
	}

	.classification_left_div>span {
		vertical-align: middle;
		margin-left: 32rpx;
	}

	.classification_right {
		width: 68%;
		height: 100%;
		background-color: #f3f3f3;
		display: inline-block;
		vertical-align: top;
		overflow-y: auto;
		position: relative;
		left: 32%;
	}

	.classification_right_list {
		margin-top: 30rpx;
		overflow: hidden;
	}

	.classification_right_titile {
		margin-left: 14rpx;
		line-height: 96rpx;
		position: relative;
	}

	.classification_right_titile_r {
		position: absolute;
		top: 16rpx;
		right: 0;
		width: 88rpx;
		height: 56rpx;
		z-index: 99;
	}

	.classification_right_titile_r>img {
		width: 100%;
		height: 100%;
	}

	.classification_right_titile_text {
		display: inline-block;
		vertical-align: middle;
		font-size: 24rpx;
		color: #353535;
		padding: 18rpx 24rpx;
		line-height: 24rpx;
		margin-right: 8rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.classification_right_titile_text1 {
		background-color: #5563ed;
		color: #5563ed;
	}

	.classification_right_titile1 {
		white-space: nowrap;
		/*文本不会换行，文本会在在同一行上继续*/
		overflow-y: auto;
		/*可滑动*/
		width: 93%;
	}

	.classification_right_titile1::-webkit-scrollbar,
	.classification_left::-webkit-scrollbar,
	.classification_right::-webkit-scrollbar {
		display: none;
	}

	.classification_right_list_div {
		width: 546rpx;
		height: 172rpx;
		margin: auto;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #e0e0e0;
		overflow: hidden;
	}

	.classification_right_list_div_img {
		display: inline-block;
		vertical-align: top;
		width: 172rpx;
		height: 172rpx;
		position: relative;
	}

	.classification_right_list_div_img>.classification_right_list_div_img_div1 {
		display: none;
	}

	.classification_right_list_div_img>.classification_right_list_div_img_div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		line-height: 172rpx;
		text-align: center;
		color: #fff;
		font-size: 32rpx;
	}

	.classification_right_list_div_img1 {
		width: 100%;
		height: 100%;
	}

	.classification_right_list_div_right_titile {
		font-size: 28rpx;
		line-height: 42rpx;
	}

	.classification_right_list_div_right {
		display: inline-block;
		vertical-align: top;
		margin-top: 12rpx;
		margin-left: 18rpx;
		width: 330rpx;
		color: #2a2323;
	}

	.classification_right_list_div_right1 {
		color: #999;
	}

	.classification_right_list_div_right_titile {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
		line-height: 42rpx;
	}

	.classification_right_list_div_right_money {
		font-size: 28rpx;
		line-height: 64rpx;
		height: 64rpx;
		width: 100%;
		overflow: hidden;
	}

	.classification_right_list_div_right_money>span:nth-child(1) {
		font-size: 24rpx;
		line-height: 42rpx;
		vertical-align: middle;
		margin-left: 10rpx;
	}

	.classification_right_list_div_right_money>.classification_right_list_div_right_money_span1 {
		text-decoration: line-through;
		color: #c67ae7;
	}

	.montmorilloniteLayer {
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 40rpx;
		border-bottom: 1rpx solid #cfcfcf;
	}

	.van-collapse-item__title,
	.van-collapse-item__content {
		padding: 0 !important;
	}

	.classification_left_bottom {
		background-color: #f3f3f3;
	}

	.classification_left_bottom>div {
		font-size: 26rpx;
		color: #454545;
		line-height: 60rpx;
		padding-left: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.classification_right_list_div_but {
		width: 336rpx;
		margin: auto;
	}

	.classification_right_list_div_but>button {
		padding: 0;
		width: 157rpx;
		height: 48rpx;
		border-radius: 27rpx;
		border: 2rpx solid #5563ed;
		font-size: 28rpx;
		color: #5563ed;
		line-height: 48rpx;
		margin-right: 12rpx;
		background-color: #fff;
	}

	.classification_right_list_div_but>.classification_right_list_div_but2 {
		color: #fff;
		background-color: #5563ed;
		border-color: #5563ed;
	}

	.classification_right_list_div_but>.classification_right_list_div_but1 {
		margin-right: 0;
	}

	.moneyNum {
		width: 604rpx;
		height: 680rpx;
		background: #ffffff;
		border-radius: 8rpx;
		border: 2rpx solid #979797;
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		z-index: 99;
	}

	.moneyNum_title {
		border-bottom: 2rpx solid #979797;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 36rpx;
		color: #353535;
		padding-left: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.moneyNum_input {
		width: 540rpx;
		margin: 36rpx auto 0;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 36rpx;
		color: #595959;
	}

	.moneyNum_input>input {
		width: 346rpx;
		height: 54rpx;
		border: 2rpx solid #cbcbcb;
		text-align: center;
		font-size: 42rpx;
		color: #353535;
		float: right;
	}

	.moneyNum_type {
		font-size: 28rpx;
		color: #837673;
		line-height: 60rpx;
		width: 540rpx;
		margin: auto;
	}

	.moneyNum_type_but {
		float: right;
		font-size: 28rpx;
		color: #cc81ef;
		width: 300rpx;
		margin: 0 auto;
		display: flex;
		    justify-content: space-evenly;
		    flex-wrap: wrap;
	}

	.moneyNum_type_but>button {
		background-color: transparent;
		margin-right: 26rpx;
	}

	.moneyNum_type_but>button:nth-child(4) {
		margin-right: 0;
	}

	.moneyNum_text {
		font-size: 28rpx;
		color: #887b79;
		margin: auto;
		width: 540rpx;
		line-height: 42rpx;
	}

	.moneyNum_but {
		width: 540rpx;
		margin: 40rpx auto 0;
		    display: flex;
		    justify-content: space-around;
	}

	/* .moneyNum_but>van-button {
		width: 220rpx;
		height: 60rpx;
		border-radius: 27rpx;
		border: 2rpx solid #5563ed;
		line-height: 48rpx;
		font-size: 28rpx;
		color: #5563ed;
		background-color: #fff;
	}
 */
	.moneyNum_but>button:nth-child(2) {
		color: #ffffff;
		background-color: #5563ed;
		float: right;
	}

	.classification_right_list_tit {
		color: #353535;
		padding-left: 16rpx;
		font-size: 26rpx;
		height: 46rpx;
		line-height: 46rpx;
		background: #f9ebff;
	}

	.classification_left_bottom>.classification_left_bottomcolor {
		color: #5563ed;
	}

	.classificationin {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f3f5f7;
	}

	.classificationin_block {
		font-size: 32rpx;
		text-align: center;
		line-height: 60rpx;
		color: #474747;
	}
</style>

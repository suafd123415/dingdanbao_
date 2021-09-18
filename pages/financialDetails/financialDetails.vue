<template>
  <div style="background: #f2f2f2;height: 100vh;" class="financialDetails">
    <div class="my_title"  :style="{height:height+50+'px'}">
		<div  :style="{paddingTop:top+'rpx'}" style="z-index: 999;padding-left: 15rpx;">#{{list.orderInfo.dayCode}}
      <van-button :style="{paddingTop:top+'rpx'}" style="z-index: 999;padding-left: 15rpx;" color="#EDEDED" class="my_title_but my_title_but2" @click="back()">
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button></div>
    </div>
    <div>
      <div class="order">
        <div class="order_title">订单信息</div>
        <div class="order_information">
          <div class="order_information_list">店铺信息：{{list.orderInfo.shopName}}</div>
          <div class="order_information_list">下单时间：{{list.orderInfo.createTime}}</div>
          <div class="order_information_list">送达时间：{{list.orderInfo.userSendTime}}</div>
          <div class="order_information_list">订单编号：{{list.orderInfo.orderId}}</div>
          <div class="order_information_list">备注：{{list.orderInfo.remark}}</div>
        </div>
      </div>
      <div class="order">
        <div class="order_title">收货信息</div>
        <div class="order_information">
          <div class="order_information_list">姓名：{{list.orderUser.name}}</div>
          <div class="order_information_list">手机号：{{list.orderUser.privacyPhone}}</div>
          <div class="order_information_list">地址：{{list.orderUser.address}}</div>
        </div>
      </div>
      <div class="order">
        <div class="order_title">商品详情</div>
        <div class="order_information">
          <div class="order_information_goods" v-for="(item,index) in list.orderGoods" :key="index">
            <div class="anEllipsisLine">{{item.goodsName}}</div>
            <div>￥{{item.goodsPrice/100}}</div>
            <div>×{{item.goodsNum}}</div>
            <div>￥{{item.goodsFee/100}}</div>
          </div>
        </div>
      </div>
      <div class="order">
        <div class="order_title">支付信息</div>
        <div class="order_information">
          <div class="order_information_pay"><div>商品总额：</div>￥{{list.orderInfo.totalFee/100}}</div>
          <div class="order_information_pay"><div>商家活动支出：</div>￥{{list.orderInfo.activityPrice/100}}</div>
          <div class="order_information_pay"><div>平台服务费：</div>￥{{list.orderInfo.commission/100}}</div>
          <div class="order_information_pay"><div>顾客支付配送费：</div>￥{{list.orderInfo.sendFee/100}}</div>
          <div class="order_information_pay"><div>本单顾客实际支付：</div>￥{{list.orderInfo.userFee/100}}</div>
          <div class="order_information_pay"><div>本单预计收入：</div>￥{{list.orderInfo.shopFee/100}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
		  top: 0,
		  height: '',
        id:"",
        token:"",
        list:{},
        time:undefined,
		option:'',
      }
    },
	beforeMount() {
      this.beforeDestroy()
	},
	onLoad(option) {
		let that=this
		//#ifdef MP
		this.top = 80
		//#endif
		// 获取手机状态栏高度
		uni.getSystemInfo({
			success: function(data) {
				// 将其赋值给this
				that.height = data.statusBarHeight;
			}
		})
		console.log(option);
		that.option=option
		this.id = JSON.parse(uni.getStorageSync('id'));
		this.token = JSON.parse(uni.getStorageSync('token'));
		this.into(option.orderId);
	},
    mounted() {
    },
    methods:{
      into(orderId){
        var that = this;
        uni.request({
          method: 'post',
          url: that.$axiosw.interface + that.$axiosw.data[39].interface,
          data: {
            'shopId': that.id,
            'orderId':orderId,
          },
          transformRequest: [function(data) {
            let ret = '';
            ret = that.$qs.stringify(data);
            return ret;
          }],
          header: {
            'Authorization': that.token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res) {
          var e = that.interactionDetection(res[1])
          if (e.data.status == 0) {
            e.data.data.orderUser.tail = e.data.data.orderUser.phone.substring(7);
            that.list = e.data.data
          }
        })
      },
      beforeDestroy(){
        
      },
      back(){
		  let that=this
        uni.switchTab({
        	url:`../finance/finance?selectedTime=${that.option}`
        })
      },
      interactionDetection(res){
        var that = this;
        if(res.data.status == 200 || res.data.status == 0){
          return res
        }else if(res.data.status == 7001 || res.data.status == 8001){
          that.$toast(res.data.msg);
         uni.setStorageSync("status",true);
          setTimeout(()=>{
            that.$router.push({
              path: '/logo'
            });
          },500)
        }else{
          that.$toast(res.data.msg);
          return res
        }
      },
    }
  }
</script>

<style>
  .order{
    background-color: #fff;
    overflow: hidden;
    border-bottom: 12rpx solid #f5f5f5;
  }
  .my_title_but{
    width: 74rpx;
    height: 74rpx;
    line-height: 74rpx;
    text-align: center;
    font-size: 32rpx;
  }
  .my_title_but2{
    position: absolute;
    left: 0;
    top: 0;
  }
  .order_title{
    padding-left: 30rpx;
    height: 74rpx;
    line-height: 74rpx;
    font-size: 28rpx;
    border-bottom: 2rpx solid #989898;
  }
  .order_information{
    padding: 20rpx;
  }
  .order_information_list{
    font-size: 28rpx;
    line-height: 58rpx;
  }
  .order_information_goods{
    font-size: 28rpx;
    color: #353535;
    line-height: 52rpx;
    overflow: hidden;
  }
  .order_information_goods>div{
    float: left;
    margin-right: 24rpx;
  }
  .order_information_goods>div:nth-child(1){
    width: 320rpx;
  }
  .anEllipsisLine{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .order_information_goods>div:nth-child(2){
    width: 150rpx;
  }
  .order_information_goods>div:nth-child(3){
    width: 80rpx;
  }
  .order_information_goods>div:nth-child(4){
    float: right;
    margin-right: 0;
  }
  .order_information_pay{
    font-size: 28rpx;
    color: #202020;
    line-height: 52rpx;
    overflow: hidden;
    text-align: right;
  }
  .order_information_pay>div{
    float: left;
  }

</style>

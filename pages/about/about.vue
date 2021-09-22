<template>
  <view style="background: #f2f2f2;height: 100vh;">
    <!-- <view class="my_title">关于订单宝
      <van-button color="#EDEDED" type="primary" class="my_title_but my_title_but2" @click="back()">
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button>
    </view> -->
    <view class="about">
      <view class="about_view">
        <img src="../../static/image/icon_logo.png" />
        <view>集成的外卖平台版本号：1.0.0</view>
      </view>
    </view>
	<view style="margin-bottom: 20rpx;" class="">
    <van-cell class="setUpList" title="版权信息" is-link />
	</view>
	<view style="margin-bottom: 20rpx;" class="">
    <van-cell class="setUpList" title="服务协议" is-link />
	</view>
	<view style="margin-bottom: 20rpx;" class="">
		<van-cell class="setUpList" is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">检测更新</span>
        <!-- <van-tag type="danger" color="transparent">new</van-tag> -->
      </template>
    </van-cell>
	</view>
    
  </view>
</template>

<script>
  // import axiosw from '../../request.json'
  export default {
    name: 'setUp',
    data () {
      return {
        id:'',
        token:""
      }
    },
    mounted() {
      var that = this;
      that.id = JSON.parse(uni.getStorageSync('id'));
      that.token = JSON.parse(uni.getStorageSync('token'));
    },
    methods:{
      back(){
        this.$router.push({
          path: '/setUp'
        })
      },
    }
  }
</script>

<style>
	.setUpList{
		padding-bottom: 10rpx;
	}
  .about{
    width: 100%;
    height: 390rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .about_view{
    width: 350rpx;
    font-size: 20rpx;
    text-align: center;
  }
  .about_view>img{
    width: 120rpx;
	height: 120rpx;
    display: block;
    margin:0 auto 24rpx;
  }
</style>

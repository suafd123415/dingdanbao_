<template>
  <div class="setUp" :style="{top:top+'rpx'}">
   <!-- <div class="my_title">账号与安全
      <van-button color="#EDEDED" type="primary" class="my_title_but my_title_but2" @click="back()">
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button>
    </div> -->
	<view class="mar_bot" style="padding-top: 20rpx;">
		<van-cell class="setUpList" title="登录密码" is-link value="修改" @click="modify('修改密码',1)" />
	</view>
	<view class="mar_bot">
		<van-cell class="setUpList" title="修改手机号" is-link value="修改" @click="modify('修改手机号',2)" />
	</view>
  </div>
</template>

<script>
  import axiosw from '../../request.json'
  export default {
    name: 'setUp',
    data () {
      return {
		top:88
      }
    },
	onLoad() {
		//#ifdef MP
		this.top = 0
		//#endif
	},
    methods:{
      back(){
        this.$router.push({
          path: '/setUp'
        })
      },
      modify(name,type){
		uni.navigateTo({
			url:`../modify/modify?title=${name}&type=${type}`
		})
      }
    }
  }
</script>

<style>
	.mar_bot{
		margin-bottom: 20rpx;
	}
  .setUp{
    position: fixed;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: #f3f5f7;
    overflow: hidden;
  }
  .my_title_but{
    width: 0.74rem;
    height: 0.74rem;
    line-height: 0.74rem;
    text-align: center;
  }
  .my_title_but2{
    position: absolute;
    left: 0;
    top: 0;
  }
</style>

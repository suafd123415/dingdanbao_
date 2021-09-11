<template>
  <div class="app">
    <div class="logo" :style="{paddingTop:padding+'rpx' }" >
      <button
        v-if="type == false"
        color="#333333"
        class="logo_phone_but"
        plain
        type="default"
		style="border: none;"
        @click="conversion()"
        >验证码登录</button
      >
      <button
        v-else="type == true"
        color="#333333"
        class="logo_phone_but"
        plain
        type="default"
		style="border: none;"
        @click="conversion()"
        >密码登录</button
      >
	  <view class="logo_img">
      <img style="width: 128rpx;height: 128rpx;" src="../../static/image/icon_logo.png" />
	  </view>
      <div class="logo_div">
        <div class="logo_div_title">
          <div class="color_orange">手机号</div>
          <div class="logo_div1">
            <input
              class="logo_div_input"
              maxlength="11"
              placeholder="请输入手机号"
              v-model="val.userPhone"
            />
            <i class="progressBar"></i>
          </div>
        </div>

        <div class="logo_div_title" v-if="type == false">
          <div>密码</div>
          <div class="logo_div1">
            <input
              class="logo_div_input"
              maxlength="6"
              placeholder="请输入密码"
              v-model="val.passWord"
            />
            <i class="progressBar"></i>
          </div>
        </div>
        <div class="logo_div_title" v-else="type == true">
          <div>短信验证码</div>
          <div class="logo_div1">
            <input
              class="logo_div_input"
              placeholder="请输入短信验证码"
              v-model="val.code"
			  style="display: inline-block;"
            />
            <button
              color="#5563ED"
              @click="codeClick()"
              class="code"
			  style="line-height: 48rpx;"
              type="default"
              >{{ code }}</button
            >
            <i class="progressBar"></i>
          </div>
        </div>
        <button
		style="border: none;"
          color="#323643"
          class="logo_phone_but forget"
          plain
          type="primary"
          @click="registered()"
          >忘记密码？
        </button>
        <button
          color="#5563ED"
          class="login"
          block
          type="primary"
          @click="butType()"
          >登录</button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
		padding:0,
      type: false,
      val: {
        userPhone: "",
        passWord: "",
        code: ""
      },
      code: "获取验证码",
      btnDisabled: false,
      videoWidth: "",
      videoHeight: ""
    };
  },
  mouted() {},
  onLoad() {
	//#ifdef MP
	this.padding = 165
	//#endif
  },
  methods: {
    keyDown(e) {
      if (e.keyCode === 13) {
        this.butType();
      }
    },
    butType() {
      var that = this;
      that.$utile.throttle(
        function() {
          // 异步更新数据
          var reg = new RegExp("^[A-Za-z0-9]+$");
          if (
            that.val.userPhone.length != 11 ||
            !/^1[3456789]\d{9}$/.test(that.val.userPhone)
          ) {
            that.$notify({
              type: "danger",
              message: "电话不对"
            });
          }
          if (that.type == false) {
            if (that.val.passWord.length == 6) {
              that.denlu();
            } else if (that.val.passWord.length < 6) {
              that.$notify({
                type: "danger",
                message: "密码数量不够"
              });
            } else if (!reg.test(that.val.passWord)) {
              that.$notify({
                type: "danger",
                message: "密码只能输入英文和数字"
              });
            } else {
              that.$notify({
                type: "danger",
                message: "密码不能为空"
              });
            }
          } else {
            if (that.val.code.length > 0) {
              that.denlu();
            } else {
              that.$notify({
                type: "danger",
                message: "验证码不能为空"
              });
            }
          }
        },
        500,
        600,
        "logo_butType"
      );
    },
    denlu() {
      var that = this;
     uni.request({
          method: "post",
          url: that.$axiosw.interface + that.$axiosw.data[0].interface,
          data: {
            userPhone: that.val.userPhone,
            passWord: that.val.passWord,
            code: that.val.code
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
        success:(res)=>{
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
              userPhone: that.val.userPhone,
              passWord: that.val.passWord
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
            	title: '登录成功',
            	duration: 3000,
            	position: 'top'
            })
            setTimeout(() => {
              uni.switchTab({
              	url:'../index/index'
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
    registered(e) {
      var that = this;
      that.$router.push({
        path: "/registered"
      });
    },
    goBack() {
      var that = this;
      console.log("点击了浏览器的返回按钮");
      history.pushState(null, null, document.URL);
    },
    codeClick() {
      var that = this;
      if (that.btnDisabled || that.val.userPhone.length < 11) {
        if (
          that.val.userPhone.length != 11 ||
          !/^1[3456789]\d{9}$/.test(that.val.userPhone)
        ) {
          that.$notify({
            type: "danger",
            message: "电话不对"
          });
        }
        return;
      } else {
        if (that.val.userPhone != "") {
          that
            .$axios({
              method: "post",
              url: that.$axiosw.interface + that.$axiosw.data[36].interface,
              data: {
                userPhone: that.val.userPhone,
                source: 203
              },
              transformRequest: [
                function(data) {
                  let ret = "";
                  ret = that.$qs.stringify(data);
                  return ret;
                }
              ],
              header: {
                Authorization: JSON.parse(window.localStorage.getItem("token")),
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
            .then(function(e) {
              if (e.data.status == 0) {
                that.getSecond(60);
              } else {
                that.$toast(e.data.msg);
              }
            });
        }
      }
    },
    conversion() {
      this.type = !this.type;
      this.val = {
        userPhone: "",
        passWord: "",
        code: ""
      };
      this.code = "获取验证码";
    },
    //发送验证码
    getSecond(wait) {
      let that = this;
      let waita = wait;
      if (wait == 0) {
        that.btnDisabled = false;
        that.code = "重新获取";
        wait = waita;
      } else {
        that.btnDisabled = true;
        that.code = "重新发送验证码(" + wait + ")";
        wait--;
        setTimeout(function() {
          that.getSecond(wait);
        }, 1000);
      }
    }
  },
  mounted() {
    var that = this;
    var r = null;
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }

    if (window.localStorage.getItem("status") == false) {
      this.$toast("需要重新登录");
      this.val.userPhone = JSON.parse(
        window.localStorage.getItem("loginAccount")
      ).userPhone;
      this.val.passWord = JSON.parse(
        window.localStorage.getItem("loginAccount")
      ).passWord;
    }
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    // 销毁事件
    window.rpxoveEventListener("keydown", this.keyDown, false);
  }
};
</script>

<style>
.logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: #5563ED; */
  background: #acb4ff;
  z-index: 10;
}

.logo_phone_but {
  float: right;
  font-size: 28rpx;
  padding: 0 28rpx;
  border: 0;
  background-color: transparent;
}

.logo_img {
  display: block;
  width: 128rpx;
  height: 128rpx;
  margin: 70rpx auto 40rpx;
}

.logo_div {
  /* width: 7.18rpx; */
  width: 100%;
  /* height: 70%; */
  height: 100%;
  background-color: #fff;
  margin: auto;
  border-radius: 8rpx;
  overflow: hidden;
}

.logo_div_title {
  width: 580rpx;
  margin: 0 auto 0;
  font-size: 28rpx;
  color: #989898;
}

.logo_div_title:nth-child(1) {
  margin-top: 60rpx;
}

.logo_div_title:nth-child(1) > .logo_div1 {
  margin-bottom: 30rpx;
}

.color_orange {
  color: #000;
}

.logo_div1 {
  position: relative;
  margin-top: 20rpx;
  border-bottom: 2rpx solid #d8d8d8;
}

.logo_div_input {
  font-size: 30rpx;
  line-height: 64rpx;
  color: #333333;
  background-color: transparent;
  width: 50%;
}

.progressBar {
  position: absolute;
  display: block;
  bottom: -2rpx;
  left: 0;
  width: 0%;
  height: 1rpx;
  background-color: #5563ed;
  z-index: 100;
  transition: width 0.34s;
}

.logo_div1:hover > .progressBar {
  width: 100%;
}

.forget {
  margin-right: 30rpx;
}

.login {
  width: 580rpx;
  height: 80rpx;
  font-size: 36rpx;
  margin: 120rpx auto 0;
  border-radius: 80rpx;
}

.code {
  float: right;
  padding: 0 20rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  height: 48rpx;
  border-radius: 48rpx;
}
</style>

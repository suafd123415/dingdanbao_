<template>
  <div class="appmy">
    <!-- <div class="my_title">
      商家中心
      <van-button
        color="#EDEDED"
        type="primary"
        class="my_title_but my_title_but2"
        @click="back()"
      >
        <van-icon class="my_title_but_img" name="arrow-left" />
      </van-button>
    </div> -->
    <van-tabs @click="onClick" active='10'>
      <van-tab title="天鲜郡" name="10"></van-tab>
      <van-tab title="美团" name="1"></van-tab>
      <van-tab title="饿了么" name="2"></van-tab>
    </van-tabs>
    <div>
      <div
        class="businessCenter_goods"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="businessCenter_goods_left">
          <span>{{ item.shopName }}</span>
          <button
            @click="businessType(item, index)"
            :class="{
              businessCenter_goods_left_button: item.businessStatus == 1
            }"
          >
            <span v-if="item.businessStatus == 0">营业中</span>
            <span v-else="item.businessStatus == 1">休息</span>
          </button>
        </div>
        <div class="businessCenter_goods_right">
          <div class="businessCenter_goods_title">
            <span>营业时间</span>
            <van-icon
              @click="addTimeList(index)"
              class="businessCenter_goods_title_but"
              name="add-o"
            />
            <van-button
              v-if="item.type == true"
              class="businessCenter_goods_title_buttom"
              @click="modifyShopTime(item, index)"
              >完成</van-button
            >
          </div>
          <div
            class="businessCenter_goods_time"
            v-for="(t, i) in item.timeList"
            :key="i"
          >
            <span @click="modifyTime(index, i, 0)">{{ t.startTime }}</span>
            <img
              @click="modifyTime(index, i, 0)"
              class="businessCenter_goods_time_calendar"
			  style='height: 24rpx;'
              src="../../static/image/icon_calendar.png"
            />
            <i style='display: inline-block;'>到</i>
            <span @click="modifyTime(index, i, 1)">{{ t.endTime }}</span>
            <img
              @click="modifyTime(index, i, 1)"
			  style='height: 24rpx;'
              class="businessCenter_goods_time_calendar"
              src="../../static/image/icon_calendar.png"
            />
            <img
              @click="delTimeList(index, i)"
              class="businessCenter_goods_time_delete"
              src="../../static/image/icon_delete.png"
            />
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="time"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "setUp",
  data() {
    return {
      id: "",
      idx: "",
      token: "",
      plat: 10,
      list: [],
      showPicker: false,
      timeIndex: {}
    };
  },
  mounted() {
    this.id = JSON.parse(uni.getStorageSync("id"));
    this.token = JSON.parse(uni.getStorageSync("token"));
    this.into();
  },
  methods: {
    back() {
      this.$router.push({
        path: "/"
      });
    },
    onClick(name, title) {
		console.log(name)
      if (this.plat != name.detail.name) {
        this.plat = name.detail.name;
        this.into();
      }
    },
    businessType(num, index) {
      var that = this;
      that.$utile.throttle(
        function() {
          // 异步更新数据
          if (num.businessStatus == 0) {
            that.business(1, index, num);
          } else {
            that.business(0, index, num);
          }
        },
        500,
        500,
        "businessCenter_businessType"
      );
    },
    business(num, index, val) {
      var that = this;
      uni.request({
          method: "post",
          url: that.$axiosw.interface + that.$axiosw.data[43].interface,
          data: {
            shopId: that.id,
            id: val.id,
            plat: that.plat,
            status: num
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
			console.log(res.data)
			console.log(res)
          var e = that.interactionDetection(res[1]);
          if (e.data.status == 0) {
            that.list[index].businessStatus = num;
          } else {
            uni.showToast({
            	icon: "none",
            	title: res.data.msg,
            	duration: 3000,
            	position: 'top'
            })
            if (num == 0) {
              that.list[index].businessStatus = 1;
            } else {
              that.list[index].businessStatus = 0;
            }
          }
		  console.log(that.list)
        });
    },
    into() {
      var that = this;
      uni.request({
          method: "post",
          url: that.$axiosw.interface + that.$axiosw.data[42].interface,
          data: {
            shopId: that.id,
            plat: that.plat
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
			console.log(res.data)
			console.log(res)
          var e = that.interactionDetection(res[1]);
          if (e.data.status == 0) {
            for (var i = 0; i < e.data.data.shopCentreList.length; i++) {
              var time = [];
              if (e.data.data.shopCentreList[i].startTime == "") {
                var startTimeList = ["00:00"];
              } else {
                var startTimeList = e.data.data.shopCentreList[
                  i
                ].startTime.split(",");
              }
              if (e.data.data.shopCentreList[i].endTime == "") {
                var endTimeList = ["00:00"];
              } else {
                var endTimeList = e.data.data.shopCentreList[i].endTime.split(
                  ","
                );
              }
              console.log(endTimeList);
              for (var a = 0; a < startTimeList.length; a++) {
                time.push({
                  startTime: startTimeList[a],
                  endTime: endTimeList[a]
                });
              }
              e.data.data.shopCentreList[i].timeList = time;
              e.data.data.shopCentreList[i].type = false;
            }
            that.list = e.data.data.shopCentreList;
          }
        });
    },
    modifyTime(index, i, type) {
      this.showPicker = true;
      this.timeIndex = { index: index, i: i, type: type };
    },
    addTimeList(i) {
      var n = this.list[i].timeList.length;
      this.list[i].type = true;
      if (this.list[i].timeList[n - 1].startTime == "00:00") {
        this.$toast("已新增");
      } else {
        this.list[i].timeList.push({ startTime: "00:00", endTime: "00:00" });
      }
    },
    delTimeList(idx, i) {
      var that = this;
      var timeList = that.list[idx].timeList;
      if (that.list[idx].timeList.length > 1) {
        that.list[idx].type = true;
        that.$delete(that.list[idx].timeList, i);
      } else {
        uni.showToast({
        	icon: "none",
        	title: res.data.msg,
        	duration: 3000,
        	position: 'top'
        })
      }
    },
    onConfirm(time) {
      if (this.timeIndex.type == 0) {
        this.list[this.timeIndex.index].timeList[
          this.timeIndex.i
        ].startTime = time;
      } else {
        this.list[this.timeIndex.index].timeList[
          this.timeIndex.i
        ].endTime = time;
      }
      this.list[this.timeIndex.index].type = true;
      this.showPicker = false;
    },
    modifyShopTime(data, index) {
      var that = this;
      var startTime = "";
      var endTime = "";
      for (var i = 0; i < data.timeList.length; i++) {
        if (i == data.timeList.length - 1) {
          startTime += data.timeList[i].startTime;
          endTime += data.timeList[i].endTime;
        } else {
          startTime += data.timeList[i].startTime + ",";
          endTime += data.timeList[i].endTime + ",";
        }
      }
      uni.reaurst({
          method: "post",
          url: that.$axiosw.interface + that.$axiosw.data[44].interface,
          data: {
            shopId: that.id,
            id: data.id,
            startTime: startTime,
            endTime: endTime,
            plat: that.plat
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
			console.log(res.data)
			console.log(res)
          var e = that.interactionDetection(res[1]);
          if (e.data.status == 0) {
            uni.showToast({
            	icon: "success",
            	title: res.data.msg,
            	duration: 3000,
            	position: 'top'
            })
            that.list[index].type = false;
          } else {
            uni.showToast({
            	icon: "none",
            	title: res.data.msg,
            	duration: 3000,
            	position: 'top'
            })
          }
        });
    },

    interactionDetection(res) {
		console.log(res)
      var that = this;
      if (res.data.status == 200 || res.data.status == 0) {
        return res;
      } else if (res.data.status == 7001 || res.data.status == 8001) {
        uni.showToast({
        	icon: "none",
        	title: res.data.msg,
        	duration: 3000,
        	position: 'top'
        })
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
  }
};
</script>

<style>
.appmy {
  width: 100%;
  min-height: 100%;
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
.businessCenter_goods {
  border-top: 20rpx solid #f5f5f5;
  background-color: #fff;
  overflow: hidden;
}
.businessCenter_goods_left {
  line-height: 100rpx;
  float: left;
  font-size: 0;
}
.businessCenter_goods_left > span {
  font-size: 32rpx;
  margin: 0 28rpx;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  max-width: 300rpx;
  display: block;
}
.businessCenter_goods_left > button {
  display: inline-block;
  vertical-align: middle;
  width: 122rpx;
  height: 48rpx;
  background: #5563ed;
  border-radius: 24rpx 24rpx 24rpx 0;
  color: #fff;
  font-size: 26rpx;
  line-height: 48rpx;
  margin: -60rpx 28rpx 0;
}
.businessCenter_goods_left > .businessCenter_goods_left_button {
  border-radius: 24rpx 24rpx 0 24rpx;
  background-color: #a1a1a1;
}
.businessCenter_goods_right {
  width: 340rpx;
  float: right;
  overflow: hidden;
}
.businessCenter_goods_title {
  line-height: 80rpx;
  font-size: 28rpx;
  color: #898989;
}
.businessCenter_goods_title > span {
  vertical-align: middle;
}
.businessCenter_goods_title_buttom {
  background-color: transparent;
  border-color: transparent;
  float: right;
  font-size: 32rpx;
  line-height: 80rpx;
  height: 80rpx;
  padding: 0 30rpx 0 10rpx;
}
.businessCenter_goods_title_but {
  padding: 10rpx;
  font-size: 32rpx;
  vertical-align: middle;
}
.businessCenter_goods_time {
  font-size: 0rpx;
  line-height: 60rpx;
}
.businessCenter_goods_time > i {
  color: #898989;
  font-size: 28rpx;
  vertical-align: middle;
  margin: 0 14rpx;
  font-style: normal;
}
.businessCenter_goods_time > span {
  vertical-align: middle;
  font-size: 30rpx;
  color: #5563ed;
}
.businessCenter_goods_time_calendar {
  width: 24rpx;
  vertical-align: middle;
  margin-left: 10rpx;
}
.businessCenter_goods_time_delete {
  width: 24rpx;
  height: 24rpx;
  vertical-align: middle;
  margin-left: 20rpx;
}
</style>

//防暴力点击
let timer = null; //定时器
let lastTime = 0; //当前时间戳
let lastTimeState = true; //控制频繁请求时的执行先后
let methods = null;

export function throttle(menth, delay, duration, type) {
  var that = this;
  if (methods == type) {
    var current = new Date().getTime();
    if (current - lastTime >= duration) {
      lastTime = current;
      return menth();
    } else {
      lastTime = current;
    }
  } else {
    methods = type;
    lastTime = new Date().getTime();
    return menth();
  }
  /////////////注释掉，首页发送两次请求，定时器连续发送两次请求/////////////
  // if (lastTime == 0) {
  //   lastTime = new Date().getTime();
  // }
  // var current = new Date().getTime();
  // if (current - lastTime >= duration) {
  //   if (lastTimeState == true) {
  //     lastTime = 0;
  //     clearTimeout(timer);
  //     timer = setTimeout(function() {
  //       lastTimeState = false;
  //     }, delay);
  //     return menth();
  //   } else {
  //     timer = setTimeout(function() {
  //       lastTimeState = true;
  //     }, delay);
  //   }
  //   lastTime = current;
  // } else {
  //   timer = setTimeout(function() {
  //     lastTimeState = true
  //   }, delay);
  //   if (lastTimeState == true) {
  //     lastTimeState = false;
  //     return menth();
  //   }
  // }
}
//计算剩余时间
export function computationTime(b) {
  var that = this;
  var curTime = new Date(b);
  var date1 = new Date(curTime.setHours(curTime.getHours() + 3));
  var date2 = new Date();
  var date3 = date1.getTime() - date2.getTime();
  if (date3 <= 0) {
    return 0 + ":" + 0 + ":" + 0
  } else {
    var e = Math.floor(date3 / (24 * 3600 * 1000))
    var leave1 = (date3 % (24 * 3600 * 1000)) - 1000 //计算天数后剩余的毫秒数
    var f = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var g = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var h = Math.round(leave3 / 1000);
    if (e != null && f != null && g != null && h != null) {
      return f + ":" + g + ":" + h;
    }
  }
}

// var startType = false
export function startType(e) {
  if (e == 0) {
    return startType
  } else {
    startType = true
    return startType
  }
}

export default {
  throttle,
  computationTime,
  startType,
  orderTimer: null,
  dateTime: null,
}

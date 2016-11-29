var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    reminder:[
      {
        name:'clock',
        imgo:'http://p1.bqimg.com/580164/c5c2c9f1ffd0ab59s.png',
        content_state_left:{data1:'7:00',data2:'闹钟'},
        content_state_center:{
          remind1:'主人,该起床罗',
          remind2:'每天'
        }  
      },{
        name:'dinner',
        imgo:'http://p1.bqimg.com/580164/dfedd18713396b5at.jpg',
        content_state_left:{data1:'8:00',data2:'闹钟'},
        content_state_center:{
          remind1:'按时吃饭，有益身体健康',
          remind2:'每天'
          }
      },{
        name:'drink',
        imgo:'http://p1.bqimg.com/580164/57a00ed2f55027fft.jpg',
        content_state_left:{data1:'21:00',data2:'闹钟'},
        content_state_center:{
          remind1:'阅读时间看会书吧',
          remind2:'每天'
        }
      }
    ],
    jia:"http://p1.bqimg.com/580164/e1517f3045a870dct.jpg",
    sendicon:'icon-audio',
    arrow:'http://p1.bqimg.com/580164/9928b5810428337et.jpg',
    voice:{
     imgo:'http://p1.bqimg.com/580164/c5c2c9f1ffd0ab59s.png',
    }
  },
  //语音与输入切换
  changeico:function(){
    
    if(this.data.sendicon=='icon-audio'){
        this.setData({
          sendicon:'icon-jianpan',
          ipt:false
        })
    }else{
        this.setData({
          sendicon:'icon-audio',
          ipt:true
        })
    }
  },
  onReady:function(){
    console.log("取去到的："+app.Session)
    var _that=this;
    var compare=null;
    wx.request({
      url:'https://wxa.chaojisales.com/index.php/Wxapp/Api/alarm_clock_list',
      method:'get',
      data: {
        session:app.Session
      },
      header:{
          "Content-Type":"application/json"
      },
      success: function(res) {
        var arr=[];
        var pxh=[];
        var data = res.data;
        console.log(data);
        for(var i=0;i<3;i++){
           arr.push(data[i].create_time);
        }
        arr.sort(function(a,b){
            return a-b;            
        }); 
        console.log(arr)
        for(var i=0;i<arr.length; i++){
          pxh.push(util.getLocalTime(arr[i]).slice(10,17))
        }
        _that.setData({
          ['reminder[0].content_state_left.data1']: pxh[0],
          ['reminder[0].content_state_left.data2']: '闹钟',
          ['reminder[0].content_state_center.remind1']: data[0].remind_content,
          ['reminder[0].content_state_center.remind2']: '每天',

          ['reminder[1].content_state_left.data1']: pxh[1],
          ['reminder[1].content_state_left.data2']: '闹钟',
          ['reminder[1].content_state_center.remind1']: data[1].remind_content,
          ['reminder[1].content_state_center.remind2']: '每天',

          ['reminder[2].content_state_left.data1']: pxh[2],
          ['reminder[2].content_state_left.data2']: '闹钟',
          ['reminder[2].content_state_center.remind1']: data[1].remind_content,
          ['reminder[2].content_state_center.remind2']: '每天',
        })
      }
    });
  },
   toast1:function() {
    wx.navigateTo({
      url: '../breakfast/breakfast'
    })
   },
   toast2:function() {
    wx.navigateTo({
      url: '../work/work'
    })
   },
   water_one:function() {
    wx.navigateTo({
      url: '../water_one/water_one'
    })
   },
   toastz:function() {
    wx.navigateTo({
      url: '../lunch/lunch'
    })
   },
   toastw:function() {
    wx.navigateTo({
      url: '../dinner/dinner'
    })
   },
   water_two:function() {
    wx.navigateTo({
      url: '../water_two/water_two'
    })
   },
   water_three:function() {
    wx.navigateTo({
      url: '../water_three/water_three'
    })
   },
   water_four:function() {
    wx.navigateTo({
      url: '../water_four/water_four'
    })
   },
   water_five:function() {
    wx.navigateTo({
      url: '../water_five/water_five'
    })
   },
   water_six:function() {
    wx.navigateTo({
      url: '../water_six/water_six'
    })
   },
   water_seven:function() {
    wx.navigateTo({
      url: '../water_seven/water_seven'
    })
   },
   water_eight:function() {
    wx.navigateTo({
      url: '../water_eight/water_eight'
    })
   }
})
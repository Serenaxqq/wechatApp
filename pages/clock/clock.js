var util = require('../../utils/util.js')
var app = getApp();
var remind=[];
var remind_content=[];
var time=[];
var frequency=[];
var remind_img=[];
var arrow_img=[];
var clock_text=[];
Page({
  data: {
    content:"主人你好你可以通过语音或者是文字向我发送指令。\n 例如：每天下午三点开会！ ",
    reminder:[
      {
        imgo:'',
        arrow:'',
        content_state_left:{data1:'',data2:''},
        content_state_center:{
          remind1:'',
          remind2:''
        }  
      },{
        imgo:'',
        arrow:'',
        content_state_left:{data1:'',data2:''},
        content_state_center:{
          remind1:'',
          remind2:''
          }
      },{
        imgo:'',
        arrow:'',
        content_state_left:{data1:'',data2:''},
        content_state_center:{
          remind1:'',
          remind2:''
        }
      }
    ],
    plus:"http://p1.bqimg.com/580164/e1517f3045a870dct.jpg",
    sendicon:'icon-audio',
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
        console.log(res.data)    
        var img=[
          'http://p1.bqimg.com/580164/dfedd18713396b5at.jpg',
          'http://p1.bqimg.com/580164/c5c2c9f1ffd0ab59s.png',          
          'http://p1.bqimg.com/580164/57a00ed2f55027fft.jpg'
        ];       
        var arrow=[
          'http://p1.bqimg.com/580164/9928b5810428337et.jpg',
          'http://p1.bqimg.com/580164/9928b5810428337et.jpg',
          'http://p1.bqimg.com/580164/9928b5810428337et.jpg'
          ];
        var clock=['闹钟','闹钟','闹钟']
        for(var i=0;i<res.data.length;i++){
          remind.push(res.data[i].remind_date+' '+res.data[i].remind_time);
        }
        for(var i=0;i<res.data.length;i++){
          if(Date.parse(new Date(remind[i]))>Date.now()){
             remind_content.push(res.data[i].remind_content)
             time.push(res.data[i].remind_time.slice(0,5))
             frequency.push(res.data[i].frequency)
             remind_img.push(img[i])
             arrow_img.push(arrow[i])
             clock_text.push(clock[i])
          }
        }
         _that.setData({
          ['reminder[0].imgo']: remind_img[0],
          ['reminder[0].arrow']: arrow_img[0],
          ['reminder[0].content_state_left.data1']: time[0],
          ['reminder[0].content_state_left.data2']: clock_text[0],
          ['reminder[0].content_state_center.remind1']: remind_content[0],
          ['reminder[0].content_state_center.remind2']: frequency[0],

          ['reminder[1].imgo']: remind_img[1],
          ['reminder[1].arrow']: arrow_img[1],
          ['reminder[1].content_state_left.data1']: time[1],
          ['reminder[1].content_state_left.data2']: clock_text[1],
          ['reminder[1].content_state_center.remind1']: remind_content[1],
          ['reminder[1].content_state_center.remind2']: frequency[1],

          ['reminder[2].imgo']: remind_img[2],
          ['reminder[2].arrow']: arrow_img[2],
          ['reminder[2].content_state_left.data1']: time[2],
          ['reminder[2].content_state_left.data2']: clock_text[2],
          ['reminder[2].content_state_center.remind1']: remind_content[2],
          ['reminder[2].content_state_center.remind2']: frequency[2],
        })
        var str=remind_content.join(',');
        var scrreen_img=[
          'http://p1.bqimg.com/580164/ad0d89583b4c13d3t.jpg',
        ]
        for(var i=0;i<3;i++){          
          if(str.indexOf('吃饭')!=-1){
            _that.setData({
              ['remind_img[0]']:scrreen_img[0]
            })      
          }
        }
      }
    });
  },
  jump:function(e){
     var index=e.currentTarget.dataset.index;
     var Attend_a_meetingo= time[index]
     var Attend_a_meetingt=remind_content[index];
     if(Attend_a_meetingo=='14:00' && Attend_a_meetingt.indexOf('开会')!=-1){ 
         wx.navigateTo({
           url: '../work/work'
        })
     }else if(Attend_a_meetingo=='07:30' && Attend_a_meetingt=='吃饭'){
        wx.navigateTo({
           url: '../breakfast/breakfast'
        })
     }else if(Attend_a_meetingo=='12:00' && Attend_a_meetingt=='吃饭'){
        wx.navigateTo({
           url: '../lunch/lunch'
        })
     }else if(Attend_a_meetingo=='19:30' && Attend_a_meetingt=='吃饭'){
        wx.navigateTo({
           url: '../dinner/dinner'
        })
     }
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
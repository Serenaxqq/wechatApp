var app = getApp();
var sp='';
var tem='';
var ajax=[];
var speakarr=[
        {name:"me",   say:"今天一起去看电影吧",path:''},
        {name:"other",say:"不要",path:''},
        {name:"me",   say:"我请你呢",path:''},
        {name:"other",say:"还是我请你吧",path:''}
 ];
Page({
  //页面初始化数据
  data: { 
      head_other: 'http://v1.qzone.cc/avatar/201407/01/12/53/53b23ebb14c27312.jpg%21200x200.jpg',
      head_me: 'http://p1.gexing.com/G1/M00/C7/73/rBACE1IgR_PBIieMAAAfAWtb1fA891_200x200_3.jpg',
      speak:speakarr,
      sendicon:'icon-audio',
      ipt:true,
      clear:'',
      scrollTop:'10000'
  },

  //调用自己微信头像
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
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

//输入文字时，将文字取出，放置全局变量中
  speakchange:function(e){
    sp = e.detail.value;
  },

//点击发送，推入new的data中的speakarr中，并且setData
  dosend:function(){
    var _that=this;
    if(sp!=""){
        var count = speakarr.length;
        var newsp={name:'me',   say:sp,  path:''};
        speakarr.push(newsp);
        this.setData({clear:'  ',scrollTop:'1000000'});//如果不改变clearclear，那么下边clear他不会执行
        this.setData({speak:speakarr, clear:' '});
        this.setData({scrollTop:'10000000'});
       
        wx.request({
          url: 'https://wxa.chaojisales.com/index.php/Wxapp/Api/userInputText',
          method:'get',
          data: {
            content: sp,
            session:app.Session
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
              wx.request({
                url: 'https://wxa.chaojisales.com/index.php/Wxapp/Base/sendMsg/session/'+app.Session, 
                method:'post',
                data: {                     
                      "touser": "",  
                      "template_id": "TEMPLATE_ID", 
                      "page": "index",          
                      "form_id": "1234",         
                      "data": {
                          "keyword1": {
                              "value": "339208499", 
                              "color": "#173177"
                          }, 
                          "keyword2": {
                              "value": "2015年01月05日 12:30", 
                              "color": "#173177"
                          }, 
                          "keyword3": {
                              "value": "粤海喜来登酒店", 
                              "color": "#173177"
                          } , 
                          "keyword4": {
                              "value": "广州市天河区天河路208号", 
                              "color": "#173177"
                          } 
                      },                        
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                  console.log(res);
                  
                }
              })
              var str='';
              if(res.data.status!=0){
                  str="好的，我们已经为您设置好了"+res.data.info.remind_time+"的"+res.data.info.remind_content+"闹钟！";
              }else{
                str="你说啥？"
              }
            
             var newrsp={name:"other",say:str,path:''};
             speakarr.push(newrsp);
             sp='';
             _that.setData({speak:speakarr});
             _that.setData({scrollTop:'100000000'});
          }
        })

        



    }else{
      this.setData({ clear:' '});
       wx.showToast({
        title: '请输入文字',
        icon: 'success',
        duration: 1500
      });
    }
    
  },

  //录音开始
  audiostart:function(){
    wx.showToast({
       title: '正在录音...',
       icon: 'loading',
       duration: 10000
    });
    //微信录音开始接口
    var that = this;
    wx.startRecord({
      success: function(res) {
        tem = res.tempFilePath ;
        wx.saveFile({
          tempFilePath: tem,
          success: function(res) {
            var savedFilePath = res.savedFilePath;
            tem = savedFilePath;
            console.log(tem);
            var length = speakarr.length;
            speakarr[length-1] = {name:'me',   say:"(((　　　",path:tem};
            console.log(speakarr);
            that.setData({scrollTop:'1000000'});
            that.setData({speak:speakarr});
            that.setData({scrollTop:'10000000'});
          }
        })
      }
    })

  },
  

  //录音结束
  audioend:function(){
    //弹窗消失
    wx.hideToast({
      title: '正在录音...',
      icon: 'loading'
    });
    wx.stopRecord();
   //用于对话框显示
    var newsp={name:'me',   say:"(((",path:''};
    speakarr.push(newsp);
    
  },


  //点击录音
  play:function(e){
     var path=e.currentTarget.dataset.path;
     if(path!=""){
         wx.playVoice({
            filePath: path
          })
     }
    
  }
  
})



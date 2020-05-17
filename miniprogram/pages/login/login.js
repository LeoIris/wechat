// pages/login/login.js

//初始化数据库
const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowErrMsg: false
  },
  login(event) {
    // console.log(event.detail.value.username)
    // console.log(event.detail.value.pwd)
    let username = event.detail.value.username
    let pwd = event.detail.value.pwd
    if (username.length == 0 || pwd.length == 0) {
      wx.showToast({
        title: '请将信息补充完整',
        icon:"none",
        mask:true   //防抖功能
      }) 
       return
    }
    db.collection('users').where({
      name: username,
      pwd: pwd
    }).get().then(res => {
      console.log(res)
      if (res.data[0] == null) {
        this.setData({
          ShowErrMsg: true
        })
        return
      } else {
        this.setData({
          ShowErrMsg: false
        })
        //备忘：用户定义为全局
        app.appUser = res.data[0]
        // console.log(app.appUser.name)
        wx.redirectTo({
          url: '../admin_master/admin_master',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },


})
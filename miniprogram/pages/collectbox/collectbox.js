// pages/collectbox/collectbox.js
Page({

  data: {
    
  },

  
  onLoad: function (options) {

  },

  onShow: function () {
   let collectbox= wx.getStorageSync('collect')||[]
   this.setData({
     collectbox
   })
  },

})
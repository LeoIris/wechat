// pages/admin_orderdetail/admin_orderdetail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderdetail:{}
  },

  
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name: 'getorderdetail',
      data: {
        id:options.id
      }
      ,
      success: function (res) {
        console.log(res)
        that.setData({
          orderdetail: res.result.data
        })
      }
    })

    
    // db.collection("orders").doc(options.id).get().then(res => {
    //   this.setData({
    //     orderdetail: res.data
    //   })

    // })
  },

  
})
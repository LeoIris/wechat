const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('products').get({
      success: function (res) {
        console.log('获取商品成功', res)
        that.setData({
          products: res.data
        })
      }
    })
  },
})
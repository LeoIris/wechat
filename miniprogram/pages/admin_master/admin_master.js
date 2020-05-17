Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 跳转页面
  operation: function (e) {
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  },

})
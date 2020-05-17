// pages/search/search.js
const db = wx.cloud.database();

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  search: function (e) {
    let that = this
    console.log(e)
    db.collection('products').where({
      name: e.detail.value
    }).get({
      success: function (res) {
        that.setData({
          search: res.data
        })
        console.log('搜索成功成功', res,that.data.search)
        if (that.data.search == "") {
          wx.showToast({
            title: '未找到商品',
            icon: "none"
          })
        }
      },
      fail: function (res) {
        console.log('搜索失败', res)
      },
    })
  },
})
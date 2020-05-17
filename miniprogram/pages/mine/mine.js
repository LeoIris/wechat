// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userinfo: wx.getStorageSync("userinfo")
    userinfo:{},
    collectnum:0,
    active: 0,
  },

 
  onLoad:function(){
    // const userinfo = wx.getStorageSync("userinfo")
    // // console.log(userinfo)
    // if (userinfo.length > 3) {
    //   this.setData({
    //     userinfo,
    //   })
    // }
  },
 
  
  onShow: function (options) {
    // console.log(this.data.userinfo)
    const userinfo = wx.getStorageSync("userinfo")
    //商品收藏显示数量
    const collectnum=wx.getStorageSync("collect")||[]
    
    this.setData({
        userinfo,
      collectnum: collectnum.length
      })

      //很无语的是如果用下面这段是不能重置data中的useerinfo的
  //   console.log(userinfo)
  //   if (userinfo.length > 3) {
  //     this.setData({
  //       userinfo,
  //     })
  //   }
  //   console.log(userinfo)
   },

  onChange: function (event) {
    //  console.log(event.target.dataset.num)
    let numhere = event.target.dataset.num
    switch (numhere) {
      case "1":
        wx.navigateTo({
          url: '../index/index',
        });
        break;
      case "2":
        wx.navigateTo({
          url: '../car/car',
        });
        break;

      case "3":
        wx.navigateTo({
          url: '../orders/orders',
        });
        break;

    }
  },

})
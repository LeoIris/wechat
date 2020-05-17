// pages/admin_order/admin_order.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:["已付款订单","未付款订单","争议订单"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this
    //  使用云函数可以找到所有用户的订单
      wx.cloud.callFunction({
        name:'getorder',
        data:{

        }
        ,
        success:function(res){
          console.log(res)
          that.setData({
            order: res.result.data
          })
        }
      })


    // db.collection("orders").get().then(res=>{
    //   this.setData({
    //     order:res.data
    //   })
      
    // })
   
  },
  
})
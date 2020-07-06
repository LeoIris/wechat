// pages/car/car.js

// pages/shopping_cart/shopping_cart.js
const db = wx.cloud.database()
const _ = db.command
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: [],
    money: 0,
    product_now: [],
    product_id: [],
    delet_id: []
  },
  // 支付事件
  pay: function(e) {
    let that = this
    const money = this.data.money
    db.collection('cart').where({
      checked: "true"
    }).get({
      success: function(res) {
        // console.log('获取商品成功', res)
        if (res.data.length == 0) {
          wx.showToast({
            title: '你还未选择商品',
            icon: "none"
          })
        } else {
          console.log(money)
          //先从car中收集数据然后传到order中
          let paylist = that.data.delet_id

          wx.redirectTo({
                url: '../pay/pay?paymoney=' + money
              })
          // for (let i = 0; i < paylist.length; i++) {
          //   const list = db.collection("cart").where({
          //     _id: paylist[i]
          //   }).get()
          //   // console.log(list)  
          //   wx.collection("order").add({
          //     data: {
          //       img: list.img,
          //       introduce: list.introduce,
          //       name: list.name,
          //       num: list.num,
          //       ordernum: list.ordernum,
          //       price: list.price,
          //       type: list.type,
          //       payready: 0
          //     }
          //   })
          // }


          //调用云函数删除已选中商品
          // wx.cloud.callFunction({
          //   name: "product_delet",
          //   success: function(res) {
          //     app.cartNumber = app.cartNumber - that.data.delet_id.length
          //     wx.redirectTo({
          //       url: '../pay/pay?paymoney=' + money
          //     })
          //   },
          //   fail: function(res) {
          //     console.log('前往支付失败', res)
          //   }
          // })



        }
      },
      fail: function(res) {
        console.log('获取商品失败', res)
      }
    })
  },

  // 计算金额
  get_money_sum() {
    let that = this
    let money_sum = 0
    for (var x = 0; x < that.data.product.length; x++) {
      if (that.data.product[x].checked == "true") {
        money_sum = money_sum + (that.data.product[x].num * that.data.product[x].price)
      }
    }
    that.setData({
      money: money_sum
    })
  },
  // 选择事件
  xuanze: function(e) {
    let that = this
     console.log(e)
    if (e.detail.value[0]!=undefined){
      that.setData({
        delet_id: that.data.delet_id.concat(e.detail.value[0])
        // delet_id: e.detail.value
      })
    }
    
    console.log(this.data.delet_id)
    if (e.detail.value.length !== 0) {
    // if (e.currentTarget.dataset.checked == "false") {
      db.collection('cart').doc(e.currentTarget.dataset.id).update({
        data: {
          checked: "true"
        },
        success: function() {
          that.onLoad()
        }
      })
    } else {
      db.collection('cart').doc(e.currentTarget.dataset.id).update({
        data: {
          // 究极大坑， 必须设为空，不能为false
          checked: "" 
        },
        success: function() {
          that.onLoad()
        }
      })
    }
  },


  // 商品删除
  delete: function() {
    let that = this
    wx.cloud.callFunction({
      name: "product_delet",
      success: function(res) {
        app.cartNumber = app.cartNumber - that.data.delet_id.length
        console.log('删除商品成功', res)
        that.onLoad()
      },
      fail: function(res) {
        console.log('删除商品失败', res)
      }
    })
  },

  // 商品数量加事件
  product_jia: function(e) {
    let that = this
    console.log(e)
    db.collection('cart').doc(e.target.dataset.id).update({
      data: {
        num: _.inc(1)
      },
      success: function(res) {
        console.log('商品数量加一', res)
        that.onLoad()
      },
      fail: function(res) {
        console.log('获取商品价格失败', res)
      }
    })
  },
  // 商品数量减事件
  product_jian: function(e) {
    let that = this
    console.log(e)
    console.log(e.target.dataset.num)
    if (e.target.dataset.num < 2) {
      console.log(e.target.dataset.num)
      wx.showToast({
        title: '客官不能再少了',
        icon: "none"
      })
    } else {
      db.collection('cart').doc(e.target.dataset.id).update({
        data: {
          num: _.inc(-1)
        },
        success: function(res) {
          console.log('商品数量减一', res)
          that.onLoad()
        },
        fail: function(res) {
          console.log('获取商品价格失败', res)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    db.collection('cart').get({
      success: function(res) {
        // console.log('获取购物车商品成功', res)
        that.setData({
          product: res.data,
        })
        that.get_money_sum()
      },
      fail: function(res) {
        console.log('获取购物车商品失败', res)
      }
    })
  },


  onShow: function() {
    let that = this
    db.collection('cart').get({
      success: function(res) {
        // console.log('获取购物车商品成功', res)
        that.setData({
          product: res.data,
        })
        that.get_money_sum()
      },
      fail: function(res) {
        console.log('获取购物车商品失败', res)
      }
    })
  },

  onHide: function () {
     app.cartNumber =this.product.length
    console.log("hide")
  },
})
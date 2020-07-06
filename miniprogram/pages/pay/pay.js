// // pages/pay/pay.js
// Page({

//   data: {
//     school_Arr: [
//       "HPU家属区",
//       "其他区域请联系作者小雷"
//     ],

//     address_Arr: [
//       "小区一号楼", "小区二号楼", "小区三号楼", "小区四号楼", "小区五号楼", "小区六号楼"
//     ],
//   },


//   handlepaid: function() {



//     wx.showToast({
//       title: '支付成功',
//     })
//     wx.redirectTo({
//       url: '../orders/orders?type=1',
//     })
//   },

//   onLoad:function(option){
//     console.log(option.paymoney)
//     this.setData({
//       paymoney: option.paymoney
//     })
//   }

// })

// pages/pay/pay.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: [],
    money: 0,
    name: "",
    phone_number: "",
    address: "",
    beizhu: "",

    //
    school_Arr: [
      "HPU家属区",
      "其他区域请联系作者小雷"
    ],

    address_Arr: [
      "小区一号楼", "小区二号楼", "小区三号楼", "小区四号楼", "小区五号楼", "小区六号楼"
    ],
  },
  // 备注
  beizhu: function(e) {
    let that = this
    console.log(e)
    that.setData({
      beizhu: e.detail.value
    })
  },
  onShow: function() {
    const self = this;
    wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address2: res.data,
          hasAddress: true
        })
      }
    })
  },
  // 结算
  pay: function(e) {
    let that = this
    if (that.data.name !== "" && that.data.address !== "" && that.data.phone_number !== "") {
      db.collection('orders').add({
        data: {
          name: that.data.name,
          phone_number: that.data.phone_number,
          address: that.data.address,
          beizhu: that.data.beizhu,
          money: that.data.money,
          product: that.data.product,
          type:1
        },
        success: function(res) {
          console.log('下单成功', res)
          wx.cloud.callFunction({
            name: "product_delet",
            data: {},
            success: function(res) {
              console.log('购物车删除成功', res)
            
                wx.redirectTo({
                  url: '../index/index',
                })
              
              wx.showToast({
                title: '支付成功',
                
              })
            
            },
            fail: function(res) {
              console.log('购物车删除失败', res)
            }
          })
        },
        fail: function(res) {
          console.log('下单失败', res)
        }
      })
    } else {
      wx.showToast({
        title: '地址信息有误',
        icon: "none"
      })
    }

  },
  // 选择地址
  address: function(e) {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res, "这是getSetting  res")
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              wx.chooseAddress({
                success(res) {
                  console.log(res, "wx.authorize res")
                  that.setData({
                    name: res.userName,
                    phone_number: res.telNumber,
                    address: res.provinceName + res.cityName + res.countyName + res.detailInfo
                  })
                }
              })
            }
          })
        } else {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting,'sadasd')
              wx.chooseAddress({
                success(res) {
                  console.log(res, "wx.authorize res")
                  that.setData({
                    name: res.userName,
                    phone_number: res.telNumber,
                    address: res.provinceName + res.cityName + res.countyName + res.detailInfo
                  })
                }
              })
              // res.authSetting = {
              //    "scope.userInfo": true,
              //   "scope.userLocation": true
                
              // }
            }
          })
        }
      }
    })
  },
  // 计算金额
  get_money_sum() {
    let that = this
    let money_sum = 0
    for (var x = 0; x < that.data.product.length; x++) {
      money_sum = money_sum + (that.data.product[x].num * that.data.product[x].price)
    }
    that.setData({
      money: money_sum
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    db.collection('cart').where({
      checked: "true"
    }).get({
      success: function(res) {
        console.log('获取商品成功', res)
        that.setData({
          product: res.data,
          // paymoney: options.paymoney
        })
        that.get_money_sum()
      },
      fail: function(res) {
        console.log('获取商品失败', res)
      }
    })
  }
})
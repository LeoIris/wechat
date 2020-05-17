//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data:{
    banners:[],
    active:0,
    menu:[],
    products:[],
    cartnumber:0
  },
  onSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onLoad(){
    db.collection("banners").get().then(res=>{
      // console.log(res.data)
      this.setData({
        banners:res.data
      })
    }),
  
    db.collection("menu").get().then(res => {
      // console.log(res.data)
      this.setData({
        menu: res.data
      })
    })

    db.collection("products").get().then(res => {
      // console.log(res.data)
      this.setData({
        products: res.data
      })
    })
    
  },
  onShow(){
    let cartnumber = app.cartNumber
    this.setData({
      cartnumber
    })
  },
  onChange:function (event) {
    //  console.log(event.target.dataset.num)
    let numhere = event.target.dataset.num
    switch (numhere){
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

      case "4":
        wx.navigateTo({
          url: '../mine/mine',
        });
         break;

    }
  },

  // onLoad(){
  //   wx.cloud.callFunction({
  //     name:'addUser',
  //     data:{
  //       name:'leijijun',
  //       pwd:'ljj199722'
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // }
  onPullDownRefresh: function () {
    let that = this
    wx.redirectTo({
      url: '../index/index',
    })
  },

})

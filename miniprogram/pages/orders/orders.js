// pages/orders/orders.js
const db = wx.cloud.database();

const _ = db.command;
const orderdatabase = db.collection("orders");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      isactive: true,
      value: "已付款",
      id: 0
    }, {
      isactive: false,
      value: "未付款",
      id: 1
    }, {
      isactive: false,
      value: "退款/退货",
      id: 2
    }],

  },

  //在ONSHOW中调用相当于自动点击更换页面
  changeitembyid: function(index) {
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isactive = true : v.isactive = false)
    this.setData({
      tabs
    })
  },


  //子组件传递标题点击事件
  handletabsitemchange: function(e) {
    // console.log(e.detail)
    let index = e.detail
    this.changeitembyid(index)

  },
  //获取已经支付商品
  getorderdatabase1: function (type) {
    // console.log(type)
    orderdatabase.where({
      type: 1
      // type:_.eq(type)
    }).get().then(res => {
      this.setData({
        paid_database: res.data  //这里在本页面定义了一个对象-集合type
      })
      console.log(res.data)
    })
  },
  //获取集合order2 //传入type
  getorderdatabase2: function(type) {
    // console.log(type)
    orderdatabase.where({
       type: 2
      // type:_.eq(type)
    }).get().then(res => {
      this.setData({
        orderdatabase: res.data  //这里在本页面定义了一个对象-集合type
      })
    })
  },

  onShow: function() {
    let pages = getCurrentPages()
    let currentpage = pages[pages.length - 1] 
    console.log(currentpage.options)
    
    let 
      type
     = currentpage.options.type || "2"

    this.changeitembyid(type - 1)
    this.getorderdatabase2(type)
    this.getorderdatabase1(type)   //获取已支付商品信息
  },


})
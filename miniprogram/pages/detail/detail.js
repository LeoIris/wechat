// pages/detail/detail.js
//初始化数据库
const db = wx.cloud.database();

const app = getApp();

Page({
  data: {
    detailinfo: {},
    iscollected: false
  },

  //接收首页传过来的ID并且找出其对应的集合传给detailinfo
  onLoad: function(options) {
     console.log(options)
    let {
      detailid
    } = options
    if(detailid== undefined){
      detailid=options.id
    }
     console.log(detailid,"asdasdasdas")
    db.collection('products').where({
      _id: detailid
    }).get().then(res => {
      //console.log(res.data[0])
      const detailinfo = res.data[0]
      //传过来的是个对象
      this.setData({
        detailinfo
      })
    })
    // let collectbox = wx.getStorageSync("collect") || [];
    // let iscollected = collectbox.some(v => v._id === this.data.detailinfo._id)

    // this.setData({
    //   iscollected
    // })

    // console.log(this.data.detailinfo, options)
  },
  onShow: function() {
    //判断收藏数组中是否存在
    let collectbox = wx.getStorageSync("collect") || [];
    let iscollected = collectbox.some(v => v._id === this.data.detailinfo._id)

    this.setData({
      iscollected
    })
    console.log(iscollected, collectbox, this.data.detailinfo._id)
  },


  //改变收藏状态
  collectchange: function() {
    let iscollected = false
    //获取缓存中的收藏数组
    let collectbox = wx.getStorageSync("collect") || [];
    //判断收藏状态
    let index = collectbox.findIndex(v => v._id === this.data.detailinfo._id)
    //当index=-1，说明未收藏
    if (index !== -1) {
      //说明能找到，已经存在收藏夹中，点击该按钮目的是取消收藏
      collectbox.splice(index, 1)
      iscollected = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    } else {
      //目的是添加进收藏缓存数组中
      collectbox.push(this.data.detailinfo)
      iscollected = true
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync('collect', collectbox)
    this.setData({
      iscollected
    })
  },


  //图片预览功能
  preview: function(e) {
    // console.log(e.currentTarget.dataset.current1)
    let current1 = e.currentTarget.dataset.current1
    let url = this.data.detailinfo.detailimg
    //console.log(url)
    wx.previewImage({
      urls: url,
      current: current1
    })
  },

  //加入购物车
  cartadd: function(e) {
    const detailinfo = this.data.detailinfo
    detailinfo.num = 1
    db.collection("cart").add({
      data: {
        introduce: detailinfo.introduce,
        num: detailinfo.num,
        price: detailinfo.price,
        name: detailinfo.name,
        img: detailinfo.detailimg[0],
        type: detailinfo.type,
        checked: false
      }
    })
    wx.showModal({
      title: '成功提示',
      content: '添加到购物车成功',
      success: (res) => {
        // console.log(res.confirm)
        if (res.confirm) {
          app.cartNumber++
        }
        // console.log(app.cartNumber)
      }
    })

  },
  //产生随机数作为订单编号
  random_No: function(j = 12) {
    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = "OD" + new Date().getTime() + random_no;
    return random_no;
  },


  //提交订单
  pushorder: function() {
    //添加一条主信息
    const detailinfo = this.data.detailinfo
    detailinfo.num = 1
    detailinfo.type = 2 //2待付款    1已完成   3待收货
    detailinfo.ordernum = this.random_No()
    // this.setData({
    //   detailinfo
    // })

    db.collection("cart").add({
      data: {
        introduce: detailinfo.introduce,
        num: detailinfo.num,
        price: detailinfo.price,
        name: detailinfo.name,
        img: detailinfo.detailimg[0],
        type: detailinfo.type,
        checked: false,
        ordernum: detailinfo.ordernum,
      }
    }).then(res => app.cartNumber++)




    wx.showToast({
      title: '订单提交成功',

      mask: true //防抖功能
    })
    // db.collection("orders").add({
    //   data: {
    //     introduce: detailinfo.introduce,
    //     num: detailinfo.num,
    //     price: detailinfo.price,
    //     name: detailinfo.name,
    //     img: detailinfo.detailimg[0],
    //     type: detailinfo.type,
    //     ordernum: detailinfo.ordernum,
    //     payready:0
    //   }

    // })
    // .then(res => {

    //   console.log(res._id)
    //   wx.navigateTo({
    //     // url: '../car/car?id=' + res._id,
    //     url: '../car/car'
    //   })
    // })
    wx.navigateTo({
      // url: '../car/car?id=' + res._id,
      url: '../car/car'
    })
  }


})
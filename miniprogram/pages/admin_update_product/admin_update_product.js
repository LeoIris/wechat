const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei: [],
    img: [],
    name: "",
    price: "",
    detail: "",
    id: "",
    num:undefined
  },


  //删除该商品
  delete_product: function (e) {
    let that = this
    db.collection('products').doc(that.data.id).remove({
      success: function (res) {
        console.log('删除成功', res.data)
        wx.cloud.deleteFile({
          fileList: that.data.img,
          success: res => {
            // handle success
            console.log(res.fileList)
          },
          fail: err => {
            // handle error
          },
        })
        wx.redirectTo({
          url: '../admin_product/admin_product',
        })
      }
    })
  },

  // 上传图片
  upload_img: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'products/' + timestamp + '.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function (res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img: that.data.img.concat(res.fileID)
            })
          },
          fail: function (res) {
            // handle error
          }
        })
      }
    })
  },
  // 删除图片
  // 删除数组中指定下标
  delete: function (e) {
    let that = this
    console.log(that.data.img)
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img = that.data.img;
    img.splice(id, 1)
    that.setData({
      img: img
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        // handle error
      },
    })
    console.log(that.data.img)
  },

  //提交信息
  submit: function (e) {
    let that = this
    console.log(e)
    if (e.detail.value.name !== "" && e.detail.value.price !== "" && e.detail.value.fenlei !== "" && e.detail.value.detail !== "" && that.data.img.length !== 0) {
      db.collection('products').doc(that.data.id).update({
        data: {
          name: e.detail.value.name,
          num: e.detail.value.num,
          sender: e.detail.value.sender,
          price: e.detail.value.price,
          fenlei: e.detail.value.fenlei,
          introduce: e.detail.value.detail,
          src: that.data.img[0],
          detailimg: that.data.img,
          
        }, success: function (res) {
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../admin_product/admin_product',
          })
        }
      })
    } else {
      wx.showToast({
        title: '你还有未填信息',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id: options.id
    })
    db.collection('fenlei').get({
      success: function (res) {
        console.log('分类获取成功', res)
        that.setData({
          fenlei: res.data
        })
      }, fail: function (res) {
        console.log('分类获取失败', res)
      }
    })
    db.collection('products').doc(options.id).get({
      success: function (res) {
        console.log('信息获取成功', res)
        that.setData({
          name: res.data.name,
          price: res.data.price,
          introduce: res.data.introduce,
          img: res.data.detailimg,
          num: res.data.num,
          sender: res.data.sender
        })
      }, fail: function (res) {
        console.log('分信息获取失败', res)
      }
    })
  },

 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    wx.redirectTo({
      url: '../admin_update_product/admin_update_product',
    })
  },

})
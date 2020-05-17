Page({
  data: {
    address: {
      name: '',
      phone: '',
      // detail: ''
      detail: 0,
      message: "",
      schoolName: 0,  //学校
      addressItem: 0, //地址类型
      apartmentNum: 0,   //宿舍楼号
    },

    school: 0,
    school_Arr: [
      "HPU家属区",
      "其他区域请联系作者小雷"
    ],

    // address: 0,
    address_Arr: [
      "小区一号楼", "小区二号楼", "小区三号楼", "小区四号楼", "小区五号楼", "小区六号楼"
    ],

  },

  onLoad() {
    var self = this;
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          address: res.data
        })
      }
    })

  },


  // 学校
  getSchool: function (e) {
    var that = this
    // that.data.address['schoolName'] = parseInt(e.detail.value)
    // console.log(getCurrentPages()["0"].data)
    let tmp = getCurrentPages()["0"].data.address
    tmp['schoolName'] = parseInt(e.detail.value)
    that.setData({
      // schoolName: that.data.school_Arr[e.detail.value],
      address: tmp
    })
    console.log(e)
  },

  // 地址类型
  getAddress: function (e) {
    var that = this
    let tmp = getCurrentPages()["0"].data.address
    tmp['addressItem'] = parseInt(e.detail.value)
    that.setData({
      address: tmp
    })
  },

  formSubmit(e) {
    const value = e.detail.value;
    // console.log(value)
    if (value.name && value.phone.length === 11 && value.detail) {
      console.log(value)
      wx.setStorage({
        key: 'address',
        data: value,
        success() {
          wx.navigateBack();
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})
// pages/customerorder/customerorder.js
const {
  default: http
} = require("../../request/http");
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: "", //请求的列表数据
    textarea: "", //输入的内容
    modes: "到店自取", //配送方式
  },
  //数据数组列表
  arr: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //重新加载页面
  tosetTimeout() {
    setTimeout(() => {
      this.arr = []
      this.onShow()
    }, 1500)
  },
  //点击放弃维修
  togiveup(e) {
    var that = this
    let {
      orderid
    } = e.currentTarget.dataset
    wx.showModal({
      title: "放弃维修",
      content: "维修师傅即将上门维修是否放弃？",
      success(res) {
        if (res.confirm) {
          http.toReceOrder({
            orderId: orderid,
            orderState: -1
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
            })
            that.tosetTimeout()
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  //点击确认维修
  toconfirm(e) {
    var that = this
    let {
      orderid
    } = e.currentTarget.dataset
    wx.showModal({
      title: "确认订单",
      content: "维修师傅联系您上门服务，请保持您的手机畅通！",
      success(res) {
        if (res.confirm) {
          http.toReceOrder({
            orderId: orderid,
            orderState: 3
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
            })
            that.tosetTimeout()
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },
  //点击联系师傅
  tocontact(e) {
    console.log(e)
    // 1 获取点击的电话
    const {
      phone
    } = e.currentTarget.dataset;
    if (!phone) {
      wx.showToast({
        title: '暂无联系方式',
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }
  },
  //选择配送方式
  radioChange(e) {
    console.log(e.detail.value)
    this.setData({
      modes: e.detail.value
    })
  },
  //点击提交配送方式
  tosubmit(e) {
    let {
      orderid
    } = e.currentTarget.dataset
    http.toReceDesp({
      orderId: orderid,
      modes: this.data.modes
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      this.tosetTimeout()
    })
  },
  //输入的评价内容
  totextarea(e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  //点击提交评价
  tobranch(e) {
    console.log(e)
    var {
      orderid
    } = e.currentTarget.dataset
    this.arr.filter((v, i) => {
      if (v.orderId == orderid) {
        http.toAppraise({
          orderId: orderid,
          level: v.one_2,
          content: this.data.textarea
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          this.tosetTimeout()
        })
      }
    })
  },
  //点击星星
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var orderid = e.currentTarget.dataset.orderid
    this.arr.filter((v, i) => {
      if (v.orderId == orderid) {
        if (in_xin === 'use_sc2') {
          this.arr[i].one_2 = Number(e.currentTarget.id);
        } else {
          this.arr[i].one_2 = Number(e.currentTarget.id) + this.arr[i].one_2;
        }
        this.arr[i].two_2 = 5 - this.arr[i].one_2
        this.setData({
          order: this.arr
        })
      }
    })
  },

  request() {
    http.togetRecord({
      userId: app.data.userId
    }).then(res => {
      console.log(res)
      console.log(res.data.body.cs)
      var cs = res.data.body.cs
      if (res.data.errorCode == -1) {
        cs.filter((v) => {
          this.arr.push({
            address: v.address,
            createDate: v.createDate,
            description: v.description,
            level: Number(v.level),
            pickUpLevel: v.pickUpLevel,
            mainAdvice: v.mainAdvice,
            modeDes: v.modeDes,
            name: v.name,
            number: v.number,
            orderId: v.orderId,
            orderNumber: v.orderNumber,
            orderState: v.orderState,
            pickName: v.pickName,
            pickTel: v.pickTel,
            price: v.price,
            tel: v.tel,
            userId: v.userId,
            one_2: 1, //点击评分
            two_2: 4,
          })
        })
        this.setData({
          order: this.arr
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.arr = [],
    this.request()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onShow()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
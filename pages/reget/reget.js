// pages/reget/reget.js
import http from '../../request/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: true, //密码inputtype属性
    cell: "", //手机号
    password: "", //密码
    password1: "", //二次密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击确认按钮
  tologin() {
    //验证手机号正则
    var pattern = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    if (!this.data.cell) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        mask: true
      })
    } else if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: "none",
        mask: true
      })
    } else if (!this.data.password1) {
      wx.showToast({
        title: '请再次输入密码',
        icon: "none",
        mask: true
      })
    }else if(!pattern.test(this.data.cell)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none",
        mask: true
      })
    }else if (this.data.password != this.data.password1) {
      wx.showToast({
        title: '两次密码不相等，请重新输入',
        icon: "none",
        mask: true
      })
    } else {
      http.toResetPassword({
        tel: this.data.cell,
        password: this.data.password
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask:true
        })
        setTimeout(() => {
          if(res.data.errorCode == -1){
            wx.reLaunch({
              url: '../login/login',
            })
          }
        },1500)
      })
    }
  },
  //获取手机号
  registInput(e) {
    let cell = e.detail.value
    this.setData({
      cell
    })
  },
  //获取密码
  topassword(e) {
    let password = e.detail.value
    this.setData({
      password
    })
  },
  //获取二次输入密码
  topassword1(e) {
    let password1 = e.detail.value
    this.setData({
      password1
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
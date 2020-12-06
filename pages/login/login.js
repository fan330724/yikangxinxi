// pages/login/login.js
let app = getApp()
import http from '../../request/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: true, //密码inputtype属性
    cellphone: "", //手机号
    password: "", //密码
    currentTab: 0, //tab切换索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击小眼睛
  toshow() {
    this.setData({
      inpType: !this.data.inpType
    })
  },
  currentTab(e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      cellphone: "",
      password: "",
    })
  },
  //获取输入的手机号
  registInput(e) {
    var phoneNumber = e.detail.value
    this.setData({
      cellphone: phoneNumber
    })
  },
  //获取输入密码
  topassword(e) {
    var password = e.detail.value
    this.setData({
      password: password
    })
  },
  //点击登录按钮
  tologin() {
    //验证手机号正则
    var pattern = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    if (pattern.test(this.data.cellphone)) {
      if (this.data.currentTab == 0) {
        http.toLogin({
          tel: this.data.cellphone,
          password: this.data.password,
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
          })
          setTimeout(() => {
            if (res.data.errorCode == -1) {
              app.data.userId = res.data.body.userId
              wx.switchTab({
                url: '../repair/repair'
              })
            }
          }, 1000)
        })
      } else if (this.data.currentTab == 1) {
        http.toLoginByPick({
          tel: this.data.cellphone,
          password: this.data.password,
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
          })
          setTimeout(() => {
            if (res.data.errorCode == -1) {
              app.data.pickId = res.data.body.pickId
              wx.reLaunch({
                url: '../repairorder/repairorder',
              })
            }
          })
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '电话号码不正确',
        showCancel: false
      })
    }
  },
  //跳转注册页面
  toregister() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //跳转忘记密码页面
  toreget() {
    wx.navigateTo({
      url: '../reget/reget',
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
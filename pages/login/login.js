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
    if (wx.getStorageSync('customer')) {
      this.setData({
        cellphone: wx.getStorageSync('customer').cellphone,
        password: wx.getStorageSync('customer').password,
      })
    }
    if(options.type){
      this.setData({
        currentTab: options.type
      })
    }
  },
  //点击小眼睛
  toshow() {
    this.setData({
      inpType: !this.data.inpType
    })
  },
  //点击tabbar
  currentTab(e) {
    let idx = e.currentTarget.dataset.idx
    let customer = wx.getStorageSync('customer')
    let receiving = wx.getStorageSync('receiving')
    if (idx == 0) {
      this.setData({
        cellphone: customer.cellphone,
        password: customer.password,
      })
    } else if (idx == 1) {
      if (receiving) {
        this.setData({
          cellphone: receiving.cellphone,
          password: receiving.password,
        })
      } else {
        this.setData({
          cellphone: '',
          password: '',
        })
      }
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
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
    console.log(111)
    var that = this
    //验证手机号正则
    var pattern = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    if (pattern.test(that.data.cellphone)) {
      if (that.data.currentTab == 0) {
        http.toLogin({
          tel: that.data.cellphone,
          password: that.data.password,
          openId: wx.getStorageSync('openid')
        }).then(res => {
          // console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
          })
          if (res.data.errorCode == -1) {
            var list = res.data.body
            app.data.userId = list.userId
            that.tosubscribe();
            wx.setStorageSync("customer", {
              cellphone: that.data.cellphone,
              password: that.data.password,
            })
            console.log(list)
            app.data.userinfor = {
              name: list.name,
              tel: list.tel,
              adddetail: list.adddetail,
              specModel: list.specModel,
              number: list.number,
            }
            wx.switchTab({
              url: `../repair/repair`,
            })
          }
        })
      } else if (that.data.currentTab == 1) {
        http.toLoginByPick({
          tel: that.data.cellphone,
          password: that.data.password,
          openId: wx.getStorageSync('openid')
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
          })
          if (res.data.errorCode == -1) {
            app.data.pickId = res.data.body.pickId
            that.tosubscribe();
            wx.setStorageSync("receiving", {
              cellphone: that.data.cellphone,
              password: that.data.password,
            })
            wx.redirectTo({
              url: '../repairorder/repairorder',
            })

          }
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

  //开通订阅消息
  tosubscribe() {
    // 这里是获取下发权限地方，根据官方文档，可以根据  wx.getSetting() 的 withSubscriptions   这个参数获取用户是否打开订阅消息总开关。后面我们需要获取用户是否同意总是同意消息推送。所以这里要给它设置为true 。
    wx.getSetting({
      withSubscriptions: true, //  这里设置为true,下面才会返回mainSwitch
      success: function (res) {
        // 调起授权界面弹窗
        if (res.subscriptionsSetting.mainSwitch) { // 用户打开了订阅消息总开关
          if (res.subscriptionsSetting.itemSettings != null) { // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
            let moIdState = res.subscriptionsSetting.itemSettings['CPy60MlR2yTT96hFIgFxqDO875aBGcnSbIfmsLGoylg', 'wx2pYmmL1o17QaiMVF7nIx1eah8SAGpQ3RdOAzyDQNI']; // 用户同意的消息模板id
            if (moIdState === 'accept') {
              console.log('接受了消息推送');
            } else if (moIdState === 'reject') {
              console.log("拒绝消息推送");
            } else if (moIdState === 'ban') {
              console.log("已被后台封禁");
            }
          } else {
            // 当用户没有点击 ’总是保持以上选择，不再询问‘  按钮。那每次执到这都会拉起授权弹窗
            wx.requestSubscribeMessage({ // 调起消息订阅界面
              tmplIds: ['CPy60MlR2yTT96hFIgFxqDO875aBGcnSbIfmsLGoylg', 'wx2pYmmL1o17QaiMVF7nIx1eah8SAGpQ3RdOAzyDQNI'],
              success(res) {
                console.log('订阅消息 成功 ');
                console.log(res);
                if(res.CPy60MlR2yTT96hFIgFxqDO875aBGcnSbIfmsLGoylg == 'accept' || res.wx2pYmmL1o17QaiMVF7nIx1eah8SAGpQ3RdOAzyDQNI == 'accept'){
                  wx.showToast({
                    title: '订阅消息 成功',
                    icon: 'none',
                    mask: true
                  })
                }else{
                  wx.showToast({
                    title: '订阅消息 失败',
                    icon: 'none',
                    mask: true
                  })
                }
              },
              fail(er) {
                console.log("订阅消息 失败 ");
                console.log(er);
                wx.showToast({
                  title: er.errMsg,
                  icon: 'none',
                  mask: true
                })
              }
            })
          }
        } else {
          console.log('订阅消息未开启')
          wx.showToast({
            title: '订阅消息未开启',
            icon: 'none',
            mask: true
          })
        }
      },
      fail: function (error) {
        console.log(error);
      },
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
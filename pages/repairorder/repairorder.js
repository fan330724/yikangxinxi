// pages/repairorder/repairorder.js
import http from '../../request/http.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [], //列表
    list: [{
        text: '全部'
      },
      {
        text: '待接单'
      },
      {
        text: '待确认'
      },
      {
        text: '维修中'
      },
      {
        text: '已完成'
      },
    ],
    currentTab: 0, //点击的索引
    navScrollLeft: 0, //距离左边的距离
  },
  list: [], //列表数组
  picProof: [], //凭证图片
  pic: [], //故障图片
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    this.getOrders(0)
  },
  //点击导航栏
  switchNav(event) {
    var cur = event.detail.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false
    } else {
      this.setData({
        currentTab: cur
      })
    }
    this.switchIf(cur)
  },
  //滑动内容栏
  switchTab(event) {
    var cur = event.detail;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
    this.switchIf(cur)
  },
  //判断封装
  switchIf(type) {
    switch (type) {
      case 0:
        this.getOrders(0)
        break;
      case 1:
        this.getOrders(1)
        break;
      case 2:
        this.getOrders(2)
        break;
      case 3:
        this.getOrders(3)
        break;
      case 4:
        this.getOrders(6)
        break;
    }
  },
  //获取数据
  getOrders(type) {
    http.toGetRecordByPick({
      pickId: app.data.pickId,
      orderState: type
    }).then(res => {
      var list = res.data.body.cs
      console.log(list)
      this.list = []
      if (res.data.errorCode == -1) {
        list.filter((v) => {
          let pic = v.pic.filter((v) => {
            return v!= 'undefined'
          })
          this.list.push({
            address: v.address,
            buyDate: v.buyDate,
            createDate:v.createDate,
            description: v.description,
            mainAdvice: v.mainAdvice,
            modec: v.modec,
            name: v.name,
            number: v.number,
            orderId: v.orderId,
            orderNumber: v.orderNumber,
            orderState: v.orderState,
            pic: pic,
            picProof: v.picProof,
            pickName: v.pickName,
            pickTel: v.pickTel,
            price: v.price,
            tel: v.tel,
            userId: v.userId,
          })
        })
        this.setData({
          orders: this.list
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        this.setData({
          orders: ""
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
    this.switchIf(this.data.currentTab)
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
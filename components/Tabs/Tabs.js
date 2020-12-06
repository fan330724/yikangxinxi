// components/Tabs/Tabs.js
import http from '../../request/http.js'
let app = getApp()
Component({
  /**
   * 使用多个插槽
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Object
    },
    navScrollLeft: {
      type: Number
    },
    currentTab: {
      type: Number
    },
    orders: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModel: false, //控制弹窗
    orderid: "", //订单Id
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchNav(e) {
      // 1 获取点击的索引
      const {
        current
      } = e.currentTarget.dataset;
      // 2 触发 父组件中的事件 自定义
      this.triggerEvent("switchNav", {
        current
      });
    },
    switchTab(e) {
      // 2 触发 父组件中的事件 自定义
      this.triggerEvent("switchTab", e.detail.current);
    },
    //点击联系客户
    tocontact(e) {
      // 1 获取点击的电话
      const {
        phone
      } = e.currentTarget.dataset;
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    },
    //点击确认接单
    toorders(e) {
      let {
        orderid
      } = e.currentTarget.dataset
      this.setData({
        showModel: true,
        orderid,
      })
    },

    //点击提交
    tosubmit(e) {
      console.log(e.detail.value)
      let {
        number,
        textarea
      } = e.detail.value
      if (!number || !textarea) {
        wx.showToast({
          title: "请输入"
        })
      } else {
        http.toTackOrder({
          orderId: this.data.orderid,
          pickId: app.data.pickId,
          price: number,
          advice: textarea,
        }).then(res => {
          // console.log(res)
          wx.showToast({
            title: res.data.msg
          })

          setTimeout(() => {
            this.setData({
              showModel: false,
            })
            wx.reLaunch({
              url: '../../pages/repairorder/repairorder'
            })
          }, 1500)
        })
      }

    },
    //点击取消
    toreset(e) {
      this.setData({
        showModel: false
      })
    },
    //点击完成订单
    tocomplete(e){
      let {
        orderid
      } = e.currentTarget.dataset
      http.toFinishOrder({
        orderId: orderid
      }).then(res => {
        wx.showToast({
          title: res.data.msg
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '../../pages/repairorder/repairorder'
          })
        }, 1500)
      })
    },
  }
})
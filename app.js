//app.js
App({
  data: {
    userId: "ff8080817604d0e001760f72c6e30000", //用户id
    pickId: "ff808081760499dd01760499e1a90001", //接单人id
    // userId:"", //用户id
    // pickId:"", //接单人id
    userinfor: '', //用户信息
  },
  onLaunch: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    // 获取openid
    var openid = wx.getStorageSync('openid')
    if (openid) {
      return
    } else {
      wx.login({
        success: (res) => {
          wx.request({
            url: 'https://www.yk0477.com/api/member/getOpenIdByCode',
            data: {
              code: res.code
            },
            success: (res) => {
              console.log(res.data.body.openId)
              wx.setStorageSync('openid', res.data.body.openId)
            }
          })
        }
      })
    }
  },
  globalData: {

  }
})
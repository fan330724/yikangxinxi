
// pages/login/login.js
const qqmap = require('../../utils/qqmap.js');
import http from '../../request/http.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: true, //密码inputtype属性
    infor: "", //输入的信息
    city: "",
    cityname: "", //地址
    date: "", //购机日期
    pics: [], //图片
    picss: [], //凭证图片
    userinfor:"", //用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data.userinfor)
    this.setData({
      userinfor:app.data.userinfor
    })
  },
  //点击小眼睛
  toshow() {
    this.setData({
      inpType: !this.data.inpType
    })
  },
  //点击提交按钮
  toSubmit(e) {
    this.setData({
      infor: e.detail.value
    })
    //验证手机号正则
    var pattern = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    var value = e.detail.value;
    console.log(value)
    if (!value.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        mask: true
      })
      return;
    } else if (!value.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        mask: true
      })
      return;
    } else if (!value.location) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        mask: true
      })
      return;
    } else if(!value.detailed){
      wx.showToast({
        title: '请输入故障描述',
        icon: 'none',
        mask: true
      })
      return;
    }else if (this.data.pics.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '请上传图片',
        showCancel: false
      })
      return;
    } else if (!pattern.test(value.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
      return;
    } else {
      console.log(typeof this.data.pics[0])
      http.toReleaseBreak({
        name: value.name,
        tel: value.phone,
        adddetail: value.location,
        number: value.code,
        buyDate: this.data.date,
        userId: app.data.userId,
        description: value.detailed,
        picProof: this.data.picss[0] +','+this.data.picss[1] +','+this.data.picss[2] ||'',
        pic: this.data.pics[0] +','+this.data.pics[1] +','+this.data.pics[2] ||''
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '../repair/repair',
          })
        },1000)
      })
    }
  },
  //获取地理位置
  getlocation() {
    var that = this;
    wx.getSetting({
      success(res) {
        // console.log(res)
        if (res.authSetting['scope.userLocation'] == undefined) {
          wx.getLocation({
            type: 'gcj02', //这里我们要指定定位类型是gcj02，因为不填默认是wgs84，定位精确度会相较于gcj02有几百到一千米的偏差，如果对精确度要求较高的请务必加上type:'gcj02'
            success(res) {
              console.log(res)
              //地址逆解析获取cityname
              qqmap.nimap(res.latitude, res.longitude, function (res) {
                console.log(res)
                that.setData({
                  cityname: res.result.address,
                  city: [res.result.address_component.province, res.result.address_component.city, res.result.address_component.district]
                })
              })
            },
            // fail(err) {
            //   console.log(err)
            //   //用户已授权，但是获取地理位置失败，会弹框提示用户去系统设置中打开定位
            //   wx.showModal({
            //     title: '',
            //     content: '请在系统设置中打开定位服务',
            //     confirmText: '确定',
            //     success: function (res) {
            //       wx.chooseLocation({
            //         success() {
            //           wx.navigateBack()
            //         }
            //       })
            //     }
            //   })
            // }
          })
        } //小程序检测到用户不是第一次进入该页面,且未授权
        else if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
            success: function (res) {
              //如果点击取消则显示授权失败
              if (res.cancel) {
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
              } //如果点击确定会打开授权页请求二次授权
              else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用getLocationt的API
                      wx.getLocation({
                        type: 'gcj02', //这里我们要指定定位类型是gcj02，因为不填默认是wgs84，定位精确度会相较于gcj02有几百到一千米的偏差，如果对精确度要求较高的请务必加上type:'gcj02'
                        success(res) {
                          console.log(res)
                          //地址逆解析获取cityname
                          qqmap.nimap(res.latitude, res.longitude, function (res) {
                            console.log(res)
                            that.setData({
                              cityname: res.result.address,
                              city: [res.result.address_component.province, res.result.address_component.city, res.result.address_component.district]
                            })
                          })
                        },
                        // fail(err) {
                        //   console.log(err)
                        //   //用户已授权，但是获取地理位置失败，会弹框提示用户去系统设置中打开定位
                        //   wx.showModal({
                        //     title: '',
                        //     content: '请在系统设置中打开定位服务',
                        //     confirmText: '确定',
                        //     success: function (res) {
                        //       wx.chooseLocation({
                        //         success() {
                        //           wx.navigateBack()
                        //         }
                        //       })
                        //     }
                        //   })
                        // }
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.getLocation({
            type: 'gcj02', //这里我们要指定定位类型是gcj02，因为不填默认是wgs84，定位精确度会相较于gcj02有几百到一千米的偏差，如果对精确度要求较高的请务必加上type:'gcj02'
            success(res) {
              // console.log(res)
              //地址逆解析获取cityname
              qqmap.nimap(res.latitude, res.longitude, function (res) {
                // console.log(res)
                that.setData({
                  cityname: res.result.address,
                  city: [res.result.address_component.province, res.result.address_component.city, res.result.address_component.district]
                })
              })
            },
            // fail(err) {
            //   console.log(err)
            //   //用户已授权，但是获取地理位置失败，会弹框提示用户去系统设置中打开定位
            //   wx.showModal({
            //     title: '',
            //     content: '请在系统设置中打开定位服务',
            //     confirmText: '确定',
            //     success: function (res) {
            //       wx.chooseLocation({
            //         success() {
            //           wx.navigateBack()
            //         }
            //       })
            //     }
            //   })
            // }
          })
        }
      }
    })
  },
  //自己选择地址
  getchange(e) {
    console.log(e.detail.value)
    this.setData({
      cityname: e.detail.value.join('')
    })
  },
  //选择日期
  getdate(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  //选择图片
  chooseImages() {
    var that = this;
    this.chooseImage(that.data.pics, function (res) {
      console.log(res)
      that.setData({
        pics: res
      })
    })
  },
  //选择图片
  chooseImages1() {
    var that = this;
    this.chooseImage(that.data.picss, function (res) {
      console.log(res)
      that.setData({
        picss: res
      })
    })
  },
  /**
   * 图片上传
   * 
   */
  //选择图片
  chooseImage(pics, event) {
    var that = this
    pics = pics;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // console.log(tempFilePaths)
        http.toUpload({
          imageFile: wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        }).then(res => {
          console.log(res.data.body)
          var allpath = res.data.body.allpath
          pics.push(allpath)
          event(pics)
        })
      },
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    console.log(pics)
    this.setData({
      pics: pics,
    })
  },
  // 删除图片
  deleteImg1: function (e) {
    var picss = this.data.picss;
    var index = e.currentTarget.dataset.index;
    picss.splice(index, 1);
    console.log(picss)
    this.setData({
      picss: picss,
    })
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
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
    this.getlocation()
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
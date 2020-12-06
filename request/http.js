import {
  request
} from './index.js'
var url = 'https://www.yk0477.com/'
export default {
  /**
   * 注册
   * 参数 name	是	姓名
   *      tel	是	手机号
   *      adddetail	是	地址
   *      specModel	是	规格
   *      number	是	主机编号
   *      buyDate	是	购机时间
   *      password	是	密码
   */
  toRegditUser(props) {
    return request({
      url: url + "toRegditUser",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

   /**
   * 登录
   * 参数 tel	是	手机号
   *      password	是	密码
   */
  toLogin(props) {
    return request({
      url: url + "toLogin",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 忘记密码重置密码
   * 参数 tel	是	手机号
   *      password	是	新密码
   */
  toResetPassword(props) {
    return request({
      url: url + "toResetPassword",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 发布项目
   * 参数 name	是	姓名
   *      tel	是	手机号
   *      adddetail	是	地址
   *      number	是	主机编号
   *      buyDate	是	购机时间
   *      userId	是	用户id
   *      description	是	描述
   *      picProof		凭证
   *      pic	是 	图片
   */
  toReleaseBreak(props) {
    return request({
      url: url + "toReleaseBreak",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 用户登录获取记录
   * 参数 userId	是	用户id
   */
  togetRecord(props) {
    return request({
      url: url + "togetRecord",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 接单人登录
   * 参数 tel	是	手机号
   *      password	是	密码
   */
  toLoginByPick(props) {
    return request({
      url: url + "toLoginByPick",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 接单人接单
   * 参数 orderId	是	订单id
   *      pickId	是	接单人id
   *      price	是	价格
   *      advice	是	意见反馈
   */
  toTackOrder(props) {
    return request({
      url: url + "toTackOrder",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 客户进行确认和取消
   * 参数 orderId	是	订单id
   *      orderState	是	订单状态
   */
  toReceOrder(props) {
    return request({
      url: url + "toReceOrder",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 维修员点击完成订单
   * 参数 orderId	是	订单id
   */
  toFinishOrder(props) {
    return request({
      url: url + "toFinishOrder",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },

  /**
   * 点击评价
   * 参数 orderId	是	订单id
   *      level	是	等级1-5
   *      content		内容
   */
  toAppraise(props) {
    return request({
      url: url + "toAppraise",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },
  /**
   * 点击选择配送方式
   * 参数 orderId	是	订单id
   *       modes：配送方式
   */
  toReceDesp(props) {
    return request({
      url: url + "toReceDesp",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },
  /**
   * 接单人登录获取记录
   * 参数 pickId	是	接单人id
   *      orderState  是  状态
   */
  toGetRecordByPick(props) {
    return request({
      url: url + "toGetRecordByPick",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },
  /**
   * 上传图片
   * 参数 imageFile	是	图片
   */
  toUpload(props) {
    return request({
      url: url + "toUpload",
      data: {
        ...props
      },
    }).then((res) => {
      return res
    })
  },
}
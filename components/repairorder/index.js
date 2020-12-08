// components/repairorder/index.js
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
    list: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //图片点击事件
    imgYu: function (event) {
      console.log(event)
      let {src,list} = event.currentTarget.dataset; //获取src data-list data-index
      console.log(list)
      console.log(src)
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      })
    },
  }
})
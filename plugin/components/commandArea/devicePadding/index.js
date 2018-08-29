// plugin/components/commandArea/devicePadding/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    needPadding: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached () {
    wx.getSystemInfo({
      success: (res) => {
        let needPadding = (res.model.search('iPhone X') !== -1)
        this.setData({needPadding})
      }
    })    
  }
})

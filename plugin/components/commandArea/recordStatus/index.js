// plugin/components/commandArea/recordStatus/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recordStatus: {
      type: String,
      value: 'readyToRecord',
      observer: function(newVal) {
        console.log(newVal)
      }
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

  }
})

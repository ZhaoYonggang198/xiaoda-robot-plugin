// plugin/components/commandArea/radioBox/index.js
import { sendRadioReply } from '../../../reducers/messages'
import { store } from '../../../reducers/store'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Object,
      value: {},
      observer: function (newVal) {
        let items = newVal.items.find(item => !!item.imageUrl === true)
        this.setData({
          haveImage: items !== undefined
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touchStartTime: '',
    touchMoveTime: '',
    touchEndTime: '',
    timeout: '',
    haveImage: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectItem (event) {
      console.log('selectItem', event)
      let obj = event.currentTarget.dataset.option
      if (this.data.touchEndTime - this.data.touchStartTime < 800) {
        store.message.dispatch(sendRadioReply({...obj, value: obj.value ? obj.value : obj.caption}))
      }
    },
    touchStart (event) {
      if (this.data.timeout) {
        clearTimeout(this.data.timeout)
      }
      const that = this
      let option = event.currentTarget.dataset.option
      this.data.touchStartTime = new Date().getTime()
      this.data.timeout = setTimeout(function () {
        if (option.imageUrl) {
          that.triggerEvent('previewImage')
          wx.previewImage({
            current: option.imageUrl,
            urls: [option.imageUrl]
          })
        }
      }, 800)
    },
    touchMove () {
      this.data.touchMoveTime = new Date().getTime()
      if (this.data.touchMoveTime - this.data.touchStartTime < 800) {
        clearTimeout(this.data.timeout)
        this.data.timeout = ''
      }
    },
    touchEnd () {
      this.data.touchEndTime = new Date().getTime()
      if (this.data.touchEndTime - this.data.touchStartTime < 800) {
        clearTimeout(this.data.timeout)
        this.data.timeout = ''
      }
    }
  }
})

import { store } from '../../../reducers/store'
import { updateCheckboxValue } from '../../../reducers/interaction'
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
        let checkArr = newVal.items.map(() => false)
        this.setData({
          checkArr
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checkArr: [],
    touchStartTime: '',
    touchMoveTime: '',
    touchEndTime: '',
    timeout: '',
    checkArrIndex: [],
    haveImage: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    saveInArray (item, arr) {
      if (arr.includes(item)) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === item) {
            arr.splice(i, 1)
          }
        }
      } else {
        arr.push(item)
      }
    },
    checked (event) {
      let index = event.currentTarget.dataset.id
      if (this.data.touchEndTime - this.data.touchStartTime < 800) {
        this.data.checkArr[index] = !this.data.checkArr[index]
        this.setData({
          checkArr:this.data.checkArr
        })

        let arr = this.data.list.items.filter((item, index) => {
          return this.data.checkArr[index]
        })
        
        store.interaction.dispatch(updateCheckboxValue({items: arr, event: this.data.list.event}))
      }
    },
    touchStart (option) {
      if (this.data.timeout) {
        clearTimeout(this.data.timeout)
      }
      const that = this
      this.data.touchStartTime = new Date().getTime()
      this.data.timeout = setTimeout(function () {
        if (option.imageUrl) {
          that.$store.commit('setPreviewFalse')
          wx.previewImage({
            current: option.imageUrl,
            urls: [option.imageUrl]
          })
        }
      }, 800)
      console.log('time:start#' + this.data.timeout)
    },
    touchMove () {
      this.data.touchMoveTime = new Date().getTime()
      if (this.data.touchMoveTime - this.data.touchStartTime < 800) {
        clearTimeout(this.timeout)
        this.timeout = ''
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

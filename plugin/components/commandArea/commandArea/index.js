import { store } from '../../../reducers/store'
import { sendQuery,sendCheckboxReply } from '../../../reducers/messages'
import { clearCheckboxValue } from '../../../reducers/interaction'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputPromt: {
      type: Object,
      value: {},
      observer: function (newValue) {
        this.setData({
          textType: newValue.keyboard ? newValue.keyboard : 'text',
          textLength: newValue.length ? newValue.length : 140,
          placehodlerText: newValue.prompt ? newValue.prompt : ' '
        })
      }
    },
    needFocus: {
      type: Boolean,
      value: true
    },
    displayFinish: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMessage: '',
    voiceMode: false,
    pullUp: false,
    items: [],
    event: '',
    displayText: '',
    textType: 'text',
    textLength: 140,
    placehodlerText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    valueInput (ev) {
      this.setData({
        currentMessage: ev.detail.value
      })
    },
    valueChange (ev) {
      this.setData({
        currentMessage: ev.detail.value
      })
    },
    sendMessage (ev) {
      if (this.data.currentMessage && this.data.currentMessage !== this.data.displayText) {
        store.message.dispatch(sendQuery(this.data.currentMessage))
          .then(() => {
            store.interaction.dispatch(clearCheckboxValue())
          })
        this.setData({
          currentMessage: ''
        })
      } else {
        store.message.dispatch(sendCheckboxReply({items: this.data.items, event: this.data.event}))
          .then(() => {
            store.interaction.dispatch(clearCheckboxValue())
          })
        this.setData({
          currentMessage: ''
        })
      }
    },
    confirm (e) {
      if (e.detail.value) {
        store.message.dispatch(sendQuery(e.detail.value))
        this.setData({
          currentMessage: ''
        })
      }
    },
    msgSendStatus (event) {
      this.triggerEvent('msgSendStatus', event.detail)
    },
    textFocus (e) {
    },
    textBlur (e) {
    },
    changeVoiceMode () {
      this.setData({
        voiceMode: !this.data.voiceMode
      })
    }
  },

  attached () {
    this.unsubscribe = store.interaction.subscribe(() => {
      let state = store.interaction.getState()
      this.data.items = state.items
      this.data.event = state.event
      if (state.items) {
        this.data.displayText = state.items.filter(item => item.caption && item.caption.length > 0)
        .map((item) => item.caption).join(',')
        this.setData({
          currentMessage: this.data.displayText
        })
      }
    })
  },

  detached () {
    this.unsubscribe()
  }
})

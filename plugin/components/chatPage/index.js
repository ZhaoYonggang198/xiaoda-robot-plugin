import { store } from '../../reducers/store'
import { sendLogin, LOCAL_MESSAGE_SENDING, REMOTE_MESSAGE_RECEIVING, appendLocalMessage, sendGenericRequest } from '../../reducers/messages'


function getActiveMessage(activeMsg, array) {
  if (!activeMsg) {
    return {}
  }
  let message = activeMsg.msgs.filter((msg) => {
    return array.indexOf(msg.type) !== -1
  })

  if (message.length >= 1) {
    return message[0]
  } else {
    return {}
  }
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    botAvatar: {
      type: String,
      value: '/static/image/avatar.png'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayFinish: false,
    localMsgSending: false,
    scrollToView: 'bottom',
    activeRedirectMsg: {},
    activeBoxMsg: {},
    activeInputPromtMsg: {},
    messageList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    renderComplete () {
      this.msgDisplayFinish()
      this.scollToBottom()
    },
    renderUpdate () {
      this.scollToBottom()
    },
    scollToBottom () {
      const that = this
      this.setData({
        scrollToView: 'bottom'
      })
    },
    msgDisplayBegin () {
      this.setData({
        displayFinish: false
      })
    },
    msgDisplayFinish () {
      this.setData({
        displayFinish: true
      })
    },
    handleMsgSendStatus (event) {
      this.setData({
        localMsgSending: event.detail === 'start'
      })
    },
    handleButtonListEvent (event) {
      let buttonList = event.detail.buttonList
      let item = event.detail.item
      if (buttonList.reflex) {
        store.message.dispatch(appendLocalMessage(item.value ? item.value : item.caption))
      }
      store.message.dispatch(sendGenericRequest('event', {name: item.event, ...item.data}))
    }
  },

  attached () {
    this.unsubscribe = store.message.subscribe(() => {
      let data = store.message.getState()
      let key = `messageList[${this.data.messageList.length}]`
      if ( data.status === LOCAL_MESSAGE_SENDING ) {
        this.setData({
          [key]: data.local
        })
        this.setData({
          activeRedirectMsg: {},
          activeBoxMsg: {},
          activeInputPromtMsg: {}          
        })
        this.msgDisplayBegin()
      } else if ( data.status === REMOTE_MESSAGE_RECEIVING ) {
        this.setData({
          [key]: data.remote
        })
        this.setData({
          activeRedirectMsg: getActiveMessage(data.remote, ['redirect', 'reLaunch']),
          activeBoxMsg: getActiveMessage(data.remote, ['radio', 'checkbox', 'imageUploader']),
          activeInputPromtMsg: getActiveMessage(data.remote, ['input-prompt'])
        })
      }
    })
    store.message.dispatch(sendLogin())
  },

  detached () {
    this.unsubscribe()
  }
})

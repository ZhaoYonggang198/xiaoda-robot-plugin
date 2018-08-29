import { getAsrResult } from '../../../api/asr.js'
import { store } from '../../../reducers/store.js'
import { sendSpeech } from '../../../reducers/messages.js'
import { clearCheckboxValue } from '../../../reducers/interaction.js'

const recorderManager = wx.getRecorderManager()

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
    recordStatus: 'readyToRecord',
    startRecordPageY: 0,
    endRecordPageY: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startRecord (e) {
      this.data.startRecordPageY = e.touches[0].clientY
      this.data.endRecordPageY = e.touches[0].clientY
      this.setData({
        recordStatus: 'inRecording'
      })
      this.startRecordOperation()
    },
    stopRecord (e) {
      recorderManager.stop()
    },
    cancelRecord (e) {
      recorderManager.stop()
    },
    recordOperation (e) {
      this.data.endRecordPageY = e.changedTouches[0].clientY
      if (this.data.endRecordPageY - this.data.startRecordPageY < -50) {
        this.setData({
          recordStatus: 'readyToCancel'
        })
      } else {
        this.setData({
          recordStatus: 'inRecording'
        })
      }
    },
    clearRecordStatus () {
      this.setData({
        recordStatus: 'readyToRecord'
      })
      this.data.startRecordPageY = 0
      this.data.endRecordPageY = 0
    },
    startRecordOperation () {
      let that = this
      recorderManager.onStart(() => {
        console.log('recorder start')
      })
      recorderManager.onPause(() => {
        console.log('recorder pause')
      })
      recorderManager.onStop((res) => {
        let that = this
        if (that.data.recordStatus === 'inRecording') {
          that.triggerEvent('msgSendStatus', 'start')
          getAsrResult(res.tempFilePath)
            .then((response) => {
              console.log(response)
              return store.message.dispatch(sendSpeech(response.url, response.asr, true))
            })
            .then(() => {
              store.interaction.dispatch(clearCheckboxValue())
              that.triggerEvent('msgSendStatus', 'end')
            })
            .catch((err) => {
              that.triggerEvent('msgSendStatus', 'end')
              console.error('err', err)
              wx.showToast({
                title: '没听懂:(',
                icon: 'none'
              })              
            })
        }
        that.clearRecordStatus()
      })
      recorderManager.onError((error) => {
        console.log('录音停止，原因可能如下所示')
        console.log(error)
      })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })
      recorderManager.onError((error) => {
        console.log('录音断开，可能是由于下面原因导致的')
        console.log(error)
        if (wx.getStorageSync('recordError')) {
          wx.setStorageSync('recordError', JSON.stringify(error) + wx.getStorageSync('recordError'))
        } else {
          wx.setStorageSync('recordError', JSON.stringify(error))
        }
      })

      const options = {
        duration: 60000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 64000,
        format: 'mp3'
      }

      recorderManager.start(options)
    }
  }
})

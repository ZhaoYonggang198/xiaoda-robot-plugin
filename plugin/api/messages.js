import { getChatbotUrl } from './url'
import { getUserid } from './userid'
export const makeLocalMessage = function (type, data) {
  return {
    from: {
      id: getUserid()
    },
    type,
    data
  }
}

export const sendToChatbot = function (type, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getChatbotUrl(),
      data: makeLocalMessage(type, data),
      method: 'POST',
      success: (response) => {
        resolve(response.data)
      },
      fail: (err) => {
        wx.showToast({
          title: '服务器出问题了，工程师正在抓紧解决',
          icon: 'none'
        })
        // console.log('test')
        reject(err)
      },
      complete: (response) => {
        if (response.statusCode !== 200) {
          wx.showToast({
            title: '服务器出问题了，工程师正在抓紧解决',
            icon: 'none'
          })
          console.error(response)
          reject(response)
        }
      }
    })
  })
}
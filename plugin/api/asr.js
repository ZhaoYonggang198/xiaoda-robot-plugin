import { getAsrUrl } from './url'

export function getAsrResult (filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: getAsrUrl(),
      filePath,
      name: 'audio',
      success: function (res) {
        if (res.statusCode === 200) {
          var result = JSON.parse(res.data)
          if (result.result && !result.result.err_no) {
            try {
              var asr = result.result.result[0]
              asr = asr.substr(0, asr.length - 1)
              resolve({
                url: result.url,
                asr
              })
            } catch (err) {
              reject(err)
            }
          } else {
            reject(new Error('语音识别错误'))
          }
        } else {
          reject(new Error('404 error'))
        }
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
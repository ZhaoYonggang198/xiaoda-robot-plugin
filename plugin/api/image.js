import { getImageUrl } from './url'

export function uploadImage (filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: getImageUrl(),
      filePath,
      name: 'image',
      success: (res) => {
        const remoteUrl = JSON.parse(res.data).fileUrl
        resolve(remoteUrl)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function selectImageToUpload () {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        uploadImage(res.tempFilePaths[0]).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
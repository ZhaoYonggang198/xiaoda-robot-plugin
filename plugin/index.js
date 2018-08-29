var data = require('./api/data.js')
import { setChatbotUrl, setAsrUrl, setImageUrl } from './api/url.js'
import { setUserid } from './api/userid.js'

module.exports = {
  getData: data.getData,
  setChatbotUrl,
  setAsrUrl,
  setImageUrl,
  setUserid
}
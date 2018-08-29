var plugin = requirePlugin("myPlugin")
App({
  onLaunch: function () {
    let data = plugin.getData()
    plugin.setUserid('oNijH5ZWW7iEm8z_gAWutEI8HUXU')
    plugin.setChatbotUrl('https://xiaodamp.cn/asst/chatbot/survey')
    plugin.setAsrUrl('https://xiaodamp.cn/asst/asr')
    plugin.setImageUrl('https://xiaodamp.cn/asst/image')
  }
})
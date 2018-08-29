import { createActions, handleActions } from '../lib/redux-actions.min.js'
import { makeLocalMessage } from '../api/messages.js'
import { sendToChatbot } from '../api/messages'


export const LOCAL_MESSAGE_SENDING = 'local message sending'
export const REMOTE_MESSAGE_RECEIVING = 'remote message receiving'
export const MESSAGE_SEND_FAIL = 'message send fail'

export const { appendLocalMessage, appendRemoteMessage, messageFailure }
  = createActions({
    APPEND_LOCAL_MESSAGE: (type, data) => ({
      local: makeLocalMessage(type, data)
    }),
    APPEND_REMOTE_MESSAGE: (message) => ({
      remote: message
    }),
    MESSAGE_FAILURE: () => ({})
  })

export const messages = handleActions({
  [appendLocalMessage]: (state, action) => {
    return {
      ...state,
      status: LOCAL_MESSAGE_SENDING,
      local: action.payload.local,
      remote: {}
    }
  },
  [appendRemoteMessage]: (state, action) => {
    return {
      ...state,
      status: REMOTE_MESSAGE_RECEIVING,
      remote: action.payload.remote
    }
  },
  [messageFailure]: (state) => {
    return {
      ...state,
      status: MESSAGE_SEND_FAIL
    }
  }
},
{})

export const sendToChatbotAsync = function (type, data) {
  return (dispatch) => {   
    return new Promise((resolve, reject) => {
        dispatch(appendLocalMessage(type, data))
        sendToChatbot(type, data)
          .then((message) => {
            dispatch(appendRemoteMessage(message))
            resolve()
          })
          .catch(() => {
            dispatch(messageFailure())
            reject()
          })
    })
  }
}

export const sendLogin = (newUser) => {
  return sendToChatbotAsync('login', {code: '', isNew: newUser})
}

export const sendQuery = (query) => {
  return sendToChatbotAsync('text', {query})
}

export const sendImage = (url, indicator) => {
  return sendToChatbotAsync('image', {url, indicator})
}

export const sendRadioReply = (data) => {
  return sendToChatbotAsync('radio-reply', data)
}

export const sendCheckboxReply = (data) => {
  return sendToChatbotAsync('checkbox-reply', data)
}

export const sendSpeech = (url, asr, nlu) => {
  return sendToChatbotAsync('speech', {url, asr, nlu})
}

export const sendGenericRequest = sendToChatbotAsync
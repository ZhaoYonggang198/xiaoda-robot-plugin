import { createStore, applyMiddleware } from '../lib/redux.js'
import thunk from '../lib/redux-thunk.js'
import { messages } from './messages.js'
import { interaction } from './interaction.js'

const messageStore = createStore(messages, applyMiddleware(thunk))
const interactionStore = createStore(interaction, applyMiddleware(thunk))

export const store = {
  message: messageStore,
  interaction: interactionStore
}
var data = require('../api/data.js')
import { createStore, applyMiddleware } from '../lib/redux.js'
import thunk from '../lib/redux-thunk.js'
import todoApp from '../reducers/reducers.js'

export const store = createStore(todoApp, applyMiddleware(thunk))
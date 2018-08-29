import { handleActions } from '../lib/redux-actions.min.js'

import { combineReducers } from '../lib/redux.js'
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters,
    addTodo,
    toggleTodo,
    setVisibilityFilter
} from './actions'
const { SHOW_ALL } = VisibilityFilters

const visibilityFilter = handleActions({
    [setVisibilityFilter]: (state, action) => {
        return action.payload.filter
    } 
},
SHOW_ALL)

const todos = handleActions({
    [addTodo]: (state, action) => {
        return [
            ...state,
            {
                text: action.payload.text,
                completed: false
            }
        ]
    },
    [toggleTodo]: (state, action) => {
        return state.map((todo, index) => {
            if (index === action.payload.index) {
                return Object.assign({}, todo, {
                    completed: !todo.completed
                })
            }
            return todo
        })        
    }
},
[])

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp
/*
 * action 类型
 */
import { createActions } from '../lib/redux-actions.min.js'


export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


/*
 * 其它的常量
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */
export const { addTodo, toggleTodo, setVisibilityFilter }
    = createActions({
        ADD_TODO: text => ({ text }),
        TOGGLE_TODO: index => ({ index }),
        SET_VISIBILITY_FILTER: filter => ({ filter })
    })

export const addTodoAsync = (text) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(addTodo(text))
                resolve()
            }, 10000)
        })
    }
}


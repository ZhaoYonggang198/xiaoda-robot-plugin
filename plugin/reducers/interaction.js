import { createActions, handleActions } from '../lib/redux-actions.min.js'

const UPDATE_CHECKBOX_VAlUE = 'update checkbox reply value'
const CLEAR_CHECKBOX_VALUE = 'clear checkbox value'

export const { updateCheckboxValue, clearCheckboxValue }
  = createActions({
    UPDATE_CHECKBOX_VALUE: (data) => ({
      ...data
    }),
    CLEAR_CHECKBOX_VALUE: () => ({})
  })

export const interaction = handleActions({
  [updateCheckboxValue]: (state, action) => {
    return {
      ...action.payload
    }
  },
  [clearCheckboxValue]: (state, action) => {
    return {
      event: '',
      items: []
    }       
  }
},
{})
import { store } from '../../reducers/todoStore.js'
import {
  addTodo
} from '../../reducers/actions.js'

var i = 0
Component({
  data: {
    list:[],
    subscribe: {}
  },
  attached: function(){
    // 可以在这里发起网络请求获取插件的数据

    this.data.subscribe = store.subscribe(() => {
      console.log(store.getState().todos)
      let length = this.data.list.length
      let key = `list[${length}]`
      this.setData({
        [key]:store.getState().todos[length]
      })
    })
    store.dispatch(addTodo('Learn about actions1'))
  },

  methods: {
    addItem (event) {
      i++
      store.dispatch(addTodo('Learn about actions'+i))
    }
  }
})
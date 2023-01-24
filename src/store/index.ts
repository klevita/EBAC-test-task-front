import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({//тут можно было объединить в общий класс, но я не стал т.к. приложение совсем небольшое
  state: {
    taskUserId:1,
    taskTitle:null as string | null,
    taskCompleted:false
  },
  getters: {
  },
  mutations: {
    setTaskTitle(state,val:string | null){
        state.taskTitle = val
    },
    setTaskUserId(state,val:number){
        state.taskUserId = val
    },
    setTaskCompleted(state,val:boolean){
        state.taskCompleted = val
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})

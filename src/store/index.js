import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    init (state, lessonData) {
      state.data = lessonData
    }
  },
  getters: {
    getList (state) {
      return state.data
    }
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

// custom modules
import membersModule from './members'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    members: membersModule
  }
})

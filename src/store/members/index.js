import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    members: [],
    count: 0
  },
  actions,
  getters,
  mutations
}

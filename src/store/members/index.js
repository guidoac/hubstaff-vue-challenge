import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    members: [],
    count: 0,
    roles: [
      { value: 'all', text: 'All Roles' },
      { value: 'owner', text: 'Owner' },
      { value: 'viewer', text: 'Viewer' }
    ]
  },
  actions,
  getters,
  mutations
}

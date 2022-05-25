import axios from '@/plugins/http'

export default {
  async fetchMembers ({ commit }) {
    const { data } = await axios.get()

    commit('SET_MEMBERS', data.members)
    commit('SET_COUNT', data.count)
  }
}

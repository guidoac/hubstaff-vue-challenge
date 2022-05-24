import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import MembersTab from '@/components/Members/MembersTab'
import { BTable } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.filter('capitalize', () => {})

const members = [
  { id: '1', name: 'Jared Brown', role: 'Owner', projects: 8, payment: null, limits: { weekly: null, daily: 8 }, time_tracking: 'enabled' },
  { id: '2', name: 'Adrian Goia', role: 'Viewer', projects: 5, payment: null, limits: { weekly: 50, daily: 8 }, time_tracking: 'enabled' },
  { id: '3', name: 'Cody Rogers', role: 'Viewer', projects: 8, payment: null, limits: { weekly: 40, daily: null }, time_tracking: 'enabled' }
]

const store = new Vuex.Store({
  modules: {
    members: {
      namespaced: true,
      getters: {
        members: () => members,
        membersCount: jest.fn()
      },

      actions: {
        fetchMembers: jest.fn()
      }
    }
  }
})

const factory = function (props) {
  const wrapper = mount(MembersTab, {
    store,
    localVue,
    directives: {
      'b-tooltip': true
    },
    stubs: {
      'b-tooltip': true,
      'b-icon': true,
      'b-button': true,
      'b-form-select': true,
      'b-icon-search': true,
      'b-form-checkbox': true,
      'b-icon-chevron-down': true,
      BTable
    },
    ...props
  })

  return wrapper
}

describe('MembersTab', () => {
  it('renders all rows when passing filters with initial values', () => {
    const wrapper = factory({
      computed: {
        customFilter: () => {
          return [
            { key: 'role', value: 'all' },
            { key: 'time_tracking', value: 'all' },
            { key: 'name', value: '' }
          ]
        }
      }
    })

    expect(wrapper.findComponent({ name: 'BTable' }).vm.items)
      .toBe(members)
  })

  it('renders the right number of rows when using only the NAME filter', () => {
    const searchValue = 'Jar'
    const resultExpected = [members[0]]

    const wrapper = factory({
      computed: {
        customFilter: () => {
          return [
            { key: 'role', value: 'all' },
            { key: 'time_tracking', value: 'all' },
            { key: 'name', value: searchValue }
          ]
        }
      }
    })

    expect(wrapper.findComponent({ name: 'BTable' }).vm.filteredItems)
      .toStrictEqual(resultExpected)
  })

  it('renders the right number of rows when using only the ROLE filter', () => {
    const resultExpected = [members[1], members[2]]

    const wrapper = factory({
      computed: {
        customFilter: () => {
          return [
            { key: 'role', value: 'viewer' },
            { key: 'time_tracking', value: 'all' },
            { key: 'name', value: '' }
          ]
        }
      }
    })

    expect(wrapper.findComponent({ name: 'BTable' }).vm.filteredItems)
      .toStrictEqual(resultExpected)
  })

  it('renders the right number of rows when using only the TIME TRACKING filter', () => {
    const resultExpected = []

    const wrapper = factory({
      computed: {
        customFilter: () => {
          return [
            { key: 'role', value: 'all' },
            { key: 'time_tracking', value: 'disabled' },
            { key: 'name', value: '' }
          ]
        }
      }
    })

    expect(wrapper.findComponent({ name: 'BTable' }).vm.filteredItems)
      .toStrictEqual(resultExpected)
  })

  it('renders the right number of rows when using the TIME TRACKING and ROLE filter', () => {
    const resultExpected = [members[3]]

    const wrapper = factory({
      computed: {
        customFilter: () => {
          return [
            { key: 'role', value: 'owner' },
            { key: 'time_tracking', value: 'disabled' },
            { key: 'name', value: '' }
          ]
        }
      }
    })

    expect(wrapper.findComponent({ name: 'BTable' }).vm.filteredItems)
      .toStrictEqual(resultExpected)
  })
})

import { shallowMount } from '@vue/test-utils'
import MembersTable from '@/components/Members/MembersTable'
import { BTable, BFormCheckbox, BTr } from 'bootstrap-vue'

const factory = function (props) {
  return shallowMount(MembersTable, {
    stubs: {
      BTable,
      BFormCheckbox
    },

    ...props
  })
}

describe('MembersTable', () => {
  it('renders no row if no items has passed', () => {
    const wrapper = factory({
      computed: {
        members: () => []
      }
    })

    // it was put 1 to the comparison because bootstrap table renders the Table Header as <tr>
    expect(wrapper.findAllComponents(BTr).length).toBe(1)
  })

  it('renders the same number of rows as number of members', () => {
    const members = [
      { id: '1', name: 'Jared Brown', role: 'Owner', projects: 8, payment: null, limits: { weekly: null, daily: 8 }, time_tracking: 'enabled' },
      { id: '2', name: 'Adrian Goia', role: 'Viewer', projects: 5, payment: null, limits: { weekly: 50, daily: 8 }, time_tracking: 'enabled' },
      { id: '3', name: 'Cody Rogers', role: 'Viewer', projects: 8, payment: null, limits: { weekly: 40, daily: null }, time_tracking: 'enabled' }
    ]

    const wrapper = factory({
      computed: {
        members: () => members
      }
    })

    // it was added 1 to the comparison because bootstrap table renders the Table Header as <tr>
    expect(wrapper.findAllComponents(BTr).length).toBe(members.length + 1)
  })
})

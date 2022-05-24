import { shallowMount } from '@vue/test-utils'
import MembersTable from '@/components/Members/MembersTable'
import { BTable, BFormCheckbox } from 'bootstrap-vue'

const factory = function (props) {
  const wrapper = shallowMount(MembersTable, {
    stubs: {
      BTable,
      BFormCheckbox
    },

    ...props
  })

  return wrapper
}

describe('MembersTable', () => {
  it('renders no row if no items has passed', () => {
    const wrapper = factory({
      computed: {
        members: () => []
      }
    })

    // it was put 1 to the comparison because bootstrap table renders the Table Header as <b-tr>
    expect(wrapper.findAllComponents({ name: 'BTr' }).length)
      .toBe(1)
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
    expect(wrapper.findAllComponents({ name: 'BTr' }).length)
      .toBe(members.length + 1)
  })

  it('renders the right total number of members message below the table', () => {
    const members = [
      { id: '1', name: 'Jared Brown', role: 'Owner', projects: 8, payment: null, limits: { weekly: null, daily: 8 }, time_tracking: 'enabled' },
      { id: '2', name: 'Adrian Goia', role: 'Viewer', projects: 5, payment: null, limits: { weekly: 50, daily: 8 }, time_tracking: 'enabled' },
      { id: '3', name: 'Cody Rogers', role: 'Viewer', projects: 8, payment: null, limits: { weekly: 40, daily: null }, time_tracking: 'enabled' }
    ]

    const wrapper = factory({
      computed: {
        members: () => members,
        currentItemsCount: () => members.length,
        totalItemsCount: () => members.length
      }
    })

    expect(wrapper.find('.subtitle').text())
      .toBe('Showing 3 of 3 members')
  })

  it('renders the edit buttons on the row hovered', () => {
    const itemHovered = 1
    const members = [
      { id: '1', name: 'Jared Brown', role: 'Owner', projects: 8, payment: null, limits: { weekly: null, daily: 8 }, time_tracking: 'enabled' },
      { id: '2', name: 'Adrian Goia', role: 'Viewer', projects: 5, payment: null, limits: { weekly: 50, daily: 8 }, time_tracking: 'enabled' },
      { id: '3', name: 'Cody Rogers', role: 'Viewer', projects: 8, payment: null, limits: { weekly: 40, daily: null }, time_tracking: 'enabled' }
    ]

    const wrapper = factory({
      data () {
        return {
          itemHovered
        }
      },

      computed: {
        members: () => members
      }
    })

    const rowHovered = wrapper.findAllComponents({ name: 'BTr' }).at(itemHovered)

    // compared to 6 because when hover a row it shows 6 Edit Buttons
    expect(rowHovered.findAllComponents({ name: 'EditButton' }).length)
      .toBe(4)
  })
})

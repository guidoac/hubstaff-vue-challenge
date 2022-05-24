import { shallowMount } from '@vue/test-utils'

import MemberPayment from '@/components/MemberPayment'

describe('MemberPayment', () => {
  it('renders right message when NO passing payment data', () => {
    const wrapper = shallowMount(MemberPayment, {
      propsData: {
        payment: null
      }
    })

    expect(wrapper.find('p').text())
      .toBe('No pay rate / No bill rate')
  })
})

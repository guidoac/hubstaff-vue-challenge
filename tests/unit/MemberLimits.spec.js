import { shallowMount } from '@vue/test-utils'

import MemberLimits from '@/components/MemberLimits'

describe('MemberLimits', () => {
  it('renders right message when NO passing limits data', () => {
    const wrapper = shallowMount(MemberLimits, {
      propsData: {
        limits: {
          weekly: null,
          daily: null
        }
      }
    })

    expect(wrapper.find('.weekly-limit').text())
      .toBe('No weekly limit')

    expect(wrapper.find('.daily-limit').text())
      .toBe('No daily limit')
  })

  it('renders right message when passing only DAILY limit data', () => {
    const wrapper = shallowMount(MemberLimits, {
      propsData: {
        limits: {
          weekly: null,
          daily: 8
        }
      }
    })

    expect(wrapper.find('.weekly-limit').text())
      .toBe('No weekly limit')

    expect(wrapper.find('.daily-limit').text())
      .toBe('8:00 / day')
  })

  it('renders right message when passing only WEEKLY limit data', () => {
    const wrapper = shallowMount(MemberLimits, {
      propsData: {
        limits: {
          weekly: 40,
          daily: null
        }
      }
    })

    expect(wrapper.find('.weekly-limit').text())
      .toBe('40:00 / week')

    expect(wrapper.find('.daily-limit').text())
      .toBe('No daily limit')
  })

  it('renders right message when passing both WEEKLY and DAILY limit data', () => {
    const wrapper = shallowMount(MemberLimits, {
      propsData: {
        limits: {
          weekly: 40,
          daily: 8
        }
      }
    })

    expect(wrapper.find('.weekly-limit').text())
      .toBe('40:00 / week')

    expect(wrapper.find('.daily-limit').text())
      .toBe('8:00 / day')
  })
})

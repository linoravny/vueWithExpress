import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

test('my first test check jest', () => {
  // const wrapper = mount(AppHeader, {
  // })
  const wrapper = mount(AppHeader);
  expect(wrapper.find('.title').text()).toEqual('Vue App With Node Express')
})



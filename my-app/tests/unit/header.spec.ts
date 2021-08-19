import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

test('app header check title match description', () => {
  const wrapper = mount(AppHeader, {
  })

  expect(wrapper.find('.title').text()).toEqual('Vue App With Node Express')
})



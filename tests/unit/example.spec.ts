import { mount } from '@vue/test-utils'
import ShoppingBasket from '@/components/ShoppingBasket.vue'

describe('ShoppingBasket.vue', () => {
  it('renders', () => {
    const wrapper = mount(ShoppingBasket, {})
    console.log(wrapper.html())
  })
})

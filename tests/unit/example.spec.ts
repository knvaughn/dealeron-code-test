import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import GeneratedReceipt from '@/components/GeneratedReceipt.vue'
import { input1, input2, input3 } from '@/mocks'

describe('GeneratedReceipt', () => {
  it('renders output from input1', () => {
    const store = createStore({
      state: {
        shoppingBasket: input1
      }
    })
    const wrapper = mount(GeneratedReceipt, {
      global: {
        provide: {
          store: store
        }
      }
    })
    const summary = wrapper.find('.summary').text().trim()
    expect(summary).toContain('Book: 24.98 (2 @ 12.49)')
    expect(summary).toContain('Music CD: 16.49')
    expect(summary).toContain('Chocolate bar: 0.85')
    expect(wrapper.find('.sales-taxes').text().trim()).toEqual('Sales Taxes: 1.50')
    expect(wrapper.find('.total').text().trim()).toEqual('Total: 42.32')
  })

  it('renders output from input2', () => {
    const store = createStore({
      state: {
        shoppingBasket: input2
      }
    })
    const wrapper = mount(GeneratedReceipt, {
      global: {
        provide: {
          store: store
        }
      }
    })
    const summary = wrapper.find('.summary').text().trim()
    expect(summary).toContain('Imported box of chocolates: 10.50')
    expect(summary).toContain('Imported bottle of perfume: 54.65')
    expect(wrapper.find('.sales-taxes').text().trim()).toEqual('Sales Taxes: 7.65')
    expect(wrapper.find('.total').text().trim()).toEqual('Total: 65.15')
  })
  
  it('renders output from input3', () => {
    const store = createStore({
      state: {
        shoppingBasket: input3
      }
    })
    const wrapper = mount(GeneratedReceipt, {
      global: {
        provide: {
          store: store
        }
      }
    })
    const summary = wrapper.find('.summary').text().trim()
    expect(summary).toContain('Imported bottle of perfume: 32.19')
    expect(summary).toContain('Bottle of perfume: 20.89')
    expect(summary).toContain('Packet of headache pills: 9.75')
    expect(summary).toContain('Imported box of chocolates: 23.70 (2 @ 11.85)')
    expect(wrapper.find('.sales-taxes').text().trim()).toEqual('Sales Taxes: 7.30')
    expect(wrapper.find('.total').text().trim()).toEqual('Total: 86.53')
  })
})

import { createStore } from 'vuex'
import { input1, input2, input3 } from '../mocks'
import { Item } from '../types/index'

export default createStore({
  state: {
    itemOptions: [],
    shoppingBasket: [],
    loaded: false
  },
  getters: {
  },
  mutations: {
    setItemOptions(state, payload) {
      state.itemOptions = payload
    },
    setShoppingBasket(state, payload) {
      state.shoppingBasket = payload
    },
    setLoaded(state, payload) {
      state.loaded = payload
    }
  },
  actions: {
    async fetchItems(ctx) {
      // Simulate call to api
      const getItems = () => new Promise(resolve => setTimeout(resolve, 1000))
      await getItems()
      // Get all items from mock data
      const allItems: Item[] = [...input1, ...input2, ...input3]
      // Get item options from mock data
      const itemOptions = allItems.reduce((acc: Item[], currentItem: Item) => {
        const foundItem = acc.find(item => item.name === currentItem.name && item.price === currentItem.price)
        if (foundItem) {
          return acc
        }
        return [...acc, {...currentItem}]
      }, [] as Item[])
      // Add initial shopping basket and item options to the store
      ctx.dispatch('setInput', 1)
      ctx.commit('setItemOptions', itemOptions)
      ctx.commit('setLoaded', true)
    },
    setInput(ctx, payload) {
      let input: Item[]
      switch(payload) {
        case 3:
          input = input3
          break
        case 2:
          input = input2
          break
        default: 
          input = input1
          break
      }
      ctx.commit('setShoppingBasket', JSON.parse(JSON.stringify(input)))
    }
  },
  modules: {
  }
})

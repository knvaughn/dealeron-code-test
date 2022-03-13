import { createStore } from 'vuex'
import { input1, input2, input3 } from '../mocks'
import { Item } from '../types/index'

export default createStore({
  state: {
    itemOptions: [],
    shoppingBasket: []
  },
  getters: {
  },
  mutations: {
    setItemOptions(state, payload) {
      state.itemOptions = payload
    },
    setShoppingBasket(state, payload) {
      state.shoppingBasket = payload
    }
  },
  actions: {
    async fetchItems(ctx) {
      // Simulate call to api
      const getItems = () => new Promise(resolve => setTimeout(resolve, 1000))
      await getItems()
      // Get items and add to the store
      const allItems: Item[] = [...input1, ...input2, ...input3]
      const itemsMap = new Map()
      allItems.forEach(item => itemsMap.set(item.name, {...item}))
      const itemOptions = new Set(itemsMap.values())
      ctx.commit('setItemOptions', Array.from(itemOptions))
      ctx.commit('setShoppingBasket', input1)
    }
  },
  modules: {
  }
})

<template>
  <div class="is-flex is-flex-direction-column">
    <div class="notification is-primary">
      Welcome to my application for <strong>Problem Two: Sales Taxes.</strong><br>
      Add your items to the Shopping Basket using the table below. Optionally, you can add sample imputs to the table by selecting the <strong>Input1, Input2, or Input3</strong> buttons.
    </div>
    <h1 class="title is-1">Shopping Basket</h1>
    <form>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th data-label="quantity">
                Quantity
              </th>
              <th data-label="name">
                Name
              </th>
              <th data-label="at">
                <!-- at -->
              </th>
              <th data-label="price">
                Price
              </th>
              <th data-label="action">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(item, index) in shoppingBasket"
              :key="index"
            >
              <!-- Quantity -->
              <td>
                <input 
                  type="number" 
                  class="input" 
                  placeholder="0" 
                  min="0"
                  v-model="item.quantity"
                >
              </td>
              <!-- Name -->
              <td>
                <div 
                  class="select is-fullwidth"
                >
                  <select 
                    @input="(event) => changeItemType(shoppingBasket[index], event)"
                  >
                    <option v-for="(option, index) in filteredItemOptions" :selected="item.name === option.name" :key="index">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </td>
              <!-- At -->
              <td class="has-text-centered">
                at
              </td>
              <!-- Price -->
              <td>
                <div class="field">
                  <p class="control has-icons-left">
                    <input 
                      class="input" 
                      type="number" 
                      placeholder="0.00" 
                      min="0" 
                      step=".01"
                      v-model="item.price"
                    >
                    <span class="icon is-small is-left">
                      <i class="fa-solid fa-dollar-sign"></i>
                    </span>
                  </p>
                </div>
              </td>
              <!-- Action -->
              <td>
                <button 
                  class="button is-danger" 
                  @click="removeItem(item)"
                >
                  <span class="icon is-small">
                    <i class="fa-solid fa-trash-can"></i>
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="mt-5">
      <!-- Add Item -->
      <div class="dropdown" ref="dropdown">
        <div class="dropdown-trigger">
          <button 
            class="button is-primary" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu"
            @focus="toggleDropdown()"
            @blur="toggleDropdown()"
          >
            <span class="icon">
              <i class="fa-solid fa-plus"></i>
            </span>
            <span>Add Item</span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a 
              v-for="(item, index) in itemOptions"
              :key="index"
              class="dropdown-item is-flex is-justify-content-space-between px-4"
              @mousedown="addItem(item)"
            >
              <span>{{ item.name }}</span>
              <span class="has-text-grey-light">${{ item.price.toFixed(2) }}</span>
            </a>
          </div>
        </div>
      </div>
      <button 
        @click="setInput(inputNum)"
        class="button is-primary is-outlined ml-3"
        v-for="inputNum in inputs"
        :key="inputNum"
      >
        Input {{ inputNum }}
      </button>
    </div>
    <div class="mt-5 is-flex is-justify-content-flex-end">
      <button 
        class="button is-primary is-large"
        @click="getReceipt()"
      >
        <span class="icon">
          <i class="fa-solid fa-file-invoice-dollar"></i>
        </span>
        <span>Get Receipt</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Item } from '../types/index'

export default defineComponent({
  name: 'ShoppingBasket',
  async setup() {
    const router = useRouter()
    const store = useStore()
    
    if (!store.state.loaded) {
      await store.dispatch('fetchItems')
    }

    const inputs = ref([1,2,3])
    const dropdown = ref()
    const shoppingBasket = computed<Item[]>(() => store.state.shoppingBasket)
    const itemOptions = computed<Item[]>(() => store.state.itemOptions)
    const filteredItemOptions = computed(() => {
      const options = itemOptions.value.reduce((acc: Item[], currentItem: Item) => {
        const foundItem = acc.find(item => item.name === currentItem.name)
        if (foundItem) {
          return acc
        }
        return [...acc, {...currentItem}]
      }, [] as Item[])
      return options
    })

    const addItem = (item: Item) => {
      shoppingBasket.value.push({...item})
    }

    const removeItem = (item: Item) => {
      const index = shoppingBasket.value.indexOf(item)
      shoppingBasket.value.splice(index, 1)
    }

    const toggleDropdown = () => {
      dropdown.value.classList.toggle('is-active')
    }

    const changeItemType = (shoppingBasketItem: Item, event: Event) => {
      const index = (event.target as HTMLSelectElement).selectedIndex
      const selectedOption = itemOptions.value[index]

      shoppingBasketItem.name = selectedOption.name
      shoppingBasketItem.isImported = selectedOption.isImported
      shoppingBasketItem.isSalesTaxExempt = selectedOption.isSalesTaxExempt
    }

    const getReceipt = () => {
      router.push('/receipt')
    }

    const setInput = (inputNum: number) => {
      store.dispatch('setInput', inputNum)
    }

    return {
      shoppingBasket,
      itemOptions,
      filteredItemOptions,
      dropdown,
      inputs,
      addItem,
      removeItem,
      toggleDropdown,
      changeItemType,
      getReceipt,
      setInput
    }
  }
});
</script>

<style scoped>
[data-label="quantity"] {
  width: 5%;
}
[data-label="name"] {
  width: 50%;
  min-width: 200px;
}
[data-label="price"] {
  width: 50%;
  min-width: 150px;
}
table tr {
  border-bottom: 1px solid #dbdbdb;
}
table thead tr {
  border-top: 1px solid #dbdbdb;
  background: #eff5f5;
}
table th {
  color: inherit;
}
table td, table th {
  vertical-align: middle;
  border: none;
}
.dropdown-menu {
  min-width: 280px;
  width: 100%;
  max-width: 15rem;
}
</style>

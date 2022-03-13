<template>
  <div class="is-flex is-flex-direction-column">
    <div class="notification is-primary">
      Welcome to my application for <strong>Problem Two: Sales Taxes.</strong><br>
      Add your items to the Shopping Basket using the table below. Alternatively, you can copy/paste text into the <strong>Custom Input</strong> field, which will override and disable the table.
    </div>
    <h1 class="title is-1" :class="{'has-text-grey-light': disableShoppingBasket}">Shopping Basket</h1>
    <div class="table-container">
      <table class="table" :class="{'has-text-grey-light': disableShoppingBasket}">
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
                :disabled="disableShoppingBasket"
              >
            </td>
            <!-- Name -->
            <td>
              <div 
                class="select is-fullwidth"
              >
                <select 
                  :disabled="disableShoppingBasket"
                  v-model="item.name"
                >
                  <option :value="null || ''">Select an item</option>
                  <option v-for="(item, index) in itemOptions" :key="index">{{ item.name }}</option>
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
                    :disabled="disableShoppingBasket"
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
                :disabled="disableShoppingBasket"
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
    <div>
      <!-- Add Item -->
      <div class="dropdown" ref="dropdown">
        <div class="dropdown-trigger">
          <button 
            class="button is-primary" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu"
            :disabled="disableShoppingBasket"
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
              class="dropdown-item"
              @mousedown="addItem(item)"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>

    </div>
    <!-- Custom Input -->
    <h2 class="title is-3 mt-5">Custom Input</h2>
    <textarea v-model="customInput" class="textarea" :placeholder="`1 Book at 12.49\n1 Book at 12.49\n1 Music CD at 14.99\n1 Chocolate bar at 0.85`"></textarea>
  <div class="mt-5 is-flex is-justify-content-flex-end">
    <button 
        class="button is-primary is-large"
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
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex'
import { Item } from '../types/index'

export default defineComponent({
  name: 'ShoppingBasket',
  async setup() {
    const store = useStore()
    await store.dispatch('fetchItems')
    const shoppingBasket = computed<Item[]>(() => store.state.shoppingBasket)
    const itemOptions = computed<Item[]>(() => store.state.itemOptions)
    const customInput = ref('')
    const dropdown = ref()
    const disableShoppingBasket = computed(() => customInput.value.length > 0)

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

    return {
      shoppingBasket,
      itemOptions,
      customInput,
      dropdown,
      disableShoppingBasket,
      addItem,
      removeItem,
      toggleDropdown
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
</style>

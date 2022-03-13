<template>
  <main class="container p-5">
    <suspense>
        <template #default>
          <shopping-basket />
        </template>
        <template #fallback>
          <loading-bar />
        </template>
    </suspense>
  </main>
</template>

<script lang="ts">
 import { defineComponent } from 'vue'
 import ShoppingBasket from '@/components/ShoppingBasket.vue'
 import LoadingBar from '@/components/LoadingBar.vue'

  export default defineComponent({
    name: 'HomeView',
    components: {
        ShoppingBasket,
        LoadingBar
    }
  })
</script>

<style scoped>

</style>

<template>
  <main class="container p-5">
    <suspense>
        <template #default>
          <generated-receipt />
        </template>
        <template #fallback>
          <loading-bar />
        </template>
    </suspense>
  </main>
</template>

<script lang="ts">
 import { defineComponent } from 'vue'
 import GeneratedReceipt from '@/components/GeneratedReceipt.vue'
 import LoadingBar from '@/components/LoadingBar.vue'

  export default defineComponent({
    name: 'ReceiptView',
    components: {
        GeneratedReceipt,
        LoadingBar
    }
  })
</script>

<style scoped>
</style>

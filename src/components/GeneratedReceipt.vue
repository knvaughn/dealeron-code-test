<template>
    <div class="is-flex is-flex-direction-column mt-5">
        <div class="card">
            <div class="card-content">
                <div class="content is-flex is-flex-direction-column is-align-items-center py-5">
                    <span aria-hidden="true" class="icon is-large has-background-primary has-text-white">
                        <i class="fas fa-2x fa-file-invoice-dollar"></i>
                    </span>
                    <h1 class="title is-3 my-3">Receipt</h1>
                    <ul class="summary pt-2">
                        <li 
                            class="is-flex is-justify-content-space-between py-2"
                            v-for="(lineItem, index) in receipt.lineItems"
                            :key="index"
                        >
                            <span>{{ lineItem.itemName || 'Other' }}:</span>
                            <span>
                                <span class="icon is-small is-left has-text-grey-light">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                </span>
                                {{ lineItem.itemPrice.toFixed(2) }} {{ lineItem.quantityLabel }}
                            </span>
                        </li>
                    </ul>
                    <div class="sales-taxes is-flex is-justify-content-space-between has-text-weight-semibold mb-2 py-2">
                        <span>Sales Taxes:</span> 
                        <span>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-dollar-sign"></i>
                            </span>
                            {{ receipt.salesTaxes.toFixed(2) }}
                        </span>
                    </div>
                    <div class="total is-flex is-justify-content-space-between has-text-weight-medium is-size-4">
                        <span>Total:</span> 
                        <span>
                            <span class="icon is-small is-left">
                                <i class="fa-solid fa-dollar-sign"></i>
                            </span>
                            {{ receipt.total.toFixed(2) }}
                        </span>
                    </div>
                    <div class="mt-6 is-flex is-justify-content-flex-end button-wrapper">
                        <button 
                            class="button is-primary is-medium"
                            @click="returnToShoppingBasket()"
                        >
                            <span class="icon">
                            <i class="fa-solid fa-arrow-left"></i>
                            </span>
                            <span>Back to Basket</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useReceipt } from '../composables/useReceipt'
import { Item } from '../types/index'

export default defineComponent({
    name: 'GeneratedReceipt',
    setup() {
        const store = useStore()
        const router = useRouter()
        const receipt = useReceipt()
        const shoppingBasket = computed<Item[]>(() => store.state.shoppingBasket)

        const returnToShoppingBasket = () => {
            router.push('/')
        }

        if (shoppingBasket.value.length === 0) {
            returnToShoppingBasket()
        }

        return {
            receipt,
            returnToShoppingBasket
        }
    },
})
</script>

<style scoped>
    .card {
        box-shadow: none;
        border: 1px solid #dbdbdb;
    }
    .icon {
        border-radius: 10px;
    }
    .card .summary {
        border-top: 7px dotted hsl(171, 100%, 41%);
        list-style-type: none;
        margin: 10px 0 5px;
        width: 100%;
        max-width: 500px;
    }
    .sales-taxes, .total, .button-wrapper {
        width: 100%;
        max-width: 500px;
    }
    .sales-taxes {
        border-top: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        background: #eff5f5;
    }
</style>
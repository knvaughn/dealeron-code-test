import { Receipt, Item, ReceiptLineItem } from '../types/index'
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useReceipt() {
    const store = useStore() 
    const shoppingBasket = computed(() => store.state.shoppingBasket)

    const receipt: Receipt = {
        lineItems: [],
        salesTaxes: 0,
        total: 0
    }

    /**
     * Round provided tax amount up to the nearest 5 cents
     * @param tax 
     */
    const roundUp = (tax: number) => {
        return parseFloat((Math.ceil(tax * 20) / 20).toFixed(2))
    }

    /**
     * Create a map out of an array of items grouped by a provided key
     * @param arr 
     * @param key 
     * @returns Map<string, Item[]>
     */
    const groupBy = (arr: Item[], key: keyof Item) => {
        const newMap = new Map<string, Item[]>()
        arr.forEach(item => {
            newMap.set(item[key] as string, [...newMap.get(item[key] as string) ?? [], item])
        })
        return newMap
    }

    // create a map to group items by name
    const itemsByName = groupBy(shoppingBasket.value, 'name')
    itemsByName.forEach((nameGroup, name) => {
        // create a map to group items by price
        const itemsByPrice = groupBy(nameGroup, 'price')
        itemsByPrice.forEach((priceGroup) => {
            // create a line item object to be added to the receipt 
            const lineItem: ReceiptLineItem = {
                itemName: name,
                itemPrice: 0,
                quantityLabel: ''
            }
            // create line item quantity variable for quantity label
            let lineItemQuantity = 0
            // create net price variable for new cost of item including sales and import taxes
            let netItemPrice = 0
            priceGroup.forEach((item) => {
                // calculate taxes for each item
                const salesTax = item.isSalesTaxExempt ? 0 : roundUp(item.price * .10)
                const importTax = !item.isImported ? 0 : roundUp(item.price * .05)
                // update line item
                netItemPrice = item.price + salesTax + importTax
                lineItem.itemPrice += (netItemPrice * item.quantity)
                lineItemQuantity += item.quantity
                // update receipt
                receipt.salesTaxes += (salesTax + importTax)
                receipt.total += (netItemPrice * item.quantity)
            })
            // create quantity label (line item quantity @ net item price) and add to line item
            if (lineItemQuantity > 1) {
                lineItem.quantityLabel = `(${lineItemQuantity} @ ${netItemPrice})`
            }
            // add line item to receipt 
            receipt.lineItems.push(lineItem)
        })
    })

    return receipt
}
export interface Item {
    quantity: number,
    name: string,
    price: number,
    isImported: boolean,
    isSalesTaxExempt: boolean
}

export interface ReceiptLineItem {
    itemName: string,
    itemPrice: number, // total price of line item including applicable taxes
    quantityLabel?: string // quantity and individual item price including applicable taxes
}

export interface Receipt {
    lineItems: ReceiptLineItem[],
    salesTaxes: number,
    total: number
}
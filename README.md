# dealeron-code-test

## Description

Problem Two: Sales Taxes

I designed this solution using the Vue 3 Composition API with TypeScript.

For the receipt logic, I created a useReceipt composable which takes items from the shopping basket and creates a map to group items by name and then price, and calculates the taxes and formats a receipt with the line items and totals.

I built two separate views to display the shopping basket and the generated receipt, and used vue router to navigate between them. I wanted this app to be interactive, so I created a table that allows you to add and modify items before creating a receipt. In order to build this prototype rapidly, I used bulma.io for css styling. 

Both views used a shared state (the shopping basket) so I extracted the state out into a global store using vuex.


## Project setup
```
npm install
OR
yarn install
```

### Compiles and hot-reloads for development
```
npm run serve
OR
yarn serve
```

### Run your unit tests
```
npm run test:unit
OR
yarn test:unit
```
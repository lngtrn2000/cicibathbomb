import { useState } from 'react'

export function handleOrder(productList, choice) {
    var sort = []
    switch (choice) {
        case 'product-name':
            sort = productList.sort((a, b) => a.productName > b.productName ? 1 : -1)
            return sort
        case 'product-price-ascending':
            sort = productList.sort((a, b) => a.price - b.price)
            return sort
        case 'product-price-descending':
            sort = productList.sort((a, b) => b.price - a.price)
            return sort
        case 'product-bought-ascending':
            sort = productList.sort((a, b) => a.sold - b.sold)
            return sort
        case 'product-bought-descending':
            sort = productList.sort((a, b) => b.sold - a.sold)
            return sort
        default:
            console.log('default');
            return sort
    }
}

export function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <h3>Item #{item}</h3>
            </div>
          ))}
      </>
    );
  }


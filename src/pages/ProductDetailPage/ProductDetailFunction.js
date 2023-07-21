

export function handleQuantity(quan, itemsquan) {
    if (quan > itemsquan) {
        return quan-1
    }
    else {
        if (quan < 1) {
            return 1
        }
        else if (quan > 99) {
            return 99
        }
        else return quan
    }



}

// export function handleAddCart(name, quan, price,image) {
//     myArr = JSON.parse(localStorage.getItem('items'))
//     var temp = []
//     const index = myArr.findIndex(object => object.name === name)
//     if (index === -1) {
//         temp = { name, quan, price, image }
//         myArr.push(temp)
//         localStorage.setItem('items', JSON.stringify(myArr))
//         alert('Đã thêm vào giỏ hàng')
//         return myArr
//     }
//     else alert('Sản phẩm đã tồn tại trong giỏ hàng')
// }
import axios from 'axios'

export const removeItemFromCart = (items, cart, id) => {
    var temp = items
    const result = temp.filter(item => item.name !== cart.name)
    try {
        axios.post(`http://localhost:4000/user/addcart/${id}`, result)
    } catch (error) {
        console.log(error)
    }
    return result
}

export const handleEditNumber = (items, name, value, id) => {
    if (value < 1) {
        value = 1
    }
    else if (value > 99) {
        value = 99
    }

    var temp = items
    var ind = temp.findIndex(obj => { return obj.name === name })
    temp[ind].quan = value
    axios.post(`http://localhost:4000/user/addcart/${id}`, temp)
    console.log(temp)
    return temp
}   
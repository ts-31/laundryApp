import {ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, SET_SELECTED_SERVICE} from './constants'
export function addToCart(item) {
    return{
        type: "ADD_TO_CART",
        data: item,
    };
}

export function removeFromCart(item) {
    return{ 
        type: "REMOVE_FROM_CART",
        data: item,
    };
}

export function increaseQuantity(item) {
    return{
        type: "INCREASE_QUANTITY",
        data: item,
    };
}

export function decreaseQuantity(item) {
    return{
        type: "DECREASE_QUANTITY",
        data: item,
    };
}

export function resetCart() {
    return {
        type: "RESET_CART"
    };
}

export function setSelectedService(service) {
    return{
        type: "SET_SELECTED_SERVICE",
        data: service,
    };
}
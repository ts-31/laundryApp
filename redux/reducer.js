import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, SELECT_SERVICE } from "./constants";
const initialState = [];
// const initialState = {
//     items: [],
//     selectedService: null
//   };

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.find(item => item.name === action.data.name);
            if (existingItem) {
                return state.map(item => {
                    if (item.name === action.data.name) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
            } else {
                return [...state, { ...action.data, quantity: 1 }];
            }

        case 'REMOVE_FROM_CART':
            let result = state.filter(item => {
                return item.name !== action.data;
            })
            return [...result]

        case 'INCREASE_QUANTITY':
            return state.map(item => {
                if(item.name === action.data.name){
                    return {...item, quantity: item.quantity+1};
                }
                return item;
            });
        
        case 'DECREASE_QUANTITY':
            return state.map(item => {
                if (item.name === action.data.name && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter(item => item.quantity > 0);
            
        case 'RESET_CART':
            return initialState;
        
        case 'SET_SELECTED_SERVICE':
            // Assuming you only want to keep one selected service at a time
            return [...state.filter(item => !item.selected), { ...action.data, selected: true }];
            
            
        default :
            return state;
    }
};




// return [...state, action.data];  case 1
// case 'DECREASE_QUANTITY':
//     return state.map(item => {
//         if(item.name === action.data.name && item.quantity > 0){
//             return {...item, quantity: item.quantity-1};
//         }
//         return item;
//     })
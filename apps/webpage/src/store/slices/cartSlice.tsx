import { createSlice } from "@reduxjs/toolkit";


export interface CartItem {
    id : number,
    price : number,
    name : string,
    quantity : number,
    image : string
}

interface cartState {
    Cart : CartItem[]
}

const initialState : cartState = {Cart : []}

const cartSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart : (state, action)=>{
            const items = state.Cart.find((i)=> i.id === action.payload.id )
            if(items){
                items.quantity += action.payload.quantity
            }else{
                state.Cart.push(action.payload)
            }
        },

        removeItem: (state, action) => {
            const item = state.Cart.find((i) => i.id === action.payload.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1; // Reduce quantity by 1
                } else {
                    state.Cart = state.Cart.filter((i) => i.id !== action.payload.id); // Remove item if quantity is 0
                }
            }
        },

        clearCart : (state) => {
            state.Cart = []
        }
    }
})

export default cartSlice.reducer;
export const {addToCart, removeItem, clearCart} = cartSlice.actions
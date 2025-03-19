import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';


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

const initialState : cartState = {Cart : JSON.parse(Cookies.get("cartItems") || '[]')}

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
            Cookies.set("cartItems", JSON.stringify(state.Cart), {expires : 1})
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
            Cookies.remove("cartItems")
        }
    }
})

export default cartSlice.reducer;
export const {addToCart, removeItem, clearCart} = cartSlice.actions
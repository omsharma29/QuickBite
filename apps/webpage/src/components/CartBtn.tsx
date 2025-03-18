import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/dropdown";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button } from "@repo/ui/button";
import { addToCart, CartItem, removeItem } from "../store/slices/cartSlice";
import { useNavigate } from 'react-router-dom';

export default function CartBtn() {
    const dispatch = useDispatch()
    const cartItemsLength = useSelector((state: RootState) => { return state?.cart?.Cart.length || 0 })
    const cartItems = useSelector((state: RootState) => state.cart.Cart ?? [])
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const handleRemoveItem = (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        dispatch(removeItem({ id }));
    };
    const handleAddItem = (e: React.MouseEvent, item: CartItem) => {
        e.preventDefault()
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        }))
    }
    const navigate = useNavigate()
    const OrderBtn = () => {
        cartItemsLength > 1 ? navigate("/orderpage") : " "
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative border-transparent flex flex-row gap-3 pt-1.5">
                <div className="relative">
                    <ShoppingCart className="border-transparent" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {cartItemsLength}
                    </span>
                </div>
                Add to Cart
            </DropdownMenuTrigger>

            {/* Main Dropdown Container */}
            <DropdownMenuContent className="bg-white border-transparent h-[400px] w-[300px] p-4 flex flex-col">
                <DropdownMenuLabel className="text-2xl font-semibold flex justify-between ">
                    <span className="underline">Amount :</span>  <span>&#8377;{totalAmount} /-</span>
                </DropdownMenuLabel>
                <hr className="m-4" />
                <DropdownMenuSeparator />

                <DropdownMenuLabel>
                    <div className="flex justify-between px-2">
                        <p className="w-1/2">Items</p>
                        <p className="w-1/4 text-center">Qty</p>
                        <p className="w-1/4 text-right">Price</p>
                    </div>
                </DropdownMenuLabel>

                <div className="flex-1 overflow-y-auto">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <DropdownMenuItem key={item.id} className="flex justify-between items-center px-2 py-1">
                                <p className="w-1/2 truncate">{item.name}</p>
                                <p className="w-1/4 text-center flex gap-2 items-center">
                                    <button onClick={(e) => handleRemoveItem(e, item.id)} className="font-bold text-[1.4rem] cursor-pointer hover:text-[#F17228]">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={(e) => handleAddItem(e, item)} className="font-bold text-[1.1rem] cursor-pointer hover:text-[#F17228]">+</button>
                                </p>
                                <p className="w-1/4 text-right">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-5">No Items In the Cart</p>
                    )}
                </div>


                <div className="mt-auto">
                    <Button onClick={OrderBtn} className="w-full h-[40px] bg-amber-500 cursor-pointer">
                        Order Now
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

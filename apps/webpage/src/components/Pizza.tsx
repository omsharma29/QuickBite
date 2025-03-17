import { Button } from "@repo/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { auth } from "../lib/firebase-auth";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

interface Pizzas {
    id: number;
    pizza_img: string;
    pizza_name: string;
    pizza_price: number;
}

export default function Pizza() {
    const [pizzas, setPizzas] = useState<Pizzas[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const baseUrl = import.meta.env.VITE_URL ?? "http://localhost:3000";
                const { data } = await axios.get(`${baseUrl}/api/pizzas?limit=15`);
                setPizzas(data.pizzas);
            } catch (error: any) {
                setError("Failed to fetch Pizzas: " + (error.message || "Unknown error"));
            } finally {
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
            console.log("Auth State Changed:", currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleToast = (pizza: Pizzas) => {
        if (user) {
            toast.success(`${pizza.pizza_name} added to the cart`);
            dispatch(
                addToCart({
                    id : pizza.id,
                    name: pizza.pizza_name,
                    price : pizza.pizza_price,
                    quantity : 1,
                    image : pizza.pizza_img
                })
            );
        } else {
            toast.error("Please Create Account");
        }
    };

    if (loading) return <div>Loading....</div>;
    if (error) return <div>Error in fetching!! Please refresh</div>;

    return (
        <div>
            <div className="font-bold text-center text-4xl mb-8">All Pizzas</div>
            <div>
                <div className="pizzas flex flex-wrap justify-center gap-5 mb-5">
                    {pizzas?.map((pizz) => (
                        <div key={pizz.id} className="flex flex-col w-1/6">
                            <div className="image">
                                <img src={pizz.pizza_img} className="rounded-4xl" alt={pizz.pizza_name} />
                            </div>
                            <div className="pizzaName font-semibold">{pizz.pizza_name}</div>
                            <div className="price font-bold">Price: {pizz.pizza_price}</div>
                            <Button
                                onClick={() => handleToast(pizz)}
                                className="text-white mt-2 w-[150px] cursor-pointer bg-[#F17228] border border-transparent hover:border-[#FF5900] hover:drop-shadow-[0px_4px_10px_#FFB20E] rounded-2xl"
                            >
                                Add To Cart
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

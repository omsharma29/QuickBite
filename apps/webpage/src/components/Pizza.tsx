import { Button } from "@repo/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"


interface Pizzas {
    id: number,
    pizza_img: string,
    pizza_name: string,
    pizza_price: number,
}



interface Pizza {
    id: number;
    pizza_name: string;
    pizza_img: string;
}


export default function Pizza() {
    
    const [pizzas, setPizzas] = useState<Pizzas[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchPizzas = async ()=>{
            try {
                const baseUrl = import.meta.env.VITE_URL ?? 'http://localhost:3000';
                const {data} = await axios.get(`${baseUrl}/api/pizzas?limit=15`)
                setPizzas(data.pizzas)
            } catch (error : any) {
                setError("Failed to fetch Pizzas: " + (error.message || 'Unknown error'))
            }finally {
                setLoading(false)
            }
        }

        fetchPizzas()
    }, [])
    
    if (loading) return <div>Loading....</div>
    if (error) return <div>Error in fetching!! Please refresh</div>

    return (
        <div>
            <div className="font-bold text-center text-4xl mb-8">All Pizzas</div>
            <div>
                <div className="pizzas flex flex-wrap justify-center gap-5 mb-5">
                    {pizzas?.map((pizz) => (
                        <div className="flex flex-col w-1/6">
                            <div className="image">
                                <img src={pizz.pizza_img} className="rounded-4xl" alt={pizz.pizza_name} />
                            </div>
                            <div className="pizzaName font-semibold ">{pizz.pizza_name}</div>
                            <div className="price font-bold ">Price: {pizz.pizza_price}</div>
                            <Button
                                className="text-white mt-2 w-[150px] cursor-pointer bg-[#F17228] border border-transparent hover:border-[#FF5900] hover:drop-shadow-[0px_4px_10px_#FFB20E] ">
                                Add To Cart</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
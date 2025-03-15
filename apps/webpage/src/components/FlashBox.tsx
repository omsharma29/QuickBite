import { useEffect, useState } from "react";
import axios from "axios";

interface Pizza {
    id: number;
    pizza_name: string;
    pizza_img: string;
}

const rated = [
    { "i": "Best Rates" },
    { "i": "Cheapest Price" },
    { "i": "Top Choice" },
    { "i": "Best Deals" },
    { "i": "New Arrival" }
];

function FlashBox() {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/pizzas?limit=5`);
                setPizzas(data.pizzas);
            } catch (err) {
                setError("Failed to fetch pizzas");
            } finally {
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex mt-16 justify-center gap-10">
            {(pizzas ?? []).map((pizza, index) => (
                <div key={pizza.id} className="pizza-box text-center">
                    {/* Pizza Image */}
                    <div className="image">
                        <img
                            src={pizza.pizza_img}
                            className="rounded-2xl drop-shadow-[0px_4px_10px_#FFB20E] border-2 border-transparent hover:border-black mb-4"
                            alt={pizza.pizza_name}
                        />
                    </div>

                    {/* Pizza Name */}
                    <div className="pizzaName font-bold">{pizza.pizza_name}</div>

                    {rated[index] && (
                        <div className="rated mt-1 mb-5 bg-red-500 text-white font-stretch-semi-condensed rounded-4xl">
                            {Object.values(rated[index])[0]}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FlashBox;

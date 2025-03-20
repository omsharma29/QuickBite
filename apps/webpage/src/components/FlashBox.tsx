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
        <div className="flashbox-container overflow-hidden px-4 pb-4 sm:px-8">
            <div className="flex mt-16 overflow-x-hidden relative">
                <div className="flex gap-4 sm:gap-6 md:gap-8 animate-slide">
                    {/* First set of pizzas */}
                    {(pizzas ?? []).map((pizza, index) => (
                        <div key={`first-${pizza.id}`} className="flex-shrink-0 w-[280px] sm:w-[320px] px-2">
                            <div className="text-center">
                                {/* Pizza Image */}
                                <div className="aspect-square w-full">
                                    <img
                                        src={pizza.pizza_img}
                                        className="rounded-2xl drop-shadow-[0px_4px_10px_#FFB20E] border-2 border-transparent hover:border-black mb-4 object-cover w-full h-full"
                                        alt={pizza.pizza_name}
                                    />
                                </div>

                                {/* Pizza Name */}
                                <div className="pizzaName font-bold text-base sm:text-lg truncate px-2">
                                    {pizza.pizza_name}
                                </div>

                                {rated[index] && (
                                    <div className="rated mt-1 mb-5 mx-auto px-4 py-1 bg-red-500 text-white font-stretch-semi-condensed rounded-full text-sm sm:text-base w-fit">
                                        {Object.values(rated[index])[0]}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Duplicate set of pizzas for seamless loop */}
                    {(pizzas ?? []).map((pizza, index) => (
                        <div key={`second-${pizza.id}`} className="flex-shrink-0 w-[280px] sm:w-[320px] px-2">
                            <div className="text-center">
                                {/* Pizza Image */}
                                <div className="aspect-square w-full">
                                    <img
                                        src={pizza.pizza_img}
                                        className="rounded-2xl drop-shadow-[0px_4px_10px_#FFB20E] border-2 border-transparent hover:border-black mb-4 object-cover w-full h-full"
                                        alt={pizza.pizza_name}
                                    />
                                </div>

                                {/* Pizza Name */}
                                <div className="pizzaName font-bold text-base sm:text-lg truncate px-2">
                                    {pizza.pizza_name}
                                </div>

                                {rated[index] && (
                                    <div className="rated mt-1 mb-5 mx-auto px-4 py-1 bg-red-500 text-white font-stretch-semi-condensed rounded-full text-sm sm:text-base w-fit">
                                        {Object.values(rated[index])[0]}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlashBox;

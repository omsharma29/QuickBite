import { Request, Response } from "express";

// controllers/pizzaController.js

const pizzas = [
  {
    id: 1,
    pizza_name: "Achari Do Pyaza",
    pizza_price: 299,
    pizza_img: "https://i.ibb.co/K6Stvzr/image.jpg",
    pizza_tag: "onion",
  },
  {
    id: 2,
    pizza_name: "Blazzing Onion Paparika",
    pizza_price: 350,
    pizza_img: "https://i.ibb.co/2PQmPW0/image.jpg",
    pizza_tag: "onion",
  },
  {
    id: 3,
    pizza_name: "Cheese & Corn",
    pizza_price: 150,
    pizza_img: "https://i.ibb.co/cL3WcCV/image.jpg",
    pizza_tag: "cheese",
  },
  {
    id: 4,
    pizza_name: "Cheese Overloaded",
    pizza_price: 310,
    pizza_img: "https://i.ibb.co/8KvFN29/image.jpg",
    pizza_tag: "cheese",
  },
  {
    id: 5,
    pizza_name: "Cheese Valcano Panner",
    pizza_price: 550,
    pizza_img: "https://i.ibb.co/rkGHjBM/image.jpg",
    pizza_tag: "cheese",
  },
  {
    id: 6,
    pizza_name: "Paratha Pizza",
    pizza_price: 259,
    pizza_img: "https://i.ibb.co/vqFrpCZ/image.jpg",
    pizza_tag: "Paratha",
  },
  {
    id: 7,
    pizza_name: "Magherita",
    pizza_price: 159,
    pizza_img: "https://i.ibb.co/nj2NNJd/image.jpg",
    pizza_tag: "cheese",
  },
  {
    id: 8,
    pizza_name: "Farmhouse",
    pizza_price: 599,
    pizza_img: "https://i.ibb.co/DrpcxMK/image.jpg",
    pizza_tag: "veggie",
  },
  {
    id: 9,
    pizza_name: "Fresh Veggie",
    pizza_price: 129,
    pizza_img: "https://i.ibb.co/0Fk8vrs/image.jpg",
    pizza_tag: "veggie",
  },
  {
    id: 10,
    pizza_name: "Indi Tandoor Panner",
    pizza_price: 699,
    pizza_img: "https://i.ibb.co/FJS0nYS/image.jpg",
    pizza_tag: "panner",
  },
  {
    id: 11,
    pizza_name: "Maxican Green Wave",
    pizza_price: 550,
    pizza_img: "https://i.ibb.co/9rkXwz7/image.jpg",
    pizza_tag: "Veggie",
  },
  {
    id: 12,
    pizza_name: "Panner Spice Supreme",
    pizza_price: 480,
    pizza_img: "https://i.ibb.co/DDS3cHx/image.jpg",
    pizza_tag: "panner",
  },
  {
    id: 13,
    pizza_name: "Peppy Panner",
    pizza_price: 340,
    pizza_img: "https://i.ibb.co/Srhr61r/image.jpg",
    pizza_tag: "panner",
  },
  {
    id: 14,
    pizza_name: "Veg ExtraVenge",
    pizza_price: 520,
    pizza_img: "https://i.ibb.co/87G0GsN/image.jpg",
    pizza_tag: "veggie",
  },
  {
    id: 15,
    pizza_name: "Veg Paradise",
    pizza_price: 465,
    pizza_img: "https://i.ibb.co/4Fh04qc/image.jpg",
    pizza_tag: "veggie",
  },
];

export const getPizzas = async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 10;
  res.json({ pizzas: pizzas.slice(0, limit) });
};

export const getPizzaById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const pizzaId = Number(req.params.id);

  if (isNaN(pizzaId)) {
    res.status(400).json({ message: "Invalid pizza ID" });
    return;
  }

  const pizza = pizzas.find((p) => p.id === pizzaId);

  if (!pizza) {
    res.status(404).json({ message: "Pizza not found" });
    return;
  }

  res.json(pizza);
};

export const getPizzasByTag = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const tag = req.params.tag ? req.params.tag.toLowerCase() : "";
  const filteredPizzas = pizzas.filter(
    (p) => p.pizza_tag.toLowerCase() === tag,
  );

  if (filteredPizzas.length === 0) {
    res.status(404).json({ message: "No pizzas found for this tag" });
    return;
  }

  res.json({ pizzas: filteredPizzas });
};

export const getPizzaByTagAndId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const tag = String(req.params.tag);
  const id = Number(req.params.id);
  const filterpizza = pizzas
    .filter((p) => p.pizza_tag === tag)
    .find((p) => p.id === id);

  if (!filterpizza) {
    res.status(404).json({ message: "Pizza not found" });
    return;
  }

  res.json(filterpizza);
};

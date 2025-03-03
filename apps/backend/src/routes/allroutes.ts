import { Router } from "express";
import {
  getPizzas,
  getPizzaById,
  getPizzasByTag,
  getPizzaByTagAndId,
} from "../controllers/pizza";

const router: Router = Router();

router.get("/pizzas/tag/:tag", getPizzasByTag);
router.get("/pizzas/tag/:tag/:id", getPizzaByTagAndId);
router.get("/pizzas/:id", getPizzaById);
router.get("/pizzas", getPizzas);

export default router;

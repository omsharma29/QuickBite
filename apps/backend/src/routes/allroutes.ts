import { Router } from "express";
import {
  getPizzas,
  getPizzaById,
  getPizzasByTag,
  getPizzaByTagAndId,
} from "../controllers/pizza";
import { createCashfreeOrder } from "../controllers/paymentCashfree";

const router: Router = Router();

// API Routes
router.get("/pizzas/tag/:tag", getPizzasByTag);
router.get("/pizzas/tag/:tag/:id", getPizzaByTagAndId);
router.get("/pizzas/:id", getPizzaById);
router.get("/pizzas", getPizzas);
router.post("/cashfree-payment", async (req, res) => {
  console.log('Received payment request body:', req.body);
  try {
    console.log("Received payment request:", req.body); // Add logging
    const { amount, customerName, customerEmail, customerPhone, orderId, customerId } = req.body;

    // Validate required fields
    if (!amount || !customerName || !customerEmail || !customerPhone || !orderId || !customerId) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["amount", "customerName", "customerEmail", "customerPhone", "orderId", "customerId"]
      });
    }

    const response = await createCashfreeOrder({
      amount,
      customerName,
      customerEmail,
      customerPhone,
      orderId,
      customerId
    });

    return res.status(200).json(response);

  } catch (error: any) {
    console.error("Detailed error:", error); // Add detailed error logging
    return res.status(500).json({ 
      message: error.message || "Internal Server Error",
      details: error.response?.data || error
    });
  }
});

export default router;

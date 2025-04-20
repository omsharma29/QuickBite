import { Cashfree } from "cashfree-pg"; 


Cashfree.XClientId = process.env.CASHFREE_APP_ID; // Replace with your Test App ID from Cashfree
Cashfree.XClientSecret= process.env.CASHFREE_APP_SECRET_KEY; // Replace with your Test Secret Key
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Use sandbox URL for testing

interface CreateOrderParams {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderId: number;
  customerId : string
}

export const createCashfreeOrder = async ({ amount, customerName, customerEmail, customerPhone, orderId, customerId }: CreateOrderParams) => {
  try {
    const orderData = {
      order_amount: amount,
      order_currency: "INR",
      order_id: orderId.toString(), // Convert orderId to string
      customer_details: {
        customer_id: customerId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${process.env.FRONT_URL || 'http://localhost:3001'}/ordersuccessful?order_id=${orderId}`,
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderData);
    return {
      sessionId: response.data.payment_session_id,
      orderData: response.data
    };
    
  } catch (error: any) {
    console.error("Cashfree Order Error:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to create order");
  }
};
